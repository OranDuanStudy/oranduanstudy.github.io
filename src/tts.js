// ========================================
// Cloudflare Workers - TTS API
// 路径: /api/tts
// ========================================

const TTS_API_URL = 'https://open.bigmodel.cn/api/paas/v4/audio/speech';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// 生成智谱AI JWT Token
async function generateJWT(apiKey) {
    const [id, secret] = apiKey.split('.');

    const now = Date.now();
    const header = { alg: 'HS256', sign_type: 'SIGN' };
    const payload = {
        api_key: id,
        exp: Math.floor(now / 1000) + 3600,
        timestamp: now
    };

    const base64urlEncode = (str) => {
        const base64 = btoa(str);
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };

    const encodedHeader = base64urlEncode(JSON.stringify(header));
    const encodedPayload = base64urlEncode(JSON.stringify(payload));
    const dataToSign = `${encodedHeader}.${encodedPayload}`;

    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(dataToSign)
    );

    const signatureArray = Array.from(new Uint8Array(signature));
    const signatureString = String.fromCharCode(...signatureArray);
    const encodedSignature = base64urlEncode(signatureString);

    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function handleTTS(request, env) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        const { text, voice = 'female' } = body;

        if (!text) {
            return new Response(JSON.stringify({ error: 'Text is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const apiKey = env.ZHIPU_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'ZHIPU_API_KEY not configured' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const token = await generateJWT(apiKey);

        // 语音参数映射 - 支持直接传入音色名称或ID
        // voice 可以是: 'tongtong' (默认女声), 克隆的音色ID, 或映射值
        const voiceMap = {
            'female': 'tongtong',
            'male': 'tongtong',
        };
        // 如果 voice 在映射表中，使用映射值；否则直接使用 voice（可能是克隆的音色ID）
        const mappedVoice = voiceMap[voice] || voice || 'tongtong';

        const response = await fetch(TTS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                model: 'glm-tts',
                input: text,
                voice: mappedVoice,
                speed: 1.0,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(JSON.stringify({ error: errorText }), {
                status: response.status,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // 返回音频数据
        const audioBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(audioBuffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64Audio = btoa(binary);

        return new Response(JSON.stringify({
            audio: base64Audio,
            format: 'mp3'
        }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
}

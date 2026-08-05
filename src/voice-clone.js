// ========================================
// Cloudflare Workers - Voice Clone API
// 路径: /api/voice-clone
// ========================================

const VOICE_CLONE_URL = 'https://open.bigmodel.cn/api/paas/v4/voice/clone';

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

export async function handleVoiceClone(request, env) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        const { file_id, voice_name, text, input } = body;

        if (!file_id) {
            return new Response(JSON.stringify({ error: 'file_id is required' }), {
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

        if (!text) {
            return new Response(JSON.stringify({ error: 'text (reference text) is required' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const requestBody = {
            model: 'glm-tts-clone',
            voice_name: voice_name || `oran_voice_${Date.now()}`,
            text: text,
            file_id: file_id,
        };

        // 添加可选的 input 参数用于测试生成
        if (input) {
            requestBody.input = input;
        }

        const response = await fetch(VOICE_CLONE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(JSON.stringify({ error: errorText }), {
                status: response.status,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
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

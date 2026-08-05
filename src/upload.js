// ========================================
// Cloudflare Workers - File Upload API
// 路径: /api/upload
// ========================================

const FILES_UPLOAD_URL = 'https://open.bigmodel.cn/api/paas/v4/files/upload';

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

export async function handleUpload(request, env) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        const { file_data, file_name = 'voice.wav' } = body;

        if (!file_data) {
            return new Response(JSON.stringify({ error: 'file_data is required' }), {
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

        // 将base64转换为二进制
        const binaryString = atob(file_data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // 使用原生 FormData (Cloudflare Workers 支持)
        const formData = new FormData();
        formData.append('file', new Blob([bytes], { type: 'audio/wav' }), file_name);
        formData.append('purpose', 'voice-audio');

        const response = await fetch(FILES_UPLOAD_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
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

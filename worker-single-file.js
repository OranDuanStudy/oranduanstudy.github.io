// ========================================
// Cloudflare Workers - 单文件版本
// 用于网页端部署
// ========================================

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

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

// Chat API handler
async function handleChat(request, env) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        const { messages, model = 'glm-4-flash' } = body;

        const apiKey = env.ZHIPU_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'ZHIPU_API_KEY not configured' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const token = await generateJWT(apiKey);

        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(errorText, {
                status: response.status,
                headers: corsHeaders
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

// TTS API handler
async function handleTTS(request, env) {
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

        // 支持直接传入音色名称或ID
        const voiceMap = {
            'female': 'tongtong',
            'male': 'tongtong',
        };
        const mappedVoice = voiceMap[voice] || voice || 'tongtong';

        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/audio/speech', {
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

        const audioBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(audioBuffer);

        // 检测音频格式
        let detectedFormat = 'mp3';
        if (bytes.length > 4) {
            // RIFF (WAV)
            if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
                detectedFormat = 'wav';
            }
            // OGG
            else if (bytes[0] === 0x4f && bytes[1] === 0x67) {
                detectedFormat = 'ogg';
            }
            // MP4/M4A
            else if (bytes.length > 7 && bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
                detectedFormat = 'm4a';
            }
        }

        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64Audio = btoa(binary);

        return new Response(JSON.stringify({
            audio: base64Audio,
            format: detectedFormat
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

// Upload API handler
async function handleUpload(request, env) {
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

        const binaryString = atob(file_data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const formData = new FormData();
        formData.append('file', new Blob([bytes], { type: 'audio/wav' }), file_name);
        formData.append('purpose', 'voice-audio');

        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/files/upload', {
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

// Voice Clone API handler
async function handleVoiceClone(request, env) {
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

        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/voice/clone', {
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

// Main entry point
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: corsHeaders
            });
        }

        // Route to appropriate handler
        if (path.startsWith('/api/chat')) {
            return handleChat(request, env);
        } else if (path.startsWith('/api/tts')) {
            return handleTTS(request, env);
        } else if (path.startsWith('/api/upload')) {
            return handleUpload(request, env);
        } else if (path.startsWith('/api/voice-clone')) {
            return handleVoiceClone(request, env);
        }

        // 404 for unknown routes
        return new Response(JSON.stringify({ error: 'Not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
};

// ========================================
// Cloudflare Workers - Main Entry
// 路由分发到各个 API 模块
// ========================================

import { handleChat } from './chat.js';
import { handleTTS } from './tts.js';
import { handleUpload } from './upload.js';
import { handleVoiceClone } from './voice-clone.js';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
    async fetch(request, env, ctx) {
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

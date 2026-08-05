// ========================================
// AI 聊天助手 - GitHub Pages + Cloudflare Workers API
// ========================================

// ========================================
// 配置区域 - API 地址配置
// ========================================
// 部署到 Cloudflare Workers 后，将这里的 URL 替换为你的 Workers URL
// 例如: 'https://oran-chatbot-api.your-username.workers.dev'
const CF_API_URL = 'https://oran-chatbot-api.q445872439q.workers.dev/';

// 自动检测API路径
const getApiBaseUrl = () => {
    // 如果已配置 Cloudflare Workers API URL，使用它
    if (CF_API_URL && !CF_API_URL.includes('YOUR_CLOUDFLARE_WORKER_URL')) {
        // 移除末尾的斜杠
        return CF_API_URL.replace(/\/$/, '');
    }
    // 本地开发，使用 localhost:8787 (Wrangler 默认端口)
    return 'http://localhost:8787';
};

const API_BASE_URL = getApiBaseUrl();

// TTS 音色配置
const TTS_CONFIG = {
    voiceId: 'tongtong',  // 使用智谱AI默认音色 'tongtong'（彤彤女声）
    voiceSamplePath: null,  // 暂时禁用音色克隆
    referenceText: null,
    enableTTS: false  // 是否启用TTS
};
// ========================================

const SYSTEM_PROMPT = `
Act as Oran Duan (段傲然), you are not assistant, you are are the man.
You will answer any question patiently and kindly, based on the basic information below.

## BASIC INFORMATION
**Name:** 段傲然 (Oran Duan)
**Email:** oranduan@cuc.edu.cn
**University:** Communication University of China (中国传媒大学)
**School:** School of Information and Communication Engineering

## EDUCATION
**Bachelor:** Digital Media Technology (数字媒体技术), 2019-2023
**Master:** Signal and Information Processing (信号与信息处理), 2023-2026
**Bachelor Thesis:** Augmented Reality System Based on ORB-SLAM Algorithm and Unity
**Master Thesis:** Multimodal Autoregressive Dance Motion Generation Model

## RESEARCH INTERESTS
Deep Learning, Computer Vision, Generative Models, Image Generation, Digital Human, 3D Dance Motion Generation, AIGC

## PUBLICATIONS
1. **"An AI-Driven Multi-Agent System for Automated Character Content Generation"**
   - This paper presents a comprehensive theoretical framework for an AI-driven multi-agent system designed to automate the generation of character-based interactive content. The proposed system leverages multiple specialized agents collaborating through a well-defined communication protocol to generate narrative content ranging from daily schedules to interactive video scenarios. We formalize the character representation model, event classification taxonomy, and propose a novel attribute dynamics system for tracking character states. The system architecture supports modular extensibility and demonstrates how contemporary large language models can be orchestrated to create sophisticated interactive narratives.
   - GitHub: https://github.com/OranDuanStudy/InteractiveFilm-CharacterDailyAgent
   - Preprints.org (Coming Soon)

2. **"Listen to Rhythm, Choose Movements: Autoregressive Multimodal Dance Generation via Diffusion and Mamba with Decoupled Dance Dataset"**
   - arXiv preprint, 2026
   - Authors: O. Duan, Y. Shen, Y. Lv, L. Jie, Y. Liu, Q. Wu
   - arXiv: 2601.03323

3. **"数字人口型驱动方法、装置及电子设备" (Digital Human Lip-Sync Driving Method, Device and Electronic Equipment)**
   - China Invention Patent, Publication No. CN121334459A, 2026
   - Patent No.: CN202511425699.0
   - Application Date: 2025-09-30
   - Publication Date: 2026-01-13
   - Applicant: Chengdu Zhipu Huazhang Technology Co., Ltd. (成都智谱华章科技有限公司)
   - Inventors: L. Jie, O. Duan (揭路阳, 段傲然)
   - Abstract: This patent proposes a digital human lip-sync driving method that extracts audio features and facial coefficient features from video frames, processes them through a contrastive learning feature fusion network with probabilistic fusion, and generates lip-sync video frame sequences using a denoising network. The method employs multi-modal feature fusion including spatial cross-attention, semantic cross-attention, and temporal self-attention mechanisms to improve digital human generation quality for diverse application needs.

4. **"Styled and characteristic Peking opera facial makeup synthesis with co-training and transfer conditional StyleGAN2"**
   - Heritage Science, 12(1):358, 2024
   - Authors: Y. Shen, O. Duan, X. Xin, M. Yan, Z. Li
   - DOI: 10.1186/s40494-024-01463-3

5. **"Design and Implementation of Fitness Dance Scoring System Based on Human Posture Recognition"**
   - IEEE Intl Conf. on Signal and Image Processing (ICSIP), 2023
   - Authors: X. Ruan, Y. Lyu, O. Duan

## WORK EXPERIENCE

**Digital Human Technology Algorithm Intern @ Zhipu AI (智谱华章)**
*Nov 2024 - Sep 2025*
- Managed algorithm department's Linux server computing power, environment, and GitLab code repository
- Assisted team in training digital human lip-sync generation models
- Iterated on audio-driven video digital human lip-sync model training
- Produced model patents and internal algorithm documentation
- Researched and reproduced face swap algorithms for product requirements
- Assisted in launching ToB e-commerce digital human live streaming integrated application
- Cross-departmental work with CogVideo data/algorithm integration and CodeGeeX product iteration

**Sports Data Packaging & Broadcasting Intern @ Migu Video (Paris Olympics Project)**
*Aug 2024 - Sep 2024*
- Participated in 2024 Paris Olympics Migu Video studio data packaging internship
- Liaised with Beijing TV Station
- Packaged broadcast sports data with studio theme styling during live broadcasts
- Aligned commercial ad subtitle packaging and commercial AR animation broadcasting

**BTP Broadcasting Technology Training Program Intern @ OBS (Beijing Winter/Paralympic Olympics)**
*Feb 2022 - Apr 2022*
- Participated in BTP program organized by OBS Olympic Broadcasting Company
- Worked as Venue Liaison Officer
- Beijing Shougang Big Air and Zhangjiakou Paralympic Village
- Venue live broadcast system technical management and optimization
- Assisted rights-holding broadcasters' broadcast process
- Managed mixed zones, provided broadcast information, verified identities

**Technical Support Logger Intern @ China TV Industry Group (CCTV Tokyo Olympics Support)**
*Jul 2021 - Aug 2021*
- Technical support logger internship for 2021 Tokyo Summer Olympics
- Set up and maintained Tokyo Olympics live video system
- Monitored real-time live broadcast progress and workflow of various competitions
- Recorded key competition events for highlight replays and compilation editing

## CAMPUS EXPERIENCE

**Student Work Department Student Assistant & Media Center Deputy Editor**
*Oct 2022 - Jun 2024*
- Student assistant in Student Work Department
- Participated in student affairs, archives, awards, and ideological work
- Deputy Editor: reviewed and managed department public account articles, team building

**Class Monitor & League Secretary** (Class of 2019, Digital Media Technology Class 3)
*Sep 2020 - Jun 2023*
- Managed class affairs, assisted with professional archives
- Operated class public account, planned and organized meetings
- Helped class win "Excellent Class Collective", "Red Banner League Branch" at school and municipal levels
- Received "Beijing May Fourth Red Banner League Branch" honor

**Student Union Liaison Department Member & Commissioner**
*Sep 2019 - Sep 2021*
- External liaison sponsorship negotiations
- Inter-department and inter-school communication
- Managed internal financial reviews
- Won "Excellent Member of Student Organization" (2019-2020)

## HONORS & AWARDS
- National Encouragement Scholarship (2021, 2020)
- Excellent League Member
- Excellent Student Cadre
- Internet+ Innovation and Entrepreneurship Competition - Second Prize (School Level)
- Internet+ Innovation and Entrepreneurship Competition - Third Prize (School Level)
- Beijing Winter Olympics OBS Broadcast Service
- Beijing Winter Paralympics OBS Broadcast Service
- Excellent Member of Student Organization (2019-2020)

## SKILLS
- Programming: Python, C++, JavaScript
- AI/ML: PyTorch, TensorFlow, Deep Learning, Computer Vision
- Tools: Git, Docker, Linux, Unity, ORB-SLAM
- Languages: Chinese (Native), English

## HOBBIES
Street Dance, Badminton, Fitness, Gaming

## GUIDELINES
- Answer questions accurately based on the provided information
- Be friendly, professional, and helpful
- Keep responses concise but informative
- For questions not covered, suggest contacting Oran directly
- You can discuss his research in deep learning, CV, generative models, and digital human technology in detail
- For work inquiries, mention his internship experiences comprehensively
- Speak from the first-person perspective as Oran Duan.
`;

let chatHistory = [{ role: 'system', content: SYSTEM_PROMPT }];

// 静音状态（从localStorage恢复）
let isMuted = localStorage.getItem('chat_muted') === 'true';

// 当前正在播放的音频
let currentAudio = null;

const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatMuteBtn = document.getElementById('chatMuteBtn');

function toggleChatWindow() {
    chatWindow.classList.toggle('active');
    chatToggleBtn.classList.toggle('hidden');
    if (chatWindow.classList.contains('active')) chatInput.focus();
}

function closeChatWindow() {
    chatWindow.classList.remove('active');
    chatToggleBtn.classList.remove('hidden');
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'chat-message-user' : 'chat-message-ai'}`;
    const messageId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    // 只为 AI 消息添加操作按钮
    const actionButtons = !isUser ? `
        <div class="chat-message-actions">
            <button class="chat-action-btn" data-action="copy" data-id="${messageId}" title="复制">
                <i class="fas fa-copy"></i>
            </button>
            <button class="chat-action-btn" data-action="play" data-id="${messageId}" title="播放">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
    ` : '';

    messageDiv.innerHTML = `
        <div class="chat-message-content" id="${messageId}" data-content="${encodeURIComponent(content)}">
            <div class="chat-avatar"><img src="assets/images/avatar.jpg" alt="${isUser ? 'User' : 'AI'}"></div>
            <div class="chat-bubble">${isUser ? content : parseMarkdown(content)}${actionButtons}</div>
        </div>`;

    // 添加按钮事件监听
    if (!isUser) {
        const buttons = messageDiv.querySelectorAll('.chat-action-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                const action = btn.dataset.action;
                const id = btn.dataset.id;
                if (action === 'copy') {
                    copyMessage(id);
                } else if (action === 'play') {
                    playMessageAudio(id);
                }
            });
        });
    }

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

function parseMarkdown(text) {
    // 先处理代码块（避免其他规则干扰）
    text = text.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

    // 行内代码
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 标题 (h1-h6)
    text = text.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>');
    text = text.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>');
    text = text.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
    text = text.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
    text = text.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
    text = text.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

    // 粗体和斜体
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    text = text.replace(/___(.*?)___/g, '<strong><em>$1</em></strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
    text = text.replace(/_(.*?)_/g, '<em>$1</em>');

    // 删除线
    text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // 无序列表
    text = text.replace(/^[\*\-]\s+(.*)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // 有序列表
    text = text.replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>');

    // 链接
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // 图片
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;">');

    // 引用
    text = text.replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>');
    text = text.replace(/(<blockquote>.*<\/blockquote>\n?)+/g, '<blockquote>$&</blockquote>');

    // 分隔线
    text = text.replace(/^---$/gm, '<hr>');
    text = text.replace(/^\*\*\*$/gm, '<hr>');

    // 换行（但在 pre 和 code 标签内不处理）
    text = text.replace(/\n(?!<\/(?:pre|code|ul|ol|blockquote)>)/g, '<br>');

    return text;
}

function addTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message chat-message-ai';
    messageDiv.id = 'typingIndicator';
    messageDiv.innerHTML = `
        <div class="chat-message-content">
            <div class="chat-avatar"><img src="assets/images/avatar.jpg" alt="AI"></div>
            <div class="chat-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
        </div>`;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    document.getElementById('typingIndicator')?.remove();
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 检查 API 是否已配置
function isApiConfigured() {
    return CF_API_URL && !CF_API_URL.includes('YOUR_CLOUDFLARE_WORKER_URL');
}

// ========================================
// API 调用函数 - 使用 Cloudflare Workers API
// ========================================

// 调用聊天 API
async function callChatAPI(messages) {
    const apiUrl = `${API_BASE_URL}/api/chat`;

    console.log('Sending chat request to:', apiUrl);
    console.log('Messages count:', messages.length);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: messages,
                model: 'glm-4-flash'
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.text();
            console.error('API Error:', error);
            throw new Error(`API error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        console.log('Response data received');
        return data.choices[0].message.content;
    } catch (error) {
        clearTimeout(timeoutId);
        console.error('Fetch error:', error);
        if (error.name === 'AbortError') {
            throw new Error('请求超时，请检查网络连接');
        }
        throw error;
    }
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatInput.value = '';
    chatHistory.push({ role: 'user', content: message });

    addTypingIndicator();
    chatSendBtn.disabled = true;

    try {
        if (!isApiConfigured()) {
            throw new Error('API not configured');
        }

        const response = await callChatAPI(chatHistory);
        removeTypingIndicator();
        addMessage(response, false);
        chatHistory.push({ role: 'assistant', content: response });

        // 如果启用了TTS且未静音，生成并播放语音
        if (TTS_CONFIG.enableTTS && !isMuted) {
            try {
                const audioBase64 = await callTTS(response);
                playAudio(audioBase64);
            } catch (ttsError) {
                console.warn('TTS failed, continuing without audio:', ttsError);
            }
        }
    } catch (error) {
        removeTypingIndicator();
        addMessage(`<strong>AI助手暂时不可用</strong><br><br>
            ${isApiConfigured() ? '连接失败，请稍后重试' : '请先配置 Cloudflare Workers API URL'}<br><br>
            联系 Oran: <a href="mailto:oranduan@cuc.edu.cn">oranduan@cuc.edu.cn</a>`, false);
        console.error('Chat Error:', error);
    } finally {
        chatSendBtn.disabled = false;
        chatInput.focus();
    }
}

// 事件监听
chatToggleBtn?.addEventListener('click', toggleChatWindow);
chatCloseBtn?.addEventListener('click', closeChatWindow);
chatSendBtn?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 静音按钮事件监听
chatMuteBtn?.addEventListener('click', toggleMute);

// 初始化静音按钮状态
updateMuteButton();

document.addEventListener('click', (e) => {
    if (chatWindow?.classList.contains('active') &&
        !chatWindow.contains(e.target) &&
        !chatToggleBtn?.contains(e.target)) {
        closeChatWindow();
    }
});

// 切换静音状态
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('chat_muted', isMuted);
    updateMuteButton();

    // 如果正在播放音频，停止它
    if (isMuted && currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
}

// 更新静音按钮显示
function updateMuteButton() {
    if (!chatMuteBtn) return;

    if (isMuted) {
        chatMuteBtn.classList.add('muted');
        chatMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        chatMuteBtn.setAttribute('aria-label', 'Unmute');
    } else {
        chatMuteBtn.classList.remove('muted');
        chatMuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        chatMuteBtn.setAttribute('aria-label', 'Mute');
    }
}

// ========================================
// 消息操作功能
// ========================================

// 复制消息内容
window.copyMessage = function(messageId) {
    const messageEl = document.getElementById(messageId);
    if (!messageEl) return;

    const content = decodeURIComponent(messageEl.dataset.content || '');

    // 使用 Clipboard API 复制
    navigator.clipboard.writeText(content).then(() => {
        // 显示复制成功提示
        showCopyFeedback(messageId);
    }).catch(err => {
        console.error('Copy failed:', err);
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCopyFeedback(messageId);
    });
};

// 显示复制反馈
function showCopyFeedback(messageId) {
    const messageEl = document.getElementById(messageId);
    if (!messageEl) return;

    const btn = messageEl.querySelector('.chat-action-btn:first-child');
    if (!btn) return;

    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.classList.add('copied');

    setTimeout(() => {
        btn.innerHTML = originalIcon;
        btn.classList.remove('copied');
    }, 1500);
}

// 播放指定消息的音频
window.playMessageAudio = async function(messageId) {
    if (isMuted) {
        alert('请先取消静音');
        return;
    }

    const messageEl = document.getElementById(messageId);
    if (!messageEl) return;

    const content = decodeURIComponent(messageEl.dataset.content || '');
    if (!content) return;

    const btn = messageEl.querySelector('.chat-action-btn:last-child');
    if (btn) {
        btn.classList.add('playing');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }

    try {
        const audioBase64 = await callTTS(content);
        playAudio(audioBase64);
    } catch (error) {
        console.error('TTS failed:', error);
    } finally {
        if (btn) {
            btn.classList.remove('playing');
            btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
};

// ========================================
// TTS 语音合成功能
// ========================================

/**
 * 播放音频
 * @param {string} base64Audio - Base64编码的音频数据
 */
function playAudio(base64Audio) {
    // 停止当前正在播放的音频
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    // 将base64转换为二进制
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // 打印前16字节用于调试
    const headerHex = Array.from(bytes.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log('Audio header (hex):', headerHex);
    console.log('Audio length:', bytes.length, 'bytes');

    // 检测音频文件格式
    let audioBytes = bytes;
    let isRawPCM = false;

    if (bytes.length > 4) {
        const b0 = bytes[0], b1 = bytes[1], b2 = bytes[2], b3 = bytes[3];

        // ID3v2 标签 (MP3)
        if (b0 === 0x49 && b1 === 0x44 && b2 === 0x33) {
            console.log('Format: MP3 with ID3v2');
        }
        // MP3 frame sync
        else if (b0 === 0xFF && (b1 & 0xE0) === 0xE0) {
            console.log('Format: Raw MP3');
        }
        // WAV (RIFF)
        else if (b0 === 0x52 && b1 === 0x49 && b2 === 0x46 && b3 === 0x46) {
            console.log('Format: WAV');
        }
        // 可能是原始 PCM 数据 - 需要封装到 WAV
        else {
            console.log('Detected raw PCM data, wrapping in WAV container');
            isRawPCM = true;
            // 封装为 WAV：使用更高的采样率以避免语速过慢
            // 尝试 24000Hz (24kHz)，如果语速还是不对可以调整
            audioBytes = pcmToWav(bytes, 24000, 1, 16);
        }
    }

    // 使用 WAV 格式播放
    const blob = new Blob([audioBytes], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(blob);

    currentAudio = new Audio(audioUrl);
    currentAudio.play().catch(error => {
        console.error('Playback failed:', error);
        URL.revokeObjectURL(audioUrl);
    });

    currentAudio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudio = null;
    };
}

/**
 * 将 PCM 数据封装为 WAV 格式
 * @param {Uint8Array} pcmData - 原始 PCM 数据
 * @param {number} sampleRate - 采样率
 * @param {number} numChannels - 声道数
 * @param {number} bitsPerSample - 每样本位数
 * @returns {Uint8Array} WAV 格式数据
 */
function pcmToWav(pcmData, sampleRate = 16000, numChannels = 1, bitsPerSample = 16) {
    const byteRate = sampleRate * numChannels * bitsPerSample / 8;
    const blockAlign = numChannels * bitsPerSample / 8;
    const dataSize = pcmData.length;
    const fileSize = 36 + dataSize;

    // WAV 文件头 (44 字节)
    const header = new Uint8Array(44);

    // RIFF chunk
    header[0] = 0x52;  // 'R'
    header[1] = 0x49;  // 'I'
    header[2] = 0x46;  // 'F'
    header[3] = 0x46;  // 'F'
    // 文件大小
    header[4] = fileSize & 0xff;
    header[5] = (fileSize >> 8) & 0xff;
    header[6] = (fileSize >> 16) & 0xff;
    header[7] = (fileSize >> 24) & 0xff;
    // WAVE
    header[8] = 0x57;  // 'W'
    header[9] = 0x41;  // 'A'
    header[10] = 0x56; // 'V'
    header[11] = 0x45; // 'E'
    // fmt chunk
    header[12] = 0x66; // 'f'
    header[13] = 0x6d; // 'm'
    header[14] = 0x74; // 't'
    header[15] = 0x20; // ' '
    // fmt chunk size
    header[16] = 16;   // PCM format = 16
    header[17] = 0;
    header[18] = 0;
    header[19] = 0;
    // Audio format (1 = PCM)
    header[20] = 1;
    header[21] = 0;
    // Number of channels
    header[22] = numChannels;
    header[23] = 0;
    // Sample rate
    header[24] = sampleRate & 0xff;
    header[25] = (sampleRate >> 8) & 0xff;
    header[26] = (sampleRate >> 16) & 0xff;
    header[27] = (sampleRate >> 24) & 0xff;
    // Byte rate
    header[28] = byteRate & 0xff;
    header[29] = (byteRate >> 8) & 0xff;
    header[30] = (byteRate >> 16) & 0xff;
    header[31] = (byteRate >> 24) & 0xff;
    // Block align
    header[32] = blockAlign & 0xff;
    header[33] = (blockAlign >> 8) & 0xff;
    // Bits per sample
    header[34] = bitsPerSample;
    header[35] = 0;
    // data chunk
    header[36] = 0x64; // 'd'
    header[37] = 0x61; // 'a'
    header[38] = 0x74; // 't'
    header[39] = 0x61; // 'a'
    // Data size
    header[40] = dataSize & 0xff;
    header[41] = (dataSize >> 8) & 0xff;
    header[42] = (dataSize >> 16) & 0xff;
    header[43] = (dataSize >> 24) & 0xff;

    // 合并头部和 PCM 数据
    const wavData = new Uint8Array(44 + pcmData.length);
    wavData.set(header, 0);
    wavData.set(pcmData, 44);

    console.log('Converted to WAV:', sampleRate + 'Hz', bitsPerSample + 'bit', numChannels + 'ch');
    return wavData;
}

/**
 * 调用TTS API生成语音
 * @param {string} text - 要转换为语音的文本
 * @returns {Promise<string>} Base64编码的音频数据
 */
async function callTTS(text) {
    const apiUrl = `${API_BASE_URL}/api/tts`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: text,
                voice: TTS_CONFIG.voiceId || 'female'
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const error = await response.text();
            console.error('TTS API error response:', error);
            throw new Error(`TTS API error: ${response.status} - ${error}`);
        }

        const data = await response.json();
        console.log('TTS response received, audio length:', data.audio?.length || 0);
        return data.audio;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

/**
 * 初始化音色克隆
 * 注意：这只在首次访问或音色ID不存在时执行
 * 实际使用中，建议将克隆的voiceId保存到localStorage或服务器
 */
async function initVoiceClone() {
    // 检查是否已经有缓存的voiceId
    const cachedVoiceId = localStorage.getItem('oran_voice_id');
    if (cachedVoiceId) {
        TTS_CONFIG.voiceId = cachedVoiceId;
        console.log('Using cached voice ID:', cachedVoiceId);
        return;
    }

    // 如果没有配置音色样本，使用默认音色
    if (!TTS_CONFIG.voiceSamplePath) {
        console.log('No voice sample configured, using default voice');
        return;
    }

    try {
        // 读取音色样本文件
        const response = await fetch(TTS_CONFIG.voiceSamplePath);
        if (!response.ok) {
            console.warn('Voice sample file not found, using default voice');
            return;
        }

        const arrayBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64Audio = btoa(binary);

        // 步骤1: 上传音频文件
        console.log('Uploading voice sample...');
        const uploadResponse = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                file_data: base64Audio,
                file_name: 'voice_sample.wav'
            })
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload voice sample');
        }

        const uploadData = await uploadResponse.json();
        console.log('Upload response data:', uploadData);
        // API might return 'id' or 'file_id' field
        const fileId = uploadData.id || uploadData.file_id;
        if (!fileId) {
            throw new Error('No file ID in response: ' + JSON.stringify(uploadData));
        }
        console.log('File uploaded:', fileId);

        // 步骤2: 克隆音色
        console.log('Cloning voice...');
        const cloneResponse = await fetch(`${API_BASE_URL}/api/voice-clone`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                file_id: fileId,
                voice_name: 'oran_voice_' + Date.now(),
                text: TTS_CONFIG.referenceText  // 音频样本中说话的内容
            })
        });

        if (!cloneResponse.ok) {
            throw new Error('Failed to clone voice');
        }

        const cloneData = await cloneResponse.json();
        TTS_CONFIG.voiceId = cloneData.voice;

        // 缓存voiceId
        localStorage.setItem('oran_voice_id', cloneData.voice);
        console.log('Voice cloned successfully:', cloneData.voice);

    } catch (error) {
        console.warn('Voice clone failed, using default voice:', error);
        TTS_CONFIG.voiceId = null;
    }
}

// 在页面加载时初始化音色克隆
if (TTS_CONFIG.enableTTS) {
    initVoiceClone();
}

console.log('AI Chat Assistant initialized (GitHub Pages + Cloudflare Workers API mode)');
console.log('Cloudflare Workers API URL configured:', isApiConfigured() ? 'Yes' : 'No - Please set CF_API_URL');
console.log('API Base URL:', API_BASE_URL);
console.log('TTS enabled:', TTS_CONFIG.enableTTS);

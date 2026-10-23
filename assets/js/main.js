// ========================================
// 主JavaScript文件 - Main JavaScript
// ========================================

// 翻译字典 / Translation Dictionary
// HTML 中默认写中文；带 data-i18n 的元素在切换语言时替换 textContent
const translations = {
    zh: {
        'doc.title': '段傲然 Oran Duan | 个人主页',

        // 导航栏
        'nav.about': '关于',
        'nav.publications': '论文',
        'nav.certificates': '荣誉',
        'nav.gallery': '生活',
        'nav.contact': '联系',

        // 教育
        'edu.school': '信息与通信工程学院',
        'edu.master': '硕士 · 信号与信息处理',
        'edu.bachelor': '本科 · 数字媒体技术',

        // Hero
        'hero.position': '深度学习算法工程师',
        'hero.company': '其域创新 XGRIDS',
        'hero.subtitle': '中国传媒大学 · 信号与信息处理硕士（2026 届）',
        'hero.research': '研究方向',
        'hero.master': '硕士课题',
        'hero.masterDesc': '多模态自回归舞蹈动作生成',
        'hero.masterTags': '3D 动作生成 · 扩散模型 · Mamba · 多模态',
        'hero.bachelor': '本科毕设',
        'hero.bachelorDesc': '基于 ORB-SLAM 与 Unity 的增强现实系统',
        'hero.interests': '兴趣爱好',
        'hero.interestsDesc': '街舞 · 羽毛球 · 健身 · 游戏 —— 欢迎交流！',

        // 研究方向徽章
        'badge.dl': '深度学习',
        'badge.cv': '计算机视觉',
        'badge.gen': '生成式模型',
        'badge.dh': '数字人',
        'badge.motion': '3D 动作生成',
        'badge.agent': 'AI Agent',

        // 经历
        'exp.title': '经历',
        'exp.titleSub': 'Experience',
        'exp.work': '工作',
        'exp.intern': '实习',
        'tag.fulltime': '全职',
        'tag.intern': '实习',
        'time.present': '至今',
        'exp.xgrids.company': '其域创新 XGRIDS',
        'exp.xgrids.role': '深度学习算法工程师',
        'exp.zhipu.company': '智谱 Zhipu AI',
        'exp.zhipu.role1': 'Agent 产品工程实习生',
        'exp.zhipu.role2': '数字人算法实习生',
        'exp.migu.company': '咪咕视频 MIGU Video',
        'exp.migu.role': '演播室赛事数据包装实习生',
        'exp.migu.note': '2024 巴黎奥运会',
        'exp.obs.company': '奥林匹克转播服务公司 OBS',
        'exp.obs.role': 'BTP 转播培训实习生 · 场馆联络官',
        'exp.obs.note': '2022 北京冬奥会 / 冬残奥会',
        'exp.ctvig.company': '中视实业集团（央视）',
        'exp.ctvig.role': '技术支持场记实习生',
        'exp.ctvig.note': '2020 东京奥运会',

        // 学术成果
        'pub.title': '学术成果',
        'pub.sub': 'Publications & Patents',
        'pub.projectPage': '项目主页',
        'pub.openSource': '开源项目',
        'pub.comingSoon': '（即将发布）',
        'pub.patentTitle': '数字人口型驱动方法、装置及电子设备',
        'pub.patentTitleAlt': 'Digital Human Lip-Sync Driving Method, Device and Electronic Equipment',
        'pub.patentType': '中国发明专利',
        'pub.appNo': '申请号',
        'pub.paper': '论文',

        // 荣誉
        'honor.title': '荣誉奖项',
        'honor.sub': 'Honors & Awards',
        'honor.h1': '研究生国家奖学金',
        'honor.h2': '北京市优秀毕业生',
        'honor.h3': '本科毕业生优秀学生干部',
        'honor.h4': '大学生创新创业训练项目 · 良好结项',
        'honor.h5': '国家励志奖学金（三学年）',
        'honor.h6': '第八届"互联网+"大学生创新创业大赛 北京赛区三等奖',
        'honor.h7': '北京冬奥会 OBS 奥运转播服务',
        'honor.h8': '北京冬残奥会 OBS 奥运转播服务',
        'honor.h9': '第十八届首都高校"风采之星"才艺大赛 亚军',
        'honor.h10': '第十二届蓝桥杯 C/C++ 组 北京赛区三等奖',
        'honor.h11': '中国传媒大学优秀团员',
        'honor.h12': '中国传媒大学优秀学生干部',

        // 照片
        'gallery.title': '生活照片',
        'gallery.sub': 'Photo Gallery',

        // 联系
        'contact.title': '联系我',
        'contact.sub': 'Get in Touch',
        'contact.desc': '欢迎就科研合作、学术交流或工作机会与我联系，邮件是最快的方式。',

        // 页脚
        'footer.visits': '访问量',
        'footer.built': '以简约与热爱构建'
    },
    en: {
        'doc.title': 'Oran Duan 段傲然 | Homepage',

        // Navigation
        'nav.about': 'About',
        'nav.publications': 'Publications',
        'nav.certificates': 'Honors',
        'nav.gallery': 'Life',
        'nav.contact': 'Contact',

        // Education
        'edu.school': 'School of Information and Communication Engineering',
        'edu.master': 'M.Eng. · Signal & Information Processing',
        'edu.bachelor': 'B.Eng. · Digital Media Technology',

        // Hero
        'hero.position': 'Deep Learning Algorithm Engineer',
        'hero.company': 'XGRIDS',
        'hero.subtitle': 'M.Eng., Communication University of China · Class of 2026',
        'hero.research': 'Research Interests',
        'hero.master': 'Master\'s Research',
        'hero.masterDesc': 'Multimodal Autoregressive Dance Motion Generation',
        'hero.masterTags': '3D Motion Generation · Diffusion Models · Mamba · Multimodal',
        'hero.bachelor': 'Bachelor\'s Thesis',
        'hero.bachelorDesc': 'An Augmented Reality System Based on ORB-SLAM and Unity',
        'hero.interests': 'Hobbies',
        'hero.interestsDesc': 'Street Dance · Badminton · Fitness · Gaming — always happy to connect!',

        // Badges
        'badge.dl': 'Deep Learning',
        'badge.cv': 'Computer Vision',
        'badge.gen': 'Generative Models',
        'badge.dh': 'Digital Humans',
        'badge.motion': '3D Motion Generation',
        'badge.agent': 'AI Agents',

        // Experience
        'exp.title': 'Experience',
        'exp.titleSub': '经历',
        'exp.work': 'Work',
        'exp.intern': 'Internships',
        'tag.fulltime': 'Full-time',
        'tag.intern': 'Intern',
        'time.present': 'Present',
        'exp.xgrids.company': 'XGRIDS',
        'exp.xgrids.role': 'Deep Learning Algorithm Engineer',
        'exp.zhipu.company': 'Zhipu AI (Z.ai)',
        'exp.zhipu.role1': 'Agent Product Engineering Intern',
        'exp.zhipu.role2': 'Digital Human Algorithm Intern',
        'exp.migu.company': 'MIGU Video',
        'exp.migu.role': 'Studio Sports Data Graphics Intern',
        'exp.migu.note': 'Paris 2024 Olympics',
        'exp.obs.company': 'Olympic Broadcasting Services (OBS)',
        'exp.obs.role': 'Broadcast Training Programme Intern · Venue Liaison Officer',
        'exp.obs.note': 'Beijing 2022 Olympics & Paralympics',
        'exp.ctvig.company': 'China TV Industrial Group (CCTV)',
        'exp.ctvig.role': 'Technical Support Logger Intern',
        'exp.ctvig.note': 'Tokyo 2020 Olympics',

        // Publications
        'pub.title': 'Publications',
        'pub.sub': '学术成果 · 论文与专利',
        'pub.projectPage': 'Project Page',
        'pub.openSource': 'Open-source Project',
        'pub.comingSoon': '(coming soon)',
        'pub.patentTitle': 'Digital Human Lip-Sync Driving Method, Device and Electronic Equipment',
        'pub.patentTitleAlt': '数字人口型驱动方法、装置及电子设备',
        'pub.patentType': 'China Invention Patent',
        'pub.appNo': 'Application No.',
        'pub.paper': 'Paper',

        // Honors
        'honor.title': 'Honors & Awards',
        'honor.sub': '荣誉奖项',
        'honor.h1': 'National Scholarship for Graduate Students',
        'honor.h2': 'Outstanding Graduate of Beijing',
        'honor.h3': 'Outstanding Student Leader (Undergraduate Graduates)',
        'honor.h4': 'Undergraduate Innovation & Entrepreneurship Program — Completed with "Good" Rating',
        'honor.h5': 'National Encouragement Scholarship (three academic years)',
        'honor.h6': 'Third Prize (Beijing), 8th China "Internet+" Innovation & Entrepreneurship Competition',
        'honor.h7': 'OBS Broadcast Service, Beijing 2022 Winter Olympics',
        'honor.h8': 'OBS Broadcast Service, Beijing 2022 Winter Paralympics',
        'honor.h9': 'Runner-up, 18th Capital Universities "Star of Talent" Competition',
        'honor.h10': 'Third Prize (Beijing), 12th Lanqiao Cup, C/C++ Track',
        'honor.h11': 'Outstanding Youth League Member, CUC',
        'honor.h12': 'Outstanding Student Leader, CUC',

        // Gallery
        'gallery.title': 'Life',
        'gallery.sub': '生活照片',

        // Contact
        'contact.title': 'Get in Touch',
        'contact.sub': '联系我',
        'contact.desc': 'I\'m open to research collaboration, academic exchange and career opportunities — email is the fastest way to reach me.',

        // Footer
        'footer.visits': 'Visits',
        'footer.built': 'Built with simplicity and passion'
    }
};

// 当前语言：优先本地存储，其次浏览器语言 / Current language
function detectLanguage() {
    // 支持 ?lang=en / ?lang=zh 直接分享指定语言的链接
    const param = new URLSearchParams(window.location.search).get('lang');
    if (param === 'zh' || param === 'en') return param;
    const saved = localStorage.getItem('lang');
    if (saved === 'zh' || saved === 'en') return saved;
    const nav = (navigator.language || 'zh').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
}

let currentLang = detectLanguage();

// 设置语言 / Set language
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updatePageLanguage();
    updateLangToggleButton();
}

// 更新页面语言 / Update page language
function updatePageLanguage() {
    const dict = translations[currentLang] || translations.zh;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.textContent = dict[key];
        }
    });
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.lang = currentLang;
    if (dict['doc.title']) document.title = dict['doc.title'];
}

// 更新语言切换按钮 / Update language toggle button
function updateLangToggleButton() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    const langCurrent = langToggle.querySelector('.lang-current');
    const langOther = langToggle.querySelector('.lang-other');
    if (currentLang === 'zh') {
        langCurrent.textContent = '中';
        langOther.textContent = 'EN';
    } else {
        langCurrent.textContent = 'EN';
        langOther.textContent = '中';
    }
}

// 初始化语言切换 / Init language toggle
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'zh' ? 'en' : 'zh');
        });
    }
    setLanguage(currentLang);
}

// 移动端菜单 / Mobile menu
function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
    });

    // 点击链接后自动收起菜单
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// 导航栏滚动效果 / Navigation scroll effect
function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function init() {
    initLanguageToggle();
    initMenu();
    initNavScroll();
}

// 确保 DOM 加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

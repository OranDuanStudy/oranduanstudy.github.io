// ========================================
// 主JavaScript文件 - Main JavaScript
// ========================================

// 翻译字典 / Translation Dictionary
const translations = {
    zh: {
        // 导航栏 / Navigation
        'nav.about': '关于',
        'nav.publications': '论文',
        'nav.certificates': '荣誉',
        'nav.experience': '经历',
        'nav.resume': '简历',
        'nav.gallery': '照片',
        'nav.contact': '联系',

        // Hero 区域
        'hero.title': '中国传媒大学 · 信号与信息处理硕士研究生',
        'hero.bachelor': '本科毕设',
        'hero.bachelorDesc': '基于ORB-SLAM算法与Unity实现增强现实系统',
        'hero.master': '硕士毕设',
        'hero.masterDesc': '多模态自回归舞蹈动作生成模型',
        'hero.masterTags': '3D动作生成 · 扩散模型 · 多模态',
        'hero.research': '研究方向',
        'hero.researchDesc': '深度学习 · 计算机视觉 · 生成式模型 · 图像生成 · 数字人 · 3D舞蹈动作生成',
        'hero.interests': '兴趣爱好',
        'hero.interestsDesc': '街舞 · 羽毛球 · 健身 · 游戏 · 欢迎交流！',
        'hero.university': '中国传媒大学',
        'hero.school': '信息与通信工程学院',
        'hero.bachelorEdu': '本科 · 数字媒体技术 (2019-2023)',
        'hero.masterEdu': '硕士 · 信号与信息处理 (2023-2026)',

        // 徽章 / Badges
        'badge.deeplearning': '深度学习',
        'badge.cv': '计算机视觉',
        'badge.genmodel': '生成式模型',
        'badge.digitalhuman': '数字人',
        'badge.dance': '3D动作生成',

        // 统计 / Stats
        'stat.papers': '论文',
        'stat.honors': '荣誉',
        'stat.reviewer': '审稿',

        // 学术成果 / Academic Achievements
        'pub.title': '学术成果',
        'pub.underReview': '投稿中 / Under Review',
        'pub.underReviewTitle': '多模态自回归舞蹈动作生成模型',
        'pub.underReviewVenue': '投稿期刊/会议',

        // 荣誉 / Honors
        'honor.title': '荣誉奖项',
        'honor.item1': '国家励志奖学金',
        'honor.item2': '国家励志奖学金',
        'honor.item3': '优秀团员',
        'honor.item4': '优秀学生干部',
        'honor.item5': '互联网+大学生创新创业大赛 校级二等奖',
        'honor.item6': '互联网+大学生创新创业大赛 校级三等奖',
        'honor.item7': '北京冬奥会OBS奥运转播服务',
        'honor.item8': '北京冬残奥会OBS奥运转播服务',

        // 工作经历 / Experience
        'exp.title': '工作经历',
        'exp.job1Title': '数字人技术算法实习生',
        'exp.job1Company': '北京智谱华章科技股份有限公司',
        'exp.job1Desc1': '管理算法部门 Linux 服务器算力与环境、GitLab 代码仓库',
        'exp.job1Desc2': '协助团队训练数字人口型生成模型，迭代音频驱动视频类数字人口型生成模型训练',
        'exp.job1Desc3': '产出模型专利与内部算法文档；协助产品端针对换脸应用需求，调研并复现相关算法',
        'exp.job1Desc4': '协助上线 ToB 端电商数字人直播集成应用；与 CogVideo 进行数据与算法对接、CodeGeeX 产品迭代等跨部门工作',
        'exp.job2Title': '赛事数据封装演播实习生',
        'exp.job2Company': '咪咕视频 · 巴黎奥运会项目',
        'exp.job2Desc1': '参与 2024 年巴黎奥运会咪咕视频演播室数据封装实习工作',
        'exp.job2Desc2': '对接北京电视台，在直播过程中对转播的赛事数据进行演播主题的风格包装',
        'exp.job2Desc3': '对齐商业化广告字幕封装、商业化 AR 动画转播等工作',
        'exp.job3Title': 'BTP 转播技术培训项目实习生',
        'exp.job3Company': '北京冬奥会、冬残奥会 · OBS 转播公司',
        'exp.job3Desc1': '参与由 OBS 奥运转播公司组织的 BTP 项目，以场馆联络官（Liaison Officer）身份参与工作',
        'exp.job3Desc2': '先后在北京首钢滑雪大跳台、张家口冬残奥村参与工作',
        'exp.job3Desc3': '负责场馆内直播系统的技术管理和优化、持权转播商转播进程协助、管理混采区、转播信息提供、核验身份等工作',
        'exp.job4Title': '技术支持场记实习生',
        'exp.job4Company': '中视实业集团 · 东京奥运会央视技术支持',
        'exp.job4Desc1': '参与 2021 年东京夏季奥运会央视公司中视实业集团组织的技术支持场记实习工作',
        'exp.job4Desc2': '负责搭建和维护东京奥运会的直播视频系统，监督各个比赛项目的实时直播进度和流程',
        'exp.job4Desc3': '对关键比赛事件进行有效记录，为后期工作人员的精彩回放和集锦的剪辑等工作做好准备',

        // 简历 / Resume
        'resume.title': '简历下载',
        'resume.desc': '欢迎下载我的简历，了解更多关于我的教育背景、项目经历和技能。',
        'resume.zh': '中文简历',
        'resume.en': 'English Resume',

        // 照片画廊 / Gallery
        'gallery.title': '生活照片',

        // 联系方式 / Contact
        'contact.title': '联系我',
        'contact.desc': '欢迎与我讨论研究合作、学术交流，或潜在的就业机会。如有任何问题，请随时通过邮件联系我。'
    },
    en: {
        // Navigation
        'nav.about': 'About',
        'nav.publications': 'Publications',
        'nav.certificates': 'Honors',
        'nav.experience': 'Experience',
        'nav.resume': 'Resume',
        'nav.gallery': 'Gallery',
        'nav.contact': 'Contact',

        // Hero Section
        'hero.title': 'Communication University of China · M.S. in Signal and Information Processing',
        'hero.bachelor': 'Bachelor Thesis',
        'hero.bachelorDesc': 'Augmented Reality System Based on ORB-SLAM Algorithm and Unity',
        'hero.master': 'Master Thesis',
        'hero.masterDesc': 'Multimodal Autoregressive Dance Motion Generation Model',
        'hero.masterTags': '3D Motion Generation · Diffusion Models · Multimodal',
        'hero.research': 'Research Interests',
        'hero.researchDesc': 'Deep Learning · Computer Vision · Generative Models · Image Generation · Digital Human · 3D Dance Motion Generation',
        'hero.interests': 'Hobbies',
        'hero.interestsDesc': 'Street Dance · Badminton · Fitness · Gaming · Feel free to connect!',
        'hero.university': 'Communication University of China',
        'hero.school': 'School of Information and Communication Engineering',
        'hero.bachelorEdu': 'B.S. · Digital Media Technology (2019-2023)',
        'hero.masterEdu': 'M.S. · Signal and Information Processing (2023-2026)',

        // Badges
        'badge.deeplearning': 'Deep Learning',
        'badge.cv': 'Computer Vision',
        'badge.genmodel': 'Generative Models',
        'badge.digitalhuman': 'Digital Human',
        'badge.dance': '3D Motion Generation',

        // Stats
        'stat.papers': 'Papers',
        'stat.honors': 'Honors',
        'stat.reviewer': 'Reviewer',

        // Academic Achievements
        'pub.title': 'Academic Achievements',
        'pub.underReview': 'Under Review',
        'pub.underReviewTitle': 'Multimodal Autoregressive Dance Motion Generation Model',
        'pub.underReviewVenue': 'Submitted to Journal/Conference',

        // Honors
        'honor.title': 'Honors & Awards',
        'honor.item1': 'National Encouragement Scholarship (2021)',
        'honor.item2': 'National Encouragement Scholarship (2020)',
        'honor.item3': 'Excellent League Member',
        'honor.item4': 'Excellent Student Cadre',
        'honor.item5': 'Internet+ Innovation and Entrepreneurship Competition - Second Prize (School Level)',
        'honor.item6': 'Internet+ Innovation and Entrepreneurship Competition - Third Prize (School Level)',
        'honor.item7': 'Beijing Winter Olympics OBS Broadcast Service',
        'honor.item8': 'Beijing Winter Paralympics OBS Broadcast Service',

        // Experience
        'exp.title': 'Work Experience',
        'exp.job1Title': 'Digital Human Technology Algorithm Intern',
        'exp.job1Company': 'Beijing Zhipu Huazhang Technology Co., Ltd.',
        'exp.job1Desc1': 'Managing algorithm department Linux server computing power and environment, GitLab code repository',
        'exp.job1Desc2': 'Assisting team in training digital human lip-sync generation models, iterating audio-driven video digital human lip-sync model training',
        'exp.job1Desc3': 'Producing model patents and internal algorithm documents; assisting product team in researching and reproducing face swap algorithms',
        'exp.job1Desc4': 'Assisting in launching ToB e-commerce digital human live streaming integrated application; cross-departmental work with CogVideo data and algorithm integration, CodeGeeX product iteration',
        'exp.job2Title': 'Sports Data Packaging and Broadcasting Intern',
        'exp.job2Company': 'Migu Video · Paris Olympics Project',
        'exp.job2Desc1': 'Participated in 2024 Paris Olympics Migu Video studio data packaging internship',
        'exp.job2Desc2': 'Collaborated with Beijing TV Station, packaging broadcast sports data with studio theme styling during live broadcasts',
        'exp.job2Desc3': 'Aligning commercial ad subtitle packaging, commercial AR animation broadcasting',
        'exp.job3Title': 'BTP Broadcasting Technology Training Program Intern',
        'exp.job3Company': 'Beijing Winter Olympics, Paralympics · OBS Broadcasting Company',
        'exp.job3Desc1': 'Participated in BTP program organized by OBS, worked as Venue Liaison Officer',
        'exp.job3Desc2': 'Worked at Beijing Shougang Big Air and Zhangjiakou Paralympic Village',
        'exp.job3Desc3': 'Responsible for venue live broadcast system technical management and optimization, assisting rights-holding broadcasters, managing mixed zones, providing broadcast information, verifying identities',
        'exp.job4Title': 'Technical Support Logger Intern',
        'exp.job4Company': 'China TV Industry Group · Tokyo Olympics CCTV Technical Support',
        'exp.job4Desc1': 'Participated in technical support logger internship organized by CCTV subsidiary China TV Industry Group for 2021 Tokyo Summer Olympics',
        'exp.job4Desc2': 'Responsible for setting up and maintaining Tokyo Olympics live video system, supervising real-time live broadcast progress and process of various competitions',
        'exp.job4Desc3': 'Effectively recorded key competition events, preparing for post-production staff\'s highlight replays and compilation editing',

        // Resume
        'resume.title': 'Resume',
        'resume.desc': 'Welcome to download my resume to learn more about my education background, project experience and skills.',
        'resume.zh': '中文简历',
        'resume.en': 'English Resume',

        // Gallery
        'gallery.title': 'Photo Gallery',

        // Contact
        'contact.title': 'Get in Touch',
        'contact.desc': 'Welcome to discuss research collaboration, academic exchange, or potential employment opportunities. If you have any questions, please feel free to contact me via email.'
    }
};

// 当前语言 / Current language
let currentLang = localStorage.getItem('lang') || 'zh';

// 初始化语言 / Initialize language
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updatePageLanguage();
    updateLangToggleButton();
}

// 更新页面语言 / Update page language
function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// 更新语言切换按钮 / Update language toggle button
function updateLangToggleButton() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
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
}

// 语言切换按钮点击事件 / Language toggle button click event
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setLanguage(currentLang === 'zh' ? 'en' : 'zh');
        });
    }
    // 初始化页面语言 / Initialize page language
    setLanguage(currentLang);
}

// 确保 DOM 加载后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageToggle);
} else {
    // DOM 已经加载完成
    initLanguageToggle();
}

// 平滑滚动 / Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 移动端菜单切换 / Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 导航栏滚动效果 / Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav && window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.98)';
    } else if (nav) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    }
});

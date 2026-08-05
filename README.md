# Oran Duan 的个人主页

> 深度学习研究者 | 计算机视觉学者 | 中国传媒大学研究生

这是我的个人学术主页，采用模块化设计，方便后期维护和更新。

## 在线访问

- **GitHub Pages**: https://oranduanstudy.github.io/
- **GitHub**: https://github.com/OranDuanStudy

## 项目结构

```
.
├── index.html              # 主页面（入口文件）
├── README.md               # 项目说明文档
│
├── assets/                 # 静态资源目录
│   ├── css/                # 样式文件（模块化）
│   │   ├── common.css      # 通用样式和CSS变量
│   │   ├── navbar.css      # 导航栏样式
│   │   ├── hero.css        # 个人简介区域样式
│   │   ├── publications.css # 学术成果样式
│   │   ├── certificates.css # 证书展示样式
│   │   ├── resume.css      # 简历下载样式
│   │   └── contact.css     # 联系方式样式
│   │
│   ├── js/                 # JavaScript 文件
│   │   └── main.js         # 交互功能（平滑滚动、模态框等）
│   │
│   ├── images/             # 图片资源
│   │   ├── 20251223-142008.jpg
│   │   ├── 微信图片_*.jpg
│   │   └── ...（证书、照片等）
│   │
│   ├── English.pdf         # 英文简历
│   └── 简历star.pdf        # 中文简历
│
├── components/             # HTML 组件（模块化，便于维护）
│   ├── navbar.html         # 导航栏组件
│   ├── hero.html           # 个人简介组件
│   ├── publications.html   # 学术成果组件
│   ├── certificates.html   # 证书展示组件
│   ├── resume.html         # 简历下载组件
│   ├── contact.html        # 联系方式组件
│   └── footer.html         # 页脚组件
│
└── my_infomation/          # 原始资料（不发布）
    ├── account.txt         # 账号信息
    ├── paper.txt           # 论文列表
    ├── photos/             # 原始照片
    ├── resume/             # 原始简历
    ├── reviewer/           # 审稿证书
    └── some_certificate/   # 荣誉证书
```

## 快速开始

### 本地预览

1. 克隆仓库
```bash
git clone https://github.com/OranDuanStudy/oranduanstudy.github.io.git
cd oranduanstudy.github.io
```

2. 用浏览器打开 `index.html`

或使用本地服务器（推荐）：
```bash
# Python
python -m http.server 8000

# Node.js (需要安装 http-server)
npx http-server
```

3. 访问 `http://localhost:8000`

## 内容维护指南

### 修改个人信息

| 内容 | 位置 |
|------|------|
| 姓名、简介 | `index.html` 第54-59行 或 `components/hero.html` |
| 统计数据 | `index.html` 第93-103行 |
| 社交链接 | `index.html` 第68-79行 |

### 添加/修改学术成果

编辑 `index.html` 第116-156行 或 `components/publications.html`：

```html
<div class="pub-item">
    <div class="pub-title">论文标题</div>
    <div class="pub-authors">
        <span class="me">Oran Duan</span>, 合作者1, 合作者2
    </div>
    <div class="pub-venue">
        <i class="fas fa-book"></i> 期刊/会议名称
    </div>
    <div class="pub-links">
        <a href="PDF链接"><i class="far fa-file-pdf"></i> PDF</a>
        <a href="代码链接"><i class="fas fa-code"></i> Code</a>
    </div>
</div>
```

### 添加证书图片

1. 将图片复制到 `assets/images/` 目录
2. 在 `index.html` 第163-230行添加证书卡片：

```html
<div class="cert-card" onclick="openModal('assets/images/图片文件名.jpg')">
    <div class="cert-image">
        <img src="assets/images/图片文件名.jpg" alt="证书名称">
    </div>
    <div class="cert-content">
        <h4>证书名称</h4>
        <p>年份/描述</p>
    </div>
</div>
```

### 更新简历

将新的 PDF 文件复制到 `assets/` 目录，并修改 `index.html` 第259、264行的文件名。

### 修改样式颜色

编辑 `assets/css/common.css` 的 CSS 变量：

```css
:root {
    --primary-color: #0ea5e9;      /* 主题色 */
    --secondary-color: #0369a1;    /* 辅助色 */
    --accent-color: #8b5cf6;       /* 强调色 */
    /* ... */
}
```

## 部署到 GitHub Pages

### 自动部署

推送代码到 `main` 分支后，GitHub Pages 会自动部署。

```bash
git add .
git commit -m "更新内容"
git push origin main
```

等待 1-3 分钟后访问：https://oranduanstudy.github.io/

### 检查部署状态

访问：https://github.com/OranDuanStudy/oranduanstudy.github.io/deployments

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计
- **原生 JavaScript** - 交互功能
- **Font Awesome** - 图标库
- **Academicons** - 学术图标

## 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 移动端浏览器

## 联系方式

- **Email**: oranduan@cuc.edu.cn
- **GitHub**: https://github.com/OranDuanStudy
- **ResearchGate**: https://www.researchgate.net/profile/Oran-Duan
- **Instagram**: https://www.instagram.com/oran_duan

## 许可证

&copy; 2024 Oran Duan. All rights reserved.

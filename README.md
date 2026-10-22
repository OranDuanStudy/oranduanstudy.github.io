# Oran Duan 的个人主页

> 深度学习算法工程师 @ 其域创新 XGRIDS | 中国传媒大学 信号与信息处理 硕士

暗黑哥特风的个人学术主页，纯静态 HTML/CSS/JS，支持中英文切换。

## 在线访问

- **GitHub Pages**: https://oranduanstudy.github.io/
- **GitHub**: https://github.com/OranDuanStudy

## 项目结构

```
.
├── index.html                # 唯一页面（全部内容都在这里）
├── assets/
│   ├── css/
│   │   ├── common.css        # CSS 变量、字体、区块标题装饰、页脚
│   │   ├── navbar.css        # 导航栏 + 语言切换按钮
│   │   ├── hero.css          # 首屏三栏：人物/教育 | 介绍 | 经历
│   │   ├── publications.css  # 学术成果
│   │   ├── certificates.css  # 荣誉奖项
│   │   ├── gallery.css       # 生活照片
│   │   └── contact.css       # 联系方式
│   ├── js/
│   │   └── main.js           # 中英文翻译字典、语言切换、移动端菜单
│   └── images/
│       ├── DAR1.jpg          # 头像原图
│       ├── DAR1-avatar.jpg   # 头像（裁剪压缩后，页面实际使用）
│       ├── favicon.png       # 网站图标
│       ├── logos/            # 学校 / 公司 logo
│       └── ...               # 论文缩略图、生活照片
└── src/, worker-single-file.js, wrangler.toml   # 聊天机器人后端（前端已不再引用）
```

## 本地预览

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000 ，加 ?lang=en 可直接查看英文版
```

## 内容维护

### 中英文

`index.html` 中直接写中文；需要翻译的元素加 `data-i18n="key"`，并在
`assets/js/main.js` 的 `translations.zh` / `translations.en` 中同时添加该 key。

### 经历

在 `index.html` 的 `<aside class="hero-experience">` 中按现有 `exp-card` 结构增删：

- logo 放入 `assets/images/logos/`
- 当前职位加 `is-current` 类；全职用 `exp-tag tag-fulltime`，实习用 `exp-tag`
- 同一公司多段岗位用 `<ul class="exp-roles">`

### 论文 / 荣誉

分别复制 `.pub-item`、`.honor-item` 结构修改即可；重点荣誉可加 `highlight` 类。

### 头像

替换 `assets/images/DAR1.jpg` 后重新生成裁剪版：

```bash
convert assets/images/DAR1.jpg -auto-orient -gravity center -crop 1:1 +repage \
  -resize 600x600 -strip -quality 86 assets/images/DAR1-avatar.jpg
```

## 部署

推送到 `main` 分支后 GitHub Pages 自动部署，1–3 分钟后生效。

## 联系方式

- **Email**: oran.duan@xgrids.com
- **GitHub**: https://github.com/OranDuanStudy
- **ResearchGate**: https://www.researchgate.net/profile/Oran-Duan

&copy; 2026 Oran Duan. All rights reserved.

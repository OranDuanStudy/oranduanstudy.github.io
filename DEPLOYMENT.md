# AI Chat Assistant 部署指南

## 架构

```
GitHub Pages (前端) ──> Vercel (API) ──> 智谱AI
```

## 快速部署

### 1. 获取智谱AI API Key

访问 https://open.bigmodel.cn/usercenter/apikeys 获取 API Key

### 2. 部署 API 到 Vercel

#### 方法 A：通过 Vercel 网页部署（推荐）

1. **登录 Vercel**
   - 访问 https://vercel.com
   - 点击 "Sign Up" 或 "Log In"
   - 使用 GitHub 账号登录（推荐）

2. **创建新项目**
   - 登录后，点击 "Add New" → "Project"
   - 或者直接访问 https://vercel.com/new

3. **导入 GitHub 仓库**
   - 在 "Import Git Repository" 部分找到你的仓库
   - 如果看不到，点击 "Adjust GitHub App Permissions" 授权
   - 点击仓库右侧的 "Import" 按钮

4. **配置项目**
   ```
   Project Name: oran-chatbot-api (可自定义)
   Framework Preset: Other
   Root Directory: ./
   Build Command: (留空)
   Output Directory: (留空)
   ```

5. **添加环境变量**（重要！）
   - 在展开的 "Environment Variables" 部分点击 "New"
   - 填写：
     - **Key**: `ZHIPU_API_KEY`
     - **Value**: 你的智谱AI API Key（如 `1234.abcd1234`）
   - 勾选适用的环境：Production ✓ Preview ✓ Development ✓
   - 点击 "Add"

6. **部署**
   - 点击 "Deploy" 按钮
   - 等待 1-2 分钟部署完成
   - 部署成功后会显示一个 URL，如：
     ```
     https://oran-chatbot-api.vercel.app
     ```

7. **验证部署**
   - 点击提供的 URL 访问
   - 测试 API 是否工作：
     ```bash
     curl -X POST https://your-project.vercel.app/api/chat \
       -H "Content-Type: application/json" \
       -d '{"messages":[{"role":"user","content":"你好"}]}'
     ```

#### 方法 B：通过 Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 安装项目依赖
npm install

# 登录 Vercel
vercel login

# 本地测试
vercel dev

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 3. 配置前端

编辑 `assets/js/chat-widget.js` 第 10 行，将 Vercel URL 替换为你的实际 URL：

```javascript
const VERCEL_API_URL = 'https://oran-chatbot-api.vercel.app';
```

### 4. 部署前端

推送到 GitHub，GitHub Pages 自动部署。

```bash
git add .
git commit -m "Add Vercel API integration"
git push origin main
```

访问你的 GitHub Pages 验证：
```
https://your-username.github.io/your-repo/
```

---

## Vercel 网页操作截图指南

### 配置环境变量（部署后添加）

如果在部署时忘记添加环境变量：

1. 进入项目：https://vercel.com/dashboard
2. 点击你的项目
3. 依次点击：**Settings** → **Environment Variables**
4. 点击 "Create New"
5. 填写：
   - **Key**: `ZHIPU_API_KEY`
   - **Value**: 你的 API Key
   - **Environments**: 全选
6. 点击 "Save"
7. 回到 **Deployments**，点击最新部署右侧的 "..." → **Redeploy**

### 查看 API 日志

1. 进入项目页面
2. 点击 **Deployments**
3. 点击最新的部署记录
4. 点击 **Functions** 标签
5. 选择一个函数（如 `/api/chat`）查看日志

---

## 文件结构

```
/api/              # Vercel API 路由
  ├── chat.js      # 聊天 API
  ├── tts.js       # 文字转语音
  ├── upload.js    # 文件上传
  └── voice-clone.js # 音色克隆
```

## API 端点

| 端点 | 方法 | 功能 |
|------|------|------|
| `/api/chat` | POST | 聊天对话 |
| `/api/tts` | POST | 文字转语音 |
| `/api/upload` | POST | 上传音频文件 |
| `/api/voice-clone` | POST | 克隆音色 |

## 环境变量

| 变量 | 说明 | 获取方式 |
|------|------|----------|
| `ZHIPU_API_KEY` | 智谱AI密钥 | https://open.bigmodel.cn/usercenter/apikeys |

## 常见问题

### CORS 错误
确保 Vercel API 已部署成功，且 `chat-widget.js` 中的 `VERCEL_API_URL` 配置正确。

### API 返回 500 错误
检查 Vercel 环境变量 `ZHIPU_API_KEY` 是否已正确配置。

### 音色克隆失败
音色克隆是高级功能，可能需要特定 API 权限。失败时会自动使用默认音色。

### 本地开发时如何测试 API

```bash
# 启动 Vercel 开发服务器
vercel dev

# API 会在 http://localhost:3000 运行
```

然后临时修改 `chat-widget.js`：
```javascript
const VERCEL_API_URL = 'http://localhost:3000';
```

### 如何更新 API

代码 push 到 GitHub 后，Vercel 会自动重新部署。或手动触发：
- 项目页面 → Deployments → 最新部署 → "..." → Redeploy

### 如何获取 Vercel 部署 URL

1. 进入项目：https://vercel.com/dashboard
2. 点击你的项目
3. 在顶部可以看到 **Domains**，如 `oran-chatbot-api.vercel.app`
4. 或点击 "Copy" 按钮复制完整 URL

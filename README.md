# 五年级语文互动学习乐园 🎓

一个专为五年级学生设计的趣味语文学习应用，通过三个互动小游戏帮助学生掌握汉字、拼音和词语。

## 🎮 游戏介绍

### 1. 识字消消乐 🧩
- 配对汉字和对应拼音
- 每关20组词汇，共10个关卡
- 成功配对获得10分

### 2. 火眼金睛找茬 👁️  
- 根据拼音选择正确的汉字
- 辨别形近字的差异
- 每题5分，共20题

### 3. 词语填空大挑战 ✍️
- 从四个选项中选择正确的汉字填空
- 考察常用词语和成语
- 每题5分，共20题

## 🚀 快速开始

**环境要求:** Node.js 18+

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问
http://localhost:3000
```

## 📁 项目结构

```
├── App.tsx              # 主应用组件
├── components/
│   ├── GameOne.tsx      # 识字消消乐
│   ├── GameTwo.tsx      # 火眼金睛找茬
│   ├── GameThree.tsx    # 词语填空大挑战
│   └── CelebrationModal.tsx  # 庆祝弹窗组件
├── constants.ts         # 游戏题库数据
├── types.ts             # TypeScript 类型定义
├── index.css            # 自定义样式和动画
└── public/
    └── favicon.svg      # 网站图标
```

## ✨ 特性

- 🎨 卡通风格界面，适合学生使用
- 📱 响应式设计，支持手机和平板
- 🎉 丰富的动画反馈
- 📊 实时分数追踪
- 🔄 关卡进度显示

## 🛠 技术栈

- React 19
- TypeScript
- Tailwind CSS
- Vite
- Animate.css


# Star Tasks - 任务管理系统

一个基于 Vue 3 和 Tailwind CSS 构建的任务管理系统，支持家长和孩子两种角色。采用现代化的设计系统，提供流畅的用户体验。

## 功能特点

- 家长模式：创建任务、管理奖励、审批任务
- 孩子模式：查看任务、完成任务、兑换奖励
- 积分系统：完成任务获得积分，兑换奖励
- 响应式设计：适配各种设备

## 设计系统

项目采用现代化的设计系统，包括：

- **主题系统**：支持亮色/暗色主题，使用 CSS 变量实现
- **设计风格**：
  - Glassmorphism（玻璃态）：半透明效果，模糊背景
  - Neumorphism（新拟态）：柔和的阴影和高光
  - Claymorphism（粘土态）：立体感和质感
- **动画效果**：
  - 渐变动画
  - 悬浮动画
  - 发光效果
- **响应式布局**：完美适配移动端和桌面端

## 技术栈

- Vue 3
- Pinia (状态管理)
- Vue Router
- Tailwind CSS
- GSAP (动画效果)
- Three.js (3D 效果)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署

本项目使用 Netlify 进行部署：

1. 将代码推送到 GitHub 仓库
2. 在 Netlify 中导入项目
3. 设置构建命令：`npm run build`
4. 设置发布目录：`dist`

## 环境变量

在 Netlify 中设置以下环境变量：

- `VITE_APP_TITLE`: 应用标题
- `VITE_APP_DESCRIPTION`: 应用描述

## 设计系统使用指南

### 主题类

```html
<!-- 玻璃态效果 -->
<div class="glass">
  <!-- 内容 -->
</div>

<!-- 粘土态效果 -->
<div class="clay">
  <!-- 内容 -->
</div>

<!-- 动画效果 -->
<div class="animate-float">
  <!-- 内容 -->
</div>
```

### 组件类

```html
<!-- 按钮 -->
<button class="btn-primary">主要按钮</button>
<button class="btn-secondary">次要按钮</button>
<button class="btn-outline">边框按钮</button>

<!-- 卡片 -->
<div class="card">
  <div class="card-header">标题</div>
  <div class="card-content">内容</div>
  <div class="card-footer">底部</div>
</div>
```

## 许可证

MIT 
# Star Tasks - 任务管理系统

一个基于 Vue 3 和 Tailwind CSS 构建的任务管理系统，支持家长和孩子两种角色。

## 功能特点

- 家长模式：创建任务、管理奖励、审批任务
- 孩子模式：查看任务、完成任务、兑换奖励
- 积分系统：完成任务获得积分，兑换奖励
- 响应式设计：适配各种设备

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

## 许可证

MIT 
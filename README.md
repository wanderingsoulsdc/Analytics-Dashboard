# 智慧城市数据孪生大屏

一个基于 React + TypeScript 构建的智慧城市数据孪生可视化大屏，具备 3D 城市模型、实时数据图表、粒子特效等丰富的交互和视觉效果。

## 技术栈

- **框架**: React 18 + TypeScript + Vite
- **3D 渲染**: Three.js + @react-three/fiber + @react-three/drei
- **数据图表**: ECharts 5
- **动画**: Framer Motion + CSS Animations
- **粒子特效**: tsparticles
- **样式**: Tailwind CSS + 自定义 CSS

## 功能特性

- 3D 城市模型（可拖拽旋转、缩放，自动旋转）
- 交通流量实时监控折线图
- 人口分布统计柱状图
- 环境监测雷达图
- 能源消耗仪表盘
- 设备运行状态面板
- 实时告警信息滚动列表
- 底部事件流滚动条
- 背景星空粒子 + 连线效果
- 全屏扫描线动画
- 面板入场过渡动画
- 数字翻牌动画

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/
│   ├── layout/        # 布局组件 (Header, Panel, EventTicker)
│   ├── charts/        # 数据图表组件
│   ├── 3d/            # 3D 城市模型
│   ├── effects/       # 特效组件 (粒子背景, 扫描线)
│   └── common/        # 通用组件 (数字翻牌)
├── data/              # Mock 数据
├── hooks/             # 自定义 Hooks
├── styles/            # 全局样式
└── utils/             # 工具函数
```

## 设计风格

- 深色背景 + 科技蓝渐变配色
- 发光边框 + 毛玻璃效果
- 赛博朋克风格 UI
- 适配 1920x1080 及以上分辨率


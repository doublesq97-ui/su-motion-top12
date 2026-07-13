# SU Motion Top 12

**中文** | [English](#english)

> 不是再造一个动画库，而是给 AI 一层经过筛选的界面动效决策与质感标准。

`SU Motion Top 12` 是一个面向 AI 编程工具的交互动效图谱：12 个高频、精致、可解释、可验证的网页 Motion，配套机器可读目录、选择规则、实现约束和可点击演示。

![Motion Atlas 深色主题预览](assets/motion-atlas/previews/dark.png)

它解决的不是“浏览器能不能动”，而是三个更常见的问题：

- AI 面对无限动画可能时应该选哪个？
- 为什么技术上能运行的动效仍然显得廉价或混乱？
- 怎样让不同 Agent 稳定地产出相近质量，而不是每次重新猜？

## 为什么只有 12 个

这是稳定的 **Core 12**，不是容量上限。

- 只收录高频、可复用、差异明确的模式。
- 核心 ID 和编号保持稳定。
- 后续实验可以进入 Community 或 Lab Pack，不稀释默认选择。
- AI 默认使用一个主 Motion，必要时再加一个辅助 Motion。

更少的选择让默认值、组合规则和质量验证真正可执行。

## Core 12

| # | Motion | 中文 | 主要用途 |
|---:|---|---|---|
| 01 | Fade & Blur | 淡入与模糊 | 柔和、聚焦的高级入场 |
| 02 | Directional Slide | 方向滑入 | 表达来源、方向与导航关系 |
| 03 | Mask Reveal | 遮罩揭示 | 图片、标题和材质揭示 |
| 04 | Scroll Reveal | 滚动显现 | 长页面的阅读节奏 |
| 05 | Parallax Depth | 视差景深 | 前后景空间层次 |
| 06 | Float & Levitate | 漂浮与悬停 | 克制的环境呼吸感 |
| 07 | Marquee | 连续跑马灯 | 连续品牌、标签或内容流 |
| 08 | Line Drawing | 线条绘制 | 路径、信号和流程关系 |
| 09 | Number Ticker | 数字滚动 | 指标变化和达成感 |
| 10 | Typewriter | 打字机文本 | 实时生成或系统响应 |
| 11 | Orbit Network | 轨道与网络 | 系统关系和技术氛围 |
| 12 | Shimmer Sweep | 光泽扫过 | 材质、加载和表面高光 |

## 人类界面与 AI 界面

对人类：

- `README.md` 解释项目价值、边界和用法。
- `assets/motion-atlas/index.html` 提供可点击的昼夜双主题演示。
- Motion 名称、参数和 JSON 都可以直接复制。

对 AI：

- `SKILL.md` 负责路由和交付契约。
- `references/motion-catalog.json` 是 Core 12 的机器可读目录。
- `references/selection-guide.md` 公开选择与组合规则。
- `references/implementation-contract.md` 固化实现和验证底线。

AI 可以自动选择，但只输出选择、参数和成品，不输出内部推理过程。

## 与 Remotion、Motion 和 GSAP 的关系

| 项目 | 解决的问题 | SU Motion Top 12 的关系 |
|---|---|---|
| [Remotion](https://github.com/remotion-dev/remotion) | 用 React 按帧生成和渲染视频 | 相关生态，不是依赖；本项目面向实时交互网页 |
| [Remotion Skills](https://github.com/remotion-dev/skills) | 教 AI 正确创建、组织和渲染 Remotion 视频 | 值得学习的 AI-readable animation 实践，但不是 UI Motion 目录 |
| [Motion](https://motion.dev/) | JavaScript / React / Vue 动画运行库 | 可以作为目标项目的实现引擎 |
| [GSAP](https://github.com/greensock/GSAP) | 高控制力时间线和网页动画引擎 | 可以作为复杂编排的实现引擎 |

我们尊重 Remotion 对可编程视频和 Agent 动画工作流的推动。它证明了动画知识可以被结构化、被代码化、被 AI 使用；`SU Motion Top 12` 聚焦于另一个更窄的层面：从真实网页中筛选高频模式，给交互界面提供更少、更稳、更精致的默认选择。

本项目与 Remotion、Motion、GSAP 均无官方隶属或背书关系。

## 优势

- **Curated, not exhaustive**：不追求数量，追求选择成本和默认质量。
- **Observed in real websites**：目录来自真实网页迁移与动效盘点，不是凭空命名。
- **AI-readable**：每项包含意图、触发、反例、时长、缓动和降级策略。
- **Framework-aware**：可适配 CSS、Web Animations API、GSAP、Motion 和 Canvas。
- **Theme-aware**：演示支持 System、Light、Dark 三态主题。
- **Quality-gated**：要求验证初始帧、中间帧、最终帧、移动端和 Reduced Motion。

## 使用

浏览目录：

```text
用 su-motion-top12 给我看常用网页动效目录。
```

让 AI 自动选择：

```text
用 su-motion-top12 为这个产品 Hero 选择并实现一个克制的入场动效。
```

指定 Motion：

```text
使用 08 Line Drawing，把这段数据流程做成可重播的网页动效。
```

## 安装

将仓库复制到 Agent 的 Skills 目录。例如 Codex：

```bash
cp -R su-motion-top12 ~/.codex/skills/
```

验证目录和 Demo：

```bash
npm run validate
```

本地打开交互演示：

```bash
python3 -m http.server 4173
# 浏览器访问 http://localhost:4173/assets/motion-atlas/
```

## License

原创代码和文档使用 MIT License。字体和外部运行库保留各自许可，详见 `THIRD_PARTY_NOTICES.md`。

---

<a id="english"></a>

# SU Motion Top 12

> Not another animation library. A curated decision and craft layer for AI-generated interface motion.

SU Motion Top 12 is an agent-ready atlas of 12 common, refined web motion patterns. It combines a human-facing interactive demo with a machine-readable catalog, public selection rules, implementation constraints, and visual quality gates.

Its value is not the number of effects. Remotion, Motion, GSAP, CSS, Canvas, and WebGL can express far more. The value is reducing endless possibilities to a small set of stable defaults that an agent can select, implement, and verify consistently.

## What makes it different

- Curated Core 12 rather than an exhaustive effect library.
- Patterns observed across real migrated websites.
- Intent, trigger, anti-pattern, timing, easing, and accessibility metadata.
- Interactive web semantics rather than frame-only video output.
- System, Light, and Dark visual demonstration.
- Framework-aware implementation and browser-level verification.

## Related work

We respect [Remotion](https://github.com/remotion-dev/remotion) and its [official Agent Skills](https://github.com/remotion-dev/skills) for advancing programmable video and AI-readable animation practice. SU Motion Top 12 is complementary: it focuses on curated, high-frequency motion for live web interfaces and is not affiliated with or endorsed by Remotion, Motion, GSAP, or their maintainers.

## License

Original code and documentation are MIT licensed. Third-party assets and external runtimes retain their own licenses; see `THIRD_PARTY_NOTICES.md`.

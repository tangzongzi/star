# 工作流状态与规则 (STM + Rules + Log)

*此文件包含当前会话的动态状态、嵌入式规则、活动计划和日志。*
*在操作循环期间，AI会频繁读取和更新它。*

---

## State

*保存工作流的当前状态。*

```yaml
Phase: BLUEPRINT # 当前工作流阶段 (ANALYZE, BLUEPRINT, CONSTRUCT, VALIDATE, BLUEPRINT_REVISE)
Status: NEEDS_PLAN_APPROVAL # 当前状态 (READY, IN_PROGRESS, BLOCKED_*, NEEDS_*, COMPLETED)
CurrentTaskID: implement_vue_project # 正在处理的主要任务标识符
CurrentStep: initial_planning # 正在执行的计划中特定步骤的标识符
```

---

## Plan

*包含在BLUEPRINT阶段生成的逐步实施计划。*

### 儿童奖励系统实施计划 (Vue3 + Tailwind CSS + Three.js)

#### 1. 项目基础设置
- [ ] 创建Vue3 + Vite项目
- [ ] 配置TailwindCSS
- [ ] 安装并集成Three.js
- [ ] 设置基本项目结构
- [ ] 配置Netlify部署准备

#### 2. 基础架构实现
- [ ] 创建项目目录结构
- [ ] 设置Vue Router
- [ ] 实现基础UI组件
- [ ] 创建状态管理方案
- [ ] 设计数据模型

#### 3. 核心功能实现
- [ ] 模式切换（家长/孩子）
- [ ] 任务管理（创建、更新、完成任务）
- [ ] 积分系统（获取、使用积分）
- [ ] 奖励系统（创建、兑换奖励）

#### 4. 3D展示功能
- [ ] 设置Three.js基础场景
- [ ] 创建奖励展示组件
- [ ] 实现简单动画效果
- [ ] 优化3D渲染性能

#### 5. 数据持久化
- [ ] 实现LocalStorage数据存储
- [ ] 创建数据模型和CRUD操作
- [ ] 添加数据导入/导出功能

#### 6. UI开发
- [ ]

---

## Rules

*管理AI自主操作的嵌入式规则。*

**# --- 核心工作流规则 ---**

RULE_WF_PHASE_ANALYZE:
  **约束:** 目标是理解请求/上下文。不进行解决方案设计或实施计划。

RULE_WF_PHASE_BLUEPRINT:
  **约束:** 目标是创建详细、明确的逐步计划。不进行代码实现。

RULE_WF_PHASE_CONSTRUCT:
  **约束:** 目标是精确执行`## Plan`。不允许偏离。如果出现问题，触发错误处理或回退阶段。

RULE_WF_PHASE_VALIDATE:
  **约束:** 目标是使用工具验证实现是否符合`## Plan`和需求。不进行新的实现。

RULE_WF_TRANSITION_01:
  **触发条件:** 明确的用户命令(`@analyze`, `@blueprint`, `@construct`, `@validate`)。
  **操作:** 相应更新`State.Phase`。记录阶段变更。

RULE_WF_TRANSITION_02:
  **触发条件:** AI确定当前阶段约束阻止履行用户请求，或错误处理指示阶段变更(例如，RULE_ERR_HANDLE_TEST_01)。
  **操作:** 记录原因。更新`State.Phase`(例如，改为`BLUEPRINT_REVISE`)。适当设置`State.Status`(例如，`NEEDS_PLAN_APPROVAL`)。向用户报告。

**# --- 初始化与恢复规则 ---**

RULE_INIT_01:
  **触发条件:** AI会话/任务启动且`workflow_state.md`缺失或为空。
  **操作:**
    1. 使用默认结构创建`workflow_state.md`。
    2. 读取`project_config.md`(如果缺失则提示用户)。
    3. 设置`State.Phase = ANALYZE`, `State.Status = READY`。
    4. 记录"初始化新会话。"
    5. 提示用户输入第一个任务。

RULE_INIT_02:
  **触发条件:** AI会话/任务启动且`workflow_state.md`存在。
  **操作:**
    1. 读取`project_config.md`。
    2. 读取现有的`workflow_state.md`。
    3. 记录"恢复会话。"
    4. 检查`State.Status`: 适当处理READY, COMPLETED, BLOCKED_*, NEEDS_*, IN_PROGRESS状态(提示用户或报告状态)。

RULE_INIT_03:
  **触发条件:** 用户通过RULE_INIT_02确认继续(针对IN_PROGRESS状态)。
  **操作:** 基于加载的状态和规则继续执行下一个操作。

**# --- 内存管理规则 ---**

RULE_MEM_READ_LTM_01:
  **触发条件:** 新的主要任务或阶段开始。
  **操作:** 读取`project_config.md`。记录操作。

RULE_MEM_READ_STM_01:
  **触发条件:** 每个决策/行动周期之前。
  **操作:** 读取`workflow_state.md`。

RULE_MEM_UPDATE_STM_01:
  **触发条件:** 每次重要操作或信息接收之后。
  **操作:** 立即更新`workflow_state.md`中的相关部分(`## State`, `## Plan`, `## Log`)并保存。

RULE_MEM_UPDATE_LTM_01:
  **触发条件:** 用户命令(`@config/update`)或重大更改的VALIDATE阶段成功结束。
  **操作:** 基于`## Log`/差异，提出对`project_config.md`的简洁更新。设置`State.Status = NEEDS_LTM_APPROVAL`。等待用户确认。

RULE_MEM_VALIDATE_01:
  **触发条件:** 更新`workflow_state.md`或`project_config.md`后。
  **操作:** 执行内部一致性检查。如发现问题，记录并设置`State.Status = NEEDS_CLARIFICATION`。

**# --- 工具集成规则 (Cursor环境) ---**

RULE_TOOL_LINT_01:
  **触发条件:** CONSTRUCT阶段保存相关源文件。
  **操作:** 指示Cursor终端运行lint命令。记录尝试。完成后，解析输出，记录结果，如有错误则设置`State.Status = BLOCKED_LINT`。

RULE_TOOL_FORMAT_01:
  **触发条件:** CONSTRUCT阶段保存相关源文件。
  **操作:** 指示Cursor应用格式化工具或通过终端运行格式化命令。记录尝试。

RULE_TOOL_TEST_RUN_01:
  **触发条件:** 命令`@validate`或进入VALIDATE阶段。
  **操作:** 指示Cursor终端运行测试套件。记录尝试。完成后，解析输出，记录结果，如失败则设置`State.Status = BLOCKED_TEST`，如成功则设置为`TESTS_PASSED`。

RULE_TOOL_APPLY_CODE_01:
  **触发条件:** AI根据CONSTRUCT阶段的`## Plan`确定需要代码更改。
  **操作:** 生成修改。指示Cursor应用它。记录操作。

**# --- 错误处理与恢复规则 ---**

RULE_ERR_HANDLE_LINT_01:
  **触发条件:** `State.Status`为`BLOCKED_LINT`。
  **操作:** 分析`## Log`中的错误。如简单/有信心，尝试自动修复。通过RULE_TOOL_APPLY_CODE_01应用修复。通过RULE_TOOL_LINT_01重新运行lint。如成功，重置`State.Status`。如失败/复杂，设置`State.Status = BLOCKED_LINT_UNRESOLVED`，向用户报告。

RULE_ERR_HANDLE_TEST_01:
  **触发条件:** `State.Status`为`BLOCKED_TEST`。
  **操作:** 分析`## Log`中的失败。如简单/局部/有信心，尝试自动修复。通过RULE_TOOL_APPLY_CODE_01应用修复。通过RULE_TOOL_TEST_RUN_01重新运行失败的测试或套件。如成功，重置`State.Status`。如失败/复杂，设置`State.Phase = BLUEPRINT_REVISE`，`State.Status = NEEDS_PLAN_APPROVAL`，基于失败分析提出修订的`## Plan`，向用户报告。

RULE_ERR_HANDLE_GENERAL_01:
  **触发条件:** 意外错误或歧义。
  **操作:** 将错误/情况记录到`## Log`。设置`State.Status = BLOCKED_UNKNOWN`。向用户报告，请求指示。

---

## Log

*重要操作、事件、工具输出和决策的时间顺序日志。*

## 日志
- **2023-07-16 10:15:00**: 会话初始化
- **2023-07-16 10:15:10**: 读取project_config.md
- **2023-07-16 10:15:20**: 读取workflow_state.md
- **2023-07-16 10:30:00**: 完成项目需求分析和规划
- **2023-07-16 11:00:00**: 项目配置文档获得批准
- **2023-07-16 11:15:00**: 开始实施开发，状态更新为CONSTRUCT/IN_PROGRESS
- **2023-10-25 14:00:00**: 检查项目状态，发现项目基础设置已完成
- **2023-10-25 14:15:00**: 验证基础架构实现已完成
- **2023-10-25 14:30:00**: 确认UI开发阶段大部分已完成
- **2023-10-25 14:45:00**: 更新工作流状态，当前进入核心功能实现阶段
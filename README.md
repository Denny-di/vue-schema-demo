# vue-schema-demo：企业级动态表格解决方案

> 基于 Vue3 + Element Plus 打造的企业级动态表格解决方案，支持高度定制化配置和复杂业务场景

## 前言

在企业级应用开发中，表格作为数据展示与交互的核心组件，往往面临着复杂业务场景的挑战。传统表格组件在面对动态列配置、多样化筛选需求、自定义渲染等场景时，常需大量重复开发工作，导致效率低下且维护成本高。基于此，**vue-schema-demo**应运而生 —— 这是一款基于
**Vue3 + Element Plus**
深度定制的动态表格解决方案，旨在通过标准化的配置体系与灵活的扩展机制，帮助开发者快速构建适应复杂业务的表格组件，大幅提升开发效率与用户体验。

## 🌟 核心特性

- **🔄 动态列配置** - 支持灵活的列配置，包括标题、字段、宽度、对齐方式等
- **🔍 筛选功能** - 内置筛选面板，支持自定义筛选
- **📝 自定义单元格** - 支持自定义单元格内容和样式
- **🛠️ 自定义表格菜单** - 支持自定义表格菜单
- **🎨 多类型渲染** - 内置处理日期格式化/数值计算等
- **🧩 插槽扩展** - 灵活的内容插槽机制
- **🔧 复合功能** - 支持分页/排序/多选/树形表格

> 示例图：
> ![171721C0-EB56-4d15-B4EC-65D0B49D3A2C](https://github.com/user-attachments/assets/deb5b33d-c0ca-489f-b1b8-a1e1b155ec4e)


> 先上源码：⭐ [`github`](https://github.com/ddluobo/vue-schema-demo)

## 项目优势

### 🏆 全场景适配能力

- **复杂业务零妥协**：支持树形表格、多级筛选、动态排序等企业级功能，轻松应对数据管理、报表展示、流程审批等核心场景

<!---->

- **视觉交互双升级**：内置响应式布局引擎，搭配 Element Plus 原生主题，实现视觉风格统一化管理

### ⚡ 开发效率倍增

- **声明式配置语法**：通过 JSON Schema 完成 90% 的表格配置，告别繁琐 DOM 操作

<!---->

- **开箱即用组件库**：预置日期格式化、数值计算、状态标签等常用渲染器，支持 10 + 筛选组件快速调用

### 🛠 全链路可扩展架构

- **插槽化设计体系**：提供表头 / 表体 / 菜单 / 筛选等 12 处可扩展插槽，满足任意自定义场景

<!---->

- **类型安全保障**：完整 TypeScript 类型定义，开发阶段实时校验配置合法性

## 🌟 核心特性详解

### 🔄 动态列配置引擎

- **精细化列控制**：支持标题、字段、宽度（含最小宽度限制）、对齐方式等基础配置，配合fixed属性实现固定列展示

<!---->

- **智能渲染系统**：通过formatter函数实现单元格内容动态转换，customCell支持自定义 Vue 组件渲染

<!---->

- **数据驱动展示**：hidden属性结合业务逻辑动态控制列显隐，sort数值实现列排序优先级管理

### 🔍 智能筛选解决方案

- **多维度筛选面板**：内置级联筛选、日期范围、下拉多选等常见筛选组件，通过FilterOptionType配置快速生成

<!---->

- **联动清除机制**：clearFields属性支持筛选条件跨字段联动清除，提升用户操作便捷性

<!---->

- **响应式布局**：根据屏幕宽度自动调整筛选组件排列方式，避免移动端布局错乱

### 🧩 复合功能生态

- **交互功能集**：集成分页）、多选（含全选 / 反选）、排序等基础功能，开箱即用

<!---->

- **树形数据支持**：通过children子列配置，一键生成层级数据展示表格，支持无限级嵌套

<!---->

- **菜单扩展体系**：actionOptions配置支持自定义表格菜单按钮，结合beforeOpen回调实现操作前权限校验

### 🎨 多场景渲染方案

- **内置渲染器库**：预设日期（YYYY-MM-DD HH:mm）、数值（千位分隔符）、状态标签（成功 / 警告等颜色主题）等常用渲染器

<!---->

- **自定义样式体系**：通过textType属性快速应用 Element Plus 内置主题样式，配合showOverflowTooltip避免长文本截断问题

## 🚀 快速上手指南

### 环境准备

```
# 安装项目依赖
yarn install
# 启动开发环境
yarn dev
```

### 基础使用示例

```vue
<template>
  <VTable :columns="columns" :data="tableData" />
</template>

<script setup>
const columns = [
  { prop: 'name', label: '姓名' },
  {
    prop: 'amount',
    label: '金额',
    formatter: (row) => `¥${row.amount.toFixed(2)}`
  }
]
const tableData = [
  { name: '张三', amount: 1234.56 },
  { name: '李四', amount: 7890.12 }
]
</script>
```

## 📖 完整配置指南

### 核心组件：VTableType

| 属性名        | 类型               | 必选 | 核心功能                                       |
| ------------- | ------------------ | ---- | ---------------------------------------------- |
| code          | string             | 是   | 表格唯一标识，用于数据持久化存储与组件通信     |
| api           | Promise 函数       | 否   | 后端数据请求函数，支持参数透传与加载状态管理   |
| columns       | ColumnType[]       | 是   | 列配置数组，支持多级子列嵌套（树形表格）       |
| filterOptions | FilterOptionType[] | 否   | 筛选组件配置，支持级联筛选与复合条件组合       |
| actionOptions | ActionOptionType[] | 否   | 操作按钮配置，支持二次确认、权限控制等高级功能 |

### 列配置：ColumnType 核心字段

- **数据关联**：prop绑定数据字段，label定义表头显示文本

<!---->

- **布局控制**：width/minWidth组合实现响应式列宽，fixed支持固定左 / 右列（如操作列固定右侧）

<!---->

- **交互增强**：sortable开启排序功能，showOverflowTooltip防止长文本截断

<!---->

- **高级渲染**：formatter处理单元格内容（支持 VNode 渲染），customCell注入自定义组件

| 属性名              | 类型                                                                       | 默认值 | 描述                 |
| ------------------- | -------------------------------------------------------------------------- | ------ | -------------------- |
| prop                | string                                                                     | -      | 列字段名             |
| label               | string                                                                     | -      | 列标题               |
| width               | string \| number                                                           | -      | 列宽度               |
| minWidth            | string \| number                                                           | -      | 列最小宽度           |
| sortable            | boolean                                                                    | false  | 是否可排序           |
| children            | ColumnType\[]                                                              | -      | 子列配置             |
| align               | 'left' \| 'center' \| 'right'                                              | 'left' | 列对齐方式           |
| fixed               | boolean \| 'left' \| 'right'                                               | false  | 是否固定列           |
| showOverflowTooltip | boolean                                                                    | false  | 是否显示溢出提示     |
| formatter           | (row: any, column: any, cellValue: any, index: number) =\> VNode \| string | -      | 单元格内容格式化函数 |
| hidden              | boolean                                                                    | false  | 是否隐藏列           |
| sort                | number                                                                     | -      | 排序值               |
| textType            | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'                  | -      | 文本类型             |
| customCell          | { value?: Component }                                                      | -      | 自定义单元格内容     |

### TabsPropsType

| 属性名       | 类型                                                               | 默认值 | 描述       |
| ------------ | ------------------------------------------------------------------ | ------ | ---------- |
| prop         | string                                                             | -      | 切换字段名 |
| defaultValue | number \| string                                                   | -      | 默认值     |
| options      | Array\<VTableType & { label: string; value?: number \| string; }\> | -      | 切换选项   |

### 筛选配置：FilterOptionType 关键属性

- **组件类型**：type支持Input/Select/DatePicker等 15+ Element Plus 表单组件及自定义组件

<!---->

- **数据绑定**：prop关联筛选字段，options定义下拉选项（支持级联child配置）

<!---->

- **交互控制**：multiple开启多选模式，placeholder设置输入提示，clearFields实现条件联动清除

| 属性名       | 类型                                                                                     | 默认值 | 描述           |
| ------------ | ---------------------------------------------------------------------------------------- | ------ | -------------- |
| props        | any                                                                                      | -      | 筛选组件属性   |
| prop         | string                                                                                   | -      | 筛选字段名     |
| type         | FormComponentType                                                                        | -      | 筛选组件类型   |
| models       | ModelType\[]                                                                             | -      | 筛选模型       |
| defaultValue | number \| string \| boolean \| Array\<number \| string \| boolean\>                      | -      | 默认值         |
| label        | string                                                                                   | -      | 筛选标签       |
| hidden       | boolean                                                                                  | false  | 是否隐藏筛选   |
| multiple     | boolean                                                                                  | false  | 是否多选       |
| placeholder  | string                                                                                   | -      | 筛选占位符     |
| className    | string                                                                                   | -      | 筛选类名       |
| width        | number \| string                                                                         | -      | 筛选宽度       |
| options      | Array<{ label: string; value: string \| number \| boolean; child?: FilterOptionType; }\> | -      | 筛选选项       |
| childType    | FormComponentType                                                                        | -      | 子筛选组件类型 |
| child        | FilterOptionType                                                                         | -      | 子筛选配置     |
| clearFields  | string\[]                                                                                | -      | 清除字段       |

### 操作配置：ActionOptionType 核心能力

- **组件定制**：componentType支持按钮 / 图标按钮 / ，icon注入 Element Plus 图标库资源

<!---->

- **安全控制**：reconfirm开启二次确认弹窗，beforeOpen实现操作前权限校验与数据校验

<!---->

- **动态显隐**：isCheckRow关联行选中状态，isHidden函数实现基于行数据的操作按钮动态隐藏

| 属性名        | 类型                | 默认值 | 描述             |
| ------------- | ------------------- | ------ | ---------------- |
| props         | any                 | -      | 操作组件属性     |
| label         | string              | -      | 操作标签         |
| prop          | string              | -      | 操作字段名       |
| componentType | 'button'            | -      | 操作组件类型     |
| icon          | string \| Component | -      | 操作图标         |
| isCheckRow    | boolean             | false  | 是否选中行       |
| hidden        | boolean             | false  | 是否隐藏操作     |
| apiProps      | any                 | -      | API 属性         |
| reconfirm     | boolean             | false  | 是否需要二次确认 |
| beforeOpen    | () =\> Promise<any> | -      | 操作前回调函数   |

### SwitchPropsType

| 属性名       | 类型                                                              | 默认值 | 描述       |
| ------------ | ----------------------------------------------------------------- | ------ | ---------- |
| prop         | string                                                            | -      | 切换字段名 |
| defaultValue | number \| string                                                  | -      | 默认值     |
| options      | Array\<VTableType & { label: string; value: string \| number; }\> | -      | 切换选项   |

### OperateOptionType

| 属性名     | 类型                                                                  | 默认值 | 描述             |
| ---------- | --------------------------------------------------------------------- | ------ | ---------------- |
| label      | string                                                                | -      | 操作标签         |
| prop       | string                                                                | -      | 操作字段名       |
| type       | 'primary' \| 'danger' \| 'default' \| 'warning' \|'success' \| 'info' | -      | 操作类型         |
| icon       | string \| Component                                                   | -      | 操作图标         |
| unfold     | boolean                                                               | false  | 是否展开         |
| hidden     | boolean                                                               | false  | 是否隐藏操作     |
| disabled   | boolean                                                               | false  | 是否禁用操作     |
| reconfirm  | boolean                                                               | false  | 是否需要二次确认 |
| isHidden   | (row: any) =\> boolean                                                | -      | 是否隐藏操作函数 |
| showValues | Array\<string \| number \| boolean\>                                  | -      | 显示值           |

## 📦 适用场景

- **数据管理系统**：客户信息、订单列表等复杂数据展示与操作

<!---->

- **报表分析平台**：支持多级筛选、动态列排序的报表表格

<!---->

- **流程审批系统**：树形表格展示审批流程，操作按钮集成权限控制

<!---->

- **中台管理系统**：统一表格组件库，实现多模块视觉与交互标准化

## 🛠 生态支持

- **开源协议**：MIT 许可证，商业项目可自由使用

<!---->

- **技术支持**：Gitee/GitHub 双平台代码托管，提供详细 Issue 反馈模板

<!---->

- **版本管理**：遵循 SemVer 语义化版本规范，重大变更提前发布兼容性声明

## 🌟 加入我们

vue-schema-demo 持续迭代中，欢迎通过以下方式参与项目共建：

- 📥 下载源码：[GitHub 仓库](https://github.com/ddluobo/vue-schema-demo)

<!---->

- 📝 提交文档：在docs目录提交 Markdown 文档 PR

<!---->

- 🐛 反馈问题：通过 Issue 模板提交 BUG 反馈或功能建议

选择 vue-schema-demo，让表格开发从此高效而优雅！

import { withDirectives } from 'vue'
import { evaluate } from 'mathjs'

import copy from '@/directives/copy'
import dayjs from 'dayjs'

/**
 * 创建人/创建时间
 * @prop ex. creatorName-createTime
 */
export const creatorFormatter = (row: any, column: any) => {
  const [name, time] = column?.property?.split('-') ?? []
  return h('span', [row[name] ?? '-', h('br'), row[time] ? dayjs(row[time]).format('YYYY-MM-DD HH:mm:ss') : '-'])
}

/**
 * 日期
 */
export const dateFormatter = (_r: any, _c: any, v: any) => (v ? dayjs(v).format('YYYY-MM-DD') : '-')

/**
 * 日期
 * @prop ex. startDate-endDate
 */
export const dateJointFormatter = (row: any, column: any) => {
  const { property: p } = column
  const [s1, s2] = p?.split('-') ?? []
  return `${row?.[s1] ? dayjs(row[s1]).format('YYYY/MM/DD') : ''}-${
    row?.[s2] ? dayjs(row[s2]).format('YYYY/MM/DD') : ''
  }`
}

/**
 * 复制文本 vnode
 */
const vnodeCopy = (val: string) => withDirectives(h('span', { title: val }, val || '-'), [[copy]])

/**
 * 分割
 * @prop ex. xxx-xxx
 * @separators ['-', '/', ' ', '|', '&', '\_br\_']
 */
export const splitFormatter = (row: any, column: any) => {
  const { property: p } = column
  const separators = ['-', '/', ' ', '|', '&', '_br_']
  const joint = separators.find((sep) => p.includes(sep))
  const [s1, s2] = p?.split(joint) ?? []
  return h('div', [vnodeCopy(row[s1] || '-'), joint === '_br_' ? h('br') : joint, vnodeCopy(row[s2] || '-')])
}

/**
 * 数组: 逗号拼接
 * @value ex. ['a', 'b', 'c'] => a,b,c
 */
export const arrayJoinFormatter = (_r: any, _c: any, v: any) => (v?.length ? v.join(',') : '-')

/**
 * 对象数组: 逗号拼接指定 key 的值
 * @prop ex. prop-key => [{key: 1}, {key: 2}] => 1,2
 */
export const arrayKeyJoinFormatter = (row: any, column: any) => {
  const { property: p } = column
  const [prop, key] = p.split('-')
  return row[prop]?.length ? row[prop]?.map((m: any) => m[key]).join(',') : '-'
}

/**
 * 使用 mathjs 计算复杂表达式
 * @param row 数据行对象（包含所有需要的字段）
 * @param column 列配置对象（property 为计算的表达式）
 * @ex (a+b)*(c-d)/e
 * @returns 格式化结果或'-'
 */
export const calcFormatter = (row: any, column: any) => {
  try {
    const expr = column.property
    const scope = Object.keys(row).reduce((acc: any, key) => {
      const val = Number(row[key])
      acc[key] = Number.isFinite(val) ? val : 0
      return acc
    }, {})
    return mathFormat(evaluate(expr, scope)) as any
  } catch {
    return '-'
  }
}

/**
 * 动态拼接多属性值
 * @prop ex. length\*width\*height => 10\*10\*10
 * @prop ex. a|b|c => 1|2|3
 * @prop ex. x-y-z => 5-5-5
 */
export const joinFormatter = (row: any, column: any) => {
  const separators = ['*', '|', '-', '_', '+', ' ', '/']
  const joint = separators.find((sep) => column?.property?.includes(sep)) || '-'
  const props = column?.property?.split(joint)
  return props?.map((p: string | number) => row[p] ?? '-').join(joint)
}

/**
 * 任意: 渲染 其中一个 prop 的值
 * @prop ex. prop1-prop2-prop3 => {val1} or {val2} or {val3}
 */
export const anyFormatter = (row: any, column: any) => {
  const props = column?.property?.split('-')
  for (const prop of props) {
    if (['', undefined, null].includes(row[prop])) continue
    return row[prop]
  }
}

/**
 * 枚举: 渲染 label
 * @options ex. [{ value: 1, label: '是' }] => {label}
 */
export const labelFormatter = (options: any[], ...args: any[]) => options.find((f) => f.value === args[2])?.label || '-'

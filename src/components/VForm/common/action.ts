import { format } from 'mathjs'

/**
 * 绑定多个model
 * @param models 模型名称
 * @param modelValue 模型值
 * @returns
 */
export const bindModels = (models: ModelType[] = [], modelValue: Ref) =>
  models?.reduce((acc: any, cur: ModelType) => {
    acc[cur] = modelValue.value
    acc[`onUpdate:${cur}`] = (val: any) => (modelValue.value = val)
    return acc
  }, {})

/**
 * 保留2位小数
 * @param value
 * @returns
 */
export const mathFormat = (v: number, precision = 2) => {
  return +format(v, { notation: 'fixed', precision })
}

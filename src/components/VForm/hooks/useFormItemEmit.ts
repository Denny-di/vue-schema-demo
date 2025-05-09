import { useFormItem } from 'element-plus'

export default function useFormItemEmit() {
  const { formItem } = useFormItem() // form formItem

  const formItemEmit = () => {
    if (formItem) {
      nextTick(() => {
        formItem.validate('blur') // 触发校验
        formItem.validate('change') // 触发校验
      })
    }
  }
  return { formItem, formItemEmit }
}

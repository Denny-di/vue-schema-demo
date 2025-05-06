import { type Directive } from 'vue'
import { ElMessage } from 'element-plus'

interface CustomEl extends HTMLElement {
  __handleClick__?: () => void
  __copyData__?: string
}

const copy: Directive<CustomEl> = {
  mounted(el, binding) {
    // 使用组合式API风格封装逻辑
    const setup = () => {
      const copyText = String(binding.value ?? el.textContent ?? '')
      el.__copyData__ = copyText

      const copyHandler = async () => {
        try {
          await navigator?.clipboard?.writeText?.(copyText)
          ElMessage.success('复制成功')
        } catch {
          ElMessage.error('复制失败，请手动复制')
        }
      }

      return { copyHandler }
    }

    const { copyHandler } = setup()
    el.__handleClick__ = copyHandler
    el.addEventListener('dblclick', copyHandler)
  },

  updated(el, binding) {
    el.__copyData__ = String(binding.value ?? el.textContent ?? '')
  },

  beforeUnmount(el) {
    if (el.__handleClick__) {
      el.removeEventListener('dblclick', el.__handleClick__)
      delete el.__handleClick__
    }
  }
}

export default copy

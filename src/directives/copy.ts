import type { Directive, DirectiveBinding } from 'vue'
import { ElMessage } from 'element-plus'
interface ElType extends HTMLElement {
  copyData: string | number
  __handleClick__: any
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = String(binding.value ?? el.innerHTML ?? '')
    el.addEventListener('dblclick', handleClick)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = String(binding.value ?? el.innerHTML ?? '')
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('dblclick', el.__handleClick__)
  }
}

function handleClick(this: any) {
  const input = document.createElement('input')
  input.style.opacity = '0'
  input.value = this.copyData.toLocaleString()
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage({
    type: 'success',
    message: '复制成功'
  })
}

export default copy

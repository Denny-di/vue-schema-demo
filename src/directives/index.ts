import type { App } from 'vue'
import copy from './copy'

export default function setupDirectives(app: App<Element>) {
  app.directive('copy', copy)
}

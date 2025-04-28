// eslint.config.js
import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import vueEsLintParser from 'vue-eslint-parser'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public']
  },

  /** js推荐配置 */
  eslint.configs.recommended,
  /** ts推荐配置 */
  ...tseslint.configs.recommended,
  /** vue推荐配置 */
  ...eslintPluginVue.configs['flat/recommended'],

  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
    arrowParens: 'always'
  }),

  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {
      'no-console': 'warn'
    }
  },

  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEsLintParser, // 显式声明 Vue 解析器
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // 在这里追加 vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true
        }
      ]
    }
  },

  /**
   * typescript 规则
   */
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {}
  },

  /**
   * prettier 配置
   * 会合并根目录下的.prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended
)

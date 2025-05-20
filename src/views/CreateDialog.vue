<script setup lang="ts" name="CreateDialog">
import { Delete } from '@element-plus/icons-vue'
import { cascaderOptions, options, treeData } from './data'

const emit = defineEmits(['refresh'])

const titleMap = {
  add: '新增',
  edit: '编辑',
  detail: '详情'
}

type TitleType = keyof typeof titleMap

const { form, formRef, visible, loading, formType, isDetail, getDetail, success, close } = useForm<TitleType>({
  emit
})

const schema = computed(() => [
  {
    label: 'el-select-v2',
    prop: 'city',
    type: 'el-select-v2',
    options
  },
  {
    label: 'el-cascader',
    prop: 'city',
    type: 'el-cascader',
    options: cascaderOptions
  },
  {
    label: '个人信息',
    type: 'el-tabs',
    options: [
      {
        label: '基本信息',
        children: [
          {
            label: '姓名',
            prop: 'name',
            type: 'el-input',
            span: 16
          },
          { label: 'el-input-number', prop: 'age', type: 'el-input-number', itemProps: { labelWidth: 200 } },
          {
            type: 'el-divider'
          },
          {
            label: 'el-tree-select',
            prop: 'el-tree-select',
            type: 'el-tree-select',
            options: treeData
          },
          {
            label: 'el-radio-group',
            prop: 'sex',
            type: 'el-radio-group',
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' }
            ]
          },
          {
            label: 'el-checkbox-group',
            prop: 'hobby',
            type: 'el-checkbox-group',
            options: [
              { label: '篮球', value: 'basketball' },
              { label: '足球', value: 'football' },
              { label: '乒乓球', value: 'pingpong' }
            ]
          },
          {
            label: 'el-switch',
            prop: 'switch',
            type: 'el-switch'
          },
          {
            label: 'el-rate',
            prop: 'rate',
            type: 'el-rate'
          },
          {
            label: 'el-color-picker',
            prop: 'color',
            type: 'el-color-picker'
          },
          {
            label: 'el-slider',
            prop: 'slider',
            type: 'el-slider',
            span: 23
          },
          {
            type: 'el-divider'
          },
          {
            label: 'date',
            prop: 'date',
            type: 'date'
          },
          {
            label: 'daterange',
            prop: 'daterange',
            type: 'daterange',
            span: 16
          },
          {
            label: 'textarea',
            prop: 'textarea',
            type: 'textarea',
            span: 24
          }
        ]
      },
      {
        label: '联系方式',
        children: [
          {
            label: '城市',
            prop: 'city',
            type: 'el-select',
            options
          },
          {
            label: '电话',
            prop: 'phone',
            type: 'el-input'
          },
          {
            label: '邮箱',
            prop: 'email',
            type: 'el-input'
          }
        ]
      },
      {
        label: 'table',
        children: [
          {
            prop: 'rowData',
            type: 'table',
            props: {
              size: 'auto',
              columns: [
                formCellColumn({
                  label: '姓名',
                  prop: 'name',
                  customCell: { type: 'el-input', rules: rules.name }
                }),
                formCellColumn({
                  label: '年龄',
                  prop: 'age',
                  customCell: { type: 'el-input-number', props: { min: 0, max: 100 } }
                }),
                formCellColumn({
                  label: '性别',
                  prop: 'sex',
                  customCell: {
                    type: 'el-radio-group',
                    options: [
                      { label: '男', value: 'male' },
                      { label: '女', value: 'female' }
                    ]
                  }
                }),
                formCellColumn({
                  label: '生日',
                  prop: 'birthday',
                  width: 200,
                  customCell: { type: 'date', props: { disabledDate: (time: any) => time.getTime() > Date.now() } }
                }),
                formCellColumn({
                  label: 'el-select-v2',
                  prop: 'hobby',
                  customCell: {
                    type: 'el-select-v2',
                    options
                  }
                }),
                formCellColumn({
                  label: 'el-select',
                  prop: 'el-select',
                  customCell: {
                    type: 'el-select',
                    options
                  }
                }),
                formCellColumn({
                  label: 'el-cascader',
                  prop: 'el-cascader',
                  customCell: {
                    type: 'el-cascader',
                    options: cascaderOptions
                  }
                }),
                formCellColumn({
                  label: 'el-tree-select',
                  prop: 'el-tree-select',
                  customCell: {
                    type: 'el-tree-select',
                    options: treeData
                  }
                }),
                formCellColumn({
                  label: 'el-radio-group',
                  prop: 'sex',
                  customCell: {
                    type: 'el-radio-group',
                    options: [
                      { label: '男', value: 'male' },
                      { label: '女', value: 'female' }
                    ]
                  }
                }),
                formCellColumn({
                  label: 'el-checkbox-group',
                  prop: 'hobby',
                  width: 250,
                  customCell: {
                    type: 'el-checkbox-group',
                    options: [
                      { label: '篮球', value: 'basketball' },
                      { label: '足球', value: 'football' },
                      { label: '乒乓球', value: 'pingpong' }
                    ]
                  }
                }),
                formCellColumn({
                  label: 'el-switch',
                  prop: 'switch',
                  width: 100,
                  customCell: {
                    type: 'el-switch'
                  }
                }),
                formCellColumn({
                  label: 'el-rate',
                  prop: 'rate',
                  customCell: {
                    type: 'el-rate'
                  }
                }),
                formCellColumn({
                  label: 'el-color-picker',
                  prop: 'color',
                  customCell: {
                    type: 'el-color-picker'
                  }
                }),
                formCellColumn({
                  label: 'el-slider',
                  prop: 'slider',
                  customCell: {
                    type: 'el-slider'
                  }
                }),
                formCellColumn({
                  label: 'daterange',
                  prop: 'daterange',
                  width: 200,
                  customCell: {
                    type: 'daterange',
                    props: { disabledDate: (time: any) => time.getTime() > Date.now() }
                  }
                }),
                formCellColumn({
                  label: 'textarea',
                  prop: 'textarea',
                  width: 200,
                  customCell: {
                    type: 'textarea',
                    props: { rows: 2 }
                  }
                }),
                operateColumn([{ label: '删除', prop: 'delete', type: 'danger', icon: markRaw(Delete), unfold: true }])
              ]
            }
          }
        ]
      }
    ]
  }
])

const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 0, max: 100, message: '年龄必须在 0 到 100 之间', trigger: 'blur' }
  ]
})

const apiParams = computed(() => {
  const parmas: any = {
    ...form.value
  }
  return parmas
})

const api = async (params: any) => {
  return {
    ...params,
    x: 1
  }
}

//  type?: 'date' | 'options' | 'table' | 'tab' | 'content' | 'divider'
const panel = [
  { label: 'date', prop: 'birthday', type: 'date' },
  { label: 'options', prop: 'option', type: 'options', options },
  { type: 'divider' },
  { label: 'content', type: 'content', content: '这是一段内容' },
  {
    type: 'tab',
    options: [
      {
        label: 'table',
        children: [
          {
            type: 'table',
            prop: 'rowData',
            props: {
              columns: [
                { label: '姓名', prop: 'name' },
                { label: '年龄', prop: 'age' },
                { label: '性别', prop: 'sex' },
                { label: '生日', prop: 'birthday' },
                { label: '备注', prop: 'remark' }
              ]
            }
          }
        ]
      },
      {
        label: '其他',
        children: [
          { label: 'date', prop: 'birthday', type: 'date' },
          { label: 'options', prop: 'option', type: 'options', options },
          { label: 'content', type: 'content', content: '这是一段内容' }
        ]
      }
    ]
  }
]

const detailApi = async (params: any) => {
  return {
    ...params,
    rowData: [{ name: '张三', age: 18, sex: '男', slider: 35, remark: 'xczczcz' }],
    birthday: new Date().getTime(),
    option: 'option2'
  }
}

const initForm = () => {
  form.value = {
    ...form.value
  }
}

const init = async () => {
  initForm()

  const { id } = form.value
  if (id) {
    await getDetail(detailApi, { id })
  }
}

const open = (key: TitleType, opt: any = {}) => {
  visible.value = true
  formType.value = key
  form.value = { ...opt }
  init()
}

defineExpose({
  open
})
</script>

<template>
  <VFormDialog
    ref="formRef"
    v-model:visible="visible"
    v-model:model="form"
    :rules="rules"
    :schema="schema"
    :api="api"
    :api-params="apiParams"
    :loading="loading"
    :title="titleMap[formType]"
    :panel="panel"
    :is-detail="isDetail"
    @close="close"
    @success="success"
  />
</template>

<style scoped lang="scss"></style>

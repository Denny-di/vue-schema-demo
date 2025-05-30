<script setup lang="ts" name="FormDemo">
import { Delete } from '@element-plus/icons-vue'
import { cascaderOptions, options, treeData } from './data'

const { form, formRef, reset, submit } = useForm()

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
    label: 'el-tree-select',
    prop: 'el-tree-select',
    type: 'el-tree-select',
    options: treeData
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
        label: 'table：大量数据急速渲染',
        children: [
          {
            prop: 'rowData2',
            type: 'table',
            props: {
              height: 600,
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
                  label: 'textarea',
                  prop: 'textarea',
                  width: 200,
                  customCell: {
                    type: 'textarea',
                    props: { rows: 1 }
                  }
                }),
                operateColumn([{ label: '删除', prop: 'delete', type: 'danger', icon: markRaw(Delete), unfold: true }])
              ]
            }
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
              height: 600,
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
                    props: { rows: 1 }
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

const init = () => {
  form.value = {
    name: '',
    age: 0,
    sex: '',
    rowData: Array.from({ length: 10 }).map((_, i) => ({
      name: 'name' + i,
      age: i,
      sex: '',
      switch: false,
      rate: 0,
      color: '',
      slider: 0,
      textarea: ''
    })),
    rowData2: Array.from({ length: 100 }).map((_, i) => ({
      name: 'name' + i,
      age: i,
      sex: '',
      switch: false,
      rate: 0,
      color: '',
      slider: 0,
      textarea: ''
    }))
  }
}

const submitApi = async (params: any) => {
  ElNotification({
    title: '提交参数',
    message: JSON.stringify(params)
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="FormDemo p-[50px]">
    <VForm ref="formRef" v-model:model="form" :rules="rules" :schema="schema"></VForm>

    <div class="mt-[50px]">
      <el-button type="default" @click="reset">重置</el-button>
      <el-button type="primary" @click="submit(submitApi, form)">提交</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

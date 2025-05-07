<script setup lang="ts" name="FormDemo">
const schema = computed(() => [
  {
    label: 'el-select-v2',
    prop: 'city',
    type: 'el-select-v2',
    options: Array.from({ length: 1000 }, (_, i) => ({
      label: `选项${i + 1}`,
      value: `city${i + 1}`
    }))
  },
  {
    label: 'el-cascader',
    prop: 'city',
    type: 'el-cascader',
    options: [
      {
        label: '北京',
        value: 'beijing',
        children: [
          {
            label: '朝阳区',
            value: 'chaoyang',
            children: [
              {
                label: '朝阳公园',
                value: 'chaoyangpark'
              }
            ]
          }
        ]
      }
    ]
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
            type: 'el-input'
          },
          {
            type: 'el-dvider'
          },
          { label: 'el-input-number', prop: 'age', type: 'el-input-number', itemProps: { labelWidth: 200 } },
          {
            label: 'el-tree-select',
            prop: 'el-tree-select',
            type: 'el-tree-select',
            options: [
              {
                value: '1',
                label: 'Level one 1',
                children: [
                  {
                    value: '1-1',
                    label: 'Level two 1-1',
                    children: [
                      {
                        value: '1-1-1',
                        label: 'Level three 1-1-1'
                      }
                    ]
                  }
                ]
              }
            ]
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
            type: 'el-slider'
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
            options: [
              { label: '北京', value: 'beijing' },
              { label: '上海', value: 'shanghai' },
              { label: '广州', value: 'guangzhou' }
            ]
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
            size: 'auto',
            type: 'table',
            props: {
              columns: [
                { label: '姓名', prop: 'name' },
                { label: '年龄', prop: 'age' },
                { label: '性别', prop: 'sex' }
              ],
              data: [
                { name: '张三', age: 20, sex: '男' },
                { name: '李四', age: 21, sex: '女' },
                { name: '王五', age: 22, sex: '男' }
              ]
            }
          }
        ]
      }
    ]
  }
])

const form = ref({
  name: '',
  age: 0,
  sex: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { min: 0, max: 100, message: '年龄必须在 0 到 100 之间', trigger: 'blur' }
  ]
})
</script>

<template>
  <div class="FormDemo p-[50px]">
    <VForm ref="formRef" v-model:model="form" :rules="rules" :schema="schema"></VForm>
  </div>
</template>

<style scoped lang="scss"></style>

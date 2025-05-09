export const options = Array.from({ length: 100 }).map((_, i) => ({
  label: `选项${i + 1}`,
  value: `option${i + 1}`
}))

export const cascaderOptions = [
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
          },
          {
            label: '天安门',
            value: 'tiananmen'
          }
        ]
      }
    ]
  },
  {
    label: '深圳',
    value: 'shenzhen',
    children: [
      {
        label: '南山区',
        value: 'nanshan',
        children: [
          {
            label: '科技园',
            value: 'noihz'
          },
          {
            label: '南山区',
            value: 'nanshan'
          },
          {
            label: '深大',
            value: 'sdu'
          }
        ]
      }
    ]
  }
]

export const treeData = [
  {
    label: '一级 1',
    value: '0-1',
    children: [
      {
        label: '二级 1-1',
        value: '0-1-1',
        children: [
          {
            label: '三级 1-1-1',
            value: '0-1-1-1'
          }
        ]
      },
      {
        label: '二级 1-2',
        value: '0-1-2',
        children: [
          {
            label: '三级 1-2-1',
            value: '0-1-2-1'
          },
          {
            label: '三级 1-2-2',
            value: '0-1-2-2'
          }
        ]
      }
    ]
  },
  {
    label: '一级 2',
    value: '0-2',
    children: [
      {
        label: '二级 2-1',
        value: '0-2-1'
      },
      {
        label: '二级 2-2',
        value: '0-2-2'
      }
    ]
  }
]

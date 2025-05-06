const getDayRange = (date: Date, offset = 0) => {
  const d = new Date(date)
  d.setDate(d.getDate() + offset)
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59)
  return [start, end]
}

const getWeekRange = (date: Date, offset = 0) => {
  const d = new Date(date)
  d.setDate(d.getDate() + offset * 7 - d.getDay())
  const start = new Date(d)
  const end = new Date(d.setDate(d.getDate() + 6))
  end.setHours(23, 59, 59)
  return [start, end]
}

const getMonthRange = (date: Date, offset = 0) => {
  const d = new Date(date)
  d.setMonth(d.getMonth() + offset)
  const start = new Date(d.getFullYear(), d.getMonth(), 1)
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  end.setHours(23, 59, 59)
  return [start, end]
}

export const shortcuts = [
  {
    text: '今天',
    value: () => getDayRange(new Date())
  },
  {
    text: '昨天',
    value: () => getDayRange(new Date(), -1)
  },
  {
    text: '本周',
    value: () => getWeekRange(new Date())
  },
  {
    text: '上周',
    value: () => getWeekRange(new Date(), -1)
  },
  {
    text: '本月',
    value: () => getMonthRange(new Date())
  },
  {
    text: '上月',
    value: () => getMonthRange(new Date(), -1)
  },
  {
    text: '最近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 30)
      return [start, end]
    }
  },
  {
    text: '最近60天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 60)
      return [start, end]
    }
  }
]

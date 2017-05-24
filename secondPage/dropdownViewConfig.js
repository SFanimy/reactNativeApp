module.exports = {
  // 通用平台目录
  platform: {          // 顶部Dropdown目录集合
    key: 'plat',        // 用于数据请求参数key
    value: [{
      pName: '',        // 数据请求参数value
      name: '全平台',    // 顶部Dropdown标题显示
    },{
      pName: 'pc',
      name: 'PC端',
    },{
      pName: 'mob',
      name: '移动端',
    }],
    ajaxRequired: true, // 切换改drop时是否发送ajax请求，若非则仅切换不同展示字段
  },
  date: {
    key: 'type',
    value: [{
      pName: 'week',
      name: '最近7天',
    },{
      pName: 'month',
      name: '最近30天',
    }],
    ajaxRequired: true,
  },
}

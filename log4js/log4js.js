let s = {
    appenders: {
      out: { type: 'stdout' },//设置是否在控制台打印日志
      info: { type: 'file', filename: './logs/info.log' }
    },
    categories: {
      default: { appenders: [ 'out', 'info' ], level: 'info' }//去掉'out'。控制台不打印日志
    }
  }
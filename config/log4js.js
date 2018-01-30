let isPro = process.env.NODE_ENV === 'production'
const levelContainer = {
  'ALL': 'ALL',
  'TRACE': 'TRACE',
  'DEBUG': 'DEBUG',
  'INFO': 'INFO',
  'WARN': 'WARN',
  'ERROR': 'ERROR',
  'FATAL': 'FATAL',
  'OFF': 'OFF',
}
let level = levelContainer.DEBUG
let type = 'console'
if (isPro) {
  type = 'stdout'
  level = levelContainer.INFO
}
export default {
  appenders: {
    out: {
      type: type
    }, //设置是否在控制台打印日志  //stdout
    info: {
      type: 'file',
      filename: './logs/info.log'
    }
  },
  categories: {
    default: {
      appenders: ['out', 'info'],
      level: level
    } //去掉'out'。控制台不打印日志
  }
}
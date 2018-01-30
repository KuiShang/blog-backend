
import log4js from 'log4js'
// console.log(log4js)
// var log4js=require('log4js');
import log4js_config from '../config/log4js.js'
log4js.configure(log4js_config); 
var logger = log4js.getLogger('info')
export default logger
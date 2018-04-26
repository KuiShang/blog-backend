import express from 'express'
import './mongodb/db.js'
import config from './config'
import router from './routes/index.js'

// import winston from 'winston'
// import expressWinston from 'express-winston'
import chalk from 'chalk'
var cookieParser = require('cookie-parser')
var https = require('https')
var http = require('http')
var fs = require('fs')
// 同步读取密钥和签名证书
// var options = {
// 	key: fs.readFileSync('./keys/214592172780915.key'),
// 	cert: fs.readFileSync('./keys/214592172780915.pem')
// }
// import {
// 	verify
// } from './auth/auth'
const app = express()
app.use(cookieParser())
app.all('*', (req, res, next) => {
	// console.log(req)
	// console.log(res)
	res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH')
	res.header('Access-Control-Allow-Credentials', true) // 可以带cookies
	res.header('X-Powered-By', 'kk.5.2.1')
	// if (req.path !== 'auth') {
	//     if (!req.headers.Authorization) {
	//         res.send({
	//             status: 0,
	//             type: 'SAVE_USER_FAILED',
	//             message: 'NO TOKEN',
	//         })
	//     }
	//     verify(req.headers.Authorization, (err, decode) => {
	//         if (err) {
	//             res.json({err:err})
	//         } else {
	//             console.log(decode)
	//             next()
	//         }
	//     })
	// }
	if (req.method === 'OPTIONS') {
		res.sendStatus(200)
	} else {
		next()
	}
})

router(app)
app.use(express.static('./public'))

app.get('/', function (req, res) {
	console.log('Hello World!!')
	res.send('Hello World!!')
})

// var httpsServer = https.createServer(options, app)
var httpServer = http.createServer(app)

// https监听3000端口
// httpsServer.listen(443, () => {
// 	console.log(chalk.blue('Example app listening at http://%s:%s', 443))
// })
// http监听3001端口
httpServer.listen(config.port, () => {
	console.log(chalk.blue('Example app listening at http://%s:%s', config.port))
})

// var server = app.listen(config.port, () => {
// 	var host = server.address().address
// 	var port = server.address().port

// 	console.log(chalk.blue('Example app listening at http://%s:%s', host, port))
// })

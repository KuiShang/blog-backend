import express from 'express'
// import db from './mongodb/db.js'
import config from './config'
import router from './routes/index.js'
// import winston from 'winston'
// import expressWinston from 'express-winston'
import chalk from 'chalk'
var cookieParser = require('cookie-parser');
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
		res.send(200)
	} else {
		next()
	}
})

router(app)
app.use(express.static('./public'))

app.get('/', function (req, res) {
	console.log(12)
	res.send('Hello World!')
})
var server = app.listen(config.port, () => {
	var host = server.address().address
	var port = server.address().port

	chalk.green('Example app listening at http://%s:%s', host, port)
})

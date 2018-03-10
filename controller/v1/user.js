import UserModel from '../../models/v1/user'
import {
	getToken
} from '../../auth/auth'
import formidable from 'formidable'
class User {
	async getToken (req, res, next) {
		console.log('token comming')
		const form = new formidable.IncomingForm()
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: 10010,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
			const {
				username,
				password
			} = fields
			try {
				const user = await UserModel.findOne({
					username
				})
				if (!user) {
					res.json({
						success: false,
						message: '认证失败，用户名找不到'
					})
				} else if (user) {
					if (user.password !== password) {
						res.json({
							success: false,
							message: '认证失败，密码错误'
						})
					} else {
						res.cookie('user', {
							username: username
						}, {
							maxAge: 600000,
							httpOnly: false
						})
						var token = getToken(user)
						// var token = '123123'
						// json格式返回token
						res.json({
							success: true,
							message: 'Enjoy your token!',
							token: token
						})
					}
				}
			} catch (error) {
				console.log('用户登陆失败', error)
				res.send({
					status: 0,
					type: 'SAVE_USER_FAILED',
					message: '登陆失败'
				})
			}
		})
	}
	async getUserInfo (req, res, next) {
		console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
		console.log(req.cookies)
		// let username = req.cookies.user.username
		let username = 'kk'
		try {
			const user = await UserModel.findOne({
				username
			})
			res.json({
				success: true,
				data: user,
				status: 0
			})
		} catch (error) {
			res.send({
				status: 10002,
				type: 'SAVE_USER_FAILED',
				message: '登陆失败'
			})
		}
	}
}
export default new User()

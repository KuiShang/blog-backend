import UserModel from '../../models/v1/user'
import {getToken} from '../../auth/auth'
import formidable from 'formidable'
class User {
    constructor() {

    }
    async getToken(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files) => {
            const {
                username,
                password
            } = fields;
            try {
                const user = await UserModel.findOne({
                    username
                })
                if (!user) {
                    res.json({
                        success: false,
                        message: '认证失败，用户名找不到'
                    });
                } else if (user) {
                    if (user.password != password) {
                        res.json({
                            success: false,
                            message: '认证失败，密码错误'
                        })
                    } else {
                        var token = getToken(user)
                        // json格式返回token
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            } catch (error) {
                console.log('用户登陆失败', error);
				res.send({
					status: 0,
					type: 'SAVE_USER_FAILED',
					message: '登陆失败',
				})
            }
 
        })

    }
    async getUserInfo(req, res, next) {
        const user = await UserModel.findOne({
            username
        })
        res.json({
            success: true,
            message: JSON.stringify(user),
            token: token
        });
    }
}
export default new User()
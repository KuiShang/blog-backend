import UserModel from '../../models/v1/user'
import jwt from 'jsonwebtoken'
class User {
    constructor() {

    }
    async token(req, res, next) {
        let username = req.body.username
        let password = req.body.password
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
                var token = jwt.sign(user, 'app.get(superSecret)', {
                    'expiresInMinutes': 1440 // 设置过期时间
                })

                // json格式返回token
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }
    }
}
export default new User()
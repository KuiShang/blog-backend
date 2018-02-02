import jwt from 'jsonwebtoken'
const privateKey = 'i am privateKey for kk'
const getToken = (user) => {
	return jwt.sign(JSON.stringify(user), privateKey)
}
const verify = (token, cb) => {
	jwt.sign(token, privateKey, (err, decode) => {
		cb(err, decode)
	})
}
export {
	getToken,
	verify
}

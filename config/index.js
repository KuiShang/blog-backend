module.exports = {
	port: 9528,
	// url: 'mongodb://kk_blog:kk_123@localhost:27017/blog',
	url: 'mongodb://kk_blog:kk_123@ddb/blog',
	// url: 'mongodb://localhost:27017/blog',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 365 * 24 * 60 * 60 * 1000
		}
	}
}

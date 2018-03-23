
let url
if (process.env.NODE_ENV === 'production') {
	url = 'mongodb://kk_blog:kk_123@mongodb/blog'
} else {
	url = 'mongodb://kk_blog:kk_123@localhost:27017/blog'
}

module.exports = {
	port: 9528,
	// url: 'mongodb://kk_blog:kk_123@localhost:27017/blog',
	url: url,
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

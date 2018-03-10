import data from '../../mock'
class Article {
	getList (req, res, next) {
		res.json(data.articlelist)
	}
	getRender (req, res, next) {
		res.json(data.render)
	}
}
export default new Article()

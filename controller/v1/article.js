import ArticleModel from '../../models/v1/article'
import formidable from 'formidable'
import BaseControl from '../base/baseControl'
import logger from '../../log4js'
class Article extends BaseControl {
	constructor () {
		super()
		this.save = this.save.bind(this)
		this.getList = this.getList.bind(this)
		this._addCatalogName = this._addCatalogName.bind(this)
		this._addTagName = this._addTagName.bind(this)
		this.getArticle = this.getArticle.bind(this)
	}
	async getList (req, res, next) {
		try {
			logger.debug('请求参数:', req.query)
			let page_size = Number(req.query.page_size)
			let current_page = Number(req.query.current_page)
			if (current_page !== 0) {
				current_page = current_page - 1
			}

			function getArticle () {
				return ArticleModel.find({})
					.skip(current_page * page_size)
					.limit(page_size)
			}

			function getCount () {
				return ArticleModel.count({})
			}
			let [articleArr, total] = await Promise.all([getArticle(), getCount()])
			logger.debug('articleArr:', articleArr)
			logger.debug('total:', total)
			let articleArrTemp = await this._addCatalogName(articleArr)
			let article_arr = await this._addTagName(articleArrTemp)
			let data = {
				total,
				'current_page': current_page + 1,
				page_size,
				'data': article_arr
			}
			logger.debug('文章列表:', data)
			res.json({
				success: true,
				data: data,
				status: 0
			})
		} catch (error) {
			logger.error(error)
			res.send({
				status: 10006,
				type: 'SAVE_ARTICLE_FAILED',
				message: '查询文章失败'
			})
		}
	}
	async save (req, res, next) {
		const form = new formidable.IncomingForm()
		try {
			form.parse(req, async (err, fields, files) => {
				if (err) {
					res.send({
						status: 10010,
						type: 'FORM_DATA_ERROR',
						message: '表单信息错误'
					})
					return
				}
				logger.info(fields)
				let create_time, modify_time
				create_time = modify_time = Date.now()
				let id = this.uuid()
				fields = { ...fields,
					create_time,
					modify_time,
					id
				}
				// ArticleModel.create(fields, (err, article) => {
				//     if (err) {
				//         console.log(err)
				//         res.send({
				//             status: 10005,
				//             type: 'SAVE_ARTICLE_FAILED',
				//             message: '保存文章失败',
				//         })
				//     } else {
				//         res.send({
				//             status: 0,
				//             success: true,
				//             data: article
				//         })
				//     }
				// })
				// ArticleModel.saveContent({content:fields.content, 'article_id': id})
				// let ret = await ArticleModel.create(fields)
				let [article] = await Promise.all(
					[ArticleModel.create(fields),
						ArticleModel.saveContent({
							content: fields.content,
							'article_id': id
						}),
						ArticleModel.saveToCatalog(fields.catalog_id, fields.id),
						ArticleModel.saveToTag(fields.tag_ids, fields.id)
					])
				res.send({
					status: 0,
					success: true,
					data: article
				})
				logger.info(article)
			})
		} catch (error) {
			res.send({
				status: 10004,
				type: 'SAVE_ARTICLE_FAILED',
				message: '发布文章失败'
			})
		}
	}
	async _addCatalogName (articleArr) {
		// articleArr.forEach ( async (article,idx) => {
		//     let catalog_id = article.catalog_id
		//     let ret = await ArticleModel.getCatalogNameById(catalog_id)
		//     let name = ret[0].name
		//     let ob = article.toObject()
		//     ob.catalog_name = name
		//     arr.push(ob)
		// })
		// arr.push(1)
		// console.log(arr)
		// return arr

		let arr = []
		for (let article of articleArr) {
			let query_ret = await ArticleModel.getCatalogNameById(article.catalog_id)
			logger.info('根据标签id取得标签名称:', query_ret)
			let name = query_ret[0] && query_ret[0].name
			let article_copy = article.toObject()
			article_copy.catalog_name = name
			arr.push(article_copy)
		}
		// console.log(arr)
		return arr

		// let promises = articleArr.map((arrticle) => ArticleModel.getCatalogNameById(arrticle.catalog_id));
		// let results = await Promise.all(promises);
		// console.log(results);
		// console.log(articleArr)
		// console.log(arr)
		// return arr
	}
	async _addTagName (articleArr) {
		for (let article of articleArr) {
			let arr = []
			for (let tagId of article.tag_ids) {
				let tagObj = {}
				let query_ret = await ArticleModel.getTagNameById(tagId)
				tagObj.id = tagId
				tagObj.name = query_ret[0].name
				arr.push(tagObj)
			}
			article.tags = arr
		}
		return articleArr
	}
	async deleteById (req, res, next) {
		try {
			let id = req.params.id
			logger.debug('article-id:', id)
			// let ret = await ArticleModel.remove({
			//     id
			// }).exec()
			// ArticleModel.removeContent(id)
			let [article_ret] = await Promise.all([ArticleModel.remove({id}).exec(),
				ArticleModel.removeContent(id)
			])
			res.send({
				status: 0,
				data: article_ret,
				success: true
			})
		} catch (error) {
			logger.error(error)
			res.send({
				status: 10007,
				type: 'DELETE_ARTICLE_FAILED',
				message: '删除文章失败'
			})
		}
	}
	async patch (req, res, next) {
		try {
			let id = req.params.id
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
				let key = Object.keys(fields)[0]
				let value = Object.values(fields)[0]
				logger.info(fields)
				let ret = await ArticleModel.update({
					id
				}, {
					[key]: value
				})
				logger.debug(ret)
				res.send({
					status: 0,
					success: true,
					data: ret
				})
			})
		} catch (error) {
			logger.error(error)
			res.send({
				status: 10008,
				type: 'PATH_ARTICLE_FAILED',
				message: '修改失败'
			})
		}
	}
	async getArticle (req, res, next) {
		try {
			let id = req.params.id
			logger.debug(id)
			// let ret = await ArticleModel.find({
			//     id
			// })
			// let content = ArticleModel.getContent({id})
			let [article, content] = await Promise.all([ArticleModel.find({
				id
			}), ArticleModel.getContent({
				'article_id': id
			})])
			let articleArrTemp = await this._addCatalogName(article)
			let article_arr = await this._addTagName(articleArrTemp)
			let arrticle = article_arr[0]
			arrticle.content = content.content
			logger.debug(arrticle)
			res.send({
				status: 0,
				success: true,
				data: arrticle
			})
		} catch (error) {
			logger.error(error)
			res.send({
				status: 10009,
				type: 'GET_ARTICLE_FAILED',
				message: '获取文章失败'
			})
		}
	}
	async put (req, res, next) {
		const form = new formidable.IncomingForm()
		try {
			form.parse(req, async (err, fields, files) => {
				if (err) {
					res.send({
						status: 10010,
						type: 'FORM_DATA_ERROR',
						message: '表单信息错误'
					})
					return
				}
				logger.info('fields', fields)
				let modify_time = Date.now()
				let id = fields.id
				fields = { ...fields,
					modify_time
				}
				let [article] = await Promise.all([ArticleModel.update({
					id
				}, fields), ArticleModel.updateContent(id, fields.content)])
				res.send({
					status: 0,
					success: true,
					data: article
				})
				logger.info('article', article)
			})
		} catch (error) {
			res.send({
				status: 10010,
				type: 'MODIFY_ARTICLE_FAILED',
				message: '修改文章失败'
			})
		}
	}
}

export default new Article()

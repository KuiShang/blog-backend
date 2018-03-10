import TagModel from '../../models/v1/tag'
import formidable from 'formidable'
import logger from '../../log4js'
class Tag {
	async getTagList (req, res, next) {
		try {
			const tag = await TagModel.find()
			res.json({
				success: true,
				data: tag,
				status: 0
			})
		} catch (error) {
			res.send({
				status: 10004,
				type: 'SAVE_TAG_FAILED',
				message: '查询标签失败'
			})
		}
	}
	async addTag (req, res, next) {
		const form = new formidable.IncomingForm()
		try {
			form.parse(req, async (err, fields, files) => {
				logger.info(fields)
				if (err) {
					res.send({
						status: 10010,
						type: 'FORM_DATA_ERROR',
						message: '表单信息错误'
					})
					return
				}
				let ret = await TagModel.create(fields)
				res.send({
					status: 0,
					success: true,
					data: ret
				})
			})
		} catch (error) {
			res.send({
				status: 10021,
				type: 'ADD_CATALOG_FAILED',
				message: '添加标签失败'
			})
		}
	}
	async getTag (req, res, next) {
		try {
			let id = req.params.id
			logger.debug(id)
			let ret = await TagModel.findOne({
				'_id': id
			})
			logger.debug(ret)
			res.send({
				status: 0,
				success: true,
				data: ret
			})
		} catch (error) {
			logger.error(error)
			res.send({
				status: 10023,
				type: 'GET_ARTICLE_FAILED',
				message: '获取标签失败'
			})
		}
	}
	async put (req, res, next) {
		const form = new formidable.IncomingForm()
		let id = req.params.id
		try {
			form.parse(req, async (err, fields, files) => {
				logger.info('fields', fields)
				if (err) {
					res.send({
						status: 10010,
						type: 'FORM_DATA_ERROR',
						message: '表单信息错误'
					})
					return
				}
				let ret = await TagModel.update({
					'_id': id
				}, fields)
				res.send({
					status: 0,
					success: true,
					data: ret
				})
				logger.info('ret', ret)
			})
		} catch (error) {
			res.send({
				status: 10010,
				type: 'MODIFY_ARTICLE_FAILED',
				message: '修改标签失败'
			})
		}
	}
}

export default new Tag()

import CatalogModel from '../../models/v1/catalog'
import formidable from 'formidable'
import logger from '../../log4js'
class Catalog {
	async getCatalogList (req, res, next) {
		try {
			const catalog = await CatalogModel.find()
			res.json({
				success: true,
				data: catalog,
				status: 0
			})
		} catch (error) {
			res.send({
				status: 10021,
				type: 'SAVE_CATALOG_FAILED',
				message: '查询目录失败'
			})
		}
	}
	async addCatalog (req, res, next) {
		const form = new formidable.IncomingForm();
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
				let create_time, modify_time
				create_time = modify_time = Date.now()
				fields = { ...fields,
					create_time,
					modify_time
				}
				let ret = await CatalogModel.create(fields)
				res.send({
					status: 0,
					success: true,
					data: ret
				})
			})
		} catch (error) {
			res.send({
				status: 10012,
				type: 'ADD_CATALOG_FAILED',
				message: '添加目录失败'
			})
		}
	}
	async getCatalog (req, res, next) {
		try {
			let id = req.params.id
			logger.debug(id)
			let ret = await CatalogModel.findOne({
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
				message: '获取目录失败'
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
				let modify_time = Date.now()
				fields = { ...fields,
					modify_time
				}
				let ret = await CatalogModel.update({
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
				message: '修改目录失败'
			})
		}
	}
}

export default new Catalog()

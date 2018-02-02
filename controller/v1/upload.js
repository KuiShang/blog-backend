import formidable from 'formidable'
import path from 'path'
import BaseControl from '../base/baseControl'
import fs from 'fs'
import logger from '../../log4js'
// import { error } from 'util'
class Upload extends BaseControl {
	constructor () {
		super()
		this.upload = this.upload.bind(this)
		this._getPath = this._getPath.bind(this)
	}
	async upload (req, res, next) {
		try {
			const image_path = await this._getPath(req, res, next)
			res.send({
				status: 0,
				image_path,
				success: true
			})
		} catch (error) {
			res.send({
				status: 10004,
				type: 'SAVE_TAG_FAILED',
				message: '查询标签失败'
			})
		}
	}
	async _getPath (req, res, next) {
		return new Promise((resolve, reject) => {
			const form = formidable.IncomingForm()
			let uploadDir = path.join(__dirname, '/../../public/upload/')
			logger.info('__dirname', __dirname)
			logger.info('uploadDir', uploadDir)
			form.uploadDir = uploadDir
			form.parse(req, async (err, fields, files) => {
				logger.info(files)
				if (err) {
					res.send({
						status: 10010,
						type: 'FORM_DATA_ERROR',
						message: '表单信息错误'
					})
					return
				}
				const imgName = this.uuid()
				const fullName = imgName + path.extname(files.file.name)
				const repath = uploadDir + fullName
				try {
					await fs.rename(files.file.path, repath)
					resolve(fullName)
				} catch (err) {
					console.log('保存图片失败', err)
					fs.unlink(files.file.path)
					reject(new Error('保存图片失败'))
				}
			})
		})
	}
}

export default new Upload()

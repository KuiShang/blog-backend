import ContentModel from '../../models/v1/content'
class Content {
	async getTagList (req, res, next) {
		try {} catch (error) {
			console.log(ContentModel)
			res.send({
				status: 10004,
				type: 'SAVE_TAG_FAILED',
				message: '查询标签失败'
			})
		}
	}
}

export default new Content()

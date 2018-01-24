import TagModel from '../../models/v1/tag'
class Tag {
    constructor() {
    }
    async getTagList(req, res, next) {
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
                message: '查询标签失败',
            })
        }
    }
}

export default new Tag()
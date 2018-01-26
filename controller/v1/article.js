import ArticleModel from '../../models/v1/article'
import formidable from 'formidable'
class Catalog {
    constructor() {
    }
    async getList(req, res, next) {
        try {
          let pageSize = req.query.pageSize
          let currentPage =req.query.currentPage
          const article = await ArticleModel
          .find({})
          .skip(currentPage)
          .limit(pageSize)
          res.json({
            success: true,
            data: article,
            status: 0
          })
        } catch (error) {
            res.send({
                status: 10004,
                type: 'SAVE_ARTICLE_FAILED',
                message: '查询文章失败',
            })
        }
    }
    async publish(req, res, next) {
        const form = new formidable.IncomingForm();
        try {
         form.parse(req, async(err, fields, files) => {
            console.log(fields)

         })
        } catch (error) {
            res.send({
                status: 10004,
                type: 'SAVE_ARTICLE_FAILED',
                message: '发布文章失败',
            })
        }
    }
}

export default new Catalog()
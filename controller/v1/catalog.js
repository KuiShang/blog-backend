import CatalogModel from '../../models/v1/catalog'
class Catalog {
    constructor() {
    }
    async getCatalogList(req, res, next) {
        try {
          const catalog = await CatalogModel.find()
          res.json({
            success: true,
            data: catalog,
            status: 0
          })
        } catch (error) {
            res.send({
                status: 10003,
                type: 'SAVE_CATALOG_FAILED',
                message: '查询目录失败',
            })
        }
    }
}

export default new Catalog()
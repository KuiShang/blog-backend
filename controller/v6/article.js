class Article {
    constructor () {

    }
    getList (req, res, next) {
        res.json({
            success: 'sucess',
            message: 'lsit lsit用户名找不到'
        });
    }
}

export default new Article()
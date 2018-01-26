import express from 'express'
import user from '../controller/v1/user'
import catalog from '../controller/v1/catalog'
import tag from '../controller/v1/tag'
import article from '../controller/v1/article'
const router = express.Router();
router.post('/token', user.getToken);
router.get('/userinfo', user.getUserInfo)
router.get('/catalog/list', catalog.getCatalogList)
router.get('/tag/list', tag.getTagList)
router.post('/article/publish', article.publish)
router.get('/article/list', article.getList)
export default router
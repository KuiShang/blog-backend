import express from 'express'
import user from '../controller/v1/user'
import catalog from '../controller/v1/catalog'
import tag from '../controller/v1/tag'
const router = express.Router();
router.post('/token', user.getToken);
router.get('/userinfo', user.getUserInfo)
router.get('/catalog/list', catalog.getCatalogList)
router.get('/tag/list', tag.getTagList)
export default router
import express from 'express'
import user from '../controller/v1/user'
import catalog from '../controller/v1/catalog'
const router = express.Router();
router.post('/token', user.getToken);
router.get('/userinfo', user.getUserInfo)
router.get('/catalog/list', catalog.getCatalogList)
export default router
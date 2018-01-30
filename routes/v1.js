import express from 'express'
import user from '../controller/v1/user'
import catalog from '../controller/v1/catalog'
import tag from '../controller/v1/tag'
import article from '../controller/v1/article'
import upload from '../controller/v1/upload'
const router = express.Router();
// 登录
router.post('/token', user.getToken);
router.get('/userinfo', user.getUserInfo)

// 目录
router.get('/catalog/list', catalog.getCatalogList)

// 标签
router.get('/tag/list', tag.getTagList)

// 文章相关
router.post('/article', article.save)
router.get('/article', article.getList)
router.delete('/article/:id', article.deleteById)
router.patch('/article/:id', article.patch)

// 图片上传
router.post('/upload', upload.upload)
export default router
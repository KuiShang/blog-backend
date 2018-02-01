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
router.get('/catalog', catalog.getCatalogList)

// 标签
router.get('/tag/list', tag.getTagList)

/*---------文章相关----------*/
// 添加文章
router.post('/article', article.save)
// 获取文章列表
router.get('/article', article.getList)
// 获取一篇文章
router.get('/article/:id', article.getArticle)
// 删除一篇文章
router.delete('/article/:id', article.deleteById)
// 修改一篇文章单个属性
router.patch('/article/:id', article.patch)
// 修改一篇文章全部重新提交
router.put('/article/', article.put)

// 图片上传
router.post('/upload', upload.upload)
export default router
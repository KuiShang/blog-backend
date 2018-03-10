import express from 'express'
import user from '../controller/v1/user'
import catalog from '../controller/v1/catalog'
import tag from '../controller/v1/tag'
import article from '../controller/v1/article'
import upload from '../controller/v1/upload'
const router = express.Router()
// 登录
router.post('/token', user.getToken)
router.get('/userinfo', user.getUserInfo)

/*  ---------目录---------- */
// 获取所有目录
router.get('/catalog', catalog.getCatalogList)
// 添加一个目录
router.post('/catalog', catalog.addCatalog)
// 获取一个目录
router.get('/catalog/:id', catalog.getCatalog)
// 修改一个目录
router.put('/catalog/:id', catalog.put)

/*  ---------标签----------   */
// 获取所有标签
router.get('/tag', tag.getTagList)
// 添加一个标签
router.post('/tag', tag.addTag)
// 获取一个标签
router.get('/tag/:id', tag.getTag)
// 修改一个标签
router.put('/tag/:id', tag.put)

/*  ---------文章相关---------- */
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
router.put('/article/:id', article.put)

// 图片上传
router.post('/upload', upload.upload)
export default router

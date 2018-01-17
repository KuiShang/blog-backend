import express from 'express'
import article from '../controller/v6/article'

const router = express.Router()
router.get('/article/list', article.getList)
router.get('/article/render/:id', article.getRender)
export default router
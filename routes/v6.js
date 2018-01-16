import express from 'express'
import article from '../controller/v6/article'

const router = express.Router();
router.get('/article/list', article.getList);
export default router
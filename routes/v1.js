import express from 'express'
import user from '../controller/v1/user'

const router = express.Router();
router.post('/token', user.token);
export default router
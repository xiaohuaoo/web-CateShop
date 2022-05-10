import express from 'express'
import userRouter from './user'

require('../db/db')
const router = express.Router()

router.use('/user',userRouter)

export default router

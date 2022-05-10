import express from 'express'
import config from './config'
import indexRouter from '../routes/index'

import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import cookieParser from 'cookie-parser'
// 输出摩根日志
import logger from 'morgan'
import 'default-passive-events'

const app = express()

// 解决跨域问题
app.use(cors({
    origin: config.cors,
    credentials: true
}))

app.use(cookieParser())

//使用session保存用户的登录状况
app.use(session({
    secret: config.secret,
    name: 'connect.sid',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config.maxAge
    }
}))

// 请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

//静态资源处理
app.use(express.static(config.publicPath))
app.use('/uploads', express.static(__dirname + '/public/uploads'))

app.use('/',indexRouter)

app.listen(config.port, ()=>{
    console.log('server running at port'+`${config.port}`)
})
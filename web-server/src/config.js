import path from 'path'
export default{
	publicPath: path.join(__dirname, '../public'),	//静态资源路径
    uploadsAvatarPath: path.join(__dirname, '../public/uploads'), // 用户头像上传放置的位置
    host: 'localhost:27017', // 数据库地址
    user: '', // 数据库用户名
    password: '', // 数据库密码
    database: 'cateshop', // 数据库名称
    cors: ['http://localhost:8080'], // 前端跨域请求地址
    port: 3000, // 监听的端口号
    secret: 'a1962400598@163.com',
    maxAge: 1000 * 60 * 60 * 6	,//session保存6个小时
	email: {
	    service: 'xxxxxxx',  //邮箱服务商
	    user: 'xxxxxxxxx',	//发送验证码的邮箱
	    pass: 'xxxxxxxxx',  //邮箱服务密匙
	}
}
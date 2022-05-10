import express from 'express'
import config from '../src/config.js'
import md5 from 'md5'
import path from 'path'
// import multer from 'multer'

import {
    User,
    Homecasual,
    AboutGoods,
    Goods,
    pictureGoods,
    Order,
    Cart,
    Chart,
    Cook,
    Book
} from '../db/db'

import {
	sendMail,
	randomNum
} from '../util/util'

const router = express.Router();

const SECRET_PASSWD = 'xiaohuaoo' 

//验证邮箱
router.get('/sendmail', (req, res) => {
	let userEmail = req.query.userEmail;
	let confirmMes = randomNum();
	req.session.userEmail = req.query.userEmail;
	req.session.confirmMes = confirmMes;
	console.log("验证码："+ confirmMes)
	sendMail(userEmail, '欢迎注册AirFish电商网站！', `您的注册验证码是:${confirmMes}`);
	res.json({
		status_code: 200,
		message: '验证码已发送'
	})
})

// 获取轮播图
router.get('/gethomecasual', async (req, res) => {
	let result = await Homecasual.find({}).sort('homecasualId');
	res.json({
		status_code: 200,
		message: '获取轮播图成功',
        total: result.length,
		homecasual: result
	})
})

// 用户注册
router.post('/register', async (req,res) => {
    let regForm = req.body;
    // console.log(regForm)
    if(regForm.confirmMes === req.session.confirmMes&&regForm.userEmail === req.session.userEmail){
        User.create({
            userName: regForm.userName,
            password: md5(md5(regForm.password) + SECRET_PASSWD), //加密密码
            userEmail: regForm.userEmail,
            userPhone: regForm.tel
        }, (err, doc)=> {
            if (!err) {
                res.json({
                    status_code: 200,
                    message: '注册成功'
                })
            } else {
                res.json({
					status_code: 400,
					message: '内部错误,注册失败'
				})
            }
        })
    }else {
        res.json({
            status_code: 400,
            message: '注册失败'
        })
    }
})

//检查邮箱是否已注册
router.get('/checkemail', async (req, res) => {
	let userEmail = req.query.userEmail;
	let isEmailReg = await User.findOne({
		userEmail
	})
	if (isEmailReg) {
		res.json({
			status_code: 400,
			message: '邮箱已注册'
		})
	} else {
		res.json({
			status_code: 200,
			message: '邮箱可以使用'
		})
	}
})

// 用户登录
router.post('/userLogin', async (req,res) => {
    let userName = req.body.userName;
	let userPsw = md5(md5(req.body.password) + SECRET_PASSWD);
	let resultName = await User.findOne({
		userName
	})
	let resultEmail = await User.findOne({
		userEmail: userName
	})
	if (resultName || resultEmail) {
		if (resultName) {
			if (userPsw === resultName.password) {
				req.session.user = resultName.userName;
				res.json({
					status_code: 200,
					message: '登录成功',
					userName: resultName.userName
				})
			} else {
				res.json({
					status_code: 400,
					message: '密码错误'
				})
			}
		} else {
			if (userPsw === resultEmail.password) {
				req.session.user = resultEmail.userName;
				res.json({
					status_code: 200,
					message: '登录成功',
					userName: resultEmail.userName
				})
			} else {
				res.json({
					status_code: 400,
					message: '密码错误'
				})
			}
		}
	} else {
		res.json({
			status_code: 400,
			message: '用户名或邮箱不存在'
		})
	}
})

// 验证是否是用户
router.get('/isUser', async (req,res) => {
    if (!req.session.user) {
        res.json({
            status_code: 400,
            message: '请先登陆！'
        })
    }else {
        let result = await User.findOne({
            userName: req.session.user
        })
        res.json({
			status_code: 200,
			message: '登录状态',
			userInfo: result,
			userName: result.nickName || req.session.user
		})
    }
})

// 用户退出登录
router.get('/userLogout', async (req,res) => {
    req.session.user = '';
	res.json({
		status_code: 200,
		message: '已退出登录'
	})
})

// const upload = multer({dest: __dirname + '/public/uploads'})
// // 用户上传头像
// router.post('/upload', upload.single('file'), async (req, res) => {
//     const file = req.file
//     file.url = `$/http://localhost:3000/public/uploads/${file.filename}`
//     console.log(file)
//     res.send(file)
// })

// 得到用户个人信息
router.get('/usersettingsinfo', async (req, res) => {
    let userName = req.session.user
    // console.log(userName)
    const result = await User.find({
        userName
    })
    if (result) {
       res.json({
          status_code: 200,
          message: '已找到该用户信息',
          userInfo: result
        }) 
    } else {
        res.json({
          status_code: 400,
          message: '未找到该用户信息'
        }) 
    }
})

// 设置用户个人信息
router.post('/userchangeinfo', async (req, res)=> {
    let result = req.body
    result.uploadDir = config.uploadsAvatarPath; // 上传图片放置的文件夹
    let userInfo = {
        userName: result.userName,
        password: result.password,
        userEmail: result.userEmail,
        userPhone: result.userPhone,
        userAvatar: result.userAvatar
    }
    console.log(result)
    if (result.userAvatar) {
        let avatar = 'http://localhost:' + config.port + '/uploads/' + path.basename(result.userAvatar.path);
        userInfo.userAvatar = avatar
    }
    User.updateOne({
        userName: result.userName
    }, userInfo).then((doc) => {
        res.json({
            status_code: 200,
            message: '修改用户成功',
        })
    }).catch((err) => {
        res.json({
            status_code: 400,
            message: '内部错误,修改用户信息失败',
        })
    })
})

// 获取图表数据
router.get('/userchartdata', async (req, res) => {
    let userName = req.session.user
    console.log(userName)
    const result = await Chart.find({
        userName
    })
    // const chartInfo = await User.find({
    //     userName
    // })
    // console.log(chartInfo)
    // if (result&&chartInfo) {
    if (result) {
       res.json({
          status_code: 200,
          message: '已找到该用户图表信息',
          chartdatalist: result
        })
    // } else if (result){
    //     Chart.create({
    //       userName: userName,
    //       dataTrendList: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    //       dataKindList: [10, 10, 10, 10, 10],
    //       dataPreference: [10, 10, 10, 10, 10]
    //     })
    //     res.json({
    //       status_code: 200,
    //       message: '已创建该用户图表信息'
    //     })
    // } else {
    //     Chart.create({
    //       userName: userName,
    //       dataTrendList: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    //       dataKindList: [10, 10, 10, 10, 10],
    //       dataPreference: [10, 10, 10, 10, 10]
    //     })
    //     res.json({
    //       status_code: 200,
    //       message: '已创建新用户图表信息'
    //     })
    }
})

// 获取关于我们商品列表
router.get('/getaboutgoodslist', async (req, res) => {
    let result;
    if (req.query.aboutgoodsId) {
        let resultId = await AboutGoods.find({
            aboutgoodsId: req.query.aboutgoodsId
        })
        let resultName = await AboutGoods.find({
            goodsName: {
                $regex: req.query.aboutgoodsId,
                $options: 'gi'
            }
        })
        if (resultId.length != 0) {
            result = resultId
        } else {
            result = resultName
        }
    } else {
        result = await AboutGoods.find({})
    }
    res.json({
		status_code: 200,
		message: '获取分类列表成功',
		total: result.length,
		aboutgoodslist: result
	})
})

// 获取菜单列表
router.get('/getgoodslist', async (req, res) => {
    let result;
    if (req.query.goodsId) {
        let resultId = await Goods.find({
            goodsId: req.query.goodsId
        })
        let resultName = await Goods.find({
            goodsName: {
                $regex: req.query.goodsId,
                $options: 'gi'
            }
        })
        if (resultId.length != 0) {
            result = resultId
        } else {
            result = resultName
        }
    } else {
        result = await Goods.find({})
    }
    res.json({
		status_code: 200,
		message: '获取分类列表成功',
		total: result.length,
		goodslist: result
	})
})

// 获取图片列表
router.get('/getpicturegoodslist', async (req, res) => {
    let result;
    if (req.query.picturegoodsId) {
        let resultId = await pictureGoods.find({
            picturegoodsId: req.query.picturegoodsId
        })
        let resultName = await pictureGoods.find({
            goodsName: {
                $regex: req.query.picturegoodsId,
                $options: 'gi'
            }
        })
        if (resultId.length != 0) {
            result = resultId
        } else {
            result = resultName
        }
    } else {
        result = await pictureGoods.find({})
    }
    res.json({
		status_code: 200,
		message: '获取分类列表成功',
		total: result.length,
		picturegoodslist: result
	})
})

// 获取厨师列表
router.get('/cookslist', async (req, res) => {
    let result;
    if (req.query.cookId) {
        let resultId = await Cook.find({
            cookId: req.query.cookId
        })
        let resultName = await Cook.find({
            cooksName: {
                $regex: req.query.cookId,
                $options: 'gi'
            }
        })
        if (resultId.length != 0) {
            result = resultId
        } else {
            result = resultName
        }
    } else {
        result = await Cook.find({})
    }
    res.json({
		status_code: 200,
		message: '获取厨师列表成功',
		total: result.length,
		cooks: result
	})
})

// 发送预约表单
router.post('/postbooklist', async (req, res)=> {
    let bookListInfo = req.body;
    let result = await Book.find({
        userName: bookListInfo.userName
    })
    console.log(bookListInfo);
    console.log(result);
    if (result.length) {
        res.json({
			status_code: 400,
			message: '您已经预约过'
        })
    } else {
        Book.create(bookListInfo, async (err, doc)=> {
            if (!err) {
                // 更新预约表单
                await Book.find({
                    userName: bookListInfo.userName
                })
                res.json({
					status_code: 200,
					message: '预约成功'
				})
            } else {
                res.json({
					status_code: 400,
					message: '内部错误,预约失败'
				})
            }
        })
    }
})

//添加商品到购物车
router.post('/addgoodstocart', async (req, res) => {
	let cartInfo = req.body;
	console.log(cartInfo);
	let result = await Cart.find({
		goodsId: cartInfo.goodsId,
		userName: cartInfo.userName,
		goodsSize: cartInfo.goodsSize
	});
	if (result.length) {
		let count = Number(result[0].buyCounts) + Number(cartInfo.buyCounts)
		Cart.updateOne({
			userName: cartInfo.userName,
			goodsId: cartInfo.goodsId
		}, {
			buyCounts: count
		}).then(doc => {
			console.log(doc)
			res.json({
				status_code: 200,
				message: '购物车存在该商品,已更新数量'
			})
		})
	} else {
		Cart.create(cartInfo, (err, doc) => {
			if (!err) {
				res.json({
					status_code: 200,
					message: '添加购物车成功',
				})
			} else {
				res.json({
					status_code: 400,
					message: '内部错误,添加购物车失败',
				})
			}
		})
	}
})

// 获取购物车列表
router.get('/getcartlist', async (req, res) => {
	let result = await Cart.find({
		userName: req.query.userName
	});
	res.json({
		status_code: 200,
		message: '获取购物车列表成功',
		carts: result
	})
})

//更新购物车商品个数
router.post('/updatecart', (req, res) => {
	Cart.updateOne({
		userName: req.body.userName,
		goodsId: req.body.goodsId
	}, {
		buyCounts: req.body.buyCounts
	}).then((doc) => {
		res.json({
			status_code: 200,
			message: '修改购物车商品数量成功',
		})
	}).catch(() => {
		res.json({
			status_code: 400,
			message: '内部错误,修改购物车商品数量失败',
		})
	})
})

//删除购物车内商品
router.post('/deletecategoods', (req, res) => {
	Cart.findOneAndDelete({
        goodsId: req.body.goodsId
	}).then((doc) => {
		res.json({
			status_code: 200,
			message: '删除商品成功',
		})
	}).catch((err) => {
		res.json({
			status_code: 400,
			message: '内部错误,删除商品失败',
		})
	})
})

//创建订单
router.post('/createorder', (req, res) => {
    let createOrderInfo = req.body;
    createOrderInfo.isSuccess = false;
	createOrderInfo.orderTime = new Date().getTime();
	createOrderInfo.receiverAdress = createOrderInfo.receiverAdress.join(',');
	console.log(createOrderInfo);
    Order.create(createOrderInfo, async (err, doc) => {
		//删除购物车内商品
		await Cart.findOneAndDelete({
			userName: createOrderInfo.userName,
			goodsId: createOrderInfo.goodsId,
			goodsSize: createOrderInfo.goodsSize
		})
		//更新商品库存
		let resultGoods = await Goods.find({
			goodsId: createOrderInfo.goodsId
		})
		// await Goods.updateOne({
		// 	goodsId: createOrderInfo.goodsId
		// }, {
		// 	goodsCounts: resultGoods[0].goodsCounts - Number(createOrderInfo.buyCounts)
		// })
		if (!err) {
			console.log(doc)
			res.json({
				status_code: 200,
				message: '创建订单成功',
			})
		} else {
			console.log(err)
			res.json({
				status_code: 400,
				message: `商品ID:${createOrderInfo.goodsId},内部错误,创建订单失败`,
			})
		}
	})
})

export default router
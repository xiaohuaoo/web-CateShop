import { request } from '@/network/request'

// 用户注册
export function userRegister (data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// // 验证邮箱
// export function sendMail (params) {
//   return request({
//     url: '/user/sendmail',
//     params
//   })
// }

// // 检查邮箱是否已被注册
// export function checkEmail (params) {
//   return request({
//     url: '/user/checkemail',
//     params
//   })
// }

// 用户登录
export function userLogin (data) {
  return request({
    url: '/user/userLogin',
    method: 'POST',
    data
  })
}

// 验证用户是否登陆
export function isUser () {
  return request({
    url: '/user/isUser'
  })
}

// 用户退出登陆
export function userLogout () {
  return request({
    url: '/user/userLogout'
  })
}

// 用户上传头像
// export function uploadAvatar (data) {
//   return request({
//     url: '/user/uploadAvatar',
//     method: 'PATCH',
//     data
//   })
// }

// 得到用户个人信息
export function userSettingsInfo () {
  return request({
    url: '/user/usersettingsinfo'
  })
}

// 设置用户个人信息
export function userChangeInfo (data) {
  return request({
    url: '/user/userchangeinfo',
    method: 'POST',
    data
  })
}

// 获取用户图表信息
export function userChartInfo () {
  return request({
    url: '/user/userchartdata'
  })
}

// 获取轮播图列表
export function getHomeCasual () {
  return request({
    url: '/user/gethomecasual'
  })
}

// 获取关于我们商品列表
export function getAboutGoodslist () {
  return request({
    url: '/user/getaboutgoodslist'
  })
}

// 获取菜单列表
export function getGoodslist (param) {
  return request({
    url: '/user/getgoodslist',
    param
  })
}

// 获取图片列表
export function getPictureGoodslist (param) {
  return request({
    url: '/user/getpicturegoodslist',
    param
  })
}

// 获取厨师列表
export function getCooksList (param) {
  return request({
    url: '/user/cookslist',
    param
  })
}

// 发送预约表单
export function postBookList (data) {
  return request({
    url: '/user/postbooklist',
    method: 'POST',
    data
  })
}

// 添加商品到购物车
export function AddGoodsToCart (data) {
  return request({
    url: '/user/addgoodstocart',
    method: 'POST',
    data
  })
}

// 获取购物车列表
export function getCartList (param) {
  return request({
    url: '/user/getcartlist',
    param
  })
}

// 更新购物车商品个数
export function updateCart (data) {
  return request({
    url: '/user/updatecart',
    method: 'POST',
    data
  })
}

// 删除购物车商品
export function deleteCateGoods (data) {
  return request({
    url: '/user/deletecategoods',
    method: 'POST',
    data
  })
}

// 创建订单
export function createOrder (data) {
  return request({
    url: '/user/createorder',
    method: 'post',
    data
  })
}

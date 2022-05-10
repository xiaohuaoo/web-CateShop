import mongoose from 'mongoose'
import config from '../src/config'

const password = config.password?':'+config.password+'@':''
const dbURL = `mongodb://${config.user}${password}${config.host}/${config.database}`
mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log(`${config.database}数据库连接成功!`))
    .catch(err=>console.log(err,'数据库连接失败'))

//设置用户账号规则
const userSchema = new mongoose.Schema({
	userName: String,
	password: String,
	userEmail: String,
	userPhone: String,
	userSex: String,
	userAdress: String,
	userSign: String,
	userAvatar: String,
	nickName: String
})
export const User = mongoose.model('User', userSchema)

//设置轮播图规则
const homecasualSchema = new mongoose.Schema({
	homecasualId: String,
	homecasualUrl: String
})
export const Homecasual = mongoose.model('Homecasual', homecasualSchema)

//设置关于我们菜单列表规则
const aboutGoodsSchema = new mongoose.Schema({
	goodsId: String,
	goodsName: String,
	shortName: String,
	goodsImg: String,
	//定价
	goodsPrice: String,
	//特价
	normalPrice: String,
	salesTips: String,
	goodsCategory: String,
	goodsCounts: Number
})
export const AboutGoods = mongoose.model('AboutGoods', aboutGoodsSchema)

//设置菜单列表规则
const goodsSchema = new mongoose.Schema({
	goodsId: String,
	goodsName: String,
	shortName: String,
	goodsImg: String,
	//定价
	goodsPrice: String,
	//特价
	normalPrice: String,
	salesTips: String,
	goodsCategory: String,
	goodsCounts: Number
})
export const Goods = mongoose.model('Goods', goodsSchema)

//设置图片列表规则
const pictureGoodsSchema = new mongoose.Schema({
	picturegoodsId: String,
	goodsName: String,
	shortName: String,
	goodsImg: String,
	//定价
	goodsPrice: String,
	//特价
	normalPrice: String,
	salesTips: String,
	goodsCategory: String,
	goodsCounts: Number
})
export const pictureGoods = mongoose.model('pictureGoods', pictureGoodsSchema)

//设置订单规则
const orderSchema = new mongoose.Schema({
	goodsId: String,
	goodsName: String,
	userName: String,
	receiverAdress: String,
	detailedAddress: String,
	receiverPhone: String,
	goodsSize: String,
	buyCounts: String,
	totalPrice: String,
	orderTime: Number,
	isSuccess: Boolean,
	userNote: String,
	goodsCategory: String,
	receiverName:String
})
export const Order = mongoose.model('Order', orderSchema)

//设置购物车规则
const cartSchema = new mongoose.Schema({
	goodsId: String,
	shortName: String,
	goodsName: String,
	goodsCategory: String,
	userName: String,
	goodsSize: String,
	goodsCounts: String,
	buyCounts: String,
	normalPrice: String,
	goodsImg: String
})
export const Cart = mongoose.model('Cart', cartSchema)

//设置厨师信息规则
const cookSchema = new mongoose.Schema({
	cookId: String,
	cookName: String,
    cookEmail: String,
    cookTel: String,
	cookUrl: String,
    cookProfile: String
})
export const Cook = mongoose.model('Cook', cookSchema)

//设置预约规则
const bookSchema = new mongoose.Schema({
	bookId: String,
	userName: String,
    bookEmail: String,
    userTel: String,
    bookDate: String,
	bookNumber: String,
	bookInfo: String
})
export const Book = mongoose.model('Book', bookSchema)

//设置图表规则
const chartSchema = new mongoose.Schema({
	userName: String,
    dataTrendList: Array,
    dataKindList: Array,
    dataPreference: Array
})
export const Chart = mongoose.model('Chart', chartSchema)

// Homecasual.create({
//  homecasualId: '1',
// 	homecasualUrl: 'http://localhost:3000/homeimg/s1.png'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Homecasual.create({
//  homecasualId: '2',
// 	homecasualUrl: 'http://localhost:3000/homeimg/s2.png'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Homecasual.create({
//  homecasualId: '3',
// 	homecasualUrl: 'http://localhost:3000/homeimg/s3.png'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Homecasual.create({
//  homecasualId: '4',
// 	homecasualUrl: 'http://localhost:3000/homeimg/s4.png'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Homecasual.create({
//  homecasualId: '5',
// 	homecasualUrl: 'http://localhost:3000/homeimg/s5.png'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// AboutGoods.create({
// 	aboutgoodsId: 0,
// 	goodsName: '水果馅饼',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/aboutimg/about1.jpg',
// 	//定价
// 	goodsPrice: 28,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// AboutGoods.create({
// 	aboutgoodsId: 1,
// 	goodsName: '水果馅饼',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/aboutimg/about2.jpg',
// 	//定价
// 	goodsPrice: 28,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// AboutGoods.create({
// 	aboutgoodsId: 2,
// 	goodsName: '水果馅饼',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/aboutimg/about3.jpg',
// 	//定价
// 	goodsPrice: 28,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Goods.create({
// 	goodsId: 1,
// 	goodsName: '水果馅饼',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/menuimg/menu1.jpg',
// 	//定价
// 	goodsPrice: 28,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Goods.create({
// 	goodsId: 2,
// 	goodsName: '冰淇淋泡芙',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/menuimg/menu2.jpg',
// 	//定价
// 	goodsPrice: 48,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Goods.create({
// 	goodsId: 3,
// 	goodsName: '水果小方',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/menuimg/menu3.jpg',
// 	//定价
// 	goodsPrice: 35,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Goods.create({
// 	goodsId: 4,
// 	goodsName: '巧克力蛋糕',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/menuimg/menu4.jpg',
// 	//定价
// 	goodsPrice: 58,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Goods.create({
// 	goodsId: 5,
// 	goodsName: '巧克力蛋糕',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/menuimg/menu5.jpg',
// 	//定价
// 	goodsPrice: 58,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Goods.create({
// 	goodsId: 6,
// 	goodsName: '巧克力蛋糕',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/menuimg/menu6.jpg',
// 	//定价
// 	goodsPrice: 58,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Goods.create({
// 	goodsId: 7,
// 	goodsName: '巧克力蛋糕',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/menuimg/menu7.jpg',
// 	//定价
// 	goodsPrice: 58,
// 	//特价
// 	normalPrice: 26,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// pictureGoods.create({
// 	picturegoodsId: 1,
// 	goodsName: '酒庄盛宴',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/pictureListImg/pictureItem1.jpg',
// 	//定价
// 	goodsPrice: 598,
// 	//特价
// 	normalPrice: 526,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// pictureGoods.create({
// 	picturegoodsId: 2,
// 	goodsName: '酒庄盛宴',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/pictureListImg/pictureItem2.jpg',
// 	//定价
// 	goodsPrice: 48,
// 	//特价
// 	normalPrice: 36,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// pictureGoods.create({
// 	picturegoodsId: 3,
// 	goodsName: '酒庄盛宴',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/pictureListImg/pictureItem3.jpg',
// 	//定价
// 	goodsPrice: 48,
// 	//特价
// 	normalPrice: 36,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// pictureGoods.create({
// 	picturegoodsId: 4,
// 	goodsName: '酒庄盛宴',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/pictureListImg/pictureItem4.jpg',
// 	//定价
// 	goodsPrice: 58,
// 	//特价
// 	normalPrice: 46,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// pictureGoods.create({
// 	picturegoodsId: 5,
// 	goodsName: '酒庄盛宴',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/pictureListImg/pictureItem5.jpg',
// 	//定价
// 	goodsPrice: 58,
// 	//特价
// 	normalPrice: 46,
// 	salesTips: '',
// 	goodsCategory: '',
// 	goodsCounts: 2
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// 加载首页视频
// Goods.create({
// 	goodsId: 11,
// 	goodsName: '「法式烤羊排」',
// 	shortName: '',
// 	goodsImg: 'http://localhost:3000/video/homevideo.mp4',
// 	//定价
// 	goodsPrice: 588
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// User.create({
// 	userName:'xiaohua',
// 	password:'123456',
// 	userEmail:'',
// 	userPhone:'',
// 	userSex:'',
// 	userAdress:'',
// 	userSign:'',
// 	userAvatar:''
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Cook.create({
// 	cookId: 1,
// 	cookName: 'Tom',
//     cookEmail: '123456@gmail.com',
//     cookTel: '000-998-888',
// 	cookUrl: 'http://localhost:3000/cookimg/cook1.png',
//     cookProfile: 'Restore the taste of food'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Cook.create({
// 	cookId: 2,
// 	cookName: 'Sam',
//     cookEmail: '1234567@gmail.com',
//     cookTel: '000-898-789',
// 	cookUrl: 'http://localhost:3000/cookimg/cook2.png',
//     cookProfile: 'Restore the taste of food'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Cook.create({
// 	cookId: 3,
// 	cookName: 'Lily',
//     cookEmail: '12345678@gmail.com',
//     cookTel: '000-999-878',
// 	cookUrl: 'http://localhost:3000/cookimg/cook3.png',
//     cookProfile: 'Restore the taste of food'
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Book.create({
// 	bookId: 1,
// 	userName: 'xiaohua',
//     bookEmail: '12345678@163.com',
//     userTel: '12345',
//     bookDate: '20220403',
// 	bookNumber: 1,
// 	bookInfo: ''
// },(err,doc)=>{
// 	console.log(err,doc)
// })

// Chart.create({
// 	userName: 'xiaohua',
//     dataTrendList: [12, 13, 14, 34, 45, 200, 123, 23, 34, 45, 23, 68],
//     dataKindList: [1048, 735, 580, 484, 300],
//     dataPreference: [45, 23, 34, 46, 1]
// })

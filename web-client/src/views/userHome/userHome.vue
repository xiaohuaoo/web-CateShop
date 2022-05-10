<template>
  <div class="user-home">
    <el-main>
      <div class="block">
      <el-col :span="24">
        <el-carousel :interval="5000" arrow="always" height="580px" style="position: relative;z-index: 0;">
          <el-carousel-item v-for="(casual) in homecasual" :key="casual.homecasualId">
            <img :src="casual.homecasualUrl" alt="">
          </el-carousel-item>
          <div class="carousel-title">
            <img :src="carouselTitleMain" alt=""><br>
          </div>
          <div class="carousel-subtitle">
            <img :src="carouselTitleSubTitle" alt="">
          </div>
          <div class="carousel-subtitle-second">
            <img :src="carouselTitleSubTitleSecond" alt="">
          </div>
          <div class="login-button-div">
            <el-button><router-link to="/userLogin">注册/登陆</router-link></el-button>
          </div>
          </el-carousel>
      </el-col>
    </div>
    </el-main>
    <!-- 关于我们 -->
    <el-row>
      <el-col :span="12" :push="1" >
        <div class="grid-content bg-purple">
          <h1>我们为您留下美好的回忆</h1>
          <div>Air Fish致力于高端、享受、愉快的经营理念。秉持者不断创新与产品的重新定义，针对人们尝鲜的心态。
            主理法式西餐，正宗的品质来源于严格的原材料引进和用心的烹饪料理，两层高的独栋别墅，彰显私密的奢华氛围与独具的浪漫情怀，拥有大厅及2个包厢，可容纳80人同时用餐，配有中央空调、无线网络等完善设施</div>
        </div>
        <div class="block-image effect-4" v-for="(goods, index) in aboutGoodsItem" :key="index">
          <div class="effect-img">
            <el-image style="width: 100px;height: 100px;" :src="goods.goodsImg"></el-image>
          </div>
          <div class="effect-text">
              <div class="effect-text-inner">
                <div class="effect-btn">
                  <i class="el-icon-fork-spoon" style="color: #fff;font-size: 32px;" @click="goAboutGoodsDetail(goods.aboutgoodsId)"></i>
                </div>
              </div>
            </div>
        </div>
      </el-col>
      <el-col :span="6" :push="1">
        <section id="vision" class="vision">
          <iframe src="//player.bilibili.com/player.html?aid=423026304&bvid=BV1v3411e7X2&cid=479827369&page=1" allow="autoplay" allowfullscreen="true" scrolling="no" border="0" frameborder="no" framespacing="0"></iframe>
        </section>
      </el-col>
    </el-row>
    <!-- 菜单列表 -->
    <product-item />
    <!-- 图库 -->
    <span class="demonstration">图库</span>
     <div class="container">
        <el-row :gutter="5">
            <el-col :span="8" v-for="(goods, index) in pictureGoodsItem" :key="index">
                <div class="effect-1">
                    <div class="effect-img">
                        <div class="demo-image__lazy">
                          <el-image :src="goods.goodsImg" lazy></el-image>
                        </div>
                    </div>
                    <div class="effect-text">
                        <h2>{{ goods.goodsName }}</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed purus consectetur, interdum felis in, auctor ligula.</p>
                        <div class="effect-btn">
                            <el-button @click="goPictureGoodsDetail(goods.picturegoodsId)"> Read More</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
     </div>
    <!-- 厨师 -->
    <cook-item />
    <!-- 预约 -->
    <div class="book-background">
      <el-row>
        <el-col :span="8" :push="1">
          <div class="book-left-profile">
            <div class="book-left-profile-main">
              <h3>在这里，您可以预订或步行到我们的餐厅</h3>
              <p>Air Fish致力于高端、享受、愉快的经营理念。
                秉持者不断创新与产品的重新定义，针对人们尝鲜的心态。</p>
                <div class="row">
                  <div class="card">
                    <h4 style="color: #FDA6A6;">Contact us!</h4>
                    <p>Tel: 000-000-000</p>
                    <p>Email: A1962400598@163.com</p>
                  </div>
                </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12" :push="3">
          <el-card style="height: 525px;width: 570px;margin-top: 15px;padding: 0px;">
            <h1 align="center">您的信息</h1>
            <el-form ref="bookform" :rules="bookrules" :model="bookform" label-width="80px">
              <el-form-item label="姓名" style="margin-top: 5px;" prop="name">
                <el-input v-model="bookform.name"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="tel">
                <el-input v-model="bookform.tel"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="bookform.email"></el-input>
              </el-form-item>
              <el-form-item label="人数" prop="number">
                <el-select v-model="bookform.number" placeholder="请选择预约人数">
                  <el-option label="" value="2"></el-option>
                  <el-option label="" value="4"></el-option>
                  <el-option label="" value="6"></el-option>
                  <el-option label="" value="8"></el-option>
                  <el-option label="" value="多于10人"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="bookform.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="bookform.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="备注" prop="message">
                <el-input type="textarea" v-model="bookform.message"></el-input>
              </el-form-item>
              <el-form-item>
              <el-button type="primary" @click="postBook('bookform')">立即创建</el-button>
              <el-button @click="resetForm('bookform')">重置</el-button>
            </el-form-item>
          </el-form>
          </el-card>
        </el-col>
    </el-row>
    </div>
    <!-- 底部 -->
    <el-row class="footer">
      <el-col :span="8">
        <icon name="logo" :h="40"></icon>
      </el-col>
      <el-col :span="8">
        <div class="block" style="padding-left: 10px;">
          <el-avatar>
            <a href="https://www.instagram.com/"><i class="fa fa-instagram fa-2x"></i></a>
          </el-avatar>
          <el-avatar>
            <a href="https://youtube.com"><i class="fa fa-facebook-f fa-2x"></i></a>
          </el-avatar>
          <el-avatar>
            <a href="https://facebook.com"><i class="fa fa-youtube fa-2x"></i></a>
          </el-avatar>
        </div>
      </el-col>
      <el-col :span="5">
          <router-link to="" style="color: #fff;" @click="handleScrollToTop">Top</router-link>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import ProductItem from '@/components/productItem'
import CookItem from '@/components/cookItem'
import { getHomeCasual, getAboutGoodslist, getPictureGoodslist, postBookList } from '@/network/api'

export default {
  name: 'UserHome',
  components: {
    ProductItem,
    CookItem
  },
  props: {},
  data () {
    return {
      // 顶部导航栏吸附
      homecasual: [], // 获取轮播图图片
      aboutGoodsItem: [], // 获取关于我们的图片
      pictureGoodsItem: [], // 获取图库的图片
      // 预约表单
      bookform: {
        name: '',
        tel: '',
        email: '',
        number: '',
        date1: '',
        date2: '',
        message: ''
      },
      bookrules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请填写电话号码', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请填写有效的电话号码' }
        ],
        email: [
          { pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/, message: '请填写正确的邮箱地址' }
        ],
        number: [
          { required: true, message: '请选择用餐人数' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        message: [
          { message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      // 静态资源
      carouselTitleMain: '../assets/imgs/carouselTitle/carouselTitle_main.png',
      carouselTitleSubTitle: '../assets/imgs/carouselTitle/carouselTitle_subtitle.png',
      carouselTitleSubTitleSecond: '../assets/imgs/carouselTitle/carouselTitle_subtitle_second.png'
    }
  },
  async created () {
    this.getCasual()
    this.getGoods()
    this.getPicture()
  },
  mounted () {},
  methods: {
    // 获取轮播图
    async getCasual () {
      const { homecasual } = await getHomeCasual({})
      this.homecasual = homecasual
    },
    // 获取关于我们的图片
    async getGoods () {
      const { aboutgoodslist } = await getAboutGoodslist({})
      this.aboutGoodsItem = aboutgoodslist
    },
    // 获取图库的图片
    async getPicture () {
      const { picturegoodslist } = await getPictureGoodslist({})
      this.pictureGoodsItem = picturegoodslist
    },
    // 发送预约表单
    async postBook () {
      this.$refs.bookform.validate(async (valid) => {
        if (valid) {
          const bookList = {
            bookId: this.$route.query.bookId,
            userName: this.bookform.name,
            bookEmail: this.bookform.email,
            userTel: this.bookform.tel,
            bookDate: this.bookform.date1,
            bookNumber: this.bookform.number,
            bookInfo: this.bookform.message
          }
          const result = await postBookList(bookList)
          console.log(result)
          this.$message({
            type: 'success',
            message: '预约成功',
            showClose: true
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 跳转到关于我们商品界面携带的query
    goAboutGoodsDetail (aboutgoodsId) {
      this.$router.push({
        path: '/showAboutGoodsInfo',
        query: {
          aboutgoodsId
        }
      })
    },
    // 跳转到图库界面携带的query
    goPictureGoodsDetail (picturegoodsId) {
      this.$router.push({
        path: '/showPictureGoods',
        query: {
          picturegoodsId
        }
      })
    },
    // 回到顶部
    handleScrollToTop () {
      window.scroll({ top: -3500, left: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style type="text/css" scoped>
 *{
    margin: 0;
    padding: 0;
    text-decoration: none;
    /* color: black; */
  }
  html,body {
    margin: 0px;
    padding: 0px;
  }
  .user-home {
    margin: 0 auto;
  }
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  /* 轮播图 */
  .el-carousel {
    width: 100%;
    height: 640px;
    position: relative;
  }
  .carousel-title {
    height: 200px;
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: 150px auto;
  }
  .carousel-subtitle {
    height: 300px;
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: 150px auto;
  }
  .carousel-subtitle-second {
    height: 380px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: 150px auto;
  }
  .login-button-div {
    height: 300px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: 280px auto;
  }
  .el-carousel__indicators .el-carousel__indicators--horizontal{
    height: 50px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  /* 关于我们美食 */
  i:hover {
    /* color: #F94547; */
  }
  .block-image{
    display: flex;
    justify-content: center;
    padding: 15px;
    float: left;
  }
  /* 关于我们视频 */
  iframe {
    height: 250px;
    width: 450px;
  }
  /* 预约背景图 */
  .book-background {
    background: url('./book-background.png');
    background-repeat: no-repeat;
  }
  /* 预约左侧信息 */
  .book-left-profile {
    height: 550px;
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .book-left-profile-main h3{
    color: #fff;
  }
  .book-left-profile-main p{
    color: #fff;
  }
  /* 预约左侧卡片效果 */
  @import url("https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext");
  * {
    padding:0;
    margin:0;
    box-sizing:border-box;
    font-family:"Poppins",sans-serif}
  body {
    background-color:#FFF3F3;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    user-select:none
  }
  .card {
    border-radius:10px;
    filter:drop-shadow(0 10px 5px 0 #FFF3F3);
    width:400px;
    height:180px;
    background-color:rgba(#fff, #fff, #fff, 0.5);
    padding:20px;
    position:relative;
    z-index:0;
    overflow:hidden;
    transition:.6s ease-in
  }
  .card::before {
    content:"";
    position:absolute;
    z-index:-1;
    top:-15px;
    right:-15px;
    background:#F84D4F;
    opacity: 0.3;
    height:220px;
    width:25px;
    border-radius:32px;
    transform:scale(1);
    transform-origin:50% 50%;
    transition:transform .25s ease-out
  }
  .card:hover::before {
    transition-delay:.2s;
    transform:scale(40)
  }
  .card:hover {
    color:#fff
  }
  .card p {
    padding:10px 0
  }
  /* 预约右侧表单 */
  .el-card__body {
    padding: 10px;
  }

/* Layout & Section Title */
.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}

@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

.column {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
}

@media (min-width: 576px) {
    .column {
        -ms-flex: 0 0 100%;
        flex: 0 0 100%;
        max-width: 100%;
    }
}

@media (min-width: 768px) {
    .column {
        -ms-flex: 0 0 50%;
        flex: 0 0 50%;
        max-width: 50%;
    }
}

@media (min-width: 992px) {
    .column {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    }
}

.section-title {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 45px 0 30px 0;
}

.section-title::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    left: 0;
    background: #eeeeee;
}

.section-title h1 {
    color: #353535;
    font-size: 50px;
    letter-spacing: 5px;
    margin-bottom: 5px;
}

@media(max-width: 767.98px) {
    .section-title h1 {
        font-size: 40px;
        letter-spacing: 3px;
    }
}

@media(max-width: 567.98px) {
    .section-title h1 {
        font-size: 30px;
        letter-spacing: 2px;
    }
}

/* 关于我们推荐鼠标悬浮效果 */
/**********************************/
/********** Effect #4 CSS *********/
/**********************************/
.effect-4 {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
}

.effect-4 .effect-img {
    font-size: 0;
    overflow: hidden;
}

.effect-4 .effect-img img {
    width: 100%;
    height: auto;
    transition: all .3s;
}

.effect-4:hover .effect-img img {
    transform: scale(1.2);
}

.effect-4 .effect-text {
    position: absolute;
    top: 15px;
    right: 15px;
    bottom: 15px;
    left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    overflow: hidden;
    transition: all .3s ease-in;
    opacity: 0;
}

.effect-4 .effect-text .effect-text-inner {
    position: absolute;
    padding: 15px;
    z-index: 1;
}

.effect-4 .effect-text:before,
.effect-4 .effect-text:after {
    position: absolute;
    display: block;
    width: 100%;
    height: 0;
    content: '';
}

.effect-4 .effect-text:before {
    border-top: 3px solid #ffffff;
    border-right: 3px solid #ffffff;
    left: -100%;
    top: 0;
}

.effect-4 .effect-text:after {
    border-bottom: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    left: 100%;
    bottom: 0;
}

@-webkit-keyframes left-up {
    0% {
        left: 100%;
        height: 0;
    }
    50% {
        left: 0;
        height: 0;
    }
    100% {
        height: 100%;
        left: 0;
    }
}

@-webkit-keyframes right-dn {
    0% {
        left: -100%;
        height: 0;
    }
    50% {
        left: 0;
        height: 0;
    }
    100% {
        height: 100%;
        left: 0;
    }
}

.effect-4:hover .effect-text{
    opacity: 1;
}

.effect-4:hover .effect-text:after,
.effect-4:hover .effect-text:before {
    animation-delay: .1s;
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards
}

.effect-4:hover .effect-text:after {
    animation-name: left-up;
}

.effect-4:hover .effect-text:before {
    animation-name: right-dn;
}

.effect-4 .effect-text h2 {
    height: 45px;
    color: #ffffff;
    font-size: 25px;
    margin: 0;
}

.effect-4 .effect-text p {
    color: #ffffff;
    font-size: 16px;
    margin-bottom: 20px;
}

.effect-4 .effect-btn .btn {
    display: inline-block;
    height: 35px;
    padding: 7px 15px;
    color: #333333;
    background: #ffffff;
}

/* 图库列表鼠标悬浮效果 */
/* Effect #1 CSS */
.effect-1 {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
}

.effect-1 .effect-img {
    font-size: 0;
}

.effect-1 .effect-img img {
    width: 100%;
    height: auto;
}

.effect-1 .effect-text {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 30px;
    top: calc(100% - 60px);
    left: 0;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    transition: .5s;
}

.effect-1:hover .effect-text {
    top: 0;
}

.effect-1 .effect-text h2 {
    height: 45px;
    color: #ffffff;
    font-size: 25px;
    margin: -15px 0 0 0;
    transition: .5s;
}

.effect-1:hover .effect-text h2 {
    margin: 0;
}

.effect-1 .effect-text p {
    color: #ffffff;
    font-size: 16px;
    margin-bottom: 20px;
}

.effect-1 .effect-btn .btn {
    display: inline-block;
    height: 35px;
    padding: 7px 15px;
    color: #333333;
    background: #ffffff;
}

@-webkit-keyframes left-up {
    0% {
        left: 100%;
        height: 0;
    }
    50% {
        left: 0;
        height: 0;
    }
    100% {
        height: 100%;
        left: 0;
    }
}

@-webkit-keyframes right-dn {
    0% {
        left: -100%;
        height: 0;
    }
    50% {
        left: 0;
        height: 0;
    }
    100% {
        height: 100%;
        left: 0;
    }
}
/* 底部 */
.footer {
  height: 100px;
  width: auto;
  background: #333;
}
.footer>.el-col {
  margin: 20px;
}
</style>

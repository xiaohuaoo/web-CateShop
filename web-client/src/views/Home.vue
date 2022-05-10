<template>
  <div class="home" id="home" ref="DOM">
    <el-container>
      <!-- 顶部导航栏 -->
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" id="boxFixed" :class="{'is_fixed' : isFixed}" router>
          <el-menu>
          <el-menu-item>
            <icon name="logo" :w="100"></icon>
          </el-menu-item>
        </el-menu>
        <el-menu-item index="/">家</el-menu-item>
        <el-menu-item @click="handleScrollToAbout">关于</el-menu-item>
        <el-submenu index="">
          <template slot="title" @click="handleScrollToMenu">菜单</template>
          <el-menu-item index="">限时折扣</el-menu-item>
          <el-menu-item index="">优惠套餐</el-menu-item>
          <el-menu-item index="">儿童专属</el-menu-item>
        </el-submenu>
        <el-menu-item @click="handleScrollToBook">预约</el-menu-item>
        <el-menu-item @click="toCart">我的购物车</el-menu-item>
        <el-submenu index="/">
          <template slot="title">我的</template>
          <el-menu-item @click="goChart">我的记录</el-menu-item>
          <el-menu-item index="/usersettings">个人中心</el-menu-item>
          <el-menu-item index="" @click="isLogout">退出登录</el-menu-item>
        </el-submenu>
        </el-menu>
      </el-header>
      <router-view></router-view>
    </el-container>
    </div>
</template>

<script>
import { isUser, userLogout } from '@/network/api'

export default {
  name: 'Home',
  components: {},
  props: {},
  data () {
    return {
      isFixed: false,
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  async created () {
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
  },
  methods: {
    // 导航栏吸附
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
      const offsetTop = document.querySelector('#boxFixed').offsetTop // 要滚动到顶部吸附的元素的偏移量
      if (scrollTop > offsetTop) {
        this.isFixed = true // 如果滚动到顶部了，this.isFixed就为true
      } else {
        this.isFixed = false
      }
    },
    // 关于滚动到关于我们部分
    handleScrollToAbout () {
      window.scroll({ top: 500, left: 0, behavior: 'smooth' })
    },
    // 关于滚动到关于菜单列表部分
    handleScrollToMenu () {
      // 中间
      document.getElementById('home').scrollIntoView({ block: 'center' })
    },
    // 关于滚动到预约部分
    handleScrollToBook () {
      window.scroll({ top: 2500, left: 0, behavior: 'smooth' })
    },
    // 购物车登入权限
    async toCart () {
      const result = await isUser()
      if (result.status_code === 400) {
        this.$message({
          type: 'warning',
          message: '请先登陆',
          showClose: true
        })
        this.$router.push('/userLogin')
      } else {
        this.$router.push('/cart')
      }
    },
    // 判定用户是否登陆并执行退出登陆操作
    async isLogout () {
      const result = await isUser()
      if (result.status_code === 400) {
        this.$message({
          type: 'warning',
          message: '请先登陆',
          showClose: true
        })
      } else {
        userLogout()
        this.$message({
          type: 'success',
          message: '已退出登陆',
          showClose: true
        })
        this.$router.push('/')
      }
    },
    // 用户图标的query
    async goChart () {
      const result = await isUser()
      if (result.status_code === 400) {
        this.$message({
          type: 'warning',
          message: '请先登陆',
          showClose: true
        })
        this.$router.push('/userLogin')
      } else {
        // this.$router.push({
        //   path: '/userecord',
        //   query: {
        //     chartData
        //   }
        // })
        this.$router.push('/userecord')
      }
    }
  }
}
</script>

<style type="text/css" scoped>
html,body {
    margin: 0px;
    padding: 0px;
}
.el-container {
  z-index: 1;
}
.el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px 0px;
  }
  .is_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99999;
  }
  .el-menu-demo{
    display: flex;
    justify-content: space-around;
    }
</style>

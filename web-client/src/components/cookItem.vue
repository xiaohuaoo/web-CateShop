<template>
  <div class="cookItem">
      <el-row>
        <h1 align="center">我们给您提供最高品质的原料</h1>
        <el-col :span="6" v-for="(cooks, cookId) in cooksList" :key="cookId" :offset="cookId > 0 ? 1 : 0" :push="2">
            <el-card :body-style="{ padding: '10px' }">
              <div class="effect-1">
                  <div class="effect-img">
                    <img :src="cooks.cookUrl" class="image">
                  </div>
                  <div class="effect-text">
                    <a href="https://www.instagram.com/"><i class="fa fa-instagram"></i></a>
                    <a href="https://youtube.com"><i class="fa fa-facebook-f"></i></a>
                    <a href="https://facebook.com"><i class="fa fa-youtube"></i></a>
                  </div>
              </div>
                <div style="padding-left: 5px;">
                  <a @click="goDetail(cookId)">{{ cooks.cookName }}</a>
                </div>
            </el-card>
        </el-col>
        </el-row>
  </div>
</template>

<script>
import { getCooksList } from '@/network/api'

export default {
  name: 'CookItem',
  components: {},
  props: {},
  data () {
    return {
      cooksList: []
    }
  },
  async created () {
    this.getCooks()
  },
  mounted () {},
  methods: {
    // 获取厨师列表
    async getCooks () {
      const { cooks } = await getCooksList({})
      this.cooksList = cooks
    },
    goDetail (id) {
      this.$router.push({
        path: '/showCookInfo',
        query: {
          cookId: id
        }
      })
    }
  }
}
</script>

<style type="text/css" scoped>
/* 厨师列表鼠标悬浮效果 */
/* Effect #1 CSS */
.effect-1 {
    position: relative;
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
    top: calc(100% 0px);
    left: 0;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    transition: .5s;
}

.effect-1:hover .effect-text {
    top: 0;
}

.effect-1 .effect-text {
    color: #ffffff;
    font-size: 16px;
    position: absolute;
    top: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.effect-1 .effect-text i {
  font-size: 24px;
  color: #fff;
  margin-left: 5px;
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
</style>

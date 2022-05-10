<template>
  <div class="show-pictureGoods">
    <el-row>
      <el-col :span="12" :push="3">
        <div class="block">
          <el-image :src="goodsInfo.goodsImg"></el-image>
          <h2>{{ goodsInfo.goodsName }}</h2>
        </div>
      </el-col>
      <el-col :span="8" :push="3">
        <div class="block">
            <p>{{ goodsInfo.goodsPrice }}</p>
        </div>
        <el-input-number v-model="num" :min="0" :max="10" label="餐品数量"></el-input-number>
        <el-button @click="addGoods"><i class="el-icon-shopping-cart-2"></i>购物车</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getPictureGoodslist, isUser, AddGoodsToCart } from '@/network/api'

export default {
  name: 'ShowPictureGoods',
  components: {},
  props: {},
  data () {
    return {
      goodsInfo: '',
      num: 0
    }
  },
  async created () {
    this.getPicturesList(this.$route.query.picturegoodsId)
  },
  mounted () {},
  methods: {
    // 当前餐品信息
    async getPicturesList (picturegoodsId) {
      const { picturegoodslist } = await getPictureGoodslist({ picturegoodsId })
      this.goodsInfo = picturegoodslist[picturegoodsId]
    },
    // 添加购物车
    async addGoods () {
      const result = await isUser()
      if (!this.num) {
        this.$message({
          type: 'info',
          message: '请选择餐品数量',
          showClose: true
        })
        return
      }
      if (result.status_code !== 400) {
        alert('加入购物车')
        const addGoodsToCartInfo = {
          goodsId: this.goodsInfo._id,
          shortName: this.goodsInfo.shortName,
          goodsName: this.goodsInfo.goodsName,
          goodsCategory: this.goodsInfo.goodsCategory,
          //   userName: this.$store.state.userInfo.userName,
          userName: this.goodsInfo.userName,
          goodsSize: this.goodsSize,
          goodsCounts: this.goodsInfo.goodsCounts,
          buyCounts: this.num,
          normalPrice: this.goodsInfo.normalPrice,
          goodsImg: this.goodsInfo.goodsImg
        }
        const result = await AddGoodsToCart(addGoodsToCartInfo)
        if (result.status_code === 200) {
          this.$message({
            type: 'success',
            message: result.message,
            showClose: true
          })
          this.$router.push('/cart')
        } else {
          this.$msgbox({
            type: 'error',
            message: result.message,
            showClose: true
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请先登陆',
          showClose: true
        })
        this.$router.push('/userLogin')
      }
    }
  }
}
</script>

<style type="text/css" scoped>
.el-col {
    display: flex;
    align-items: center;
    justify-items: center;
}
.el-image {
    width: auto;
    height: 30%;
}
</style>

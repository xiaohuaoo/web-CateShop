<template>
  <div class="productItem">
      <span class="demonstration">菜单列表</span>
      <el-row >
        <!-- 菜单列表分页 -->
        <el-col :span="24">
          <el-pagination
            :total="total"
            :page-size="pagesize"
            :page-sizes="[3, 6, 9, 12]"
            :current-page="pagenum"
            layout="total, prev, pager, next, jumper, ->"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" >
          </el-pagination>
        </el-col>
        <el-col :span="5" v-for="(goods, goodsId) in currentPage" :key="goodsId" style="padding: 5px;" :push="1">
            <el-card :body-style="{ padding: '0px' }">
            <img :src="goods.goodsImg" class="image">
            <div style="padding: 15px;" >
                <span>{{ goods.goodsName }}</span>
                <div class="bottom clearfix">
                <el-button type="text" class="button" @click="goGoodsDetail(goods.goodsId)">查看详情</el-button>
                </div>
            </div>
            </el-card>
        </el-col>
        </el-row>
  </div>
</template>

<script>
import { getGoodslist } from '@/network/api'

export default {
  name: 'ProductItem',
  components: {},
  props: {},
  data () {
    return {
      goodsList: [],
      // 数据总条目
      total: 0,
      // 每页显示的条目数
      pagesize: 4,
      // 当前显示的页码
      pagenum: 1,
      // 当前页码数据的暂存区
      currentPage: [],
      loading: true
    }
  },
  async created () {
    this.getGood()
  },
  mounted () {},
  methods: {
    async getGood () {
      const { goodslist, total } = await getGoodslist({})
      this.goodsList = goodslist
      this.total = total
      this.setCurPage(this.pagenum)
    },
    handleSizeChange (newsize) {
      this.pagesize = newsize
      this.setCurPage(this.pagenum)
    },
    handleCurrentChange (newpage) {
      this.setCurPage(newpage)
    },
    setCurPage (page) {
      this.currentPage = this.goodsList.slice(
        (page - 1) * this.pagesize,
        page * this.pagesize)
    },
    goGoodsDetail (id) {
      this.$router.push({
        path: '/showProductInfo',
        query: {
          goodsId: id
        }
      })
    }
  }
}
</script>

<style type="text/css" scoped>
  .el-pagination {
    float: right;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>

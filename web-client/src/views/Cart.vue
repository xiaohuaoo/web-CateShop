<template>
  <div class="cart">
    <div id="shopcar">
        <div id="content">
            <div class="header">
                <span>购物车</span>
            </div>
            <div class="cont_title">
                <span>全部商品</span>
            </div>
            <div class="cont_op">
                <div class="con_selet">
                    <input type="checkbox" class="con_selectAll" :checked="isSelectedAll" @click="selectedAll(isSelectedAll)"/>
                    <label for="con_selectAll">全选</label>
                </div>
                <div>商品信息</div>
                <div>单价</div>
                <div>数量</div>
                <div>金额</div>
                <div>操作</div>
            </div>
        <div class="pro_box" v-if="cartList.length">
            <div class="goods" v-for="(goods, index) in cartList" :key="index">
                <ul class="item_content">
                    <li class="td td-chk">
                        <div>
                            <input type="checkbox" class="checkBox" :checked="goods.checked" @click="singleSelected(index)" />
                        </div>
                    </li>
                    <li class="td td-item">
                        <div class="td-item-pic">
                            <img :src="goods.goodsImg" />
                        </div>
                        <div class="td-item-info" ></div>
                    </li>
                    <li class="td td-price"><strong>{{ goods.normalPrice }}</strong></li>
                    <li class="td td-amount">
                        <div class="item-amout">
                            <el-input-number style="width: 150px;" v-model="goods.buyCounts" :min="1" :max="Number(goods.goodsCounts)"
                            @change="updateCartCount(goods, goods.buyCounts)"></el-input-number>
                        </div>
                    </li>
                    <li class="td td-sum"><strong>{{ goods.buyCounts * goods.normalPrice }}</strong></li>
                    <li class="td td-op">
                        <el-button type="danger" size="mini" plain @click="deleteGoods(goods)">删除</el-button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pro_empty" v-else>
            <h2>购物车里空空如也</h2>
        </div>
        </div>
        <div id="footer">
            <div class="foot_select">
                <!-- <input type="checkbox" class="foot_selectAll" name="foot_selectAll" :checked="isSelectedAll" @click.stop="selectedAll(isSelectedAll)" /> -->
                <label for="foot_selectAll">全选</label>
            </div>
            <div class="foot_op">
                <!-- <a class="foot_remove" @click.prevent="emptyCart">清空购物车</a> -->
            </div>
            <div class="foot_total">
                <div class="amout-sum">
                    <span class="txt">已选商品</span>
                    <strong id="selected_amout">{{ totalAmount }}</strong>
                    <span class="txt">件</span>
                </div>
                <div class="price-sum">
                    <span class="txt">合计（不含运费）：</span>
                    <strong class="selected_price">{{ totalPrice }}元</strong>
                </div>
                <div class="btn-area">
                    <a class="btn-sumbit" :class="{'btn-allow': totalAmount}" @click="checkOrder">结&nbsp;算</a>
                </div>
            </div>
            </div>
        </div>
        <!-- 确认订单对话框 -->
        <el-dialog title="确认收件人信息" :visible.sync="dialogFormVisible" width="50%">
            <el-form :model="orderForm" label-width="80px">
                <el-form-item label="收件人">
                    <el-input v-model="orderForm.receiverName" clearable></el-input>
                </el-form-item>
                <el-form-item label="收件地址">
                    <area-cascader :level="1" type="text" placeholder="请选择地区" v-model='orderForm.receiverAdress' class="area-select" :data="pcaa"></area-cascader>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="orderForm.detailedAddress" placeholder="例如:XX街道XX小区1单元101室" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="orderForm.receiverPhone" clearable></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="orderForm.userNote" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button >取 消</el-button>
                <el-button type="primary" @click="toCreatOrder">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 省市区联动
import {
  pca,
  pcaa
} from 'area-data'

import {
  getCartList,
  updateCart,
  deleteCateGoods,
  createOrder
} from '@/network/api'

export default {
  name: 'Cart',
  components: {},
  props: {},
  data () {
    return {
      pcaa,
      pca,
      cartList: [],
      isSelectedAll: false,
      // 商品总价
      totalPrice: 0,
      totalAmount: 0,
      dialogFormVisible: false,
      // 确认收件人信息
      orderForm: {
        receiverName: '',
        receiverAdress: [],
        receiverPhone: '',
        detailedAddress: '',
        userNote: ''
      }
    }
  },
  created () {
    this.getCarts()
  },
  mounted () {},
  methods: {
    // 获取购物车列表
    async getCarts () {
      const result = await getCartList({
        userName: this.userName
      })
      this.cartList = result.carts
      for (let i = 0; i < this.cartList.length; i++) {
        this.cartList[i].checked = false
      }
    },
    // 更新购物车商品个数
    async updateCartCount (goods, count) {
      await updateCart({
        userName: this.userName,
        goodsId: goods.goodsId,
        buyCounts: count
      })
      this.getCarts()
      this.getAllGoodsPrice()
      this.totalPrice = 0
      this.totalAmount = 0
    },
    // 是否选中所有商品
    selectedAll (isSelectedAll) {
      this.isSelectedAll = !isSelectedAll
      if (this.isSelectedAll) {
        this.cartList.forEach((goods, index) => {
          goods.checked = true
        })
      } else {
        this.cartList.forEach((goods, index) => {
          goods.checked = false
        })
      }
      this.hasSelectedAll()
      this.getAllGoodsPrice()
    },
    // 计算商品总价
    getAllGoodsPrice () {
      this.cartList.forEach((goods, index) => {
        if (goods.checked) {
          this.totalPrice += goods.normalPrice * goods.buyCounts
        }
      })
    },
    // 单个商品的选中与否
    singleSelected (index) {
      this.cartList[index].checked = !this.cartList[index].checked
      this.hasSelectedAll()
      this.getAllGoodsPrice()
    },
    // 判断是否全选
    hasSelectedAll () {
      let flag = true
      let totalNum = 0
      const totalPrice = 0
      this.cartList.forEach((goods, index) => {
        if (goods.checked) {
          totalNum += 1
        } else {
          flag = false
        }
      })
      this.totalAmount = totalNum
      this.totalPrice = totalPrice
      this.isSelectedAll = flag
    },
    // 删除单个商品
    async deleteGoods (goods) {
      if (goods.checked) {
        alert('请先取消勾选该商品')
      } else {
        this.$alert('您确定删除该商品吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await deleteCateGoods({
            goodsId: goods.goodsId
          })
          // console.log(goods._id)
          // console.log(goods)
          if (result.status_code !== 200) {
            this.$alert({
              showClose: true,
              message: result.message,
              type: 'error'
            })
          } else {
            this.$message({
              showClose: true,
              message: result.message,
              type: 'success'
            })
            this.getCarts()
            this.getAllGoodsPrice()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 检查收件人信息
    checkOrder () {
      this.dialogFormVisible = true
    },
    // 结算功能：创建订单
    toCreatOrder () {
      this.$alert('您确定付款并创建订单吗？订单创建后信息不可修改！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.dialogFormVisible = false
        this.cartList.forEach(async (goods, index) => {
          if (goods.checked) {
            const createOrderInfo = {
              goodsId: goods.goodsId,
              goodsName: goods.goodsName,
              receiverAdress: this.orderForm.receiverAdress,
              detailedAddress: this.orderForm.detailedAddress,
              receiverPhone: this.orderForm.receiverPhone,
              goodsSize: goods.goodsSize,
              buyCounts: goods.buyCounts,
              totalPrice: this.totalPrice,
              userNote: this.orderForm.userNote,
              goodsCategory: goods.goodsCategory,
              receiverName: this.orderForm.receiverName
            }
            // console.log(createOrderInfo)
            const result = await createOrder(createOrderInfo)
            // console.log(result)
            if (result.status_code !== 200) {
              this.$alert({
                showClose: true,
                message: result.message,
                type: 'error'
              })
            } else {
              this.$message({
                showClose: true,
                message: result.message,
                type: 'success'
              })
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消订单'
        })
      })
    }
  }
}
</script>

<style type="text/css" scoped>
#content>.header {
    width: 100%;
    height: 90px;
    margin-top: 10px;
    position: relative;
}
.header>img {
    width: 80px;
    height: 80px;
    border: 1px solid gray;
    border-radius: 50%;
    cursor: pointer;
}
.header>span {
    display: inline-block;
    font-size: 25px;
    height: 35px;
    font-weight: 700;
    position: absolute;
    top: 30%;
    margin-left: 20px;
    cursor: pointer;
}
#content>.cont_title {
    margin: 10px auto;
    width: 80%;
    height: 35px;
    border-bottom: 2px solid #e6e6e6;
}
.cont_title>span {
    position: relative;
    top: 2px;
    display: inline-block;
    font-weight: 700;
    font-size: 17px;
    height: 100%;
    width: 100px;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
    color: #f40;
    border-bottom: 2px solid #f40;
}
#content>.cont_op {
    width: 80%;
    margin: 0 auto;
    height: 40px;
    display: flex;
    justify-content: space-around;
}
.cont_op>div {
    line-height: 40px;
}
.cont_op>div:nth-child(2) {
    width: 120px;
}
#content>.pro_box {
    margin: 0 auto;
    text-align: center;
    width: 80%;
}
#content>.pro_empty {
    margin: 100px auto;
    text-align: center;
    width: 80%;
}
.pro_box>.goods {
    background: #fcfcfc;
    width: 100%;
    height: 130px;
    border: 1px solid #CCCCCC;
}
.goods>.item_content {
    padding: 15px;
    line-height: 83px;
    list-style: none;
    display: flex;
    justify-content: space-around;
}
.item_content>.td-item {
    width: 180px;
    position: relative;
    left: -15px;
    top: 10px;
}
.td-item>div {
    display: inline-block;
}
.td-item>.td-item-pic>img {
    width: auto;
    height: 80px;
}
.td-item>.td-item-info {
    position: absolute;
    width: 80px;
    line-height: 15px;
    font-size: 12px;
    top: 0;
    margin-left: 10px;
}
.item_content>.td-sum {
    color: #f40;
    position: relative;
    left: 5px;
}
.td-price {
    position: relative;
    left: 25px;
}
.td-size {
    position: relative;
    left: 55px;
}
.td-amount>.item-amout {
    height: 25px;
    position: relative;
    left: 40px;
}
.item-amout a {
    display: inline-block;
    height: 23px;
    width: 17px;
    border: 1px solid #e5e5e5;
    background: #f0f0f0;
    text-align: center;
    line-height: 23px;
    color: #444;
    cursor: pointer;
}
.item-amout a:hover {
    color: #f50;
    border-color: #f60;
}
.item-amout>.text_amount {
    width: 40px;
    height: 20px;
    text-align: center;
    display: inline-block;
}
.td-op {
    position: relative;
    left: 13px;
}
#footer {
    width: 80%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 10%;
    background: #E5E5E5;
    z-index: 9999;
}
#footer div {
    display: inline-block;
}
#footer>.foot_select {
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding-left: 5px;
    cursor: pointer;
    font-size: 14px;
}
.foot_select input,
.foot_select label {
    cursor: pointer;
}
.foot_op {
    line-height: 50px;
    height: 50px;
}
.foot_op>.foot_remove {
    margin-left: 25px;
    font-size: 14px;
    cursor: pointer;
}
.foot_remove:hover {
    color: #f40;
}
.foot_total {
    float: right;
}
.foot_total>.amout-sum {
    cursor: pointer;
    height: 50px;
    color: #3c3c3c;
}
.foot_total .txt {
    line-height: 50px;
    font-size: 14px;
}
.amout-sum>#selected_amout {
    padding: 0 5px;
    color: #f40;
    font-weight: 700;
    font-size: 18px;
}
.price-sum {
    margin-left: 50px;
}
.price-sum>.selected_price {
    color: #f40;
    font-weight: 700;
    font-size: 20px;
    line-height: 50px;
}
.btn-area>.btn-sumbit {
    display: inline-block;
    background: #B0B0B0;
    color: #fff;
    border-left: 1px solid #e7e7e7;
    width: 119px;
    height: 50px;
    cursor: not-allowed;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
}
.btn-area>.btn-sumbit.btn-allow {
    background: #f22d00;
    cursor: pointer;
}
/* 省市区联动样式 */
.area-select {
  line-height: 15px;
}
</style>

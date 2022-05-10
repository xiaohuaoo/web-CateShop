<template>
  <div class="showcook-info">
    <el-row>
        <el-col :span="12" :push="5">
            <div class="block">
                <el-image :src="cookInfo.cookUrl"></el-image>
                <h2>{{ cookInfo.cookName }}</h2>
            </div>
        </el-col>
        <el-col :span="12" :push="1">
            <div class="block">
                <p>{{ cookInfo.cookProfile }}</p>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCooksList } from '@/network/api'

export default {
  name: 'ShowCookInfo',
  components: {},
  props: {},
  data () {
    return {
      cookInfo: ''
    }
  },
  async created () {
    this.getCook(this.$route.query.cookId)
  },
  mounted () {},
  methods: {
    // 当前厨师信息
    async getCook (cookId) {
      const { cooks } = await getCooksList({ cookId })
      this.cookInfo = cooks[cookId]
    }
  }
}
</script>

<style type="text/css" scoped>
.el-image {
    border-radius: 50%;
}
</style>

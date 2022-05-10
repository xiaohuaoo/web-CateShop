<template>
  <div class="user-login">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <el-form :model="userLogin" status-icon :rules="userLoginForm" ref="userLoginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名/邮箱" prop="userName">
            <el-input v-model="userLogin.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userLogin.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="Login()" :loading="isLogin" style="width:100%">登陆</el-button>
            <router-link to="/userRegister"><el-button type="text">免费注册</el-button></router-link>
        </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userLogin } from '@/network/api'

export default {
  name: 'UserLogin',
  components: {},
  props: {},
  data () {
    return {
      userLogin: {
        userName: '',
        password: ''
      },
      userLoginForm: {
        userName: [
          { required: true, message: '请输入用户名/邮箱', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      },
      isLogin: false
    }
  },
  async created () {},
  mounted () {},
  methods: {
    async Login () {
      this.$refs.userLoginForm.validate(async boolean => {
        this.isLogin = true
        if (!boolean) return
        const result = await userLogin(this.userLogin)
        if (result.status_code !== 200) {
          this.isLogin = false
          this.$message({
            message: '登陆失败',
            type: 'error'
          })
        } else {
          this.isLogin = false
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    }
  }
}

</script>

<style type="text/css" scoped>
.el-row {
  height: 500px;
}
</style>

<template>
  <div class="user-register">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <el-form :model="userRegisterForm" status-icon :rules="userRegisterFormValidate" ref="userRegisterForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名/邮箱" prop="userName">
            <el-input v-model="userRegisterForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userRegisterForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
            <el-input type="password" v-model="userRegisterForm.repassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
            <el-input type="tel" v-model="userRegisterForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="userEmail">
          <el-input v-model="userRegisterForm.userEmail" prefix-icon="el-icon-message" placeholder="邮箱" type="text"
           clearable></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="confirmMes">
          <el-input v-model="userRegisterForm.confirmMes" prefix-icon="el-icon-message" placeholder="验证码" type="text"
           clearable>
            <template slot="append">
              <el-button type="text" style="width: 110px;" @click="confirmMes" :disabled="isConfirmClick">{{confirmClick}}</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="userRegister()" :loading="isRegister" style="width:100%">注册</el-button>
        </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sendMail, userRegister } from '@/network/api'

export default {
  name: 'UserRegister',
  components: {},
  props: {},
  data () {
    return {
      confirmClick: '获取验证码',
      isEmail: false,
      isConfirmClick: false,
      userRegisterForm: {
        userName: '',
        password: '',
        repassword: '',
        tel: '',
        isEmail: '',
        userEmail: '',
        confirmMes: ''
      },
      userRegisterFormValidate: {
        userName: [
          { required: true, message: '请输入用户名/邮箱', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        repassword: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        userEmail: [
          { required: true, message: '请填写邮箱', trigger: 'blur' }
        ],
        confirmMes: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      },
      isRegister: false
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 通过用户填写的邮箱发送验证码
    confirmMes () {
      // if (!this.isEmail) {
      //   this.$alert({
      //     showClose: true,
      //     message: '请先填写正确邮箱',
      //     type: 'error'
      //   })
      //   return
      // }
      // 发送验证码
      sendMail({
        userEmail: this.userRegisterForm.userEmail
      }).then(result => {
        this.$message({
          showClose: true,
          message: result.message,
          type: 'success'
        })
      })
      // 禁止按钮
      this.isConfirmClick = true
      let s = 60
      this.confirmClick = `${s}秒后重新发送`
      s--
      // 设置倒计时
      const time = setInterval(() => {
        this.confirmClick = `${s}秒后重新发送`
        s--
        if (s < 0) {
          clearInterval(time)
          this.isConfirmClick = false
          this.confirmClick = '发送验证码'
        }
      }, 1000)
    },
    async userRegister () {
      this.$refs.userRegisterForm.validate(async boolean => {
        this.isRegister = true
        if (!boolean) return
        const result = await userRegister(this.userRegisterForm)
        if (result.status_code !== 200) {
          this.isRegister = false
          this.$message({
            message: '注册失败',
            type: 'error'
          })
        } else {
          this.isRegister = false
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.$router.push('/userLogin')
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

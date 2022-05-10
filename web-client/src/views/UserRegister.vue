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
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="">
            <el-input prefix-icon="el-icon-message" placeholder="验证码" type="text" clearable>
                <el-button type="text" style="width: 110px;" :disabled="isConfirmClick">{{confirmClick}}</el-button>
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
import { userRegister } from '@/network/api'

export default {
  name: 'UserRegister',
  components: {},
  props: {},
  data () {
    return {
      userRegisterForm: {
        userName: '',
        password: '',
        repassword: '',
        tel: '',
        isEmail: '',
        userEmail: '',
        confirmMes: ''
      },
      confirmClick: '获取验证码',
      isConfirmClick: false,
      userRegisterFormValidate: {
        userName: [
          { required: true, message: '请输入用户名/邮箱', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        repassword: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      },
      isRegister: false
    }
  },
  created () {},
  mounted () {},
  methods: {
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

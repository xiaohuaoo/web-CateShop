<template>
  <div class="user-setting">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="6">
        <div class="user-avatar">
            <el-upload
              class="avatar-uploader"
              action=""
              :auto-upload="false"
              :on-change="handleAvatarEdit"
              :before-upload="beforeAvatarUpload">
              <img :src="edituser_avatar_imgUrl || userSettings.userAvatar" class="avatar">
            </el-upload>
        </div>
      </el-col>
      <el-col :span="8">
        <el-form :model="userSettings" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名/邮箱" prop="userName">
              <el-input v-model="userSettings.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="userSettings.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
              <el-input type="tel" v-model="userSettings.userPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" style="width:100%" @click="changeUserInfo">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { isUser, userSettingsInfo, userChangeInfo } from '@/network/api'

export default {
  name: 'UserSettings',
  components: {},
  props: {},
  data () {
    return {
      // 用户上传头像源地址
      edituser_avatar_imgUrl: '',
      userSettings: {
        userName: '',
        password: '',
        userEmail: '',
        userPhone: '',
        userAvatar: '',
        confirmMes: ''
      }
    }
  },
  async created () {
    this.isLogin()
    this.getUserInfo()
  },
  mounted () {},
  methods: {
    async isLogin () {
      const result = await isUser()
      if (result.status_code !== 400) {} else {
        this.$message({
          type: 'warning',
          message: '请先登陆',
          showClose: true
        })
        this.$router.push('/userLogin')
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 8
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 8MB!')
      }
      return isJPG && isLt2M
    },
    // 编辑用户头像上传
    handleAvatarEdit (file) {
      // this.$set(this.userSettings, 'userAvatar', res.url)
      // console.log(this.userSettings.userAvatar)
      this.edituser_avatar_imgUrl = URL.createObjectURL(file.raw)
      this.userSettings.userAvatar = file.raw
    },
    // 拿到用户数据
    async getUserInfo () {
      const { userInfo } = await userSettingsInfo({})
      this.userSettings = userInfo[0]
    },
    // 用户修改信息
    async changeUserInfo () {
      const formData = new FormData()
      formData.append('userName', this.userSettings.userName)
      formData.append('password', this.userSettings.password)
      formData.append('userEmail', this.userSettings.userEmail)
      formData.append('userPhone', this.userSettings.userPhone)
      formData.append('userAvatar', this.userSettings.userAvatar)
      const result = await userChangeInfo(formData)
      //   console.log(result)
      if (result) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '内部错误，修改失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style type="text/css" scoped>
.user-setting {
    height: 1000px;
}
.avatar {
    width: auto;
    height: 200px;
    /* background: #789; */
    border-radius: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

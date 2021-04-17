<template>
    <div class="background">
      <div class="loginform">
        <h1>LOGIN</h1>
      <el-form ref="ruleForm" :model="formdata" :rules="rules" label-width="120px" @keyup.enter.native="submitForm('ruleForm')">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formdata.username" placeholder="请输入用户名"  prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formdata.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
        </el-form-item>
        <jcrange :successFun="rangeSuccess"></jcrange>
        <el-form-item>
          <el-button type="primary" icon="el-icon-upload" @click="submitForm('ruleForm')" round>登录</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>

</template>

<script>
import jcrange from "@/components/jcrange";
export default {
  name: 'login',
  components:{
    // eslint-disable-next-line vue/no-unused-components
    jcrange
  },
  data: function () {
    return {
      status:false,
      formdata:{
        username: '',
        password: '',
        tips: '',
      },
      rules: {
        username: [{required: true, message: '请输入您的用户名', trigger: 'blur'}],
        password: [{required: true,message: '请输入您的密码', trigger: 'blur'}],
      }
    }
  },
  methods: {
    login: function () {
      var url = 'http://123.56.42.47:10492/login';
      this.axios.post(url,null,{
        params:{
          password:this.formdata.password,
          username:this.formdata.username
        }
      }).then((response) => {
            console.log(response);
            this.$store.commit('login', response.data.Authorization)
            console.log(this.$store.state.Authorization)
            this.tips = 'post成功'
            this.$alert('快去寻找你想要的商品吧！', '登录成功', {
              confirmButtonText: '确定',
              center:true,
            });
            this.$router.push('/home');
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.status) {
            this.login();
          }
          else{
            this.$alert('请进行滑块验证', '登录错误', {
              confirmButtonText: '确定',
              center:true,
              })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    rangeSuccess(){
      this.status=true;
    }
  }
}
</script>

<style>
.background{
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/wallhaven-9mxz8k.jpg");
  background-size: 100%;
  background-repeat: round;
}
.loginform{
  width: 400px;
  height: 350px;
  background-color: rgba(220,220,250,0.6);
  margin: 0 auto;
  position: absolute;
  left:40%;
  top:30%;
}
.loginform h1{
  margin: 20px;
  font-family:  Garamond, serif;
  font-weight: 700;
  font-size: 40px;
}
.loginform:hover{
  background-color:rgba(220,220,250,0.9) ;
  box-shadow:  0 15px 12px 0 rgba(0, 0, 0, 0.5);
}
.el-form .el-form-item__label{
  font-size: 16px;
}
.loginform .el-input{
  font-size: 15px;
}
.el-form-item .el-button{
    position: absolute;
    left: 20px ;
  }
.loginform .el-form{
  padding: 0px 40px 0px 20px;
}
</style>
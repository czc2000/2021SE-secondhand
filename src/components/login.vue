<template>
    <div class="login_background">
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
      },
      userdata:{

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
        if (!(response.data.status == -1)) {
          this.$store.commit('saveAu', response.data.Authorization)
					this.$store.commit('savePWD',this.formdata.password)
          this.tips = 'post成功'
          this.$alert('快去寻找你想要的商品吧！', '登录成功', {
            confirmButtonText: '确定',
            center: true,
          });
          this.afterlogin()
          this.$router.push('/home');
          }
        else{
          this.$alert(response.data.description, '登录失败', {
            confirmButtonText: '确定',
            center: true,
          });
        }
        }
        )
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
    },
    afterlogin(){
      var url='http://123.56.42.47:10492/WhoAmI'
      this.axios.get(url,{
        headers:{
          'Authorization':this.$store.state.Authorization
        }
      }).then(response=>{
        this.userdata=response.data.WhoAmI
        this.userdata.useravatarurl='http://123.56.42.47:10492'+this.userdata.useravatarurl
        this.$store.commit("saveuserinfo",this.userdata)
      })
    }
  }
}
</script>

<style>
.login_background{
  position: relative;
  width: 100%;
  height: 1080px;
  background-image: url("../assets/wallhaven-9mxz8k.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
}
.loginform{
  position: absolute;
  top: 25%;
  left: 40%;
  width: 400px;
  height: 350px;
  background-color: rgba(220,220,250,0.6);
  margin: 0 auto;
}
.loginform h1{
  margin:20px 20px 20px 20px;
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
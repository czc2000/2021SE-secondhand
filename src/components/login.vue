<template>
      <div class="loginform">
        <h1>LOGIN</h1>
      <el-form ref="ruleForm" :model="formdata" :rules="rules" label-width="120px" @keyup.enter.native="submitForm('ruleForm')">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formdata.username" placeholder="请输入用户名"  prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formdata.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
        </el-form-item>
        <div class="jc">
          <jcrange :successFun="rangeSuccess"></jcrange>
        </div>
        <el-form-item>
        </el-form-item>
      </el-form>
        <div class="magnifyBorder" @click="submitForm('ruleForm')"><i class="el-icon-upload" ></i>登录</div>
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
          this.$notify({
            title: '登录成功',
            message: '快去寻找你想要的商品吧',
            type: 'success',
            duration: 2000
          },)
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

.loginform{
  width: 500px;
  height: 600px;
  border-radius: 8px;
  background-color: #f2f7ff;
  margin: 0 auto;
  box-shadow:  0 15px 12px 0 rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.5s;
}
.loginform h1{
  padding-top: 100px;
  margin-bottom: 30px;
  font-family:  Garamond, serif;
  font-weight: 700;
  font-size: 44px;
}
.loginform:hover{
  box-shadow:
      0 17px 5.6px rgba(0, 0, 0, 0.034),
      0 21.4px 10.9px rgba(0, 0, 0, 0.051),
      0 24.7px 17px rgba(0, 0, 0, 0.065),
      0 28.5px 24.8px rgba(0, 0, 0, 0.077),
      0 34.7px 35.8px rgba(0, 0, 0, 0.091),
      0 52px 62px rgba(0, 0, 0, 0.11)
;

}
.loginform .el-form .el-form-item__label{
  font-family: "微软雅黑 Light";
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 20px;
}
.loginform .el-input{
  font-size: 15px;
}
.loginform .el-form-item__error{
  color: #F56C6C;
  font-size: 12px;
  line-height: 1;
  padding-top: 0;
  position: absolute;
  top:auto;
  left: 0;
}
.el-form-item .el-button{
    position: absolute;
    left: 20px ;
  }
.loginform .el-form{
  padding: 0px 40px 0px 20px;
}
.loginform .magnifyBorder {
  float: left;
  margin-left: 210px;
  width: 60px;
  font-size: 18px;
  font-weight: 550;
  padding: 12px 24px;
  border-radius: 60px;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px #2c6bf5;
  transition: 300ms box-shadow cubic-bezier(0.4, 0, 0.6, 1), 600ms background-color cubic-bezier(0.4, 0, 0.6, 1), 300ms color cubic-bezier(0.4, 0, 0.6, 1);;
  color: #2d6cdf;
}

.loginform  .magnifyBorder:hover {
  box-shadow: inset 0 0 0 8px #2c6bf5;
  background-color: #2c6bf5;
  color: #e2f3f5;
}
</style>
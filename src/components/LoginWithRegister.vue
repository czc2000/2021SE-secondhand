<template>
  <div class="LoginWithRe">
    <div class="Login_Background">
    </div>
      <div class="welcome">
          <div class="box" ref="box">
            <div class="login nodisplay" ref="login">
              <login></login>
            </div>
            <div class="signup" ref="signup">
              <register></register>
            </div>
          </div>
        <div class="rightbox">
          <h2 class="title">网站标题</h2>
          <p class="desc">开始你的<span>二手</span>交易之旅</p>
          <img class="logo" src="../assets/LoginWithRegister/fakelogo.png" />
          <p class="account">已经注册账户了吗？</p>
          <div class="overlayLeftBtn" @click="toLogin"><span>登录</span></div>
        </div>
        <div class="leftbox">
          <h2 class="title">网站标题</h2>
          <p class="desc">欢迎回到<span>二手</span>交易平台</p>
          <img class="logo" src="../assets/LoginWithRegister/fakelogo.png" />
          <p class="account">还没有注册账号吗？</p>
          <div class="overlayLeftBtn" @click="toSignup"><span>注册</span></div>
        </div>
      </div>
    </div>
</template>

<script>
import login from "@/components/login";
import register from "@/components/register";
export default {
  name: "LoginWithRegister",
  components:{
    login,
    register
  },
  data:function(){
    return{
      showLogin:false,
      showSignup:true
    }
  },
  methods:{
    toLogin:function (){
      this.$refs.box.style.transform='translateX(80%)'
      this.$refs.signup.classList.add("nodisplay")
      this.$refs.login.classList.remove("nodisplay")
    },
    toSignup:function (){
      this.$refs.box.style.transform='translateX(0%)'
      this.$refs.login.classList.add("nodisplay")
      this.$refs.signup.classList.remove("nodisplay")
    }
  }

}
</script>

<style >
.LoginWithRe{
  width: 100%;
  margin: 0 auto;
  height: 867px;
}
.Login_Background{
  position: fixed;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 937px;
  background-image: url('../assets/LoginWithRegister/bg.png');
  background-size: cover;
  background-position: center;
}
.LoginWithRe .el-input__inner{
  background-color: rgba(255,255,255,0);
  border-top:0;
  border-left:0;
  border-right:0;
  border-bottom: 2px solid #c2c5cc;
}
.LoginWithRe .container{
  position: relative;
  margin: auto;
  width: 1200px;
  height: 800px;
  background-color: #9dc7cc;
}
.LoginWithRe .welcome{
  background: #f6f6f6;
  width: 1000px;
  height: 500px;
  position: absolute;
  top: 25%;
  left: 25%;
  border-radius: 8px;
  box-shadow:
      0 2.9px 20.8px rgba(0, 0, 0, 0.045),
      0 6.4px 28.6px rgba(0, 0, 0, 0.07),
      0 10.6px 34px rgba(0, 0, 0, 0.088),
      0 16.4px 39.1px rgba(0, 0, 0, 0.102),
      0 25px 45.3px rgba(0, 0, 0, 0.116),
      0 40.5px 54.9px rgba(0, 0, 0, 0.134),
      0 82px 82px rgba(0, 0, 0, 0.17)
;

}
.LoginWithRe .welcome .box{
  position: absolute;
  top: -10%;
  left: 5%;
  z-index: 2;
  transition: all 0.7s ease-in-out;
}
.LoginWithRe .nodisplay {
  display: none;
  transition: all 0.5s ease;
}
.LoginWithRe .leftbox, .rightbox {
  position: absolute;
  width: 50%;
  transition: 1s all ease;
}
.LoginWithRe .leftbox img, .rightbox img{
  width: 300px;
}
.rightbox{
  right: -2%;
}
.leftbox{
  left: -2%;
}
.leftbox .title, .rightbox .title{
  margin-top: 40px;
  font-size: 40px;
}
.leftbox .desc, .rightbox .desc{
  font-family: "微软雅黑 Light";
  margin-top: 15px;
  font-size: 18px;
}
.leftbox .desc span, .rightbox .desc span{
  font-weight: bolder;
  color: #6843d1;
}
.leftbox img, .rightbox img{
  margin-top: 30px;
}
.leftbox .account, .rightbox .account{
  font-size: 15px;
  color: #919191;
  margin-top: 25px;
}
.overlayLeftBtn {
  margin:30px auto;
  width: 40px;
  padding: 10px 24px;
  border: 2px solid #88bef5;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.overlayLeftBtn span {
  color: #0e153a;
  font-family: "微软雅黑 Light";
  font-size: 17px;
  font-weight: 600;
  position: relative;
  z-index: 1;
  transition: color 0.4s cubic-bezier(0.53, 0.21, 0, 1);
}

.overlayLeftBtn::before {
  content: '';;
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 6px;
  border: 2px solid #88bef5;
  transform: translate(-101%, -50%);
  width: 100%;
  height: 100%;
  background-color:#88bef5;
  transition: transform 0.4s cubic-bezier(0.53, 0.21, 0, 1);;
}

.overlayLeftBtn:hover span {
  color: hsl(222, 100%, 95%);
}

.overlayLeftBtn:hover::before {
  transform: translate(0, -50%);
}

</style>
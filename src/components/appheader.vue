<template>
  <div>
  <div class="header flex " @click="infoClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>个人信息</div></div>
  <div class="header flex " @click="registerClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>注册</div></div>
  <div class="header flex " @click="loginClick"><div class="borderLeftRight"><i class="el-icon-user-solid"></i>登录</div></div>
  <div class="header flex " @click="homeClick"><div class="borderLeftRight"><i class="el-icon-s-home"></i>首页</div></div>
    <img :src="avatarurl" alt="" class="circleImg">
  </div>
</template>

<script>
export default {
  name: "appheader",
  data:function (){
    return{
      avatarurl:require('../assets/unlogin.png')
    }
  },
  computed:{
    getUseravatar(){
      return this.$store.state.useravatar
    }
  },
  watch:{
    getUseravatar(val){
      this.avatarurl=val;
    }
  },
  methods:{
    removeItems:function (index) {
      this.goodlist.splice(index, 1);
    },
    homeClick:function (){
      this.$router.push('/home');
    },
    loginClick:function () {
      this.$router.push('/login');
    },
    registerClick:function (){
      this.$router.push('/register');
    },
    infoClick:function (){
      this.$router.push('/userinfo');
    },
  }
}
</script>

<style scoped>
.flex{
  float: right;
}
.header{
  cursor: pointer;
  height: 42px;
  margin-left: 20px;
  margin-top:15px;
  font-size: 17px;
}
.borderLeftRight {
  display: inline-block;
  position: relative;
  color: hsl(222, 25%, 14%);
}

.borderLeftRight::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: hsl(243, 80%, 62%);
  transform-origin: bottom right;
  transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
}

.borderLeftRight:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.circleImg{
  margin-top: 5px;
  background-color: white;
  border-radius: 25px;
  width:50px;
  height:50px;
}
</style>
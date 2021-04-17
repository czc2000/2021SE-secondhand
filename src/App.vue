<template>
  <el-container>
    <el-header height="100px">
    <el-button @click="homeClick" icon="el-icon-s-home" >首页</el-button>
    <el-button @click="loginClick" icon="el-icon-user-solid" >登录</el-button>
    <el-button @click="registerClick" icon="el-icon-s-custom" >注册</el-button>
    <el-button @click="infoClick" icon="el-icon-s-custom" >个人信息</el-button>
    </el-header>
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      good: {},
      goodlist:{
      },
      id:'6'
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
    }
  }
}
</script>

<style>

.el-header{
  background-color: rgba(	240,248,255,0.9);
  color: #333;
  text-align: right;
  line-height: 50px;
}
.el-main {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 0;
}
</style>
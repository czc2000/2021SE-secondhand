<template>
  <el-container>
    <el-header height="100px">
<!--      <div class="header flex " @click="infoClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>个人信息</div></div>-->
<!--      <div class="header flex " @click="registerClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>注册</div></div>-->
<!--      <div class="header flex " @click="loginClick"><div class="borderLeftRight"><i class="el-icon-user-solid"></i>登录</div></div>-->
<!--      <div class="header flex " @click="homeClick"><div class="borderLeftRight"><i class="el-icon-s-home"></i>首页</div></div>-->
<!--      <img :src="avatarurl" alt="" class="circleImg">-->
      <appheader></appheader>
    </el-header>
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import appheader from "@/components/appheader";
export default {
  components:{
    appheader
  }
}
</script>

<style>
.el-header{
  background-color: rgba(	240,248,255,0.9);
  color: #333;
  text-align: right;
}
.el-main {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 0;
}
</style>
<template>
  <el-container>
    <el-header height="70px">
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
  background-color: whitesmoke;
  color: #333;
  text-align: right;
  z-index: 1;
  padding: 0px 0px !important;
}
.el-main {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 0;
}
</style>
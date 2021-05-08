<template>
  <el-container>
    <el-header height="70px">
      <appheader></appheader>
    </el-header>
    <el-main>
		<message-part v-show="this.$store.state.messageShow"></message-part>
    <router-view v-if="isRouterAlive"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import appheader from "@/components/appheader";
import messagePart from "@/components/messagePart"
export default {
  components:{
    appheader,
		messagePart
  },
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data:function (){
    return{
      isRouterAlive:true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }
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
  background-color: white;
  color: #333;
  text-align: center;
  padding: 0;
}
</style>
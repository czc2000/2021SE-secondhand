<template>
  <el-container>
    <el-header :height="headerHeight">
      <appheader></appheader>
    </el-header>
    <el-main>
		<message-part v-show="this.$store.state.messageShow&&this.$store.state.login"></message-part>
    <router-view ref="home" v-if="isRouterAlive"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import appheader from "@/components/appheader";
import messagePart from "@/components/messagePart"
export default {
  components: {
    appheader,
    messagePart,
  },
  provide() {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    }
  },
  beforeMount() {
    if (this.$route.path == '/home') {
      this.headerHeight = '155px'
    } else {
      this.headerHeight = '70px'
    }
  },
  mounted() {
    window.addEventListener('scroll',this.handleScroll,true)
  },
  computed: {
    getPath() {
      return this.$route.path;
    }
  },
  watch: {
    getPath: function (val) {
      if (val != '/home') {
        this.headerHeight = '70px'
      } else {
        this.headerHeight = '155px'
      }
    }
  },
  data: function () {
    return {
      isRouterAlive: true,
      headerHeight: '',
    }
  },
  methods: {
    //本方法用于刷新界面
    reload() {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    },
    handleScroll(){
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      this.$store.commit('setScrollTop',scrollTop);
    }
  }
}
</script>

<style>
.el-header{
  color: #333;
  text-align: right;
  z-index: 999;
  padding: 0px 0px !important;
}
.el-main {
  background-color: white;
  width: 100%;
  height: 100%;
  color: #333;
  text-align: center;
  padding: 0;
}
</style>
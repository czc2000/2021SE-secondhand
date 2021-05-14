<template>
  <el-container>
    <el-header :height="headerHeight" id="target">
      <appheader></appheader>
    </el-header>
    <el-main>
		<message-part v-show="this.$store.state.messageShow&&this.$store.state.login"></message-part>
    <router-view ref="home" v-if="isRouterAlive"></router-view>
    </el-main>
    <transition name="el-fade-in">
    <div class="ToTop" @click="toTop" v-show="showToTop&&height>50">
      <div class="pulseAnim"><i class="el-icon-top"></i></div>
    </div>
    </transition>
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
  data: function () {
    return {
      isRouterAlive: true,
      headerHeight: '',
      showToTop:false,
      height:0
    }
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
      if(val=='/goodinfo'||val=='/needinfo'){
        this.showToTop=true
      }else{
        this.showToTop=false
      }
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
      this.height=scrollTop;
      this.$store.commit('setScrollTop',scrollTop);
    },
    toTop(){
      var scrollToptimer = setInterval(function () {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 5;
        if (document.body.scrollTop!=0) {
          document.body.scrollTop -= speed;
        }else {
          document.documentElement.scrollTop -= speed;
        }
        if (top == 0) {
          clearInterval(scrollToptimer);
        }
      }, 20)
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },

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
  width: 100%;
  height: 100%;
  color: #333;
  text-align: center;
  padding: 0;
}
.ToTop{
  position: fixed;
  right: 80px;
  bottom: 50px;
  z-index: 1;
  cursor: pointer;
  width: 50px;
  height: 50px;
}
.pulseAnim {
  width: 20px;
  height: 20px;
  display: block;
  padding: 15px 15px;
  border-radius: 50%;
  background:#409EFF ;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(64, 158, 255, 0.5);
  animation: pulseAnim 2s infinite;
}
.pulseAnim .el-icon-top{
  font-weight: 700;
  font-size: 20px;
  color: white;
}
@keyframes pulseAnim {
  0% {
    box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(64, 158, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(64, 158, 255, 0);
  }
}
</style>
<template>
    <div class="navbar">
      <div class="nav">
        <ul>
          <li>
            <div class="header"><img :src="avatarurl" alt="" class="circleImg"></div>
            <ol>
              <li><a href="javascript:;">登录</a></li>
              <li><a href="javascript:;">注册</a></li>
              <li><a href="javascript:;">个人信息</a></li>
            </ol>
          </li>
          <li>
            <div class="header flex " @click="infoClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>个人信息</div></div>
          </li>
          <li>
            <div class="header flex " @click="registerClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>注册</div></div>
            <ol>
              <li><a href="javascript:;">二级菜单1</a></li>
              <li><a href="javascript:;">二级菜单2</a></li>
              <li><a href="javascript:;">二级菜单3</a></li>
              <li><a href="javascript:;">二级菜单4</a></li>
              <li><a href="javascript:;">二级菜单5</a></li>
              <li><a href="javascript:;">二级菜单6</a></li>
            </ol>
          </li>
          <li>
            <div class="header flex " @click="loginClick"><div class="borderLeftRight"><i class="el-icon-user-solid"></i>登录</div></div>
            <ol>
              <li><a href="javascript:;">二级菜单1</a></li>
              <li><a href="javascript:;">二级菜单2</a></li>
              <li><a href="javascript:;">二级菜单3</a></li>
              <li><a href="javascript:;">二级菜单4</a></li>
              <li><a href="javascript:;">二级菜单5</a></li>
              <li><a href="javascript:;">二级菜单6</a></li>
            </ol>
          </li>
          <li>
            <div class="header flex " @click="homeClick"><div class="borderLeftRight"><i class="el-icon-s-home"></i>首页</div></div>
          </li>
          <!-- 这个元素来定义滑动的线条 -->
          <li class="underline"></li>
        </ul>
      </div>
    </div>
<!--  <div class="header flex " @click="infoClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>个人信息</div></div>-->
<!--  <div class="header flex " @click="registerClick"><div class="borderLeftRight"><i class="el-icon-s-custom"></i>注册</div></div>-->
<!--  <div class="header flex " @click="loginClick"><div class="borderLeftRight"><i class="el-icon-user-solid"></i>登录</div></div>-->
<!--  <div class="header flex " @click="homeClick"><div class="borderLeftRight"><i class="el-icon-s-home"></i>首页</div></div>-->
<!--    <img :src="avatarurl" alt="" class="circleImg">-->
</template>

<script>
export default {
  name: "appheader",
  data:function (){
    return{
      avatarurl:require('../assets/unlogin.png'),
      activeIndex:"2"
    }
  },
  created:function (){
    if(this.$store.state.Authorization!=null) {
      var url = 'http://123.56.42.47:10492/WhoAmI'
      this.axios.get(url, {
        headers: {
          'Authorization': this.$store.state.Authorization
        }
      }).then(response => {
        this.avatarurl = 'http://123.56.42.47:10492' + response.data.WhoAmI.useravatarurl
      })
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
@import "../assets/appheader.css";
</style>
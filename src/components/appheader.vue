<template>
  <div>
    <div class="navbar">
      <div class="search">
        <el-input  type="text" v-model="searchkey" placeholder="搜索"  prefix-icon="el-icon-search" clearable></el-input>
      </div>
      <div class="searchbutton">
        <el-button class="headerButton" type="primary" circle size="medium"><i class="el-icon-search"></i></el-button>
      </div>
      <div class="nav">
        <ul>
          <li>
            <div class="header"><img :src="avatarurl" alt="" class="circleImg"></div>
            <ol>
              <li v-show="!loginstate"><a href="javascript:;"  @click="loginClick">登录</a></li>
              <li v-show="!loginstate"><a href="javascript:;" @click="registerClick" >注册</a></li>
              <li v-show="loginstate"><a href="javascript:;" @click="infoClick">个人信息</a></li>
              <li v-show="loginstate"><a href="javascript:;" @click="needpost">发布需求</a></li>
              <li v-show="loginstate"><a href="javascript:;" @click="goodpost">发布商品</a></li>
              <li v-show="loginstate"><a href="javascript:;" @click="loginout">登出</a></li>
            </ol>
          </li>
          <li>
            <div class="header flex " ><div class="borderLeftRight">需求区</div></div>
          </li>
          <li>
            <div class="header flex " ><div class="borderLeftRight">购买区</div></div>
          </li>
          <li>
            <div class="header flex " @click="homeClick"><div class="borderLeftRight"><i class="el-icon-s-home"></i>首页</div></div>
          </li>
          <li>
            <div class="header flex "><div class="borderLeftRight">待定标签</div></div>
          </li>
          <!-- 这个元素来定义滑动的线条 -->
          <li class="underline"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appheader",
  data:function (){
    return{
      avatarurl:require('../assets/unlogin.png'),
      activeIndex:"2",
      loginstate:false,
      searchkey:''
    }
  },
  created:function (){
		if(this.$store.state.Authorization==null){
			this.$store.commit('loadFromLocalStorage');
		}
		//console.log('this.$store.state.useravatar:'+this.$store.state.useravatar+'\ngetFromLocalStorage:'+window.localStorage.getItem('useravatar'));
    if(this.$store.state.Authorization!=null) {
      var url = 'http://123.56.42.47:10492/WhoAmI'
      this.axios.get(url, {
        headers: {
          'Authorization': this.$store.state.Authorization
        }
      }).then(response => {
				if(!(response.data.status == -1))
				{
					this.loginstate=true;
					this.avatarurl=this.$store.state.useravatar;
					//console.log("logininfo:\nlogin?:"+this.loginstate+"\nthis.token:"+this.$store.state.Authorization+"\nthis.avatarurl:"+this.avatarurl+"\nthis.$store.state.useravatar"+this.$store.state.useravatar);
				}
				else{
					this.$store.commit('loginout');
				}
      })
    }
  },
  computed:{
    getUseravatar(){
      return this.$store.state.useravatar
    },
    getloginstate(){
      return this.$store.state.Authorization
    }
  },
  watch:{
    getUseravatar(val){
      if(val!=null)
        this.avatarurl=val;
      else
        this.avatarurl=require('../assets/unlogin.png')
    },
    getloginstate(val){
      if (val!=null)
        this.loginstate=true;
      else
        this.loginstate=false;
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
    needpost:function (){
      this.$router.push('/needpost')
    },
    goodpost:function (){
      this.$router.push('/goodpost')
    },
    loginout:function (){
      this.$confirm('确定要退出登录吗？', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('loginout')
        this.$router.push('/home')
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    }
  }
}
</script>

<style scoped>
@import "../assets/appheader.css";
</style>
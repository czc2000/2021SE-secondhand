<template>
  <div>
    <div class="navbar">
      <div class="search">
        <el-input  type="text" v-model="searchkey" placeholder="搜索"  prefix-icon="el-icon-search" clearable></el-input>
      </div>
      <div class="searchbutton">
        <el-button class="headerButton" type="primary" circle size="medium"><i class="el-icon-search"></i></el-button>
      </div>
      <div class="messagebutton">
        <el-button class="headerButton" type="primary" circle size="medium" v-show="getloginstate" @click='messageClick'><i class="el-icon-chat-dot-round"></i></el-button>
				<div class="unreadNum" v-show="unreadNum!=0">{{unreadNum}}</div>
			</div>
      <div class="nav">
        <ul>
          <li>
            <div class="header flex " @click="homeClick"><div class="borderLeftRight"><i class="el-icon-s-home"></i>首页</div></div>
          </li>
          <li>
            <div class="header flex " @click="needsClick"><div class="borderLeftRight">需求区</div></div>
          </li>
          <li>
            <div class="header flex " @click="goodsClick"><div class="borderLeftRight">购买区</div></div>
          </li>
          <li>
            <div class="header flex " @click="testClick"><div class="borderLeftRight">测试</div></div>
						<ol>
							<li><a href="javascript:;" @click="needTestClick">测试2</a></li>
						</ol>
          </li>
          <li>
            <div class="header"><img :src="getUseravatar" alt="" class="circleImg"></div>
            <ol>
              <li v-show="!getloginstate"><a href="javascript:;"  @click="loginClick">登录</a></li>
              <li v-show="!getloginstate"><a href="javascript:;" @click="registerClick" >注册</a></li>
              <li v-show="getloginstate"><a href="javascript:;" @click="infoClick">个人信息</a></li>
              <li v-show="getloginstate"><a href="javascript:;" @click="needpost">发布需求</a></li>
              <li v-show="getloginstate"><a href="javascript:;" @click="goodpost">发布商品</a></li>
              <li v-show="getloginstate"><a href="javascript:;" @click="loginout">登出</a></li>
						</ol>
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
      activeIndex:"2",
      searchkey:'',
    }
  },
	created:function(){
		console.log('appheader created')
	},
  computed:{
    getUseravatar(){
      return this.$store.state.useravatar?this.$store.state.useravatar:require('../assets/unlogin.png');
    },
    getloginstate(){
      return this.$store.state.login
    },
		unreadNum(){
			return this.$store.state.unreadNum
		}
  },
	watch:{
	},
  methods:{
    removeItems:function (index) {
      this.goodlist.splice(index, 1);
    },
    homeClick:function (){
      this.$router.push('/home');
    },
		goodsClick:function(){
			this.$router.push('/goods');
		},
		needsClick:function(){
			this.$router.push('/needs');
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
    testClick:function (){
      this.$router.push({path:'/goodinfo',query:{goodid:200}});
    },
		messageClick:function(){
			if(!this.$store.state.messageShow) this.$store.commit('showMessage');
			else if(this.$store.state.messageShow) this.$store.commit('hideMessage');
		},
    needTestClick:function (){
      this.$router.push({path:'/needinfo',query:{needid:9}});
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
<template>
  <div class="appheader">
    <div class="navbar" :class="{home:getPath=='/home'}">
      <div class="search">
        <el-input  type="text" v-model="searchkey" placeholder="搜索"  prefix-icon="el-icon-search" clearable v-popover:pop @keyup.enter.native="confirmSearch"></el-input>
      </div>
      <div class="searchbutton">
        <el-button class="headerButton" type="primary" circle size="medium"><i class="el-icon-search" @click="confirmSearch"></i></el-button>
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
							<li><a href="javascript:;" @click="moduleTest">单元测试</a></li>
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
    <movingimage v-if="getPath=='/home'" class="movingimage"></movingimage>
		<el-popover ref="pop" placement="bottom" v-model="searching" @keyup.enter.native="confirmSearch">
			<el-form ref="searchForm" :model="searchForm" label-width="13%">
				<el-form-item label="分区">
					<el-radio-group v-model="searchForm.blockId">
						<el-radio label="0">全部</el-radio>
						<el-radio label="1">生活用品</el-radio>
						<el-radio label="2">电子产品</el-radio>
						<el-radio label="3">书籍资料</el-radio>
						<el-radio label="4">其他类型</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="排列方式">
					<el-radio-group v-model="searchForm.searchType">
						<el-radio label="1">从旧到新</el-radio>
						<el-radio label="2">从新到旧</el-radio>
						<el-radio label="3">价格降序</el-radio>
						<el-radio label="4">价格升序</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div align="center">
				<el-button type="info" @click="cancelSearch">取消</el-button>
				<el-button type="primary" @click="confirmSearch">搜索</el-button>
			</div>
		</el-popover>
  </div>
</template>

<script>
import movingimage from "@/components/movingimage";
export default {
  name: "appheader",
  components:{
    movingimage
  },
  data:function (){
    return{
      activeIndex:"2",
      searchkey:"",
			searching:false,
			searchForm:{
				blockId:'0',
				searchType:'1'
			}
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
    getPath(){
      return this.$route.path
    },
		unreadNum(){
			return this.$store.state.unreadNum
		}
  },
	watch:{
		searchKey(val){
			console.log(val);
		}
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
		cancelSearch:function(){
			this.searching=false;
		},
		confirmSearch:function(){
			if(typeof(this.searchkey)=="undefined"||this.searchkey==''){
				this.$notify({
					title: '!',
					message: '请输入搜索内容',
					type: 'info',
					duration: 2000
				})
				return;
			}
			this.$store.commit('saveSearchParams',{
				blockId:this.searchForm.blockId,
				keyWord:this.searchkey,
				pageNum:1,
				searchType:this.searchForm.searchType,
			});
			this.$store.commit('newSearch');
			this.$router.push('/searchResult');
			this.searching=false;
			this.searchkey="";
			this.searchForm={blockId:'0',searchType:'1'};
		},
		messageClick:function(){
			if(!this.$store.state.messageShow) this.$store.commit('showMessage');
			else if(this.$store.state.messageShow) this.$store.commit('hideMessage');
		},
    needTestClick:function (){
      this.$router.push({path:'/needinfo',query:{needid:9}});
    },
    moduleTest:function (){
      this.$router.push('/moduletest')
    },
    loginout:function (){
      this.$confirm('确定要退出登录吗？', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('loginout')
				this.$store.commit('hideMessage');
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
  },
}
</script>

<style scoped>
@import "../assets/appheader.css";
</style>
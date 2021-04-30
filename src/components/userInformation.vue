<template>
  <div class="background_userinfo">
		<div class="main">
			<ul class="menu1">
				<li @click="modeTo('info')" :style="isChoosen('info')">资料</li>
				<li @click="modeTo('order')" :style="isChoosen('order')">订单</li>
				<li @click="modeTo('favorite')" :style="isChoosen('favorite')">收藏</li>
				<li @click="modeTo('demand')" :style="isChoosen('demand')">需求</li>
			</ul>
			<div class="info" v-show="isMode('info')">
				<div class="info-head">
					<profileUpload ref="avatar"></profileUpload>
					<img :src="userdata.useravatarurl" alt="">
					<div class="imgCover" @click="changeAvatar"><p>更换我的头像</p></div>
					<p>头像</p>
				</div>
				<el-form :model="form" class="info-body" ref="ruleForm" label-width="65px">
					<el-form-item label="用户id">
						<el-input v-model="form.userid" prefix-icon="el-icon-user-solid" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户名">
						<el-input v-model="form.username" prefix-icon="el-icon-user" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-input v-model="gender" prefix-icon='el-icon-search' :disabled="true"></el-input>
					</el-form-item>
					<!--<el-form-item label="性别">
						<el-select v-model='gender()' style="width:100%" :disabled="true">
							<i slot="prefix" class="el-input__incon el-icon-search"></i>
							<el-option value=0 label="女"></el-option>
							<el-option value=1 label="男"></el-option>
						</el-select>
					</el-form-item>-->
					<el-form-item label="邮箱">
						<el-input v-model="form.useremail" prefix-icon="el-icon-message" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="手机">
						<el-input v-model="form.userphonenumber" prefix-icon="el-icon-mobile phone" :disabled="true"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="order" v-show="isMode('order')">
				<p>order</p>
			</div>
			<div class="favorite" v-show="isMode('favorite')">
				<el-divider class="favorite-divider1"></el-divider>
				<div class="favorite-goodContainer">
					<Goodbox_favoriteshelf class="goods" v-for="(item,index) in this.$store.state.favorites" :key="item.goodid"
						:goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname"
						:goodprice="item.goodprice" :goodsenderid="item.goodsenderid">
					</Goodbox_favoriteshelf>
				</div>
				<!--<el-divider></el-divider>-->
			</div>
			<div class="demand" v-show="isMode('demand')">
				<p>demand</p>
			</div>
		</div>
  </div>
</template>

<script>
import profileUpload from "@/components/profileUpload";
import Goodbox_favoriteshelf from "@/components/Goodbox_favoriteshelf";
export default {
  name: "userInformation",
  components:{
    profileUpload,
		Goodbox_favoriteshelf,
  },
  data:function () {
    return{
      userdata:{},
			mode:"info",
			menu1ChoosenOptionSytle:{
				"background-color": "#d2dede",
				"color": "#4169e1"
			},
			form:{},
			fPage:0,
			fVolume:6,
			deleleFavorites:new Array(),
			deleteNum:0
    }
  },
  computed:{
    getUseravatar(){
      return this.$store.state.useravatar
    },
		isMode(){
			return(pattern)=>{
				return pattern==this.mode
			}
		},
		isChoosen(){
			return(pattern)=>{
				if(this.isMode(pattern)){
					return this.menu1ChoosenOptionSytle
				}
				return {}
			}
		},
		gender(){
			return this.form.usergender==0?"女":"男"
		}
  },
  watch:{
    getUseravatar(val){
      this.userdata.useravatarurl=val;
    }
  },
  created:function (){
			this.$store.commit('loadUserdataFromLocalStorage');
			this.$store.commit('loadUserspaceFromNet');
			this.userdata=this.$store.state.userdata;
			this.form=this.userdata;
			this.form.password='';
			//console.log(this.$store.state.favorites.length);
  },
  methods:{
    changeAvatar:function (){
      this.$refs.avatar.toggleShow();
			},
    modeTo:function(pattern){
			this.mode=pattern; 
		}
  }
}
</script>

<style scoped>
@import "../assets/userInformation.css";
</style>
<template>
  <div class="background_userinfo">
		<div class="main">
			<ul class="menu1">
				<li @click="modeTo('demand')" :style="isChoosen('demand')">需求</li>
				<li @click="modeTo('collection')" :style="isChoosen('collection')">收藏</li>
				<li @click="modeTo('order')" :style="isChoosen('order')">订单</li>
				<li @click="modeTo('info')" :style="isChoosen('info')">资料</li>
			</ul>
			<div class="body" v-show="isMode('info')">
				<div class="info-head">
					<profileUpload ref="avatar"></profileUpload>
					<img :src="userdata.useravatarurl" alt="">
					<div class="imgCover" @click="changeAvatar"><p>更换我的头像</p></div>
				</div>
				<el-form :model="form" class="info-body" :rules="rules" ref="ruleForm" label-width="65px">
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
			<div class="body" v-show="isMode('order')">
				<p>order</p>
			</div>
			<div class="body" v-show="isMode('collection')">
				<p>collection</p>
			</div>
			<div class="body" v-show="isMode('demand')">
				<p>demand</p>
			</div>
		</div>
  </div>
</template>

<script>
import profileUpload from "@/components/profileUpload";
export default {
  name: "userInformation",
  components:{
    profileUpload
  },
  data:function () {
    return{
      userdata:{},
			mode:"info",
			menu1ChoosenOptionSytle:{
				"background-color": "#747474",
				"color": "white"
			},
			form:{}
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
      var url='http://123.56.42.47:10492/WhoAmI'
      this.axios.get(url, {
        headers: {
          'Authorization': this.$store.state.Authorization
        }
      }).then(response => {
        this.userdata = response.data.WhoAmI
        this.userdata.useravatarurl = 'http://123.56.42.47:10492' + this.userdata.useravatarurl
				this.form = this.userdata
				this.form.password=''
			})
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
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
					<img :src="getUseravatar" alt="">
					<div class="imgCover" @click="changeAvatar"><p>更换我的头像</p></div>
					<p>头像</p>
				</div>
				<el-form :model="form" class="info-body" :rules="rules" ref="ruleForm" label-width="65px">
					<el-form-item label="用户id">
						<el-input v-model="form.userid" prefix-icon="el-icon-user-solid" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户名">
						<el-input v-model="form.username" prefix-icon="el-icon-user" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select v-model="form.usersex" style="width:100%" :disabled="!isEditMode">
							<i slot="prefix" class="el-input__incon el-icon-search"></i>
							<el-option value=0 label="女"></el-option>
							<el-option value=1 label="男"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="邮箱" prop="useremail">
						<el-input v-model="form.useremail" prefix-icon="el-icon-message" :disabled="!isEditMode"></el-input>
					</el-form-item>
					<el-form-item label="手机" prop="userphonenumber">
						<el-input v-model="form.userphonenumber" prefix-icon="el-icon-mobile phone" :disabled="!isEditMode"></el-input>
					</el-form-item>
				</el-form>
				<el-button class="info-edit" plain @click="enterEditMode" v-show="!isEditMode">修改信息</el-button>
				<el-button class="info-save" plain @click="saveEdit" v-show="isEditMode">保存修改</el-button>
				<el-button class="info-cancel" plain @click="leaveEditMode" v-show="isEditMode">取消修改</el-button>
			</div>
			<div class="order" v-show="isMode('order')">
				<p>order</p>
			</div>
			<div class="favorite" v-show="isMode('favorite')">
				<el-divider class="favorite-divider1"></el-divider>
				<div class="favorite-goodContainer">
					<Goodbox_favoriteshelf class="goods" v-for="(item,index) in this.$store.state.favorites" :key="item.goodid"
						:goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :goodid="item.goodid"
						:goodprice="item.goodprice" :goodsenderid="item.goodsenderid" @cancelFavorite="recordCancel(item.goodid)">
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
    var validatemail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!/^([A-Za-z0-9_\-.])+@(163.com|qq.com)$/.test(this.form.useremail)) {
        callback(new Error('请您输入正确的163邮箱或者qq邮箱'));
      } else {
        callback();
      }
    };
    var validatephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.userphonenumber))) {
        callback(new Error('请您输入正确的手机号码'));
      } else {
        callback();
      }
    };
    return{
			mode:"info",
			menu1ChoosenOptionSytle:{
				"background-color": "#d2dede",
				"color": "#4169e1"
			},
			form:{},
			fPage:0,
			fVolume:6,
			deleleFavorites:new Array(),
			deleteNum:0,
			tobeCancelled:[],
			isEditMode:false,
			rules:{
			  useremail:[{validator: validatemail, trigger: 'blur'}],
			  userphonenumber:[{validator: validatephone, trigger: 'blur'}],
			}
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
			this.form=JSON.parse(JSON.stringify(this.$store.state.userdata));//深拷贝
			this.form.password='';
			this.form.usersex=this.form.usersex==0?'0':'1';
			//console.log(this.$store.state.favorites.length);
  },
  methods:{
    changeAvatar:function (){
      this.$refs.avatar.toggleShow();
			},
    modeTo:function(pattern){
			this.mode=pattern; 
		},
		recordCancel:function(goodid){
			var url='http://123.56.42.47:10492/removeFavorite';
			this.axios.post(url+'/'+goodid,null,{
					headers:{
						'Authorization':this.$store.state.Authorization
					}
				})
		 this.$message(
			{
				message: '取消收藏成功',
				type: 'success',
				offset: 50
			});
		},
		enterEditMode: function(){
			console.log('enter edit mode');
			this.isEditMode=true;
		},
		leaveEditMode: function(){
			console.log('leave edit mode');
			this.isEditMode=false;
			this.form=JSON.parse(JSON.stringify(this.$store.state.userdata));
			this.form.password='';
			this.form.usersex=this.form.usersex==0?'0':'1';
			this.$refs.ruleForm.resetFields();
		},
		saveEdit: function(){
			console.log('save edit');
			this.$refs.ruleForm.validate(valid=>{
				if(valid){
					this.isEditMode=false;
					this.postEdit();
				}
				else{
					console.log('error submit');
					return false;
				}
			})
		},
		postEdit: function(){
			var urlSexChange='http://123.56.42.47:10492/user/updateSex';
			var urlEmailChange='http://123.56.42.47:10492/user/updateEmail';
			var urlPhonenumChange='http://123.56.42.47:10492/user/updatePhone';
			var vm=this;
			//console.log('form: '+this.form.usersex);
			postSex();
			function postSex()
			{
				if(vm.form.usersex!=vm.$store.state.userdata.usersex)
				{
					console.log('sex changed');
					vm.axios.post(urlSexChange,null,
						{
							params:{sex:vm.form.usersex},
							headers:{'Authorization':vm.$store.state.Authorization}
						}
					).then((response)=>{postEmail()})
				}
				else postEmail();
			}
			function postEmail()
			{
				if(vm.form.useremail!=vm.$store.state.userdata.useremail){
					console.log('email changed');
					vm.axios.post(urlEmailChange,null,
						{
							params:{email:vm.form.useremail},
							headers:{'Authorization':vm.$store.state.Authorization}
						}
					).then((response)=>{postPhonenum()})
				}
				else postPhonenum();
			}
			function postPhonenum()
			{
				if(vm.form.userphonenumber!=vm.$store.state.userdata.userphonenumber){
					console.log('phonenum changed');
					vm.axios.post(urlPhonenumChange,null,
						{
							params:{phone:vm.form.userphonenumber},
							headers:{'Authorization':vm.$store.state.Authorization}
						}
					).then((response)=>{vm.reloadUserData()})
				}
				else vm.reloadUserData();
			}
			console.log('post!');
		},
		reloadUserData: function(){
      var url='http://123.56.42.47:10492/WhoAmI'
			var vm=this;
			if(vm.form.usersex==vm.$store.state.userdata.usersex&&vm.form.useremail==vm.$store.state.userdata.useremail&&vm.form.userphonenumber==vm.$store.state.userdata.userphonenumber)
				return;
      this.axios.get(url,{
        headers:{
          'Authorization':this.$store.state.Authorization
        }
      }).then(response=>{
				var data=response.data.WhoAmI;
				//console.log('response: '+data.usersex);
        data.useravatarurl='http://123.56.42.47:10492'+data.useravatarurl;
        this.$store.commit("saveuserinfo",data);
      }).then(function(){
				vm.form=JSON.parse(JSON.stringify(vm.$store.state.userdata));
				vm.form.usersex=vm.form.usersex==0?'0':'1';
			})
		}
  }
}
</script>

<style scoped>
@import "../assets/userInformation.css";
</style>
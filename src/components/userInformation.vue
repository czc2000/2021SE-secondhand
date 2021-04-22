<template>
  <div>
		<div class="main">
			<ul class="menu1">
				<li @click="modeTo('demand')" :style="isChoosen('demand')">需求</li>
				<li @click="modeTo('collection')" :style="isChoosen('collection')">收藏</li>
				<li @click="modeTo('order')" :style="isChoosen('order')">订单</li>
				<li @click="modeTo('info')" :style="isChoosen('info')">资料</li>
			</ul>
			<div class="body" v-show="isMode('info')">
				<div class="info-body">
					<ul>
						<li>ID：xxxxxxxx</li>
						<li>用户名：xxxxxxxx</li>
						<li>性别：xxxxxxxx</li>
						<li>绑定手机：xxxxxxxxxxx</li>
						<li>绑定邮箱：xxxxxxxxxxx</li>
						<li>更改密码：xxxxxxxxxxx</li>
						<li>新密码：xxxxxxxx</li>
					</ul>
				</div>
				<div class="info-head">
					<profileUpload ref="avatar"></profileUpload>
					<img :src="userdata.useravatarurl" alt="">
					<div class="imgCover" @click="changeAvatar"><p>更换我的头像</p></div>
				</div>
			</div>
			<div v-show="isMode('order')">
				<p>order</p>
			</div>
			<div v-show="isMode('collection')">
				<p>collection</p>
			</div>
			<div v-show="isMode('demand')">
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
      var url='http://123.56.42.47:10492/WhoAmI'
      this.axios.get(url, {
        headers: {
          'Authorization': this.$store.state.Authorization
        }
      }).then(response => {
        this.userdata = response.data.WhoAmI
        this.userdata.useravatarurl = 'http://123.56.42.47:10492' + this.userdata.useravatarurl
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
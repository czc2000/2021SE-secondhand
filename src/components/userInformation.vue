<template>
  <div>
    <h1>个人空间</h1>
    <div class="cursor-pointer"><div class="slideUpBtn" @click="changeAvatar"><span>更换头像</span></div></div>
    <profileUpload ref="avatar"></profileUpload>
    <p>当前头像</p>
    <img :src="userdata.useravatarurl" alt="">
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
      userdata:{}
    }
  },
  created:function (){
    var url='http://123.56.42.47:10492/WhoAmI'
    this.axios.get(url,{
      headers:{
        'Authorization':this.$store.state.Authorization
      }
    }).then(response=>{
      this.userdata=response.data.WhoAmI
      this.userdata.useravatarurl='http://123.56.42.47:10492'+this.userdata.useravatarurl
    })
  },
  methods:{
    changeAvatar:function (){
      this.$refs.avatar.toggleShow();
    }
  }
}
</script>

<style scoped>
h1{
  margin-bottom: 30px;
}
.cursor-pointer{
  height: 48px;
  width: 130px;
  margin: 0 auto;
  cursor: pointer;
}

.slideUpBtn {
  padding: 12px 24px;
  background-color: transparent;
  border: 2px solid hsl(243, 80%, 62%);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  transition: all 0.25s cubic-bezier(1,.15,.34,.92)
}

.slideUpBtn span {
  display: inline-block;
  transition: inherit;
  color: hsl(243, 80%, 62%);
}

.slideUpBtn:hover span {
  opacity: 0;
  transform: translateY(-100%)
}

.slideUpBtn::before {
  content: "";
  background-color: hsl(243, 80%, 62%);;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: translateY(100%);
  transition: inherit;
  width: 100%;
  transition: transform 0.25s cubic-bezier(1,.15,.34,.92)
}

.slideUpBtn::after {
  content: '更换头像';
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  transition: inherit;
  transform: translateY(100%);
  width: 100%;

}

.slideUpBtn:hover::before {
  transform: translateY(0) scale(3);
  transition-delay: .025s;
}

.slideUpBtn:hover::after {
  opacity: 1;
  color: hsl(222, 100%, 95%);
  transform: translateY(0);
}
</style>
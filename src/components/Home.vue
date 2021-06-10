<template>
  <div>
    <div>
      <Carousel></Carousel>
    </div>
    <div class="divider1">
      <div class="intro slide-top" v-show="show1">
        <div class="intro_item">
          <img src="../assets/Home/home_1.png" alt="">
          <p class="p1">在线交流</p>
          <p class="p2">简单的聊天系统，让交流更轻松</p>
        </div>
        <div class="intro_item">
          <img src="../assets/Home/home_2.png" alt="">
          <p class="p1">供需一体</p>
          <p class="p2">购物需求模块共存，让交易更便捷</p>
        </div>
        <div class="intro_item">
          <img src="../assets/Home/home_3.png" alt="">
          <p class="p1">安全管理</p>
          <p class="p2">完善的举报和管理员机制，让购物更安全</p>
        </div>
      </div>
    </div>
      <div class="divider2"  style="::-webkit-scrollbar{display: none;}">
        <div class="home_goodcontainer slide-top" v-show="show2">
          <div class="title">还等什么，来看看这些商品吧!</div>
          <div class="changecontainer" @click="getrandom">
            <div class="changetop">不太满意？点我更换</div>
            <div class="changecenter">CHANGE</div>
            <div class="changebottom">不太满意？点我更换</div>
          </div>
          <div class="allRandomGood">
            <img src="../assets/Home/homeGoods.png" alt="">
            <div class="goodlist1">
              <Goodbox_home class="randomgood1" v-for="(item,index) in goodlist.slice(0,3)" :key="item.goodid"
                            :goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :favorite="item.favoriteNow" :goodprice="item.goodprice" :goodsenderid="item.goodsenderid"
                            :goodid="item.goodid" @favoriteOrNot="turnFavoriteState(index)">
              </Goodbox_home>
            </div>
            <div class="goodlist2">
              <Goodbox_home class="randomgood2" v-for="(item,index) in goodlist.slice(3)" :key="item.goodid"
                            :goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :favorite="item.favoriteNow" :goodprice="item.goodprice" :goodsenderid="item.goodsenderid"
                            :goodid="item.goodid" @favoriteOrNot="turnFavoriteState(index+3)">
              </Goodbox_home>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import Goodbox_home from "@/components/Goodbox_home";
export default {
  name: "Home",
  components:{
    Carousel,
    Goodbox_home
  },
  data: function () {
    return {
      good: {},
      goodlist: [],
      searchkey:'',
      show1:false,
      show2:false
    }
  },
  computed:{
    top(){
      return this.$store.state.scrollTop;
    }
  },
  watch:{
    top(val){
      if(val>=0){
        this.show1=true;
      }
      if(val>360){
        this.show2=true;
      }
    }
  },
  created() {
    this.getrandom();
  },
  mounted: function(){
    window.addEventListener('beforeunload', e => this.postChange());
	},
  methods: {
		postChange: function(){
			if(this.$store.state.login){
				var urlAdd='http://123.56.42.47:10492/addtoFavorite';
				var urlCancel='http://123.56.42.47:10492/removeFavorite';
				for(var i=0;i<this.goodlist.length;i++)
				{
					if(!this.goodlist[i].favorite&&this.goodlist[i].favoriteNow){
						//console.log('add '+this.goodlist[i].goodname);
						this.goodlist[i].favorite=true;
						this.axios.post(urlAdd+'/'+this.goodlist[i].goodid,null,{
								headers:{'Authorization':this.$store.state.Authorization}
						})}
					else if(this.goodlist[i].favorite&&!this.goodlist[i].favoriteNow){
						//console.log('cancel '+this.goodlist[i].goodname);
						this.goodlist[i].favorite=false;
						this.axios.post(urlCancel+'/'+this.goodlist[i].goodid,null,{
								headers:{'Authorization':this.$store.state.Authorization}
						})}
				}}
		},
    getrandom: function () {
      var urlGet = 'http://123.56.42.47:10492/getRandomGoods?number=6';
			var urlCheck= 'http://123.56.42.47:10492/user/isfavorite';
			let vm=this;
			async function test(){
				await new Promise(function(resolve,reject){
					if(vm.goodlist.length!=0)
						vm.postChange();
					resolve();
				})
				var response=await vm.axios.get(urlGet)
				await new Promise(function(resolve,reject){
					vm.goodlist=response.data.GoodList;
					resolve();
				})
				await new Promise(function(resolve,reject){
					//console.log('step4 vm.goodlist.length: '+vm.goodlist.length);
					for(var i=0;i<vm.goodlist.length;i++){
						new Promise(function(resolve,reject){
							var temp=vm.goodlist[i];
							temp.favorite=false;
							temp.favoriteNow=false;
							temp.index=i;
							resolve(temp);
						}).then(function(temp){
							if(!vm.$store.state.login){
								vm.$set(vm.goodlist,temp.index,temp);
								return;
							}
							vm.axios.post(urlCheck+'/'+vm.$store.state.userid+'/'+temp.goodid).then(function(response){
								temp.favorite=response.data.isfavorite;
								temp.favoriteNow=temp.favorite;
								return temp;
							}).then(function(temp){
								vm.$set(vm.goodlist,temp.index,temp);
							})
						})
					}
					resolve();
				})
			}
			test();
    },
		turnFavoriteState: function(index){
			var temp=this.goodlist[index];
			temp.favoriteNow=!temp.favoriteNow;
			this.$set(this.goodlist,index,temp);
		}
  },
	beforeRouteLeave(to,from,next){
		this.postChange();
		next();
	}
}

</script>

<style scoped>
.HomeButton+.HomeButton {
  margin: 0px;
}
.divider1{
  width: 930px;
  height: 330px;
  margin: 70px auto 0;
}
.intro .intro_item{
  float: left;
}
.intro .intro_item .p1{
  font-size: 20px;
  font-weight: 600;
}
.intro .intro_item .p2{
  margin-top:1em;
  font-size: 15px;
  color: #919191;
}
.intro img{
  height: 150px;
  margin: 0 80px;
}
.title {
  font-size: 55px;
  float: left;
  position: absolute;
  left: 160px;
  top:120px;
  font-weight: 700;
}
.divider2{
  width: 1920px;
  height: 850px;
}
.slide-top {
  position: relative;
  animation: slide-top 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-top {
  0% {
    transform: translateY(200px);
  }
  100% {
    transform: translateY(0px);
  }
}
.home_goodcontainer{
  position: relative;
  background-color: #fafaf6;
  min-width: 100%;
  height: 850px;
  margin: 0px auto;
  overflow: hidden;
}
.goodlist1,.goodlist2{
  width: 1200px;
  height: 400px;
  margin-left: 700px;
}
.goodlist1{
  margin-top: 30px;
  margin-bottom: 20px;
}
.goodlist2{
  margin-top: 0px;
}
.randomgood1,.randomgood2{
  float: right;
  margin: 0px 50px;
}

.home_goodcontainer img{
  position: absolute;
  left: 0;
}
.changecontainer {
  position       : absolute;
  width          : 700px;
  height         : 200px;
  top:220px;
  left: 200px;
  /* 居中 */
  display        : flex;
  justify-content: center;
  align-items    : center;
  cursor: pointer;
}

.changecontainer div {
  position       : absolute;
  /* 大写 */
  text-transform : uppercase;
  /* 居中 */
  display        : flex;
  justify-content: center;
  align-items    : center;
}

.changecontainer .changetop {
  width      : 600px;
  height     : 100px;
  font-size  : 55px;
  color: #49beb7;
  font-weight: bold;
  /* 显示上半部分 */
  /* 四个坐标点分别为：左上，右上，右50%，左50% */
  clip-path  : polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);

  z-index   : 2;
  transition: all 0.5s;
}

.changecontainer:hover .changetop {
  /* 鼠标移动上移20px */
  transform  : translateY(-28px);
}

.changecontainer .changebottom {
  width      : 600px;
  height     : 100px;
  font-size  : 55px;
  font-weight: bold;
  color: #49beb7;
  /* 显示下半部分 */
  /* 四个坐标点分别为：左50%，右50%，右下，左下 */
  clip-path  : polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%);

  z-index   : 2;
  transition: all 0.5s;
}

.changecontainer:hover .changebottom {
  /* 鼠标移入下移20px */
  transform  : translateY(28px);
}

.changecontainer .changecenter {
  width           : 250px;
  height          : 50px;
  background-color:#085f63;
  font-size: 25px;
  font-weight: 600;
  border-radius: 10px;
  color: #deeff1;
  /* letter-spacing  : 5px; */
  /* 默认为缩小 */
  transform       : scale(0.1);
  opacity         : 0;
  transition      : all 0.5s;
  z-index         : 1;
}

/* 鼠标移入放大 */
.changecontainer:hover .changecenter {
  transform: scale(1);
  opacity  : 1;
}

</style>
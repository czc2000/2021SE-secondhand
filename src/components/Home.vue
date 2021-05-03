<template>
  <div>
    <h2>首页</h2>
    <div>
      <el-input  type="text" v-model="searchkey" placeholder="搜索"  prefix-icon="el-icon-search" clearable></el-input>
      <el-button class="HomeButton" type="primary" @click="test" ><i class="el-icon-search"></i>搜索</el-button>
      <el-button class="HomeButton" type="success" @click="getrandom"><i class="el-icon-present">试试手气</i></el-button>
    </div>
    <transition name="el-zoom-in-center">
    <div class="goodcontainer" v-show="show">
          <Goodbox_goodshelf class="randomgood" v-for="(item,index) in goodlist" :key="item.goodid"
                   :goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :favorite="item.favoriteNow" :goodprice="item.goodprice" :goodsenderid="item.goodsenderid" 
										@favoriteOrNot="turnFavoriteState(index)">
          </Goodbox_goodshelf>
    </div>
    </transition>
  </div>
</template>

<script>
import Goodbox_goodshelf from "@/components/Goodbox_goodshelf";
export default {
  name: "Home",
  components:{
    Goodbox_goodshelf,
  },
  data: function () {
    return {
      good: {},
      goodlist: [],
      searchkey:'',
      show:false
    }
  },
  created: function () {
    const url1 = 'http://123.56.42.47:10492/goodInfo/6'
    this.axios.get(url1).then((response) => {
      this.good = response.data.good
      this.good.goodpicurl = 'http://123.56.42.47:10492' + this.good.goodpicurl
    })
  },
  methods: {
    test: function () {
      const url = 'http://123.56.42.47:10492/goodInfo/' + this.id
      this.axios.get(url).then((response) => {
            if (response.data.good != null) {
              this.good = response.data.good
              this.good.goodpicurl = 'http://123.56.42.47:10492' + this.good.goodpicurl
            } else {
              alert("亲，您查询的商品不存在哟");
              this.id = '';
            }
          }
      )
    },
    getrandom: function () {
      this.show=true;
      var urlGet = 'http://123.56.42.47:10492/getRandomGoods?number=16';
			var urlCheck= 'http://123.56.42.47:10492/user/isfavorite';
			var urlAdd='http://123.56.42.47:10492/addtoFavorite';
			var urlCancel='http://123.56.42.47:10492/removeFavorite';
			let vm=this;
			new Promise(function(resolve,reject){
				if(vm.goodlist.length==0)
					resolve();
				if(vm.$store.state.login){
					for(var i=0;i<vm.goodlist.length;i++)
					{
						if(!vm.goodlist[i].favorite&&vm.goodlist[i].favoriteNow){
							console.log('add '+vm.goodlist[i].goodid);
							vm.axios.post(urlAdd+'/'+vm.goodlist[i].goodid,null,{
									headers:{'Authorization':vm.$store.state.Authorization}
							})}
						else if(vm.goodlist[i].favorite&&!vm.goodlist[i].favoriteNow){
							console.log('cancel '+vm.goodlist[i].goodid);
							vm.axios.post(urlCancel+'/'+vm.goodlist[i].goodid,null,{
									headers:{'Authorization':vm.$store.state.Authorization}
							})}
					}
				}
				resolve();
			}).then(function(){	
				vm.axios.get(urlGet).then((response) => {
					vm.goodlist = response.data.GoodList;
				})
			}).then(function(){
				for(var i=0;i<vm.goodlist.length;i++){
					new Promise(function(resolve,reject){
						var temp=vm.goodlist[i];
						temp.favorite=false;
						temp.favoriteNow=false;
						resolve(temp);
					}).then(function(temp){
						vm.axios.post(urlCheck+'/'+vm.$store.state.userid+'/'+temp.goodid).then(function(response){
						temp.favorite=response.data.isfavorite;
						temp.favoriteNow=temp.favorite;
						return temp;
						}).then(function(temp){
							vm.$set(vm.goodlist,i,temp);
						})
					})
				}
			})
    },
    removeItems: function (index) {
      this.goodlist.splice(index, 1);
    },
		turnFavoriteState: function(index){
			var temp=this.goodlist[index];
			temp.favoriteNow=!temp.favoriteNow;
			this.$set(this.goodlist,index,temp);
		}
  },
	beforeRouteLeave(to,from,next){
		if(this.$store.state.login){
			var urlAdd='http://123.56.42.47:10492/addtoFavorite';
			var urlCancel='http://123.56.42.47:10492/removeFavorite';
			console.log(this.goodlist.length);
			for(var i=0;i<this.goodlist.length;i++)
				console.log(this.goodlist[i]);
			for(var i=0;i<this.goodlist.length;i++)
			{
				if(!this.goodlist[i].favorite&&this.goodlist[i].favoriteNow)
					this.axios.post(urlAdd+'/'+this.goodlist[i].goodid,null,{
							headers:{'Authorization':this.$store.state.Authorization}
					})
				else if(this.goodlist[i].favorite&&!this.goodlist[i].favoriteNow)
					this.axios.post(urlCancel+'/'+this.goodlist[i].goodid,null,{
							headers:{'Authorization':this.$store.state.Authorization}
					})
			}
		}
		next();
	}
}

</script>

<style scoped>
.HomeButton+.HomeButton{
  margin: 0px;
}
.randomgood{
  float: left;
  margin: 25px 12px;
}
.goodcontainer{
  margin-left: 120px;
}
.el-input{
  width: 50%;
}
.el-button{
  display: inline-block;
}

</style>
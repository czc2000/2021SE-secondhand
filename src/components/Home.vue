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
                   :goodpicurl="item.goodpicurl" :goodname="item.goodname" :favorite="item.favorite" :goodprice="item.goodprice" :goodsenderid="item.goodsenderid" 
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
      goodlist: {},
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
      var url = 'http://123.56.42.47:10492/getRandomGoods?number=16'
      this.axios.get(url).then((response) => {
        this.goodlist = response.data.GoodList;
        for(var i=0;i<this.goodlist.length;i++) {
          this.goodlist[i].goodpicurl = 'http://123.56.42.47:10492' + this.goodlist[i].goodpicurl;
					this.goodlist[i].favorite=false;
        }
      })
    },
    removeItems: function (index) {
      this.goodlist.splice(index, 1);
    },
		turnFavoriteState: function(index){
			var temp=this.goodlist[index];
			temp.favorite=!temp.favorite;
			this.$set(this.goodlist,index,temp);
		}
  },
	beforeRouteLeave(to,from,next){
		if(this.$store.state.login){
			var url='http://123.56.42.47:10492/addtoFavorite';
			for(var i=0;i<this.goodlist.length;i++){
				if(this.goodlist[i].favorite){
					console.log(this.goodlist[i].goodid);
					this.axios.post(url+'/'+this.goodlist[i].goodid,null,{
							headers:{
								'Authorization':this.$store.state.Authorization
							}
						}).then(response => {
					})
				}
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
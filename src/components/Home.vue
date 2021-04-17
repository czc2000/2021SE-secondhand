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
          <Goodbox class="randomgood" v-for="(item) in goodlist" v-bind:key="item.goodid"
                   :goodpicurl="item.goodpicurl" :goodname="item.goodname" :goodprice="item.goodprice" :goodsenderid="item.goodsenderid" >
          </Goodbox>
    </div>
    </transition>
  </div>
</template>

<script>
import Goodbox from "@/components/Goodbox";
export default {
  name: "Home",
  components:{
    Goodbox,
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
          this.goodlist[i].goodpicurl = 'http://123.56.42.47:10492' + this.goodlist[i].goodpicurl
        }
      })
    },
    removeItems: function (index) {
      this.goodlist.splice(index, 1);
    }
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
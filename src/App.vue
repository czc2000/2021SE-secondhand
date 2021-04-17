<template>
  <el-container>
    <el-header height="60px">
    <el-button @click="homeClick" type="primary" icon="el-icon-s-home" >首页</el-button>
    <el-button @click="loginClick" type="primary" icon="el-icon-user-solid" >登录</el-button>
    <el-button @click="registerClick" type="primary" icon="el-icon-s-custom" >注册</el-button>
    <el-button @click="spaceClick" type="primary" icon="el-icon-s-custom" >空间</el-button>
    </el-header>
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data: function () {
    return {
      good: {},
      goodlist:{
      },
      id:'6'
    }
  },
  created: function () {
    const url = 'http://123.56.42.47:10492/goodInfo/6'
    this.axios.get(url).then((response)=>{
      console.log(response)
      this.good = response.data.good
      this.good.goodpicurl = 'http://123.56.42.47:10492' + this.good.goodpicurl
    })
  },
  methods:{
    test:function (){
      const url = 'http://123.56.42.47:10492/goodInfo/'+this.id
      this.axios.get(url).then ((response)=> {
        if(response.data.good!=null) {
          this.good = response.data.good
          this.good.goodpicurl = 'http://123.56.42.47:10492' + this.good.goodpicurl
        }
        else{
          alert("亲，您查询的商品不存在哟");
          this.id='';
        }
      }
      )
    },
    getrandom5:function (){
      var url='http://123.56.42.47:10492/getRandom5Good'
      this.axios.get(url).then((response)=>{
        console.log(response.data.GoodList);
        this.goodlist=response.data.GoodList;
      })
    },
    removeItems:function (index) {
      this.goodlist.splice(index, 1);
    },
    homeClick:function (){
      this.$router.push('/home');
    },
    loginClick:function () {
      this.$router.push('/login');
    },
    registerClick:function (){
      this.$router.push('/register');
    },
    spaceClick:function (){
      this.$router.push('/userSpace');
    }
  }
}
</script>

<style>

.el-header{
  background-color: rgba(22,160,133,0.7);
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 0;
}
</style>
<template>
  <transition name="el-zoom-in-center">
    <div v-show="show" class="goodbox">
      <div  class=box>
        <img :src="goodpicurl" alt="">
        <p class="review">{{goodname}}</p>
        <!--<p class="sender"><i class="el-icon-user"></i>senderid:{{goodsenderid}}</p>-->
        <p class="price">￥{{goodprice}}</p>
        <el-button type="success" icon="el-icon-shopping-cart-1" size='mini' circle></el-button>
        <el-button type="danger"  icon="el-icon-delete"  size='mini' circle @click="show = !show"></el-button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Goodbox_favoriteshelf",
  props:['goodpicurl','goodname','goodprice','goodsenderid'],
  data:function(){
    return{
      isActive:true,
      show:true
    }
  },
  methods:{
    remove:function (){
      this.isActive=false;
    }
  }
}
</script>

<style scoped>
.goodbox{
		width: 198px;
    height: 285px;
		/*border-style: solid;
		border-width: 2px;*/
  }
  .box{
    overflow:hidden;
    width: 180px;
    height: 266px;
    padding: 5px;
    border-radius: 8px;
    background-color: #fff;
		border-style: solid;
		border-width: 3px;
		border-color: #f5f5f5;
  }
  .box:hover{
    border:3px solid darkorange;
    box-shadow:  0 6px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .box img{
		width: 180px;
		height: 180px;
		/*border-style: solid;
		border-width: 2px;*/
  }
  .review{
		position: relative;
		top: -30px;
    height: 56px;
    font-size:10px;
    margin-top: 30px;
    overflow: hidden;/* 超出的文本隐藏 */
    text-overflow: ellipsis; /* 溢出用省略号显示 */
    display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
    -webkit-box-orient: vertical; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
    -webkit-line-clamp: 3; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
    text-align: left;
  }
  .sender{
    font-size: 13px;
    margin: 12px 0px;
    text-align: left;
  }
  .price{
		position: relative;
		top: -25px;
		font-size: 15px;
    height: 20px;
		width: 130px;
    font-weight: bolder;
    color: coral;
    text-align: left;
		/*border-style: solid;
		border-width: 2px;*/
  }
	.box .el-button{
		position: relative;
		top: -50px;
		left: 50px;
	}
</style>
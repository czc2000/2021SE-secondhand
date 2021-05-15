<template>
	<div>
		<transition name="el-zoom-in-center">
			<div v-show="show" class="goodbox">
				<div  class=box>
					<img :src="goodpicurl" alt="" @click="toShowPage">
					<p class="review" @click="toShowPage">{{goodname}}</p>
					<!--<p class="Id">{{goodid}}</p>-->
					<!--<p class="sender"><i class="el-icon-user"></i>senderid:{{goodsenderid}}</p>-->
					<p class="price">￥{{goodprice}}</p>
					<el-button v-if="pos=='favorite'" type="success" icon="el-icon-shopping-cart-1" size='mini' circle v-popover:pop @click="createIntention"></el-button>
					<el-button v-else type="primary" icon="el-icon-edit" size='mini' circle @click="$emit('edit')"></el-button>
					<el-button type="danger"  icon="el-icon-delete"  size='mini' circle @click="$emit('cancelFavorite');show = !show"></el-button>
				</div>
			</div>
		</transition>
		<el-popover trigger="click" ref="pop" placement="bottom" v-model="intentioning">
			<div v-if="!intentioned">
				<p class="bid">出价</p>
				<el-input-number v-model="bid" :precision="2" :step="1" :max="50000" :min="0" size="medium">
				</el-input-number>
				<br/>
				<el-button class="prop-icon" type="info" icon="el-icon-close" size="small" circle @click="cancelIntention"></el-button>
				<el-button class="prop-icon" type="primary" icon="el-icon-s-promotion" size="small" circle v-popover:pop2 @click="sendIntention"></el-button>
			</div>
			<p v-else>已发送意向:)</p>
		</el-popover>
	</div>
</template>

<script>
export default {
  name: "Goodbox_favoriteshelf",
  props:['goodpicurl','goodname','goodprice','goodsenderid','goodid','pos'],
  data:function(){
    return{
      isActive:true,
      show:true,
			bid:null,
			intentioning:false,
			intentioned:false,
    }
  },
  methods:{
    remove:function (){
      this.isActive=false;
    },
    toShowPage:function (){
      this.$router.push({path:'/goodinfo',query:{goodid:this.goodid}})
    },
		createIntention:function(){
			this.bid=this.goodprice;
			this.intentioned=false;
		},
		cancelIntention:function(){
			this.intentioning=false;
		},
		sendIntention:function(){
			var url="http://123.56.42.47:10492/sendIntention";
			console.log(this.goodid+' '+this.bid);
			this.axios.post(url+'/'+this.goodid,null,{
				params:{intentionprice:this.bid},
				headers:{'Authorization':this.$store.state.Authorization}
			})
			this.intentioned=true;
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
    cursor: pointer;
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
    cursor: pointer;
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
.Id{
	position: relative;
	top: -20px;
	font-size:15px;
	border-style: solid;
	border-width: 2px;
}
.bid{
	text-align: center;
}
.prop-icon{
	margin-top: 5%;
	margin-left: 20%;
}
</style>
<template>
  <transition name="el-zoom-in-center">
		<div v-show="show" class="orderbox-main">
			<img class="od-goodimg" :src="'http://123.56.42.47:10492'+good.goodpicurl" alt="俺的图图呢">
			<p class="orderbox-goodname">{{good.goodname}}</p>
			<img class="od-sellerimg" :src="avatar" alt="俺的图图呢">
			<p class="orderbox-sellername">{{towho}}：{{name}}</p>
			<p class="orderbox-orderprice">出价：{{order.orderprice}}</p>
			<p class="orderbox-status"><br/>{{zh_status}}</p>
			<el-button class="orderbox-button" v-if="showConfirmButton" type="primary" 
				plain size='mini' @click="$emit('confirm')">{{confirmText}}</el-button>
			<div class="orderbox-sellercomment" v-if="showComment">
				<div v-if="order.sellercommentid==0">
					<p v-if="!commenting||towho=='卖家'">等待卖方评价</p>
					<div class="orderbox-comment" v-if="towho=='买家'">
						<el-button  v-if="!commenting" type="primary"
							plain size='mini' @click="commenting=!commenting">评价该订单</el-button>
						<div v-else>
							<el-rate v-model="rate" :colors="colors"></el-rate>
							<el-input v-model="comment" type="primary" plain size='mini' style="width:50%" 
								@keyup.enter.native="commentConfirm" @blur="commentConfirm"></el-input>
						</div>
					</div>
				</div>
				<div v-else>
					<p>卖方评价：</p>
					<el-rate v-model="sellercomment.commentrank" :colors="colors" disabled></el-rate>
					<p>{{sellercomment.commentcontent}}</p>
				</div>
			</div>
			<div class="orderbox-buyercomment" v-if="showComment">
				<div v-if="order.buyercommentid==0">
					<p v-if="!commenting||towho=='买家'">等待买方评价</p>
					<div class="orderbox-comment" v-show="towho=='卖家'">
						<el-button v-if="!commenting" type="primary"
							plain size='mini' @click="commenting=!commenting">评价该订单</el-button>
						<div v-else>
							<el-rate v-model="rate" :colors="colors"></el-rate>
							<el-input v-model="comment" type="primary" plain size='mini' style="width:50%" 
								@keyup.enter.native="commentConfirm" @blur="commentConfirm"></el-input>
						</div>
					</div>
				</div>
				<div v-else>
					<p>买方评价：</p>
					<el-rate v-model="buyercomment.commentrank" :colors="colors" disabled></el-rate>
					<p>{{buyercomment.commentcontent}}</p>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default{
	name: "orderbox",
	props:['good','order','buyer','seller','buyercomment','sellercomment','index','towho'],
	data:function(){
		return{
			show: true,
			commenting: false,
			rate: 0,
			comment: '',
			colors: ['#99A9BF', '#F7BA2A', '#FF9900']
		}
	},
	computed:{
		avatar(){
			return 'http://123.56.42.47:10492'+(this.towho=='买家'?this.buyer.useravatarurl:this.seller.useravatarurl);
		},
		name(){
			return this.towho=='买家'?this.buyer.username:this.seller.username;
		},
		zh_status(){
			return this.order.status==1||(this.order.sellerconfirm&&this.order.buyerconfirm)?'已完成':this.order.sellerconfirm==1?'待收货':'待发货';
		},
		showConfirmButton(){
			return this.towho=='买家'?!this.order.sellerconfirm:this.order.sellerconfirm&&!this.order.buyerconfirm;
		},
		confirmText(){
			return this.towho=='买家'?'已发货':'已收货';
		},
		showComment(){
			return (this.order.status==1||(this.order.sellerconfirm&&this.order.buyerconfirm));
		}
	},
	watch:{
		showOptions(val){
			if(val==false&&this.status==-1){
				this.show=false;
			}
		},
		commenting(val){
			console.log(val);
		},
		/*buyercomment(val){
			console.log(val);
		}*/
	},
	methods:{
		commentConfirm(){
			console.log('commentConfirm');
			if(this.comment)
				this.$emit('postComment',this.comment,this.rate,this.order.orderid,this.index);
			this.commenting=false;
			this.comment='';
			this.rate=0;
		}
	}
}
</script>

<style>
.orderbox-main{
	width: calc(90% - 2px);
	height: calc(20% - 2px);
	position: relative;
	left: calc(5% + 1px);
	border: 2px #b3e2ea solid;
	margin-bottom: 2px;
}
.od-goodimg{
	position: relative;
	left: -40%;
	width: 20%;
	height: 100%;
}
.od-sellerimg{
	position: relative;
	left: -20%;
	top: -90%;
	width: 10%;
	height: 50%;
	border-radius: 50%;
}
.orderbox-goodname{
	position: relative;
	left: 20%;
	top: -105%;
	width: 80%;
	height: 32%;
	font-size: 15px;
	overflow: hidden;
	text-overflow: ellipsis;
}
.orderbox-sellername{
	position: relative;
	left: 35%;
	top: -160%;
	width: 30%;
	height: 40%;
	font-size: 15px;
	line-height: 300%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #ffd647;
	/*border: 1px solid black;*/
}
.orderbox-orderprice{
	position: relative;
	left: 40%;
	top: -170%;
	width: 20%;
	height: 35%;
	font-size: 15px;
	line-height: 300%;
	text-align: center;
	color: seagreen;
	/*border: 1px solid black;*/
}
.orderbox-status{
	position: relative;
	left: 60%;
	top: -245%;
	width: 20%;
	height: 70%;
	text-align: center;
}
.orderbox-button{
	position: relative;
	left: 20%;
	top: -265%;
}
.orderbox-sellercomment{
	position: relative;
	left: 71%;
	top: -335%;
	width: 30%;
	height: 50%;
	/*border: 1px solid black;*/
}
.orderbox-buyercomment{
	position: relative;
	left: 71%;
	top: -335%;
	width: 30%;
	height: 50%;
	/*border: 1px solid black;*/
}
.orderbox-comment{
}
.orderbox-commentInput{
	position: relative;
}
</style>

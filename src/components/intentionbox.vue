<template>
  <transition name="el-zoom-in-center">
		<div v-show="show" class="intentionbox-main">
			<img class="ib-goodimg" :src="goodavatar" alt="俺的图图呢">
			<p class="intentionbox-goodname">{{goodname}}</p>
			<img class="ib-sellerimg" :src="avatar" alt="俺的图图呢">
			<p class="intentionbox-sellername">{{towho}}：{{name}}</p>
			<p class="intentionbox-goodprice">原价：{{goodprice}}</p>
			<p class="intentionbox-intentionprice">出价：{{intentionprice}}</p>
			<p class="intentionbox-status"><br/>{{zh_status}}</p>
			<el-button class="intentionbox-accept" v-if="showOptions" type="success" 
				icon="el-icon-check" size='mini' circle @click="$emit('accpet')"></el-button>
			<el-button class="intentionbox-refuse" v-if="showOptions" type="danger" 
				icon="el-icon-close" size='mini' circle @click="$emit('refuse')"></el-button>
			<el-button class="intentionbox-refuse" v-if="towho=='卖家'||status!=0" type="danger" 
				icon="el-icon-delete" size='mini' circle @click="$emit('deleteIntention');show = !show"></el-button>
		</div>
	</transition>
</template>

<script>
export default{
	name: "intentionbox",
	props:['avatar','name','intentionprice','goodprice','goodavatar','goodname','status','towho'],
	data:function(){
		return{
			show: true
		}
	},
	computed:{
		showOptions(){
			return this.towho=='买家'&&this.status==0;
		},
		zh_status(){
			return this.towho=='卖家'?this.status1:this.status2;
		},
		status1(){
			return this.status==0?'等待卖方意见':this.status==1?'成交':'被拒绝';
		},
		status2(){
			return this.status==0?'待处理':this.status==1?'成交':'已拒绝';
		}
	},
	watch:{
		showOptions(val){
			if(val==false&&this.status==-1){
				this.show=false;
			}
		}
	}
}
</script>

<style>
.intentionbox-main{
	width: calc(90% - 2px);
	height: calc(20% - 2px);
	position: relative;
	left: calc(5% + 1px);
	border: 2px #b3e2ea solid;
	margin-bottom: 2px;
}
.ib-goodimg{
	position: relative;
	left: -40%;
	width: 20%;
	height: 100%;
}
.ib-sellerimg{
	position: relative;
	left: -20%;
	top: -90%;
	width: 10%;
	height: 50%;
	border-radius: 50%;
}
.intentionbox-goodname{
	position: relative;
	left: 20%;
	top: -105%;
	width: 80%;
	height: 32%;
	font-size: 15px;
	overflow: hidden;
	text-overflow: ellipsis;
}
.intentionbox-sellername{
	position: relative;
	left: 35%;
	top: -160%;
	width: 30%;
	height: 70%;
	font-size: 15px;
	line-height: 500%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #ffd647;
}
.intentionbox-goodprice{
	position: relative;
	left: 60%;
	top: -230%;
	width: 20%;
	height: 35%;
	font-size: 15px;
	line-height: 300%;
	text-align: center;
	color: red;
}
.intentionbox-intentionprice{
	position: relative;
	left: 60%;
	top: -230%;
	width: 20%;
	height: 35%;
	font-size: 15px;
	line-height: 300%;
	text-align: center;
	color: seagreen;
}
.intentionbox-status{
	position: relative;
	left: 80%;
	top: -300%;
	width: 20%;
	height: 70%;
	text-align: center;
}
.intentionbox-accept{
	position: relative;
	left: 40%;
	top: -325%;
}
.intentionbox-refuse{
	position: relative;
	left: 40%;
	top: -325%;
}
</style>

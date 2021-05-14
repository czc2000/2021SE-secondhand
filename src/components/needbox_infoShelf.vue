<template>
	<transition name="el-zoom-in-center">
		<div v-show="show" class="needbox_">
			<img :src="needpicurl" alt="我的图图呢" @click="toShowPage">
			<p class="needname_" @click="toShowPage">{{needname}}</p>
			<p class="needDescription_">{{needDescription}}</p>
			<el-button type="danger" icon="el-icon-delete" size='mini' circle @click="$emit('deleteNeed');show=!show"></el-button>
		</div>
	</transition>
</template>

<script>
export default{
	name: "needbox_infoShelf",
	props: ['needpicurl','needname','needDescription','needid','needsenderid'],
	data: function(){
		return{
			show:true
		}
	},
	methods:{
	  toShowPage:function (){
      this.$router.push({path:'/needinfo',query:{needid:this.needid}})
    }
  }
}
</script>

<style>
.needbox_{
	overflow: hidden;
	width: 172px;
	height: 254px;
	padding: 5px;
	border-radius: 8px;
	background-color: #fff;
	border-style: solid;
	border-width: 3px;
	border-color: #ffffff;
	margin: 6px;
}
.needbox_:hover{
	border:3px solid darkorange;
	box-shadow:  0 6px 12px 0 rgba(0, 0, 0, 0.1);
}
.needbox_ img{
	width: 160px;
	height: 160px;
	cursor: pointer;
}
.needname_{
	position: relative;
	top: -35px;
	height: 37px;
	font-size:15px;
	color: RoyalBlue;
	margin-top: 30px;
	overflow: hidden;/* 超出的文本隐藏 */
	text-overflow: ellipsis; /* 溢出用省略号显示 */
	display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
	-webkit-box-orient: vertical; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
	-webkit-line-clamp: 3; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
	text-align: left;
	cursor: pointer;
}
.needsender{
	font-size: 13px;
	margin: 12px 0px;
	text-align: left;
}
.needDescription_{
	position: relative;
	top: -37px;
	font-size: 14px;
	height: 30px;
	width: 130px;
	text-align: left;
}
.needbox_ .el-button{
	position: relative;
	top: -40px;
	left: 50px;
}
</style>

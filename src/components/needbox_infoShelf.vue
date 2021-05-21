<template>
	<transition name="el-zoom-in-center">
		<div v-show="show" class="needbox_">
			<img :src="needpicurl" alt="我的图图呢" @click="toShowPage">
			<p class="needname_" @click="toShowPage">{{needname}}</p>
			<p class="needDescription_">{{needDescription}}</p>
			<el-button type="primary" icon="el-icon-edit" size='mini' circle @click="$emit('edit')"></el-button>
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
  border-color: #f2f7ff;
	margin: 6px;
}
.needbox_ img{
	width: 160px;
	height: 160px;
	cursor: pointer;
}
.needname_{
	position: relative;
  left: 4px;
	top: -35px;
	height: 22px;
	font-size:15px;
	color: RoyalBlue;
	margin-top: 30px;
	overflow: hidden;/* 超出的文本隐藏 */
	text-overflow: ellipsis; /* 溢出用省略号显示 */
	display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
	-webkit-box-orient: vertical; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
	-webkit-line-clamp: 1; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
	text-align: left;
	cursor: pointer;
}
.needbox_ .needDescription_{
  position: relative;
  left: 4px;
  height: 42px;
  font-size:14px;
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

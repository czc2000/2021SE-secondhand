<template>
	<transition name="el-zoom-in-center">
		<div class="needbox">
			<img :src="needpicurl" alt="我的图图呢">
			<p class="needname">{{needname}}</p>
			<p class="needDescription">{{needDescription}}</p>
		</div>
	</transition>
</template>

<script>
export default{
	name: "needbox_needShelf",
	props: ['needpicurl','needname','needDescription','needid','needsenderid'],
	data: function(){
		return{
			
		}
	}
}
</script>

<style>
.needbox{
	overflow: hidden;
	width: 220px;
	height: 325px;
	padding: 5px;
	border-radius: 5px;
	background-color: #fff;
	border-style: solid;
	border-width: 3px;
	border-color: #f5f5f5;
	margin: 6px;
}
.needbox:hover{
	border:3px solid darkorange;
	box-shadow:  0 6px 12px 0 rgba(0, 0, 0, 0.1);
}
.needbox img{
	width: 220px;
	height: 220px;
	cursor: pointer;
	/*border-style: solid;
	border-width: 2px;*/
}
.needname{
	position: relative;
	top: -30px;
	height: 56px;
	font-size:20px;
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
.needDescription{
	position: relative;
	top: -17px;
	font-size: 14px;
	height: 20px;
	width: 130px;
	text-align: left;
}
.needbox .el-button{
	position: relative;
	top: -40px;
	left: 50px;
}
</style>

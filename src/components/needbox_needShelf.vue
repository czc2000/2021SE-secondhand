<template>
    <div class="needbox">
      <div class=box>
        <img :src="needpicurl" alt="" @click="toShowPage">
        <p class="name" @click="toShowPage">{{needname}}</p>
        <p class="review">{{needDescription}}</p>
      </div>
    </div>
</template>

<script>
export default{
	name: "needbox_needShelf",
	props: ['needpicurl','needname','needDescription','needid','needsenderid'],
	data: function(){
		return{
			
		}
	},
	methods:{
	  toShowPage:function (){
      this.$router.push({path:'/needinfo',query:{needid:this.needid}})
    }
  }
}
</script>

<style scoped>
.needbox{
  width: 240px;
  height: 350px;
}
.box{
  overflow:hidden;
  position: absolute;
  width: 240px;
  height: 350px;
  padding: 10px;
  border-radius: 15px;
  background-color: white;
  border-style: solid;
  border-width: 3px;
  border-color: rgba(160,160,160,1);
  transition-property: border-color , box-shadow;
  transition-duration:0.5s , 0.5s;
}
.box:hover{
  border:3px solid coral;
  box-shadow:
      0 0.4px 4.3px -3px rgba(14, 24, 58, 0.032),
      0 1.1px 8.4px -3px rgba(14, 24, 58, 0.049),
      0 2.1px 12.4px -3px rgba(14, 24, 58, 0.062),
      0 3.4px 16.6px -3px rgba(14, 24, 58, 0.074),
      0 5.3px 21.4px -3px rgba(14, 24, 58, 0.084),
      0 7.9px 27.4px -3px rgba(14, 24, 58, 0.094),
      0 11.7px 35.7px -3px rgba(14, 24, 58, 0.103),
      0 17.6px 49px -3px rgba(14, 24, 58, 0.114),
      0 30px 80px -3px rgba(14, 24, 58, 0.13)
}
.box img{
  width: 220px;
  height: 220px;
  margin-top: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.review{
  width: 220px;
  height: 42px;
  font-size:15px;
  margin-top: 5px;
  margin-left: 5px;
  overflow: hidden;/* 超出的文本隐藏 */
  text-overflow: ellipsis; /* 溢出用省略号显示 */
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  -webkit-line-clamp: 2; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
  text-align: left;
  cursor: pointer;
}
.name{
  height: 22px;
  margin-left: 5px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bolder;
  color: coral;
  text-align: left;
  overflow: hidden;/* 超出的文本隐藏 */
  text-overflow: ellipsis; /* 溢出用省略号显示 */
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  -webkit-line-clamp: 2; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
}
</style>

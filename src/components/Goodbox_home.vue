<template>
	<div>
    <transition name="el-zoom-in-center">
      <div v-show="show" class="goodbox" @mouseenter="hovering=true" @mouseleave="hovering=false">
        <div class=box>
          <img :src="goodpicurl" alt="" @click="toShowPage">
          <p class="review" @click="toShowPage">{{goodname}}</p>
          <p class="price">￥{{goodprice}}</p>
            <div class="buttonGroup">
              <div class="icon"><el-button type="success" icon="el-icon-shopping-cart-1" size='medium' circle @click="toShowPage"></el-button></div>
              <div class="icon"><el-button :type="favoriteButtonType" icon="el-icon-star-off" size='medium' circle @click="$emit('favoriteOrNot')"></el-button></div>
              <div class="icon"><el-button type="danger"  icon="el-icon-delete"  size='medium' circle @click="show = !show"></el-button></div>
            </div>
        </div>
      </div>
    </transition>
	</div>
</template>

<script>
export default {
  name: "Goodbox_home",
  props:['goodpicurl','goodname','goodprice','goodsenderid','favorite','goodid'],
  data:function(){
    return{
      isActive:true,
      show:true,
      hovering:false,
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
			if(!this.$store.state.login) return;
			this.bid=this.goodprice;
			this.intentioned=false;
		},
		cancelIntention:function(){
			this.intentioning=false;
		},
		sendIntention:function(){
			var url="http://123.56.42.47:10492/sendIntention";
			this.axios.post(url+'/'+this.goodid,null,{
				params:{intentionprice:this.bid},
				headers:{'Authorization':this.$store.state.Authorization}
			})
			this.intentioned=true;
		}
  },
  computed:{
    favoriteButtonType(){
      return this.$store.state.login?this.favorite?"info":"warning":"warning";
    }
  }
}
</script>

<style scoped>
.goodbox{
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
  border-color: #e5f6f8;
  transition-property: border-color , box-shadow;
  transition-duration:0.5s , 0.5s;
}
.box:hover{
  border:3px solid #deeff1;
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
  margin-left: 10px;
  overflow: hidden;/* 超出的文本隐藏 */
  text-overflow: ellipsis; /* 溢出用省略号显示 */
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  -webkit-line-clamp: 2; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
  text-align: left;
  cursor: pointer;
}
.price{
  position: absolute;
  bottom: 40px;
  left: 20px;
  height: 20px;
  width: 130px;
  font-size: 22px;
  font-weight: bolder;
  color: coral;
  text-align: left;
}
.buttonGroup {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  left: 0px;
  top: 100%;
  /* 通过调整背景色透明度让背景透明 */
  background-color: #deeff1;
  /* 这会让整个层和内部元素全部透明 */
   opacity: 0.85;
  /* flex 布局 让图标靠右上角 */
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  /* 让旋转的圆心点在左上角 */
  transform-origin: left top;
  transition: 0.5s;
}

.buttonGroup .icon {
  margin-top: 10px;
  margin-right: 11px;
  /* 初始一个旋转角度，让图标产生旋转效果 */
  transform: rotate(-180deg);
  transition: 0.5s;
}

.box:hover .buttonGroup {
  /* 倾斜-15度 */
  transform: rotate(-15deg) translateY(-14px);
  /* 增加个阴影 */
  box-shadow: -10px -10px 100px rgba(0,0,0,0.6);
}

.box:hover .icon{
  transform: rotate(18deg);
}
.bid{
	text-align: center;
}
.prop-icon{
	margin-top: 5%;
	margin-left: 20%;
}
</style>
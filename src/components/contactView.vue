<template>
	<div :class="contactViewMainClass" @click="$emit('click_')">
		<img :src="avatar" alt="我的图图呢">
		<p class="name">{{name}}</p>
		<div class="contactView-main-unreadN" v-show="unreadN!=0"></div>
    <span class="delete">
                  <el-popconfirm
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      icon="el-icon-info"
                      icon-color="red"
                      @confirm="$emit('removeDialog')"
                      title="确认要删除这个联系人吗？"
                  >
                  <el-button type="text" slot="reference" >
                    <span  class="contactView-closebutton">
                    ×
                    </span>
                  </el-button>
                </el-popconfirm>
                </span>
	</div>
</template>

<script>
export default {
	name: "contactView",
	props: ['name','id','avatar','unreadN','choosen'],
	computed: {
		contactViewMainClass(){
			return this.id==this.choosen?"contactView-main choosen":"contactView-main unchoosen";
		}
	},
	watch: {
		choosen(val){
			//console.log('this.id: '+this.id+', this.choosen '+this.choosen)
		},
		unreadN(val){
			console.log('get unreadN change: '+val);
		}
	}
}
</script>

<style>
.contactView-main{
  position: relative;
  width: 100%;
  height: 10%;
  border-radius: 12px;
  transition-property: color,background-color;
  transition-duration: 0.5s;
}
.contactView-main>img{
  position: absolute;
  left: 15px;
  top: 11px;
  width: 54px;
  border-radius: 50%;
}
.contactView-main>p{
  position: absolute;
  top:24px;
  left:80px;
  font-weight: bold;
  font-size: 20px;

}
.choosen{
  color: white;
  background-color: hsl(243, 80%, 62%);
}
.choosen img{
  background-color: white;
}
.unchoosen{
  background-color: #f2f7ff;
}
.choosen .delete{
  position: absolute;
  top:5px;
  right: 5px;
}
.contactView-closebutton{
  display: none;
  width: 10%;
  height: 30%;
  background-color: rgba(255,255,255,0);
  line-height: 30%;
  font-size: 30px;
  color: white;
}
.choosen .contactView-closebutton{
  display: block;
}
.choosen .contactView-closebutton:hover{
  color: #ff304f;
}
.contactView-main.unchoosen:hover{
  background-color: hsl(243, 80%, 62%);
  color: white;
}
.unchoosen:hover img{
  background-color: white;
}
.contactView-main-unreadN{
  position: absolute;
  right: 10px;
  top:29px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 14px;
  color: white;
  background-color:#ff304f;
}
</style>

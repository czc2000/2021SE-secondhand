<template>
	<div :class="contactViewMainClass" @click="$emit('click_')">
		<img :src="avatar" alt="我的图图呢">
		<p>{{name}}</p>
		<div class="contactView-main-unreadN" v-show="unreadN!=0">{{unreadN}}</div>
		<button class="contactView-closebutton" @click="$emit('removeDialog')">×</button>
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
	width: 100%;
	height: 10%;
	border-bottom-color: #b3e2ea;
	border-bottom-style: solid;
	border-bottom-width: 2px;
}
.contactView-main>img{
	position: relative;
	left: -30%;
	top: 5%;
	width: 17%;
	height: 80%;
	border-radius: 50%;
	border: 2px solid #96bec5;
}
.contactView-main>p{
	position: relative;
	top: -80%;
	left: 10%;
}
.choosen{
	background-color: #BBBBBB;
}
.unchoosen{
	background-color: white;
}
.contactView-main-unreadN{
	position: relative;
	top: -70%;
	left: 60%;
	color: white;
	text-align: center;
	font-size: ;
	line-height: ;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: red;
}
.contactView-closebutton{
	position: relative;
	top: -120%;
	left: 45%;
	width: 10%;
	height: 30%;
	line-height: 30%;
	font-size: 30px;
}
.contactView-main.unchoosen:hover{
	background-color: #e6e6e6;
}
.choosen .contactView-closebutton{
	background-color: #BBBBBB;
}
.unchoosen .contactView-closebutton{
	background-color: white;
}
.choosen .contactView-closebutton:hover{
	color: white;
}
.unchoosen .contactView-closebutton:hover{
	color: red;
}
.contactView-main.unchoosen:hover .contactView-closebutton{
	background-color: #e6e6e6;
}
</style>

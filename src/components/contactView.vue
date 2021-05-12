<template>
	<div class="contactView-main" :style="bgColorOfContactViewMain" @click="$emit('click_')">
		<img :src="avatar" alt="我的图图呢">
		<p>{{name}}</p>
		<div class="contactView-main-unreadN" v-show="unreadN!=0">{{unreadN}}</div>
	</div>
</template>

<script>
export default {
	name: "contactView",
	props: ['name','id','avatar','unreadN','choosen'],
	computed: {
		bgColorOfContactViewMain(){
			return this.id==this.choosen?{"background-color": "#BBBBBB"}:{"background-color": "white"};
		}
	},
	watch: {
		choosen(val){
			//console.log('this.id: '+this.id+', this.choosen '+this.choosen)
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
.contactView-main:hover{
	background-color: #BBBBBB;
}
.contactView-main>img{
	position: relative;
	left: -30%;
	top: 5%;
	width: 20%;
	height: 80%;
	border-radius: 50%;
	border: 2px solid #96bec5;
}
.contactView-main>p{
	position: relative;
	top: -80%;
	left: 10%;
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
</style>

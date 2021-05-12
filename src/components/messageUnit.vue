<template>
	<div :class="messageUnitClass">
		<p class="messageTitle sendername">{{sendername}}</p>
		<p class="messageTitle sendtime">{{sendtime}}</p>
		<br/>
		<p class="mainText">{{text}}</p>
	</div>
</template>

<script>
export default{
	name: "messageUnit",
	props: ['senderid','contactname','text','sendtime'],
	computed: {
		messageUnitClass(){
			return this.senderid==this.$store.state.userid?"message-unit differ-fromMe":"message-unit differ-fromOthers";
		},
		sendername(){
			return this.senderid==this.$store.state.userid?this.$store.state.username:this.contactname;
		}
	}
}
</script>

<style>
.message-unit{
	display: block;
	margin-bottom: 20px;
	/*width: 50%;*/
	text-align: left;
	border: 2px black;
}
.differ-fromMe{
	/*margin-left: 50%;*/
}
.differ-fromOthers{
	/*margin-right: 50%;*/
}
.differ-fromMe>.messageTitle{
	color: green;
}
.differ-fromOthers>.messageTitle{
	color: blue;
}
.messageTitle{
	font-size: 15px;
	width: 40%;
	/*border: 1px black solid;*/
	float: left;
}
.sendername{
	width: 15%;
}
.sendtime{
	width: 60%;
}
.mainText{
	font-size: 15px;
}
</style>

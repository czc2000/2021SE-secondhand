<template>
	<div :class="messageUnitClass">
		<p class="messageSenderName">{{sendername}}</p>
		<p>{{text}}</p>
	</div>
</template>

<script>
export default{
	name: "messageUnit",
	props: ['senderid','contactname','text'],
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
.differ-fromMe>.messageSenderName{
	color: green;
}
.differ-fromOthers>.messageSenderName{
	color: blue;
}
</style>

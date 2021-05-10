<template>
		<div class="message-main">
			<div class="message-main-left">
				
			</div>
		</div>
</template>

<script>
export default{
	name: "messagePart",
	data:function(){
		return{
		}
	},
	computed:{
		unreadNum(){
			return this.$store.state.unreadList.length
		},
		loadUnreadList(){
			return this.$store.state.loadDone;
		}
	},
	created:function(){
		console.log('messagePage created');
	},
	watch:{
		/*loadUnreadList(val){
			if(val==true){
				this.handleUnread(0);
			}
		}*/
	},
	methods:{
		doNothing:function(){
			console.log('doNothing');
		},
		handleUnread:function(index){
			var vm=this;
			if(index>=this.$store.state.unreadList.length) this.loadContacts();
			else{
				var urlRemove='http://123.56.42.47:10492/removeContact';
				var urlAdd='http://123.56.42.47:10492/addContact';
				var vm=this;
				var senderid=this.$store.state.unreadList[index].messagesenderid;
				vm.axios.post(urlRemove,null,{
					params:{contactId:senderid},
					headers:{'Authorization':vm.$store.state.Authorization}
				}).then((response)=>{
					vm.axios.post(urlAdd,null,{
						params:{contactId:senderid},
						headers:{'Authorization':vm.$store.state.Authorization}
					}).then((response)=>{
						vm.handleUnread((index+1));
					})
				})
			}
		},
		loadContacts:function(){
			var url='http://123.56.42.47:10492/getContactList';
			var vm=this;
			new Promise(function(resolve,reject){
				vm.axios.get(url,{headers:{'Authorization':vm.$store.state.Authorization}}).then((response)=>{
					console.log('contactList: '+response.data.contactList.length);
					for(var i=0;i<response.data.contactList.length;i++)
						console.log(response.data.contactList[i].userid);
				})
			})
		}
	}
}
</script>

<style>
.message-main{
	position: absolute;
	top: 10%;
	left:15%;
	width: 70%;
	height: 85%;
	background-color: white;
	z-index: 100;
	border-style: solid;
	border-width: 3px;
	border-color: #b3e2ea;/*#f5f5f5;*/
}
.message-main-left{
	width: 30%;
	height: 100%;
	border-right-style: solid;
	border-right-width: 2px;
	border-right-color: #b3e2ea;/*#f5f5f5;*/
}

</style>

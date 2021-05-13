<template>
		<div class="message-main">
			<div class="message-main-left">
				<contactView class="view_" v-for="(item,index) in contactList" :key="item.userid"
				:avatar="'http://123.56.42.47:10492'+item.useravatarurl" :name="item.username"
				:id="item.userid" :unreadN='unreadNumOf[item.userid]' :choosen='choosen'
				@click_="chooseContact(item.userid,index)"></contactView>
			</div>
			<div class="message-main-right-top">
				<messageUnit v-for="(item,index) in history[choosen]" :key="item.messageid" 
				:senderid="item.messagesenderid" :contactname="contactList[choosenI].username"
				:text="item.messagecontent"></messageUnit>
			</div>
			<input class="message-main-right-bottom"></div>
</template>

<script>
import contactView from "@/components/contactView"
import messageUnit from "@/components/messageUnit"
export default{
	name: "messagePart",
	components:{
		contactView,
		messageUnit,
	},
	data:function(){
		return{
			timer:null,
			unreadList:[],
			unreadCatched:0,
			unreadNumOf:[],
			contactList:[],
			history:[],
			isContact:[],
			choosen:0,
			choosenI:null,
		}
	},
	computed:{
		unreadNum(){
			return this.unreadList.length
		},
		loadDone(){
			return this.$store.state.loadDone;
		}
	},
	watch:{
		loadDone(val){
			var vm=this;
			if(val==true)
			{
				this.getContact(true);
				console.log('??');
				this.timer=setInterval(this.checkUnread,5000);
			}
		}
	},
	created:function(){
		console.log('messagePage created');
	},
	beforeDestroy:function(){
		clearInterval(this.timer);
	},
	methods:{
		chooseContact:function(id,index){
			var url='http://123.56.42.47:10492/read';
			this.choosen=id;
			this.choosenI=index;
			//console.log('history['+this.choosen+']: '+this.history[this.choosen].length);
			var len=this.history[id].length,vm=this,num=this.unreadNumOf[id];
			//console.log('senderid: '+id+', unreadNum: '+this.unreadNumOf[id]);
			for(var i=0;i<num;i++)
			{
				this.axios.post(url+'/'+vm.history[id][len-i-1].messageid,null,{
					headers:{'Authorization':this.$store.state.Authorization}
				})
			}
			this.unreadCatched-=this.unreadNumOf[id];
			this.unreadNumOf[id]=0;
			this.$store.commit('changeUnreadNum',this.unreadCatched);
		},
		checkUnread:function(){
			if(!this.$store.state.login) return;
			var urlGetUnread='http://123.56.42.47:10492/getUnreadMsg';
			this.axios.get(urlGetUnread,{
				params:{credentials:{},details:{},principal:{}},
				headers:{'Authorization':this.$store.state.Authorization}
			}).then((response)=>{
				if(this.unreadCatched<response.data.msgList.length)
				{
					this.unreadList=response.data.msgList;
					this.$store.commit('changeUnreadNum',this.unreadList.length);
					this.processUnread(this.unreadCatched);
				}
				else this.getContact(false);
			})
		},
		processUnread:function(index){
			if(index==this.unreadList.length)
			{
				this.unreadCatched=this.unreadList.length;
				this.getContact(false);
				return;
			}
			console.log('processUnread: '+index+' unreadList.length: '+this.unreadList.length);
			var urlAdd="http://123.56.42.47:10492/addContact",
				thisId=this.unreadList[index].messagesenderid,
				vm=this;
			if(typeof(this.unreadNumOf[thisId])=="undefined")
				this.$set(this.unreadNumOf,thisId,1);
			else this.$set(this.unreadNumOf,thisId,this.unreadNumOf[thisId]+1);
			if(typeof(this.isContact[thisId])=='undefined'||this.isContact[thisId]==false)
			{
				this.$set(this.isContact,thisId,true)
				this.axios.post(urlAdd,null,{
					params:{contactId:thisId},
					headers:{'Authorization':this.$store.state.Authorization},
				})
			}
			this.processUnread(index+1);
		},
		getContact:function(initMode){
			console.log('getContact');
			var url='http://123.56.42.47:10492/getContactList';
			this.axios.get(url,{
				headers:{'Authorization':this.$store.state.Authorization},
			}).then((response)=>{
				this.contactList=response.data.contactList;
				this.recordContact(0,initMode);
			})
		},
		recordContact:function(i,initMode){
			if(i==this.contactList.length)
			{
				if(initMode)
					this.checkUnread();
				return;
			}
			var thisId=this.contactList[i].userid;
			if(typeof(this.unreadNumOf[thisId])=="undefined")
				this.$set(this.unreadNumOf,thisId,0);
			if(typeof(this.isContact[thisId])=='undefined'||this.isContact[thisId]==false)
				this.$set(this.isContact,thisId,true);
			this.getHistory(thisId);
			this.recordContact(i+1,initMode);
		},
		getHistory:function(id){
			var url='http://123.56.42.47:10492/chat';
			this.axios.get(url+'/'+id,{
				headers:{'Authorization':this.$store.state.Authorization},
			}).then((response)=>{
				this.$set(this.history,id,response.data.Messages);
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
	overflow-y: hidden;
}
.message-main-left:hover{
	overflow-y: scroll;
}
.message-main-left::-webkit-scrollbar {/*滚动条整体样式*/
	width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
	color: transparent;
	position: absolute;
	display: none;/*滚动条暂时整不明白*/
}
.message-main-left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 10px;
  background: #dadada;
 }
.message-main-left::-webkit-scrollbar-thumb:hover {/*滚动条里面小方块*/
  border-radius: 10px;
  background: #b9b9b9;
 }
.view_:last-child{
	border-bottom: none;
}
.message-main-right-top{
	position: relative;
	left: calc(30% + 2px);
	top: -100%;
	width: calc(70% - 2px);
	height: 70%;
	border-bottom: 2px solid #b3e2ea;
	overflow-y: scroll;
}
.message-main-right-top::-webkit-scrollbar{
	display: none;
}
.message-main-right-bottom{
	position: relative;
	left: calc(15% + 2px);
	top: -100%;
	width: calc(70% - 2px);
	height: calc(30% - 2px);
	/*outline: none;*/
	overflow-y: scroll;
}
.message-main-right-bottom::-webkit-scrollbar{
	display: none;
}
</style>

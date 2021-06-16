<template>
		<div class="message-main">
			<div class="message-main-left">
        <div class="title">联系人列表</div>
				<contactView class="view_" v-for="(item,index) in contactList" :key="item.userid"
				:avatar="'http://123.56.42.47:10492'+item.useravatarurl" :name="item.username"
				:id="item.userid" :unreadN="unreadNumOf[item.userid]" :choosen='choosen'
				@click_="chooseContact(item.userid,index)" @removeDialog="removeContact(item.userid,index)"></contactView>
				<contactView class="view_" v-for="(item,index) in tpContacts" :key="item.userid"
				:avatar="item.useravatarurl" :name="item.username"
				:id="item.userid" unreadN=0 :choosen='choosen'
				@click_="chooseContact(item.userid,index)" @removeDialog="removeTPContact(item.userid,index,false)"></contactView>
			</div>
			<div v-if="choosen!=0&&isContact[choosen]" class="message-main-right-top" id="msgbox">
				<messageUnit v-for="(item,index) in history[choosen]" :key="item.messageid"
				:senderid="item.messagesenderid" :contactname="contactList[choosenI].username"
				:text="item.messagecontent" :sendtime="item.messagesendtime" :avatar="'http://123.56.42.47:10492'+contactList[choosenI].useravatarurl"
        @report="reportMessage(item.messageid)">
        </messageUnit>
			</div>
      <div v-if="choosen!=0&&isContact[choosen]" class="message-main-right-bottom">
        <div id="inputbox" contenteditable=true @keyup.enter="submitMsg">
        </div>
        <div class="pressDownButton" @click="submitMsg"><i class="el-icon-chat-line-round"></i>发送</div>
      </div>
			<div v-if="choosen!=0&&!isContact[choosen]" class="message-main-right-top" id="msgbox">
				<messageUnit v-for="(item,index) in history[choosen]" :key="item.messageid"
				:senderid="item.messagesenderid" :contactname="tpContacts[choosenI].username"
				:text="item.messagecontent" :sendtime="item.messagesendtime"
        :avatar="'http://123.56.42.47:10492'+tpContacts[choosenI].useravatarurl"
         @report="reportMessage(item.messageid)">
        </messageUnit>
			</div>
      <div v-if="choosen!=0&&!isContact[choosen]" class="message-main-right-bottom">
        <div id="inputbox" contenteditable=true @keyup.enter="submitMsg"></div>
        <div class="pressDownButton" @click="submitMsg"><i class="el-icon-chat-line-round"></i>发送</div>
      </div>
      <el-dialog title="举报聊天消息" :visible.sync="reportFormVisible" style="margin-top: 80px" :modal-append-to-body='false'>
        <el-form :model="form">
          <el-form-item label="举报描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" placeholder="请描述举报内容" autocomplete="off"></el-input>
          </el-form-item>
          <template>
            <el-radio-group v-model="form.reason">
              <el-radio :label="1">包含色情信息</el-radio>
              <el-radio :label="2">恶意辱骂</el-radio>
              <el-radio :label="3">发表反动言论</el-radio>
              <el-radio :label="4">其他</el-radio>
            </el-radio-group>
          </template>
<!--          <el-form-item label="举报原因" :label-width="formLabelWidth">-->
<!--            <el-input v-model="form.reason" placeholder="请输入举报原因" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="reportFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendToAdmin($store.state.messageId,form.description,form.reason)">确 定</el-button>
        </div>
      </el-dialog>

    </div>
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
      reportFormVisible:false,
      form: {
        description:'',
        reason:'',
      },
      formLabelWidth: '120px',
			timer:null,
			timer2:null,
			timer3:null,
			unreadList:[],
			unreadCatched:0,
			unreadNumOf:[],
			contactList:[],
			history:[],
			isContact:[],
			beforeSendTo:[],
			scrollTop:[],
			choosen:0,
			choosenI:null,
			tpContacts:[],
			tpContactNum:0,

		}
	},
	computed:{
		unreadNum(){
			return this.unreadList.length
		},
		login(){
			return this.$store.state.login;
		},
		tpContact(){
			return this.$store.state.temporaryContact;
		},
		messagePartShow(){
			return this.$store.state.messageShow;
		},
		scrollTopOfChoosen(){
			return this.scrollTop[this.choosen];
		}
	},
	watch:{
		login(val){
			var vm=this;
			if(val==true)
			{
				console.log('消息系统初始化');
				this.getContact(true);
				this.timer=setInterval(this.gotoCheckUnread,5000);
				this.timer2=setInterval(this.checkFinishRead,500);
			}
		},
		tpContact(val){
			if(this.tpContact!=null){
				//console.log(val);
				if(typeof(this.isContact[val.userid])=="undefined"){
					//console.log('this undefined');
					this.$set(this.tpContacts,this.tpContactNum++,val);
					this.$set(this.isContact,val.userid,false);
					this.getHistory(val.userid,this.tpContactNum-1);
					this.$set(this.scrollTop,val.userid,-1);
				}
				else if(this.isContact[val.userid]==true){
					for(var i=0;i<this.contactList.length;i++){
						if(this.contactList[i].userid==val.userid){
							this.chooseContact(val.userid,i);
							break;
						}
					}
					return;
				}
				//this.$nextTick(()=>{this.chooseTPContact(val.userid,this.tpContacts.length-1)});
				//console.log(this.tpContactNum+' '+this.tpContacts[0]);
				for(var i=0;i<this.tpContactNum;i++)
					if(this.tpContacts[i].userid==val.userid){
						this.chooseContact(val.userid,i);
						break;
					}
				this.$store.commit('clearTPContact');
			}
		},
		messagePartShow(val){
			if(this.choosen==0) return;
			//console.log('turn: '+val);
			//if(val==false) console.log('after leave: '+this.scrollTop[this.choosen]);
			if(val==true)
				this.rechoose(this.choosen,this.choosenI);
			else if(val==false)
				this.checkFinishRead();
		},
		scrollTopOfChoosen(val){
			//if(val==-1) console.log('now turn to -1!');
		}
	},
	created:function(){
		console.log('messagePage created');
		this.$set(this.isContact,0,false);
	},
  beforeDestroy:function(){
		console.log('取消信息刷新');
		clearInterval(this.timer);
		clearInterval(this.timer2);
	},
	methods:{
	  sendToAdmin:function (messageid,description,reason){
      let url='http://123.56.42.47:10492/report/message'
      this.axios.post(url,null,{
        params:{messageid:messageid, reportDescription:description,reportReason:reason},
        headers:{'Authorization':this.$store.state.Authorization},
      }).then((response)=>{
        if(response.data.description==="举报成功！"){
          this.$alert("举报成功")
          this.reportFormVisible=false;
        }
        else{
          this.$alert("举报失败，请重新填写信息")
        }
      })
    },
	  reportMessage:function (messageid){
      this.$store.commit('storeMessageId',messageid)
	    this.reportFormVisible=true
    },
		gotoCheckUnread:function(){
			this.checkUnread(false)
		},
		setScrollOfMsgBoxTop:function(){
			this.$nextTick(function(){
				let msgbox=this.$el.querySelector('#msgbox');
				msgbox.scrollTop=msgbox.scrollHeight;
			})
		},
		resumeScrollTop:function(index){
			this.$nextTick(function(){
				let msgbox=this.$el.querySelector('#msgbox');
				msgbox.scrollTop=this.scrollTop[index];
			})
		},
		scrollAtBottom:function(box){
			return box.scrollHeight-box.scrollTop<=box.clientHeight+10;
		},
		saveScrollTop:function(id){
			let box=this.$el.querySelector('#msgbox');
			if(this.scrollAtBottom(box))
				this.$set(this.scrollTop,id,-1);
			else this.$set(this.scrollTop,id,box.scrollTop)
		},
		finishRead:function(id){
			//console.log('?');
			//console.log('finish read');
			var url='http://123.56.42.47:10492/read';
			var len=this.history[id].length,vm=this,num=this.unreadNumOf[id];
			//console.log('before: '+this.unreadCatched);
			this.unreadCatched-=this.unreadNumOf[id];
			//console.log('after: '+this.unreadCatched);
			this.$set(this.unreadNumOf,id,0);
			this.$store.commit('changeUnreadNum',this.unreadCatched);
			//console.log('senderid: '+id+', unreadNum: '+this.unreadNumOf[id]);
			for(var i=0;i<num;i++)
			{
				this.axios.post(url+'/'+vm.history[id][len-i-1].messageid,null,{
					headers:{'Authorization':this.$store.state.Authorization}
				}).then((resposne)=>{
					//console.log(vm.history[id][len-i-1].messageid+' has been read');
				})
			}
		},
		checkFinishRead:function(){
			if(this.choosen==0||!this.$store.state.messageShow) return;
			this.saveScrollTop(this.choosen);
			if(!this.isContact[this.choosen]) return;
			//console.log('scrollTop: '+this.scrollTop[this.choosen]+', unreadNum: '+this.unreadNumOf[this.choosen])
			if(this.scrollTop[this.choosen]==-1&&this.unreadNumOf[this.choosen]!=0)
			{
				//console.log('should finishRead');
				this.finishRead(this.choosen);
			}
		},
		chooseContact:function(id,index){
			if(this.choosen!=0){
				var inputbox=document.getElementById('inputbox'),vm=this;
				let msgbox=this.$el.querySelector('#msgbox');
				//console.log('top: '+msgbox.scrollTop+', height: '+msgbox.scrollHeight+', bottom?: '+this.scrollAtBottom(msgbox));
				//console.log('this.scrollTop['+this.choosen+']: '+this.scrollTop[this.choosen]);
				this.saveScrollTop(this.choosen);
				new Promise(function(resolve,reject){
					vm.$set(vm.beforeSendTo,vm.choosen,inputbox.innerText);
					resolve();
				}).then(function(resolve,reject){
						inputbox.innerText=vm.beforeSendTo[id];
					})
			}
			this.choosen=id;
			this.choosenI=index;
			if(this.scrollTop[id]==-1)
			{
				this.setScrollOfMsgBoxTop();
				if(this.isContact[id]) this.finishRead(id);
			}
			else this.resumeScrollTop(id);
			//console.log('history['+this.choosen+']: '+this.history[this.choosen].length);
		},
		removeTPContact:function(id,index,changerole){
			this.$set(this.beforeSendTo,id,"");
			if(!changerole) this.$set(this.isContact,id,undefined);
			else this.$set(this.isContact,id,true);
			var vm=this;
			if(index!=-1)
				this.tpContacts.splice(index,1);
			else{
				for(var i=0;i<this.tpContactNum;i++)
					if(this.tpContacts[i].userid==id){
						this.tpContacts.splice(i,1);
						break;
					}
			}
			this.tpContactNum--;
			this.$store.commit('clearTPContact');
			this.finishRead(id);
			if(index!=-1) this.choosen=0;
		},
		removeContact:function(id,index){
			this.$set(this.beforeSendTo,id,"");
			this.$set(this.scrollTop,id,-1);
			this.$set(this.isContact,id,undefined);
			this.choosen=0;
			this.contactList.splice(index,1);
			this.finishRead(id);
			var url="http://123.56.42.47:10492/removeContact",vm=this;
			this.axios.post(url,null,{
				params:{contactId:id},
				headers:{'Authorization':this.$store.state.Authorization}
			}).then((response)=>{
			}).then(()=>{
				vm.checkUnread(true);
			})
		},
		submitMsg:function(){
			var inputbox=document.getElementById('inputbox'),
				url='http://123.56.42.47:10492/sendMessage',
				vm=this;
			var empty=true;
			for(var i=0;i<inputbox.innerText.length;i++)
			{
				//console.log(inputbox.innerText.charCodeAt(i));
				if(inputbox.innerText.charCodeAt(i)!=10)
				{
					empty=false;
					break;
				}
			}
			/*for(var i=0;i<inputbox.innerText.length;i++)
				console.log(inputbox.innerText.charCodeAt(i));
			console.log(empty);*/
			if(empty)
				return;
			inputbox.innerText.replace(/"\n"/g,"\r\n");
			if(this.isContact[this.choosen]==false){
				var urlAdd="http://123.56.42.47:10492/addContact";
				this.axios.post(urlAdd,null,{
					params:{contactId:this.choosen},
					headers:{'Authorization':this.$store.state.Authorization},
				})
			}
			//console.log('get it!');
			this.setScrollOfMsgBoxTop();
			this.axios.post(url+'/'+this.choosen,null,{
				params:{messagecontent:inputbox.innerText},
				headers:{'Authorization':this.$store.state.Authorization}
			}).then((response)=>{
				this.checkUnread(true);
			})
			this.$set(this.beforeSendTo,this.choosen,"");
			inputbox.innerText="";
		},
		checkUnread:function(thenGetContact){
			if(!this.$store.state.login) return;
			var urlGetUnread='http://123.56.42.47:10492/getUnreadMsg';
			this.axios.get(urlGetUnread,{
				params:{credentials:{},details:{},principal:{}},
				headers:{'Authorization':this.$store.state.Authorization}
			}).then((response)=>{
				//console.log('unreadCatched: '+this.unreadCatched+', unread: '+response.data.msgList.length);
				if(this.unreadCatched<response.data.msgList.length)
				{
					//console.log('before: '+this.unreadCatched);
					this.unreadList=response.data.msgList;
					this.$store.commit('changeUnreadNum',this.unreadList.length);
					this.processUnread(this.unreadCatched);
				}
				else if(thenGetContact) this.getContact(false);
			})
		},
		processUnread:function(index){
			if(index==this.unreadList.length)
			{
				this.unreadCatched=this.unreadList.length;
				//console.log('after: '+this.unreadCatched);
				this.getContact(false);
				return;
			}
			//console.log('processUnread: '+index+' unreadList.length: '+this.unreadList.length);
			var urlAdd="http://123.56.42.47:10492/addContact",
				thisId=this.unreadList[index].messagesenderid,
				vm=this;
			if(typeof(this.unreadNumOf[thisId])=="undefined")
				this.$set(this.unreadNumOf,thisId,1);
			else this.$set(this.unreadNumOf,thisId,this.unreadNumOf[thisId]+1);
			if(typeof(this.isContact[thisId])=='undefined'||this.isContact[thisId]==false)
			{
				if(this.isContact[thisId]==false) this.removeTPContact(thisId,-1,true);
				else this.$set(this.isContact,thisId,true);
				this.axios.post(urlAdd,null,{
					params:{contactId:thisId},
					headers:{'Authorization':this.$store.state.Authorization},
				}).then((response)=>{
					vm.processUnread(index+1);
				})
			}
			else this.processUnread(index+1);
		},
		getContact:function(initMode){
			//console.log('getContact');
			var url='http://123.56.42.47:10492/getContactList';
			this.axios.get(url,{
				headers:{'Authorization':this.$store.state.Authorization},
			}).then((response)=>{
				this.contactList=response.data.contactList;
				//console.log('response.data.contactList.length: '+response.data.contactList.length);
				this.recordContact(0,initMode);
			})
		},
		recordContact:function(i,initMode){
			if(i==this.contactList.length)
			{
				if(initMode)
					this.checkUnread(false);
				return;
			}
			var thisId=this.contactList[i].userid;
			//console.log('isContact['+thisId+']: '+this.isContact[thisId]);
			if(typeof(this.unreadNumOf[thisId])=="undefined")
				this.$set(this.unreadNumOf,thisId,0);
			if(typeof(this.isContact[thisId])=='undefined')
				this.$set(this.isContact,thisId,true);
			else if(this.isContact[thisId]==false){
				this.removeTPContact(thisId,-1,true);
			}
			if(typeof(this.beforeSendTo[thisId])=='undefined')
				this.$set(this.beforeSendTo,thisId,"");
			if(typeof(this.scrollTop[thisId])=='undefined')
				this.$set(this.scrollTop,thisId,-1);
			this.getHistory(thisId,i);
			this.recordContact(i+1,initMode);
		},
		getHistory:function(id,i){
			var url='http://123.56.42.47:10492/chat',vm=this;
			this.axios.get(url+'/'+id,{
				headers:{'Authorization':this.$store.state.Authorization},
			}).then((response)=>{
				if(id==this.choosen&&this.$store.state.messageShow){
					this.saveScrollTop(id);
					//console.log('got you');
				}
				return response;
			}).then((response)=>{
				this.$set(this.history,id,response.data.Messages);
			}).then(()=>{
				vm.$nextTick(()=>{
					if(id==vm.choosen){
						if(!vm.$store.state.messageShow){
							vm.choosenI=i;
						}
						else vm.rechoose(id,i);
					}
				})
			})
		},
		rechoose:function(id,index){
			this.choosen=id;
			this.choosenI=index;
			if(this.scrollTop[id]==-1)
			{
				this.setScrollOfMsgBoxTop();
				if(this.isContact[id]==true) this.finishRead(id);
			}
		},
	}
}
</script>

<style>
.message-main{
  position: absolute;
  left:20%;
  width: 1150px;
  border-radius: 8px;
  background-color: white;
  height: 800px;
  z-index: 100;
  box-shadow:
      0 -0.8px 3.2px rgba(0, 0, 0, 0.024),
      0 -0.3px 6.3px rgba(0, 0, 0, 0.036),
      0 1.8px 9.5px rgba(0, 0, 0, 0.044),
      0 5.4px 12.9px rgba(0, 0, 0, 0.052),
      0 10.7px 16.8px rgba(0, 0, 0, 0.059),
      0 18.1px 21.4px rgba(0, 0, 0, 0.065),
      0 28.2px 27.4px rgba(0, 0, 0, 0.072),
      0 41.8px 35.8px rgba(0, 0, 0, 0.08),
      0 61.7px 49.5px rgba(0, 0, 0, 0.09),
      0 100px 80px rgba(0, 0, 0, 0.11)
;

}
.message-main-left{
  position: absolute;
  width: calc(30% - 30px);
  top: 20px;
  left: 15px;
  height: 95%;
  border-radius: 8px;
  background-color: #f2f7ff;
  overflow: hidden;
}
.message-main-left .title{
  margin-top: 18px;
  margin-bottom: 18px;
  font-family: "微软雅黑 Light";
  font-weight: 600;
  font-size: 20px;
}
.message-main-left:hover{
  overflow-y: scroll;
}
.message-main-left::-webkit-scrollbar {/*滚动条整体样式*/
  display: none;/*滚动条暂时整不明白*/
}
/*.message-main-left::-webkit-scrollbar-thumb {!*滚动条里面小方块*!*/
/*  border-radius: 10px;*/
/*  background: #dadada;*/
/* }*/
/*.message-main-left::-webkit-scrollbar-thumb:hover {!*滚动条里面小方块*!*/
/*  border-radius: 10px;*/
/*  background: #b9b9b9;*/
/* }*/
.view_:last-child{
  border-bottom: none;
}
.message-main-right-top{
  position: absolute;
  width: calc(70% - 15px);
  height:70%;
  left: 30%;
  border-radius: 8px;
  top:20px;
  background-color: #f2f7ff;
  overflow-y: auto;
}
.message-main-right-top::-webkit-scrollbar-thumb{
  background-color: #c2cde0;
}
.message-main-right-bottom{
  position: absolute;
  left:30%;
  height:130px;
  bottom: 75px;
  width: calc(70% - 15px);
  border-radius: 8px;
  background-color: #f2f7ff;
  text-align: left;
}
.message-main-right-bottom #inputbox{
  height:120px;
  margin-left:8px;
  margin-top: 8px;
  outline: none;
  overflow-y: auto;
}
.message-main-right-bottom #inputbox::-webkit-scrollbar-thumb{
  background-color: #c2cde0;
}
.message-main-right-bottom .pressDownButton {
  margin-top: 12px;
  float: right;
  width: 50px;
  background-color: hsl(222, 100%, 95%);
  padding: 12px 24px;
  color: hsl(243, 80%, 62%);
  border-radius: 6px;
  border-bottom: 4px solid hsl(221, 89%, 85%);
  border-top: 0px solid rgba(249, 250, 251,1);
  transition: all 0.1s ease-in-out;
}

.message-main-right-bottom .pressDownButton:hover {
  border-bottom-width: 0;
  border-top-width: 4px;
  cursor: pointer;
}

</style>

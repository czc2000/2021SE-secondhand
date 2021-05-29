<template>
  <div>
    <div class="message-unit differ-fromOthers" v-if="messageUnitClass=='message-unit differ-fromOthers'">
      <div>
        <img :src="avatarurl" alt="">
        <div class="chat-content" >
          <p class="mainText" @mouseenter="enter" @mouseleave="leave">{{text}}</p>
        </div>
        <el-button type="text" style="color: #F56C6C;" @click="$emit('report')" v-show="seen">举报</el-button>
      </div>
      <p class="sendtime">{{sendtime}}</p>
    </div>
    <div class="message-unit differ-fromMe" v-if="messageUnitClass=='message-unit differ-fromMe'">
      <div>
        <div class="chat-content">
          <p class="mainText">{{text}}</p>
        </div>
        <img :src="avatarurl" alt="">
      </div>
      <p class="sendtime">{{sendtime}}</p>
    </div>
  </div>
</template>

<script>
export default{
	name: "messageUnit",
	props: ['senderid','contactname','text','sendtime','avatar'],
  data:function (){
	  return {
      seen: false
    }
  },
	computed: {
		messageUnitClass(){
			return this.senderid==this.$store.state.userid?"message-unit differ-fromMe":"message-unit differ-fromOthers";
		},
		sendername(){
			return this.senderid==this.$store.state.userid?this.$store.state.username:this.contactname;
		},
		avatarurl(){
		  return this.senderid==this.$store.state.userid?this.$store.state.useravatar:this.avatar;
    }
	},
  methods:{
	  enter:function (){
	    this.seen=true;
    },
    leave:function (){
      setTimeout(() => {
        this.seen=false;0
      }, 1500)
    }
  }
}
</script>

<style>
.message-unit{
	display: block;
  height: 100px;
	margin-top: 20px;
	/*width: 50%;*/
	text-align: left;
	border: 2px black;
}
.message-unit img{
  margin-top: 10px;
  border-radius: 25px;
  width:50px;
  height:50px;
}
.differ-fromMe{
  text-align: right;
	margin-right: 10px;
}
.differ-fromMe img{
}
.differ-fromOthers{
	margin-left: 10px;
}

.messageTitle{
	font-size: 15px;
	width: 40%;
	/*border: 1px black solid;*/
	float: left;
}
.message-unit .chat-content{
   position: relative;
   padding: 8px 14px;
   display: inline-block;
   border-radius: 6px;
   bottom:15px;
   font-size: 18px;
}

.message-unit .sendtime{
  margin-left: 10px;
  font-size: 12px;
  color: #b2b2b2;
}

.differ-fromOthers .chat-content{
  background-color: white;
  margin:0px 0 0px 10px;

}
.differ-fromOthers .chat-content ::after{
  content: '';
  border: 8px solid #ffffff00;
  border-right: 8px solid white;
  position: absolute;
  top: 8px;
  left: -15px;
}


.differ-fromMe .chat-content{
  color: white;
  margin:0px 10px 0px 0;
  background-color: #0e153a;
}
.differ-fromMe .chat-content ::after{
  content: '';
  border: 8px solid #ffffff00;
  border-left: 8px solid #0e153a;
  position: absolute;
  top: 8px;
  right: -15px;
}
</style>

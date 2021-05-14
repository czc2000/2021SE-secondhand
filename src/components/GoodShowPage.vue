<template>
  <div v-if="loaded">
    <div class="Show_Background">
    </div>
  <div class="goodinfo">
    <div class="preview">
      <img :src="this.good.goodpicurl" alt="">
      <div class="previewbottom">
        <p>举报</p>
      </div>
    </div>
    <div class="iteminfo">
      <div class="goodtitle">
        {{good.goodname}}
      </div>
      <div class="senderinfo"  @click="addTemporaryContact">
        <div class="price">￥{{good.goodprice}}</div>
        <el-tooltip content="联系卖家" placement="bottom" effect="light">
        <div class="sendername">{{senderinfo.username}}</div>
        </el-tooltip>
        <img :src="this.senderinfo.useravatarurl" class="Show_circleImg">
      </div>
      <el-divider></el-divider>
      <div class="description">
        {{good.gooddescription}}
				
      </div>
			<el-tag :key="tag" v-for="(tag,index) in good.goodtags" :closable="myGood"
				:disable-transitions="false" @close="handleClose(index)">
					{{tag}}
			</el-tag>
			<div v-if="myGood">
				<el-input v-if="addingTag" class="input-new-tag" v-model="tagInput"
					ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" 
					@blur="handleInputConfirm">
				</el-input>
				<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
			</div>
      <el-divider></el-divider>
      <div class="buy">
        <div class="horizontalOverlay" @click="intentionInputShow=!intentionInputShow"><span>点击购买</span></div>
				<div class="createIntentionInput" v-show="intentionInputShow">
					<input id="createIntentionInput">
					<button @click="createIntention">提交意向</button>
				</div>
        <div class="horizontalOverlay2" @click="addTemporaryContact"><span>了解更多</span></div>
      </div>
    </div>
  </div>
  <div class="comment" :style="commentboxheight">
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="评论区" name="first">
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" infinite-scroll-disabled="disabled">
          <li v-for="(item,index) in commentlist" v-if="index<commentcount" class="infinite-list-item">
            <commentBox  :key="index" commenttype="good" :commentcontent="item.commentcontent"
                        :commenttime="item.commenttime" :useravatar="commentsendinfo[index].useravatarurl"
                        :username="commentsendinfo[index].username" :number="index+1"
                         :candelete="item.commentuserid==loginerid" :commentid="item.goodcommentid">
            </commentBox>
          </li>
        </ul>
        <div v-if="!noMore&&!commentloading" class="arrowBounce" @click="load">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20">
          <path d="M7.5 0a.5.5 0 01.5.5v16.17l4.44-4.45a.5.5 0 01.71 0l.7.71a.5.5 0 010 .71l-6.13 6.14a.75.75 0 01-.53.22h-.38a.77.77 0 01-.53-.22L.15 13.64a.5.5 0 010-.71l.7-.71a.49.49 0 01.7 0L6 16.67V.5a.5.5 0 01.5-.5z">
          </path>
          </svg>
        </div>
        <div class="bouncingLoader" v-if="commentloading"><div></div></div>
      </el-tab-pane>
      <el-tab-pane label="发表评论" name="second">
        <div class="postcomment">
        <el-input type="textarea" v-model="comment" placeholder="输入你的评论"></el-input>
          <el-alert
              title="不能发送空的评论哦"
              type="error"
              v-show="commentIsNull"
              @close="closeAlert"
          >
          </el-alert>
          <div class="pressDownButton" @click="sendComment"><i class="el-icon-chat-dot-square"></i>评论</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  </div>
</template>

<script>
import commentBox from "@/components/commentBox";
export default {
  inject:['reload'],
  name: "GoodShowPage",
  components:{
    commentBox
  },
  data:function (){
    return{
      loaded:false,
      goodid:'',
      good:{},
      senderinfo:{
      },
      commentlist:{},
      commentsendinfo:{},
      comment:'',
      commentIsNull:false,
      activeName:'first',
      commentcount:5,
      commentloading:false,
      commentboxheight:'--height:',
			intentionInputShow:false,
			tagInput:'',
			addingTag:false,
			name:'',
			description:'',
    }
  },
  computed: {
    noMore () {
      return this.commentcount >=this.commentlist.length
    },
    disabled () {
      return this.commentloading || this.noMore
    },
    loginerid(){
      return this.$store.state.userid;
    },
		myGood(){
			return this.senderinfo.userid==this.$store.state.userid;
		}
  },
  created:async function() {
    if(!this.$route.query.goodid){
      console.log('没有商品id');
      return;
    }
    this.goodid=this.$route.query.goodid;
    var url='http://123.56.42.47:10492/goodInfo/'+this.goodid;
    //获得商品信息
    this.axios.get(url).then((response)=>{
      if(response.data.good!=null){
        this.good = response.data.good
        this.good.goodpicurl = 'http://123.56.42.47:10492' + this.good.goodpicurl
        url='http://123.56.42.47:10492/userinfo/'+this.good.goodsenderid;
        this.axios.get(url).then((response)=>{
          this.senderinfo=response.data.user;
          this.senderinfo.useravatarurl='http://123.56.42.47:10492'+this.senderinfo.useravatarurl
        })
      }
      else{
        console.log('没有该商品');
        return;
      }
    })
    // //获取评论列表
    this.getComment();
    },
  methods:{
    sendComment:function (){
      if(!this.$store.state.login){
        this.$alert('登录之后才可以进行评论哦', '未登录', {
          confirmButtonText: '确定',
          center:true,
        })
        return;
      }
      if(this.comment){
        this.commentIsNull=false;
        var url='http://123.56.42.47:10492/sendGoodComment/'+this.goodid;
        this.axios.post(url,null,{
          headers:{
            'Authorization': this.$store.state.Authorization
          },
          params:{
            goodcommentcontent:this.comment
          }
        }).then(response=>{
          if(response.data.status==200){
            this.$message({
              message: '发布评论成功',
              type: 'success'
            });
            this.reload();
          }
        })
      }else{
        this.commentIsNull=true;
      }
    },
    closeAlert:function (){
      this.commentIsNull=false;
    },
    getComment:async function () {
      var url='http://123.56.42.47:10492/getGoodComment/'+this.goodid;
      var that=this
      await that.axios.get(url).then(response=>{
        that.commentlist=response.data.CommentList;
        console.log(this.commentlist)
      })
      for(var i=0;i<this.commentlist.length;i++){
        if (this.commentlist[i].commenttime!=null){
          this.commentlist[i].commenttime=this.commentlist[i].commenttime.slice(0,10);
        }
        url='http://123.56.42.47:10492/userinfo/'+this.commentlist[i].commentuserid;
        await this.axios.get(url).then(response=>{
          that.commentsendinfo[i]=response.data.user;
          that.commentsendinfo[i].useravatarurl='http://123.56.42.47:10492'+that.commentsendinfo[i].useravatarurl
        }).catch(reason => {
          console.log(reason)
        })
      }
      this.commentcount=this.commentlist.length>5?5:this.commentlist.length;
      var length=this.commentcount*120+80;
      if(length>680)
        length=680;
      this.commentboxheight=this.commentboxheight+length+'px'
      this.loaded=true;
    },
    load:function (){
      this.commentloading=true
      setTimeout(() => {
        this.commentcount += 5
        this.commentloading = false
      }, 2000)
    },
		addTemporaryContact:function(){
			//console.log(this.senderinfo);
			if(!this.$store.state.login) return;
			this.$store.commit('addTemporaryContact',this.senderinfo);
			this.$store.commit('showMessage');
		},
		createIntention:function(){
			var input=this.$el.querySelector('#createIntentionInput');
			var v=Number(input.value),url="http://123.56.42.47:10492/sendIntention";
			if(!isNaN(v)&&v>=0){
				//this.intentionInputShow=false;
				input.value='';
				this.axios.post(url+'/'+this.goodid,null,{
					params:{intentionprice:v},
					headers:{'Authorization':this.$store.state.Authorization}
				}).then((response)=>{
					console.log('提交成功');
				})
			}
		},
		handleClose(index){
		   this.good.goodtags.splice(index, 1);
		 },
		showInput(){
		  this.addingTag = true;
		  this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
		  });
		},
		handleInputConfirm(){
		  let inputValue=this.tagInput;
		  if (inputValue){
				var repeat=false;
				for(var i=0;i<this.good.goodtags.length;i++)
					if(this.good.goodtags[i]==inputValue){
						repeat=true;
						break;
					}
		    if(!repeat) this.good.goodtags.push(inputValue);
		  }
		  this.addingTag=false;
		  this.tagInput='';
		},
  }
}
</script>

<style>
@import "../assets/GoodShowPage.css";
.comment {
  --height: 100px;
}
.comment .infinite-list{
  height: var(--height);
}
.Show_Background{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 1080px;
  background-image: url('../assets/GoodShowPage/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
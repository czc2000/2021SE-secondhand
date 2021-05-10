<template>
  <div v-if="this.loaded">
    <div class="needinfo">
      <div class="preview">
        <img :src="this.need.needpicurl" alt="">
        <div class="previewbottom">
          <p>举报</p>
        </div>
      </div>
      <div class="iteminfo">
        <div class="needtitle">
          {{need.needname}}
        </div>
        <div class="senderinfo">
          <div class="price"></div>
          <el-tooltip content="联系卖家" placement="bottom" effect="light">
            <div class="sendername">{{senderinfo.username}}</div>
          </el-tooltip>
          <img :src="this.senderinfo.useravatarurl" class="circleImg">
        </div>
        <el-divider></el-divider>
        <div class="description">
          {{need.needdescription}}
        </div>
        <el-divider></el-divider>
        <div class="buy">
          <div class="horizontalOverlay2"><span>联系买家</span></div>
        </div>
      </div>
    </div>
    <div class="comment" :style="commentboxheight" ref="commentlist">
      <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="评论区" name="first">
          <ul class="infinite-list"  v-infinite-scroll="load" style="overflow:auto" infinite-scroll-disabled="disabled" >
            <li v-for="(item,index) in commentlist" v-if="index<commentcount" class="infinite-list-item">
              <commentBox  :key="index" commenttype="need" :commentcontent="item.commentcontent"
                           :commenttime="item.commenttime" :useravatar="commentsendinfo[index].useravatarurl"
                           :username="commentsendinfo[index].username" :number="index+1"
                           :candelete="item.commentuserid==loginerid" :commentid="item.needcommentid">
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
    <div>
      <el-backtop target=".el-main" :right="80">
        <div class="pulseAnim"><i class="el-icon-top"></i></div>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import commentBox from "@/components/commentBox";
export default {
  name: "NeedShowPage",
  components:{
    commentBox
  },
  data:function (){
    return{
      loaded:false,
      needid:'',
      need:{},
      senderinfo:{
      },
      commentlist:{},
      commentsendinfo:{},
      comment:'',
      commentIsNull:false,
      activeName:'first',
      commentcount:5,
      commentloading:false,
      commentboxheight:'--height:'
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
    }
  },
  created:async function() {
    if(!this.$route.query.needid){
      console.log('没有需求id');
      return;
    }
    this.needid=this.$route.query.needid;
    var url='http://123.56.42.47:10492/n/'+this.needid;
    //获得商品信息
    this.axios.get(url).then((response)=>{
      if(response.data.Need!=null){
        this.need = response.data.Need
        this.need.needpicurl = 'http://123.56.42.47:10492' + this.need.needpicurl
        this.senderinfo=response.data.NeedSender;
        this.senderinfo.useravatarurl='http://123.56.42.47:10492'+this.senderinfo.useravatarurl
      }
      else{
        console.log('没有该需求');
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
        var url='http://123.56.42.47:10492/sendNeedComment/'+this.needid;
        this.axios.post(url,null,{
          headers:{
            'Authorization': this.$store.state.Authorization
          },
          params:{
            needcommentcontent:this.comment
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
    getComment:async function () {
      var url='http://123.56.42.47:10492/getNeedComment/'+this.needid;
      var that=this
      await that.axios.get(url).then(response=>{
        that.commentlist=response.data.CommentList;
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
    closeAlert:function (){
      this.commentIsNull=false;
    },
    load:function (){
      this.commentloading=true
      setTimeout(() => {
        this.commentcount += 5
        this.commentloading = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
@import "../assets/NeedShowPage.css";
.comment {
  --height: 100px;
}
.comment .infinite-list{
    height: var(--height);
  }
</style>
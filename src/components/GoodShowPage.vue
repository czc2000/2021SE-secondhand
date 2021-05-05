<template>
  <div v-if="loaded">
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
      <div class="senderinfo">
        <div class="price">￥{{good.goodprice}}</div>
        <el-tooltip content="联系卖家" placement="bottom" effect="light">
        <div class="sendername">{{senderinfo.username}}</div>
        </el-tooltip>
        <img :src="this.senderinfo.useravatarurl" class="circleImg">
      </div>
      <el-divider></el-divider>
      <div class="description">
        {{good.gooddescription}}
      </div>
      <el-divider></el-divider>
      <div class="buy">
        <div class="horizontalOverlay"><span>点击购买</span></div>
        <div class="horizontalOverlay2"><span>了解更多</span></div>
      </div>
    </div>
  </div>
  <div class="comment">
    <el-tabs v-model="activeName" type="border-card" >
      <el-tab-pane label="评论区" name="first">
        <commentBox v-for="(item,index) in commentlist" :key="index" :commentcontent="item.commentcontent"
                    :commenttime="item.commenttime" :useravatar="commentsendinfo[index].useravatarurl"
                    :username="commentsendinfo[index].username" :number="index+1">
        </commentBox>
      </el-tab-pane>
      <el-tab-pane label="发表评论" name="second">
        <div class="postcomment">
        <el-input type="textarea" v-model="comment" placeholder="输入你的评论"></el-input>
          <el-alert
              title="成功评论"
              type="success"
              v-show="commentSuccess"
          >
          </el-alert>
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
      commentSuccess:false,
      activeName:'first'
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
      if(this.$store.state.login==false){
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
          console.log(response);
          if(response.data.status==200){
            this.commentSuccess=true;
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
      this.loaded=true;
    },
  }
}
</script>

<style>
.goodinfo{
  margin: 50px auto;
  width: 1280px;
  height: 480px;
}
.preview{
  float: left;
  padding:0 50px;
}
.preview img{
  width: 350px;
}
.previewbottom p{
  float: right;
  width: 30px;
  color: #919191;
  font-size: 13px;
}
.preview p:hover{
  color: red;
  cursor: pointer;
}
.iteminfo{
  float: left;
  width: 590px;
  text-align: left;
}
.iteminfo .goodtitle{
  font:700 16px Arial,"microsoft yahei";
  color: #666;
  text-align: left;
}
.iteminfo .senderinfo{
  margin-top: 15px;
  height: 60px;
  background-color: rgb(250, 250, 250);
}

.iteminfo .senderinfo .circleImg{
  float: right;
  border-radius: 25px;
  width:50px;
  height:50px;
}
.iteminfo .senderinfo  .circleImg,.sendername:hover{
  cursor: pointer;
}
.iteminfo .senderinfo .price{
  float: left;
  line-height: 60px;
  margin-left: 16px;
  font-size: 32px;
  font-weight: 700;
  color: red;
}
.iteminfo .senderinfo .sendername{
  float: right;
  line-height: 60px;
  font-size: 16px;
  font-weight: 600;
  padding-left: 16px;
  margin-right: 16px;
  color: #ffd647;
}
.iteminfo .el-divider{
  margin-top: 10px;
  margin-bottom: 10px;
}
.iteminfo .description{
  height: 165px;
  padding: 14px;
  font-size: 14px;
  border: 2px dashed #cdcdcd;

}
.horizontalOverlay {
  overflow: hidden;
  padding: 12px 30px;
  border-radius: 6px;
  background-color: rgba(255,0,0,0.7);
  color: white;
  font-size: 20px;
  font-weight: 700;
  position: relative;
  display: inline-block;
}
.horizontalOverlay :hover{
  cursor: pointer;
}
.horizontalOverlay::before {
  content: '创建订单';
  padding: 12px 30px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: red;
  transform: scaleX(0);
  transform-origin: 100% 100%;
  transition: transform 0.3s cubic-bezier(0.53, 0.21, 0, 1);
  will-change: transform;
}

.horizontalOverlay:hover::before  {
  transform-origin: 0 0;
  transform: scaleX(1);
  cursor: pointer;
}

.horizontalOverlay2 {
  margin-left: 20px;
  overflow: hidden;
  padding: 12px 30px;
  border-radius: 6px;
  background-color:rgba(255,214,37,0.7);
  color: white;
  font-size: 20px;
  font-weight: 700;
  position: relative;
  display: inline-block;
}
.horizontalOverlay2 :hover{
  cursor: pointer;
}
.horizontalOverlay2::before {
  content: '联系卖家';
  padding: 12px 30px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:#ffe909;
  transform: scaleX(0);
  transform-origin: 100% 100%;
  transition: transform 0.3s cubic-bezier(0.53, 0.21, 0, 1);
  will-change: transform;
}

.horizontalOverlay2:hover::before  {
  transform-origin: 0 0;
  transform: scaleX(1);
  cursor: pointer;
}

.comment{
  width: 1280px;
  margin: 0 auto 20px;
}
.comment .el-tabs__item{
  font-size: 16px;
}
.comment .pressDownButton {
  margin-top:10px;
  float: right;
  width: 80px;
  background-color: hsl(222, 100%, 95%);
  padding: 12px 24px;
  color: hsl(243, 80%, 62%);
  border-radius: 6px;
  border-bottom: 4px solid hsl(221, 89%, 85%);
  border-top: 0px solid rgba(249, 250, 251,1);
  transition: all 0.1s ease-in-out;
}

.comment .pressDownButton:hover {
  border-bottom-width: 0;
  border-top-width: 4px;
  cursor: pointer;
}
</style>
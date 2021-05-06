<template>
  <div class="diskaform">
    <ol>
      <li>
        <article>
          <div class="diskameta">
            <div class="author">
						<span class="diskathumb">
							<img :src="useravatar" alt="author"/>
						</span>
              <span class="diskaauthorname">{{username}}
              </span>
              <a href="#" class="diskadate">{{commenttime}}</a>
                <span class="delete">
                  <el-popconfirm
                      confirm-button-text="确认"
                      cancel-button-text="取消"
                      icon="el-icon-info"
                      icon-color="red"
                      @confirm="deleteComment"
                      title="确认要删除这条评论吗？"
                      v-if="candelete"
                  >
                  <el-button type="text" slot="reference">
                    <span class="deletetext">
                      删除
                    </span>
                  </el-button>
                </el-popconfirm>
                </span>
            </div>
          </div>
          <div class="diskanumber">{{number}}L</div>
          <div class="diskacontent">
            {{commentcontent}}
          </div>
        </article>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  name: "commentBox",
  props:['useravatar','commentcontent','commenttime','username','number','commentid','candelete'],
  methods:{
    deleteComment:function (){
      var url='http://123.56.42.47:10492/deleteGoodComment/'+this.commentid;
      this.axios.post(url,null,{
        headers:{
          'Authorization': this.$store.state.Authorization
        }
      }).then(response=>{
        this.$message({
          message: '删除评论成功',
          type: 'success'
        });
        this.reload();
      })
    }
  }
}
</script>

<style scoped>
.diskaform ol{
  clear: both;
  overflow: hidden;
  margin:0 auto;
  padding:0;
  width: 90%;
}
.diskaform ol li, .diskameta .diskathumb {
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  list-style: none outside none;
  margin: 0 0 20px 35px;
  padding: 4px;
}
.diskaform article {
  position: relative;
}
.diskameta {
  background: none repeat scroll 0 0 #c9c9c9;
  border-radius: 4px;
  height: auto;
  line-height: 37px;
  min-height: 37px;
  padding-left: 10px;
  position: relative;
}
.diskameta .diskathumb {
  display: block;
  left: -40px;
  margin: 0;
  position: absolute;
  top: 50px;
  border-radius: 50px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
}

.diskameta .diskathumb img {
  display: block;
  cursor:pointer;
  height: 50px;
  max-width: 100%;
  border-radius: 50px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
}

.diskameta .diskathumb img:hover{
  opacity: .7;
  transform:scale(1.2);
  -ms-transform:scale(1.2); /* IE 9 */
  -moz-transform:scale(1.2); /* Firefox */
  -webkit-transform:scale(1.2); /* Safari and Chrome */
  -o-transform:scale(1.2); /* Opera */
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  transition: 0.5s;
}

.diskaauthorname {
  float: left;
  color: #333333;
  font-size: 16px;
  font-weight: 700;
  line-height: 37px;
}
.delete{
  float: right;
  color: #919191;
  margin-right: 10px;
}
.delete .deletetext{
  font-size: 14px;
  color: #919191;
}
.delete .deletetext:hover{
  color: red;
}
.diskadate {
  display: inline;
  float: right;
  font-size: 13px;
  margin-top: 1px;
  margin-right: 10px;
  text-transform: uppercase;
}

.diskadate:hover{ background:none !important;}

.diskanumber {
  bottom: 23px;
  color:#c9c9c9;
  font-size: 36px;
  line-height: 36px;
  position: absolute;
  right: 10px;
}

.diskacontent{
  font-size: 0.95em;
  line-height: 1.5;
  padding: 20px 55px 30px 45px;
  position: relative;
  color:#333333;
}

.diskareply a {
  bottom: 3px;
  display: block;
  font-size: 12px;
  position: absolute;
  right: 12px;
  text-transform: uppercase;
}

.diskareply a:hover{
  background:none !important;
}



</style>
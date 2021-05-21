<template>
  <div class="admin">
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-aside  width="400px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-menu-item style="font-size:25px">用户列表</el-menu-item>
          <div>
            <el-input v-model="userPage" placeholder="请输入页码" style="width: 120px"></el-input>
            <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowUser">显示</el-button>
            共{{userTotalPage()}}页
          </div>
          <el-menu-item style="font-size:25px">商品列表</el-menu-item>
          <div>
            <el-input v-model="goodPage" placeholder="请输入页码" style="width: 120px"></el-input>
            <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowGood">显示</el-button>
            共{{goodTotalPage()}}页
          </div>
          <el-menu-item style="font-size:25px">需求列表</el-menu-item>
          <div>
            <el-input v-model="needPage" placeholder="请输入页码" style="width: 120px"></el-input>
            <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowNeed">显示</el-button>
            共{{needTotalPage()}}页
          </div>
          <el-submenu>
            <template slot="title"><i style="font-size: 20px" class="el-icon-message"></i><span style="font-size: 25px">举报信息列表</span></template>
            <el-menu-item style="font-size:20px">商品举报</el-menu-item>
            <el-menu-item style="font-size:20px">需求举报</el-menu-item>
            <el-menu-item style="font-size:20px">消息举报</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-table v-show="showUser" :data="userTableData">
            <el-table-column prop="userId" label="用户编号" width="140">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="220">
            </el-table-column>
            <el-table-column prop="userSex" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="userPhone" label="手机号" width="220">
            </el-table-column>
            <el-table-column prop="userMail" label="邮箱" width="300">
            </el-table-column>
            <el-table-column prop="userOperation" label="删除操作">
              <template slot-scope="scope">
                <el-button @click="deleteUser(scope.row)" type="text" size="small">删除用户</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showGood" :data="goodTableData">
            <el-table-column prop="goodId" label="商品编号" width="140">
            </el-table-column>
            <el-table-column prop="goodPicture" label="图片" width="320">
              <template slot-scope="scope">
                <img :src="showGoodPic(scope.row)" width="200" height="200" alt="暂无图片"/>
              </template>
            </el-table-column>
            <el-table-column prop="goodName" label="名称" width="420">
            </el-table-column>
            <el-table-column prop="goodPrice" label="价格" width="120">
            </el-table-column>
            <el-table-column prop="goodOperation" label="删除操作">
              <template slot-scope="scope">
                <el-button @click="deleteGood(scope.row)" type="text" size="small">删除商品</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showNeed" :data="needTableData">
            <el-table-column prop="needId" label="需求编号" width="100">
            </el-table-column>
            <el-table-column prop="needPicture" label="图片" width="270">
              <template slot-scope="scope">
                <img :src="showNeedPic(scope.row)" width="200" height="200" alt="暂无图片"/>
              </template>
            </el-table-column>
            <el-table-column prop="needName" label="需求名称" width="220">
            </el-table-column>
            <el-table-column prop="needDescription" label="需求描述" width="320">
            </el-table-column>
            <el-table-column prop="needSenderId" label="发布者用户编号" width="100">
            </el-table-column>
            <el-table-column prop="needOperation" label="删除操作">
              <template slot-scope="scope">
                <el-button @click="deleteNeed(scope.row)" type="text" size="small">删除需求</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Administrator",
  data: function (){
    return {
      totalUserPage:'',
      totalGoodPage:'',
      totalNeedPage:'',
      userPage:'',
      goodPage:'',
      needPage:'',
      userList:[{
        userId:'',
        userName:'',
        userSex:'',
        userPhone:'',
        userMail:'',
      }],
      goodList:[{
        goodId:'',
        goodName:'',
        goodPrice:'',
        goodPicture:'',
      }],
      needList:[{
        needId:'',
        needPicture:'',
        needName:'',
        needDescription:'',
        needSenderId:'',
      }],
      userTableData:[],
      goodTableData:[],
      needTableData:[],
      showGood:false,
      showUser:false,
      showNeed:false
    }
  },
  methods:{
    toShowUser:function (){
      this.showUser = true
      this.showGood = false
      this.showNeed = false
      this.userList.splice(0,this.userList.length)
      this.userTableData.splice(0,this.userTableData.length)
      let url='http://123.56.42.47:10492/admin/user/'+this.userPage
      this.axios.get(url, {
        params:{PageNumber:this.userPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=> {
        for (var i = 0; i < response.data.userList.length; i++) {
          this.userList.push({
            userId: response.data.userList[i].userid,
            userName: response.data.userList[i].username,
            userSex: response.data.userList[i].usersex,
            userPhone: response.data.userList[i].userphonenumber,
            userMail: response.data.userList[i].useremail
          })
        }
        for(var i=0 ; i<response.data.userList.length ; i++){
          if(this.userList[i].userSex===0){
            this.userList[i].userSex='女'
          }
          else{
            this.userList[i].userSex='男'
          }
        }
        for (var i = 0; i < response.data.userList.length; i++) {
          this.userTableData.push(this.userList[i])
        }
        console.log(this.userTotalPage())
      })
    },
    toShowGood:function (){
      this.showGood=true
      this.showUser=false
      this.showNeed=false
      this.goodList.splice(0,this.goodList.length)
      this.goodTableData.splice(0,this.goodTableData.length)
      let url='http://123.56.42.47:10492/admin/good/'+this.goodPage
      this.axios.get(url, {
        params:{PageNumber:this.goodPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
          for(var i=0 ; i<response.data.goodList.length ; i++){
            this.goodList.push({
              goodId:response.data.goodList[i].goodid,
              goodName:response.data.goodList[i].goodname,
              goodPrice:response.data.goodList[i].goodprice,
              goodPicture:"http://123.56.42.47:10492"+response.data.goodList[i].goodpicurl})
          }
          for(var i=0 ; i<response.data.goodList.length ; i++) {
            this.goodTableData.push(this.goodList[i])
          }
      })
    },
    toShowNeed:function (){
      this.showUser=false
      this.showGood=false
      this.showNeed=true
      this.needList.splice(0,this.needList.length)
      this.needTableData.splice(0,this.needTableData.length)
      let url='http://123.56.42.47:10492/admin/need/'+this.needPage
      this.axios.get(url, {
        params:{PageNumber:this.needPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        for(var i=0 ; i<response.data.needList.length ; i++){
          this.needList.push({
            needId:response.data.needList[i].needid,
            needName:response.data.needList[i].needname,
            needDescription:response.data.needList[i].needdescription,
            needSenderId: response.data.needList[i].needsenderid,
            needPicture:"http://123.56.42.47:10492"+response.data.needList[i].needpicurl})
        }
        for(var i=0 ; i<response.data.needList.length ; i++) {
          this.needTableData.push(this.needList[i])
        }
      })
    },
    deleteUser(row){
      var url='http://123.56.42.47:10492/admin/deleteUser/'+row.userId
      this.axios.post(url,
          {params:{userid:row.userId}},
          {headers:{'Authorization':this.$store.state.Authorization}}
      ).then(response=>{
        this.userList.splice(0,this.userList.length)
        this.userTableData.splice(0,this.userTableData.length)
        this.axios.get('http://123.56.42.47:10492/admin/user/'+this.userPage, {
          params:{PageNumber:this.userPage},
          headers:{'Authorization':this.$store.state.Authorization}
        }).then(response=> {
          for (var i = 0; i < response.data.userList.length; i++) {
            this.userList.push({
              userId: response.data.userList[i].userid,
              userName: response.data.userList[i].username,
              userSex: response.data.userList[i].usersex,
              userPhone: response.data.userList[i].userphonenumber,
              userMail: response.data.userList[i].useremail
            })
          }
          for(var i=0 ; i<response.data.userList.length ; i++){
            if(this.userList[i].userSex===0){
              this.userList[i].userSex='女'
            }
            else{
              this.userList[i].userSex='男'
            }
          }
          for (var i = 0; i < response.data.userList.length; i++) {
            this.userTableData.push(this.userList[i])
          }
          this.$alert("成功删除用户")
        })
      })
    },
    deleteGood(row){
      var url='http://123.56.42.47:10492/admin/deleteGood/'+row.goodId
      this.axios.post(url,
          {params:{goodid:row.goodId}},
          {headers:{'Authorization':this.$store.state.Authorization}}
      ).then(response=> {
        this.goodList.splice(0,this.goodList.length)
        this.goodTableData.splice(0,this.goodTableData.length)
        this.axios.get('http://123.56.42.47:10492/admin/good/'+this.goodPage, {
          params:{PageNumber:this.goodPage},
          headers:{'Authorization':this.$store.state.Authorization}
        }).then(response=>{
          for(var i=0 ; i<response.data.goodList.length ; i++){
            this.goodList.push({
              goodId:response.data.goodList[i].goodid,
              goodName:response.data.goodList[i].goodname,
              goodPrice:response.data.goodList[i].goodprice,
              goodPicture:"http://123.56.42.47:10492"+response.data.goodList[i].goodpicurl})
          }
          for(var i=0 ; i<response.data.goodList.length; i++) {
            this.goodTableData.push(this.goodList[i])
          }
          this.$alert("成功删除商品")
        })
      })
    },
    deleteNeed(row){
      var url='http://123.56.42.47:10492/admin/deleteNeed/'+row.needId
      this.axios.post(url,
          {params:{needid:row.needId}},
          {headers:{'Authorization':this.$store.state.Authorization}}
      ).then(response=> {
        this.needList.splice(0,this.needList.length)
        this.needTableData.splice(0,this.needTableData.length)
        this.axios.get('http://123.56.42.47:10492/admin/need/'+this.needPage, {
          params:{PageNumber:this.needPage},
          headers:{'Authorization':this.$store.state.Authorization}
        }).then(response=>{
          for(var i=0 ; i<response.data.needList.length ; i++){
            this.needList.push({
              needId:response.data.needList[i].needid,
              needName:response.data.needList[i].needname,
              needDescription:response.data.needList[i].needdescription,
              needSenderId: response.data.needList[i].needsenderid,
              needPicture:"http://123.56.42.47:10492"+response.data.needList[i].needpicurl})
          }
          for(var i=0 ; i<response.data.needList.length ; i++) {
            this.needTableData.push(this.needList[i])
          }
          this.$alert("成功删除需求")
        })
      })
    },
    userTotalPage:function (){
      let url='http://123.56.42.47:10492/admin/user/1'
      this.axios.get(url, {
        params:{PageNumber:1},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then((response)=> {
        this.totalUserPage=response.data.totalPageNum
      })
      return this.totalUserPage
    },
    goodTotalPage:function (){
      let url='http://123.56.42.47:10492/admin/good/1'
      this.axios.get(url, {
        params:{PageNumber:1},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then((response)=> {
        this.totalGoodPage=response.data.totalPageNum
      })
      return this.totalGoodPage
    },
    needTotalPage:function (){
      let url='http://123.56.42.47:10492/admin/need/1'
      this.axios.get(url, {
        params:{PageNumber:1},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then((response)=> {
        this.totalNeedPage=response.data.totalPageNum
      })
      return this.totalNeedPage
    },
    showGoodPic(row){
      return row.goodPicture
    },
    showNeedPic(row){
      return row.needPicture
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  line-height: 80px;
  height:600px;
}
</style>
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
          </div>
          <el-menu-item style="font-size:25px">需求列表</el-menu-item>
          <div>
            <el-input v-model="needPage" placeholder="请输入页码" style="width: 120px"></el-input>
            <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowNeed">显示</el-button>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-table v-show="showUser" :data="userTableData">
            <el-table-column prop="userId" label="用户ID" width="140">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="220">
            </el-table-column>
            <el-table-column prop="userSex" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="userPhone" label="手机号" width="220">
            </el-table-column>
            <el-table-column prop="userMail" label="邮箱" width="300">
            </el-table-column>
            <el-table-column prop="userOperation" label="执行操作">
              <template slot-scope="scope">
                <el-button @click="deleteUser(scope.row)" type="text" size="small">删除用户</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showGood" :data="goodTableData">
            <el-table-column prop="goodId" label="商品ID" width="140">
            </el-table-column>
            <el-table-column prop="goodName" label="名称" width="820">
            </el-table-column>
            <el-table-column prop="goodPrice" label="价格" width="120">
            </el-table-column>
            <el-table-column prop="goodOperation" label="执行操作">
              <template slot-scope="scope">
                <el-button @click="deleteGood(scope.row)" type="text" size="small">删除商品</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showNeed" :data="needTableData">
            <el-table-column prop="needId" label="需求ID" width="140">
            </el-table-column>
            <el-table-column prop="needName" label="名称" width="320">
            </el-table-column>
            <el-table-column prop="needDescribe" label="简要描述" width="620">
            </el-table-column>
            <el-table-column prop="needOperation" label="执行操作">
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
      // userTotalPage:'',
      // goodTotalPage:'',
      // needTotalPage:'',
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
      }],
      needList:[{

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
        for (var i = 0; i < 50; i++) {
          this.userList.push({
            userId: response.data.userList[i].userid,
            userName: response.data.userList[i].username,
            userSex: response.data.userList[i].usersex,
            userPhone: response.data.userList[i].userphonenumber,
            userMail: response.data.userList[i].useremail
          })
        }
        for(var i=0 ; i<50 ; i++){
          if(this.userList[i].userSex===0){
            this.userList[i].userSex='女'
          }
          else{
            this.userList[i].userSex='男'
          }
        }
        for (var i = 0; i < 50; i++) {
          this.userTableData.push(this.userList[i])
        }
        console.log(this.userTotalPage())
      })
    },
    toShowNeed:function (){
      this.showUser=false
      this.showGood=false
      this.showNeed=true
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
          for(var i=0 ; i<10 ; i++){
            this.goodList.push({
              goodId:response.data.goodList[i].goodid,
              goodName:response.data.goodList[i].goodname,
              goodPrice:response.data.goodList[i].goodprice,})
          }
          for(var i=0 ; i<10 ; i++) {
            this.goodTableData.push(this.goodList[i])
          }
      })
    },
    deleteUser(row){
      var url='http://123.56.42.47:10492/admin/deleteUser/'+row.userId
      this.axios.post(url,
          {params:{PageNumber:row.userId}},
          {headers:{'Authorization':this.$store.state.Authorization}}
      ).then(response=>{
        this.userList.splice(0,this.userList.length)
        this.userTableData.splice(0,this.userTableData.length)
        this.axios.get('http://123.56.42.47:10492/admin/user/'+this.userPage, {
          params:{PageNumber:this.userPage},
          headers:{'Authorization':this.$store.state.Authorization}
        }).then(response=> {
          for (var i = 0; i < 50; i++) {
            this.userList.push({
              userId: response.data.userList[i].userid,
              userName: response.data.userList[i].username,
              userSex: response.data.userList[i].usersex,
              userPhone: response.data.userList[i].userphonenumber,
              userMail: response.data.userList[i].useremail
            })
          }
          for(var i=0 ; i<50 ; i++){
            if(this.userList[i].userSex===0){
              this.userList[i].userSex='女'
            }
            else{
              this.userList[i].userSex='男'
            }
          }
          for (var i = 0; i < 50; i++) {
            this.userTableData.push(this.userList[i])
          }
          this.$alert("成功删除用户")
        })
      })
    },
    deleteGood(row){
      var url='http://123.56.42.47:10492/admin/deleteGood/'+row.goodId
      this.axios.post(url,
          {params:{PageNumber:row.goodId}},
          {headers:{'Authorization':this.$store.state.Authorization}}
      ).then(response=> {
        this.goodList.splice(0,this.goodList.length)
        this.goodTableData.splice(0,this.goodTableData.length)
        this.axios.get('http://123.56.42.47:10492/admin/good/'+this.goodPage, {
          params:{PageNumber:this.goodPage},
          headers:{'Authorization':this.$store.state.Authorization}
        }).then(response=>{
          for(var i=0 ; i<10 ; i++){
            this.goodList.push({
              goodId:response.data.goodList[i].goodid,
              goodName:response.data.goodList[i].goodname,
              goodPrice:response.data.goodList[i].goodprice,})
          }
          for(var i=0 ; i<10 ; i++) {
            this.goodTableData.push(this.goodList[i])
          }
          this.$alert("成功删除商品")
        })
      })
    },
    deleteNeed:function (){

    },
    userTotalPage:function (){
      let url='http://123.56.42.47:10492/admin/user/2'
      this.axios.get(url, {
        params:{PageNumber:1},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then((response)=> {
        this.totalUserPage=response.data.totalPageNum
      })
      return this.totalUserPage
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
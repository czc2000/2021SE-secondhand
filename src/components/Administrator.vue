<template>
  <div class="admin">
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item>用户列表</el-menu-item>
          <el-menu-item @click="toShowUser">
            <el-input v-model="userPage" placeholder="请输入页码" style="width: 150px"></el-input>
            <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowUser">显示</el-button>
          </el-menu-item>
          <el-menu-item>商品列表</el-menu-item>
          <el-menu-item @click="toShowUser">
            <el-input v-model="goodPage" placeholder="请输入页码" style="width: 150px"></el-input>
            <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowGood">显示</el-button>
          </el-menu-item>
          <el-menu-item>需求列表</el-menu-item>
          <el-menu-item @click="toShowUser">
            <el-input v-model="needPage" placeholder="请输入页码" style="width: 150px"></el-input>
            <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowNeed">显示</el-button>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-table v-show="showUser" :data="userTableData">
            <el-table-column prop="userId" label="用户ID" width="140">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="320">
            </el-table-column>
            <el-table-column prop="userPhone" label="手机号" width="320">
            </el-table-column>
            <el-table-column prop="userMail" label="邮箱" width="300">
            </el-table-column>
            <el-table-column prop="userOperation" label="执行操作">
              <el-button type="text" size="small" @click="deleteUser">删除用户</el-button>
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
              <el-button type="text" size="small" @click="deleteGood">删除商品</el-button>
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
              <el-button type="text" size="small" @click="deleteNeed">删除需求</el-button>
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
    var userItem = {
    };
    var goodItem = {
    };
    var needItem = {
    };
    return {
      userPage:'',
      goodPage:'',
      needPage:'',
      userList:[{
        userId:'',
        userName:'',
        userPhone:'',
        userMail:'',
      }],
      goodList:[{
        goodId:'',
        goodName:'',
        goodPrice:'',
      }],
      userTableData:[],
      goodTableData:[],
      needTableData:[],
      showGood:false,
      showUser:true,
      showNeed:false
    }
  },
  methods:{
    toShowUser:function (){
      this.showUser=true
      this.showGood=false
      this.showNeed=false
      // let url='http://123.56.42.47:10492/admin/user'
      // this.axios.get(url,{
      //   headers:{
      //     'Authorization':this.$store.state.Authorization
      //   }
      // }).then(response=>{
      //   if(this.userList.length<2){
      //     for(var i=0 ; i<10 ; i++){
      //       this.userList.push({
      //         userId:response.data.userList[i].userid,
      //         userName:response.data.userList[i].username,
      //         userPhone:response.data.userList[i].userphonenumber,
      //         userMail:response.data.userList[i].useremail })
      //     }
      //     for(var i=1 ; i<11 ; i++){
      //       this.userTableData.push(this.userList[i])
      //     }
      //   }
      // })
    },
    toShowNeed:function (){
      this.showUser=false
      this.showGood=false
      this.showNeed=true
    },
    toShowGood:function (){
      this.goodTableData.splice(0,this.goodTableData.length)
      let url='http://123.56.42.47:10492/admin/good/'+this.goodPage
      this.axios.get(url, {
        params:{PageNumber:this.goodPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        console.log(response)
        this.goodTableData.splice(0,this.goodTableData.length)
          for(var i=0 ; i<10 ; i++){
            this.goodList.push({
              goodId:response.data.goodList[i].goodid,
              goodName:response.data.goodList[i].goodname,
              goodPrice:response.data.goodList[i].goodprice,})
          }
          console.log(response.data.goodList.length)
          console.log(this.goodList)
          for(var i=0 ; i<10 ; i++){
            this.goodTableData.push(this.goodList[i])
          }
          this.goodList.splice(0,this.goodList.length)
          this.showGood=true
          this.showUser=false
          this.showNeed=false

      })
    },
    deleteUser:function (){

    },
    deleteGood:function (){

    },
    deleteNeed:function (){

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
}
</style>
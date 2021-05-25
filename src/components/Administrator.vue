<template>
  <div class="admin">
    <el-container style="height: 866px; border: 1px solid #eee">
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
          <el-submenu index="1">
            <template slot="title"><i style="font-size: 20px" class="el-icon-message"></i><span style="font-size: 25px">举报信息列表</span></template>
            <el-menu-item style="font-size:20px">消息举报</el-menu-item>
            <div>
              <el-input v-model="messageReportPage" placeholder="请输入页码" style="width: 120px"></el-input>
              <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowMessageReport">显示</el-button>
              共{{getMessageReportTotalPage()}}页
            </div>
            <el-menu-item style="font-size:20px">商品举报</el-menu-item>
            <div>
              <el-input v-model="goodReportPage" placeholder="请输入页码" style="width: 120px"></el-input>
              <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowGoodReport">显示</el-button>
              共{{getGoodReportTotalPage()}}页
            </div>
            <el-menu-item style="font-size:20px">需求举报</el-menu-item>
            <div>
              <el-input v-model="needReportPage" placeholder="请输入页码" style="width: 120px"></el-input>
              <el-button style="width: 70px ; height: 40px"  type="primary" @click="toShowNeedReport">显示</el-button>
              共{{getNeedReportTotalPage()}}页
            </div>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-table v-show="showUser" :data="userTableData"  :header-cell-style="{'text-align':'center'}">
            <el-table-column prop="userId" label="用户编号" width="140" align="center">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="220" align="center">
            </el-table-column>
            <el-table-column prop="userSex" label="性别" width="120" align="center">
            </el-table-column>
            <el-table-column prop="userPhone" label="手机号" width="220" align="center">
            </el-table-column>
            <el-table-column prop="userMail" label="邮箱" width="300" align="center">
            </el-table-column>
            <el-table-column prop="userOperation" label="删除操作" align="center">
              <template slot-scope="scope">
                <el-button @click="deleteUser(scope.row)" type="text" size="small">删除用户</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showGood" :data="goodTableData"  :header-cell-style="{'text-align':'center'}">
            <el-table-column prop="goodId" label="商品编号" width="140" align="center">
            </el-table-column>
            <el-table-column prop="goodPicture" label="图片" width="320" align="center">
              <template slot-scope="scope">
                <img :src="showGoodPic(scope.row)" width="200" height="200" alt="暂无图片"/>
              </template>
            </el-table-column>
            <el-table-column prop="goodName" label="名称" width="220" align="center">
            </el-table-column>
            <el-table-column prop="goodDescription" label="描述" width="220" align="center">
            </el-table-column>
            <el-table-column prop="goodPrice" label="价格" width="120" align="center">
            </el-table-column>
            <el-table-column prop="goodOperation" label="删除操作" align="center">
              <template slot-scope="scope">
                <el-button @click="deleteGood(scope.row)" type="text" size="small">删除商品</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showNeed" :data="needTableData"  :header-cell-style="{'text-align':'center'}">
            <el-table-column prop="needId" label="需求编号" width="100" align="center">
            </el-table-column>
            <el-table-column prop="needPicture" label="图片" width="270" align="center">
              <template slot-scope="scope">
                <img :src="showNeedPic(scope.row)" width="200" height="200" alt="暂无图片"/>
              </template>
            </el-table-column>
            <el-table-column prop="needName" label="需求名称" width="220" align="center">
            </el-table-column>
            <el-table-column prop="needDescription" label="需求描述" width="320" align="center">
            </el-table-column>
            <el-table-column prop="needSenderId" label="发布者用户编号" width="100" align="center">
            </el-table-column>
            <el-table-column prop="needOperation" label="删除操作" align="center">
              <template slot-scope="scope">
                <el-button @click="deleteNeed(scope.row)" type="text" size="small">删除需求</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showMessageReport" :data="messageReportTableData"  :header-cell-style="{'text-align':'center'}">
<!--            <el-table-column prop="reportId" label="消息举报编号" width="100">-->
<!--            </el-table-column>-->
            <el-table-column prop="sendTime" label="举报时间" width="150" align="center">
            </el-table-column>
            <el-table-column prop="category" label="举报原因" width="150" align="center">
            </el-table-column>
            <el-table-column prop="description" label="举报内容描述" width="300" align="center">
            </el-table-column>
            <el-table-column prop="original" label="聊天记录内容" width="300" align="center">
            </el-table-column>
            <el-table-column prop="operation" label="执行操作" align="center">
              <template slot-scope="scope">
                <el-button @click="dealMessageReport(scope.row,0)" type="text" size="small">忽略举报</el-button>
                <el-button @click="dealMessageReport(scope.row,1)" type="text" size="small">删除消息</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showGoodReport" :data="goodReportTableData"  :header-cell-style="{'text-align':'center'}">
            <el-table-column prop="sendTime" label="举报时间" width="100" align="center">
            </el-table-column>
            <el-table-column prop="category" label="举报原因" width="130" align="center">
            </el-table-column>
            <el-table-column prop="description" label="举报内容描述" width="140" align="center">
            </el-table-column>
            <el-table-column prop="good" label="商品详细信息" width="640" align="center">
              <el-table-column prop="goodId" label="商品编号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="goodPicture" label="图片" width="180" align="center">
                <template slot-scope="scope">
                  <img :src="showGoodPic(scope.row)" width="150" height="150" alt="暂无图片"/>
                </template>
              </el-table-column>
              <el-table-column prop="goodName" label="名称" width="180" align="center">
              </el-table-column>
              <el-table-column prop="goodDescription" label="描述" width="180" align="center">
              </el-table-column>
              <el-table-column prop="goodPrice" label="价格" width="50" align="center">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="operation" label="执行操作" align="center">
              <template slot-scope="scope">
                <el-button @click="dealGoodReport(scope.row,0)" type="text" size="small">忽略举报</el-button>
                <br>
                <el-button @click="dealGoodReport(scope.row,1)" type="text" size="small">删除商品</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-show="showNeedReport" :data="needReportTableData"  :header-cell-style="{'text-align':'center'}">
            <el-table-column prop="sendTime" label="举报时间" width="100" align="center">
            </el-table-column>
            <el-table-column prop="category" label="举报原因" width="130" align="center">
            </el-table-column>
            <el-table-column prop="description" label="举报内容描述" width="140" align="center">
            </el-table-column>
            <el-table-column prop="need" label="需求详细信息" width="640" align="center">
              <el-table-column prop="needId" label="需求编号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="needPicture" label="图片" width="180" align="center">
                <template slot-scope="scope">
                  <img :src="showNeedPic(scope.row)" width="150" height="150" alt="暂无图片"/>
                </template>
              </el-table-column>
              <el-table-column prop="needName" label="名称" width="205" align="center">
              </el-table-column>
              <el-table-column prop="needDescription" label="描述" width="205" align="center">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="operation" label="执行操作" align="center">
              <template slot-scope="scope">
                <el-button @click="dealNeedReport(scope.row,0)" type="text" size="small">忽略举报</el-button>
                <br>
                <el-button @click="dealNeedReport(scope.row,1)" type="text" size="small">删除需求</el-button>
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
      messageReportTotalPage:'',
      goodReportTotalPage:'',
      needReportTotalPage:'',
      messageReportPage:'',
      needReportPage:'',
      goodReportPage:'',
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
        goodDescription:'',
        goodPicture:'',
      }],
      needList:[{
        needId:'',
        needPicture:'',
        needName:'',
        needDescription:'',
        needSenderId:'',
      }],
      messageReportList:[{
        reportId:'',
        sendTime:'',
        description:'',
        category:'',
        original:'',
      }],
      goodReportList:[{
        reportId:'',
        sendTime:'',
        description:'',
        category:'',
        goodId:'',
        goodPicture:'',
        goodName:'',
        goodDescription:'',
        goodPrice:'',
      }],
      needReportList:[{
        reportId:'',
        sendTime:'',
        description:'',
        category:'',
        needId:'',
        needPicture:'',
        needName:'',
        needDescription:'',
      }],
      userTableData:[],
      goodTableData:[],
      needTableData:[],
      messageReportTableData:[],
      goodReportTableData:[],
      needReportTableData:[],
      showGood:false,
      showUser:false,
      showNeed:false,
      showMessageReport:false,
      showGoodReport:false,
      showNeedReport:false
    }
  },
  methods:{
    toShowUser:function (){
      this.showUser = true
      this.showGood = false
      this.showNeed = false
      this.showMessageReport=false
      this.showGoodReport=false
      this.showNeedReport=false
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
      this.showMessageReport=false
      this.showGoodReport=false
      this.showNeedReport=false
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
              goodDescription: response.data.goodList[i].gooddescription,
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
      this.showMessageReport=false
      this.showGoodReport=false
      this.showNeedReport=false
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
              goodDescription: response.data.goodList[i].gooddescription,
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
    toShowMessageReport:function (){
      this.showUser = false
      this.showGood = false
      this.showNeed = false
      this.showMessageReport=true
      this.showGoodReport=false
      this.showNeedReport=false
      this.messageReportList.splice(0,this.messageReportList.length)
      this.messageReportTableData.splice(0,this.messageReportTableData.length)
      let url='http://123.56.42.47:10492/admin/messageReport/'+this.messageReportPage
      this.axios.get(url, {
        params:{PageNumber:this.messageReportPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        const that=this
        const a=response.data.messageReportList.length
        for(var i=0 ; i<response.data.messageReportList.length ; i++){
          var string=response.data.messageReportList[i].reportsendtime.split("T")
          this.messageReportList.push({
            reportId:response.data.messageReportList[i].reportid,
            sendTime:string[0],
            description:response.data.messageReportList[i].reportDescription,
            category:response.data.messageReportList[i].reportcategory,
            original: response.data.messageReportList[i].reportMessageid})
          if(this.messageReportList[i].category===1){
            this.messageReportList[i].category='包含色情信息'
          }else if(this.messageReportList[i].category===2){
            this.messageReportList[i].category='恶意辱骂'
          }else if(this.messageReportList[i].category===3){
            this.messageReportList[i].category='发表反动言论'
          }else{
            this.messageReportList[i].category='其它'
          }
        }
        this.$options.methods.solveMessageProblem(that,a)
        for(var i=0 ; i<response.data.messageReportList.length ; i++) {
          this.messageReportTableData.push(this.messageReportList[i])
        }
      })
    },
    solveMessageProblem:async function(that,a){
      for(var i=0 ; i<a ; i++){
         await that.axios.get('http://123.56.42.47:10492/message/getById',{
          params:{messageId:that.messageReportList[i].original},
          headers:{'Authorization':that.$store.state.Authorization}
        }).then(response1=>{
          if(response1.data.message===null){
            that.messageReportList[i].original="!!!该消息已被删除!!!"
          }
          else{
            that.messageReportList[i].original=response1.data.message.messagecontent
          }
        })
      }
    },
    dealMessageReport:async function(row,op){
      var url1='http://123.56.42.47:10492/admin/handleMessageReport/'
      await this.axios.post(url1+row.reportId,null,{
        params:{handle:op},
        headers:{'Authorization':this.$store.state.Authorization}
        }).then(response=> {
          if(op===0){
            this.$alert("已忽略该举报信息")
          }
          if(op===1){
            this.$alert("已删除该聊天记录")
          }
      })
      this.messageReportList.splice(0,this.messageReportList.length)
      this.messageReportTableData.splice(0,this.messageReportTableData.length)
      let url='http://123.56.42.47:10492/admin/messageReport/'+this.messageReportPage
      await this.axios.get(url, {
        params:{PageNumber:this.messageReportPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        const that=this
        const a=response.data.messageReportList.length
        for(var i=0 ; i<response.data.messageReportList.length ; i++){
          var string=response.data.messageReportList[i].reportsendtime.split("T")
          this.messageReportList.push({
            reportId:response.data.messageReportList[i].reportid,
            sendTime:string[0],
            description:response.data.messageReportList[i].reportDescription,
            category:response.data.messageReportList[i].reportcategory,
            original: response.data.messageReportList[i].reportMessageid})
          if(this.messageReportList[i].category===1){
            this.messageReportList[i].category='包含色情信息'
          }else if(this.messageReportList[i].category===2){
            this.messageReportList[i].category='恶意辱骂'
          }else if(this.messageReportList[i].category===3){
            this.messageReportList[i].category='发表反动言论'
          }else{
            this.messageReportList[i].category='其它'
          }
        }
        this.$options.methods.solveMessageProblem(that,a)
        for(var i=0 ; i<response.data.messageReportList.length ; i++) {
          this.messageReportTableData.push(this.messageReportList[i])
        }
      })
    },
    // deleteMessageReport:async function(row){
    //   var url1='http://123.56.42.47:10492/admin/handleMessageReport/'
    //   await this.axios.post(url1+row.reportId,null,{
    //     params:{handle:1},
    //     headers:{'Authorization':this.$store.state.Authorization}
    //   }).then(response=> {
    //     this.$alert("已删除该聊天消息")
    //   })
    //   this.messageReportList.splice(0,this.messageReportList.length)
    //   this.messageReportTableData.splice(0,this.messageReportTableData.length)
    //   let url='http://123.56.42.47:10492/admin/messageReport/'+this.messageReportPage
    //   await this.axios.get(url, {
    //     params:{PageNumber:this.messageReportPage},
    //     headers:{'Authorization':this.$store.state.Authorization}
    //   }).then(response=>{
    //     const that=this
    //     const a=response.data.messageReportList.length
    //     for(var i=0 ; i<response.data.messageReportList.length ; i++){
    //       var string=response.data.messageReportList[i].reportsendtime.split("T")
    //       this.messageReportList.push({
    //         reportId:response.data.messageReportList[i].reportid,
    //         sendTime:string[0],
    //         description:response.data.messageReportList[i].reportDescription,
    //         category:response.data.messageReportList[i].reportcategory,
    //         original: response.data.messageReportList[i].reportMessageid})
    //       if(this.messageReportList[i].category===1){
    //         this.messageReportList[i].category='包含色情信息'
    //       }else if(this.messageReportList[i].category===2){
    //         this.messageReportList[i].category='恶意辱骂'
    //       }else if(this.messageReportList[i].category===3){
    //         this.messageReportList[i].category='发表反动言论'
    //       }else{
    //         this.messageReportList[i].category='其它'
    //       }
    //     }
    //     this.$options.methods.solveMessageProblem(that,a)
    //     for(var i=0 ; i<response.data.messageReportList.length ; i++) {
    //       this.messageReportTableData.push(this.messageReportList[i])
    //     }
    //   })
    // },
    toShowGoodReport:function (){
      this.showUser = false
      this.showGood = false
      this.showNeed = false
      this.showMessageReport=false
      this.showGoodReport=true
      this.showNeedReport=false
      this.goodReportList.splice(0,this.goodReportList.length)
      this.goodReportTableData.splice(0,this.goodReportTableData.length)
      let url='http://123.56.42.47:10492/admin/goodReport/'+this.goodReportPage
      this.axios.get(url, {
        params:{PageNumber:this.goodReportPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        const that=this
        const a=response.data.goodReportList.length
        for(var i=0 ; i<response.data.goodReportList.length ; i++){
          var string=response.data.goodReportList[i].reportsendtime.split("T")
          this.goodReportList.push({
            reportId:response.data.goodReportList[i].reportid,
            sendTime:string[0],
            description:response.data.goodReportList[i].reportDescription,
            category:response.data.goodReportList[i].reportcategory,
            goodId:response.data.goodReportList[i].reportgoodid})
          if(this.goodReportList[i].category===1){
            this.goodReportList[i].category='违禁品'
          }else if(this.goodReportList[i].category===2){
            this.goodReportList[i].category='包含不文明用语'
          }else if(this.goodReportList[i].category===3){
            this.goodReportList[i].category='图片违规'
          }else{
            this.goodReportList[i].category='其它'
          }
        }
        this.$options.methods.solveGoodProblem(that,a)
        setTimeout(() =>{
          for(var i=0 ; i<response.data.goodReportList.length ; i++) {
            this.goodReportTableData.push(this.goodReportList[i])
          }
        },1000);
      })
    },
    solveGoodProblem:async function (that,a){
      for(var i=0 ; i<a ; i++){
        await that.axios.get('http://123.56.42.47:10492/goodInfo/'+that.goodReportList[i].goodId,{
          params:{goodId:that.goodReportList[i].goodId},
          headers:{'Authorization':that.$store.state.Authorization}
        }).then(response1=>{
          if(response1.data.good===null){
            that.goodReportList[i].category='该商品已删除'
            that.goodReportList[i].description='该商品已删除'
            that.goodReportList[i].goodId='#'
            that.goodReportList[i].goodName='#'
            that.goodReportList[i].goodPrice='#'
            that.goodReportList[i].goodDescription='#'
            that.goodReportList[i].goodPicture='#'
          }
          else{
            that.goodReportList[i].goodId=response1.data.good.goodid
            that.goodReportList[i].goodName=response1.data.good.goodname
            that.goodReportList[i].goodPrice=response1.data.good.goodprice
            that.goodReportList[i].goodDescription= response1.data.good.gooddescription
            that.goodReportList[i].goodPicture="http://123.56.42.47:10492"+response1.data.good.goodpicurl
          }
        })
      }
    },
    dealGoodReport:async function(row,op){
      await this.axios.post('http://123.56.42.47:10492/admin/handleGoodReport/'+row.reportId,null,{
        params:{handle:op},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=> {
        if(op===0){
          this.$alert("已忽略该举报信息")
        }
        if(op===1) {
          this.$alert("已删除该商品")
        }
      })
      this.goodReportList.splice(0,this.goodReportList.length)
      this.goodReportTableData.splice(0,this.goodReportTableData.length)
      await this.axios.get('http://123.56.42.47:10492/admin/goodReport/'+this.goodReportPage, {
        params:{PageNumber:this.goodReportPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        const that=this
        const a=response.data.goodReportList.length
        for(var i=0 ; i<response.data.goodReportList.length ; i++){
          var string=response.data.goodReportList[i].reportsendtime.split("T")
          this.goodReportList.push({
            reportId:response.data.goodReportList[i].reportid,
            sendTime:string[0],
            description:response.data.goodReportList[i].reportDescription,
            category:response.data.goodReportList[i].reportcategory,
            goodId:response.data.goodReportList[i].reportgoodid})
          if(this.goodReportList[i].category===1){
            this.goodReportList[i].category='违禁品'
          }else if(this.goodReportList[i].category===2){
            this.goodReportList[i].category='包含不文明用语'
          }else if(this.goodReportList[i].category===3){
            this.goodReportList[i].category='图片违规'
          }else{
            this.goodReportList[i].category='其它'
          }
        }
        this.$options.methods.solveGoodProblem(that,a)
        setTimeout(() =>{
          for(var i=0 ; i<response.data.goodReportList.length ; i++) {
            this.goodReportTableData.push(this.goodReportList[i])
          }
        },1000);
      })
    },
    toShowNeedReport:function (){
      this.showUser = false
      this.showGood = false
      this.showNeed = false
      this.showMessageReport=false
      this.showGoodReport=false
      this.showNeedReport=true
      this.needReportList.splice(0,this.needReportList.length)
      this.needReportTableData.splice(0,this.needReportTableData.length)
      this.axios.get('http://123.56.42.47:10492/admin/needReport/'+this.needReportPage, {
        params:{PageNumber:this.needReportPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        const that=this
        const a=response.data.needReportList.length
        for(var i=0 ; i<response.data.needReportList.length ; i++){
          var string=response.data.needReportList[i].reportsendtime.split("T")
          this.needReportList.push({
            reportId:response.data.needReportList[i].reportid,
            sendTime:string[0],
            description:response.data.needReportList[i].reportDescription,
            category:response.data.needReportList[i].reportcategory,
            needId:response.data.needReportList[i].reportneedid})
          if(this.needReportList[i].category===1){
            this.needReportList[i].category='违禁品'
          }else if(this.needReportList[i].category===2){
            this.needReportList[i].category='包含不文明用语'
          }else if(this.needReportList[i].category===3){
            this.needReportList[i].category='图片违规'
          }else{
            this.needReportList[i].category='其它'
          }
        }
        this.$options.methods.solveNeedProblem(that,a)
        setTimeout(() =>{
          for(var i=0 ; i<response.data.needReportList.length ; i++) {
            this.needReportTableData.push(this.needReportList[i])
          }
        },1000);

      })
    },
    solveNeedProblem:async function(that,a){
      for(var i=0 ; i<a ; i++){
        await that.axios.get('http://123.56.42.47:10492/n/'+that.needReportList[i].needId,{
          headers:{'Authorization':that.$store.state.Authorization}
        }).then(response1=>{
          if(response1.data.Need===null){
            that.needReportList[i].category='该需求已删除'
            that.needReportList[i].description='该需求已删除'
            that.needReportList[i].needId='#'
            that.needReportList[i].needName='#'
            that.needReportList[i].needDescription='#'
            that.needReportList[i].needPicture='#'
          }
          else{
            that.needReportList[i].needId=response1.data.Need.needid
            that.needReportList[i].needName=response1.data.Need.needname
            that.needReportList[i].needDescription= response1.data.Need.needdescription
            that.needReportList[i].needPicture="http://123.56.42.47:10492"+response1.data.Need.needpicurl
          }
        })
      }
    },
    dealNeedReport:async function(row,op){
      await this.axios.post('http://123.56.42.47:10492/admin/handleNeedReport/'+row.reportId,null,{
        params:{handle:op},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=> {
        if(op===0){
          this.$alert("已忽略该举报信息")
        }
        if(op===1) {
          this.$alert("已删除该需求")
        }
      })
      this.needReportList.splice(0,this.needReportList.length)
      this.needReportTableData.splice(0,this.needReportTableData.length)
      this.axios.get('http://123.56.42.47:10492/admin/needReport/'+this.needReportPage, {
        params:{PageNumber:this.needReportPage},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then(response=>{
        const that=this
        const a=response.data.needReportList.length
        for(var i=0 ; i<response.data.needReportList.length ; i++){
          var string=response.data.needReportList[i].reportsendtime.split("T")
          this.needReportList.push({
            reportId:response.data.needReportList[i].reportid,
            sendTime:string[0],
            description:response.data.needReportList[i].reportDescription,
            category:response.data.needReportList[i].reportcategory,
            needId:response.data.needReportList[i].reportneedid})
          if(this.needReportList[i].category===1){
            this.needReportList[i].category='违禁品'
          }else if(this.needReportList[i].category===2){
            this.needReportList[i].category='包含不文明用语'
          }else if(this.needReportList[i].category===3){
            this.needReportList[i].category='图片违规'
          }else{
            this.needReportList[i].category='其它'
          }
        }
        this.$options.methods.solveNeedProblem(that,a)
        setTimeout(() =>{
          for(var i=0 ; i<response.data.needReportList.length ; i++) {
            this.needReportTableData.push(this.needReportList[i])
          }
        },1000);
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
    getMessageReportTotalPage:function (){
      let url='http://123.56.42.47:10492/admin/messageReport/1'
      this.axios.get(url, {
        params:{PageNum:1},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then((response)=> {
        this.messageReportTotalPage=response.data.totalPageNum
      })
      return this.messageReportTotalPage
    },
    getNeedReportTotalPage:function (){
      let url='http://123.56.42.47:10492/admin/needReport/1'
      this.axios.get(url, {
        params:{PageNum:1},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then((response)=> {
        this.needReportTotalPage=response.data.totalPageNum
      })
      if(this.needReportTotalPage===undefined){
        this.needReportTotalPage=0
      }
      return this.needReportTotalPage
    },
    getGoodReportTotalPage:function (){
      let url='http://123.56.42.47:10492/admin/goodReport/1'
      this.axios.get(url, {
        params:{PageNum:1},
        headers:{'Authorization':this.$store.state.Authorization}
      }).then((response)=> {
        this.goodReportTotalPage=response.data.totalPageNum
      })
      return this.goodReportTotalPage
    },
    showGoodPic(row){
      console.log(row.goodPicture)
      return row.goodPicture
    },
    showNeedPic(row){
      console.log(row.needPicture)
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
  height:864px;
}
</style>
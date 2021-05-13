<template>
  <div class="formbox2">
    <el-form label-position="right" ref="ruleForm1" :rules="rules" :model="form" label-width="90px">
      <el-form-item label="商品标题" prop="goodname">
        <el-input v-model="form.goodname"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="gooddescription">
        <el-input type="textarea" v-model="form.gooddescription"></el-input>
      </el-form-item>
      <el-form-item class="goodcategory" label="商品类型" prop="goodcategory">
        <el-radio-group v-model="form.goodcategory" placeholder="生活用品">
          <el-radio :label="1">生活用品</el-radio>
          <el-radio :label="2">电子产品</el-radio>
          <el-radio :label="3">书籍资料</el-radio>
          <el-radio :label="4">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品价格" prop="goodprice">
        <p class="price">￥</p>
        <el-input-number v-model="form.goodprice" :precision="2" :step="1" :max="50000" :min="0" size="medium">
        </el-input-number>
      </el-form-item>
      <div class="uploadImage">
        <el-upload
            action="#"
            accept=".jpg,.jpeg,.png"
            :limit="1"
            :before-upload="beforeUpload"
            :on-change="getLocalImg"
            list-type="picture-card"
            v-show="!form.goodpic">
          <div class="need_upload">
            <i slot="default" class="el-icon-plus"></i>
          </div>
        </el-upload>
        <transition name="el-zoom-in-top">
        <div v-show="form.goodpic" class="good_img">
          <img :src="form.goodpic"/>
          <i class="el-icon-delete-solid" @click="removePic"></i>
        </div>
        </transition>
        <transition name="el-fade-in">
          <el-alert
              title="文件太大了"
              type="error"
              description="请上传2M以下的图片"
              show-icon
              v-show="picoversizeWarning"
              @close="closeAlert1">
          </el-alert>
        </transition>
        <transition name="el-fade-in">
          <el-alert
              title="请上传一张图片哟"
              type="error"
              description="上传一张图片可以让你的商品更快卖出"
              show-icon
              v-show="nopicWarning"
              @close="closeAlert">
          </el-alert>
        </transition>
      </div>
    </el-form>
    <el-button type="primary" @click="submitForm('ruleForm1')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm1')">重置</el-button>
  </div>
</template>

<script>
export default {
  name: "goodPost",
  data:function (){
    return{
      form:{
        goodcategory:1,
        gooddescription:'',
        goodname:'',
        goodpic:null,
        goodprice:0.0
      },
      isHidden:true,
      rules:{
        goodname: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
          { min: 5, max: 36, message: '长度在 5 到 36 个字符之间', trigger: 'blur' }
        ],
        goodcategory: [
          {required:true,message:'请选择商品类型',trigger:'blur'},
        ],
        gooddescription:[
          {required:true,message:'请输入商品描述',trigger:'blur'},
          {min:10,max:200,message: '长度在10到200个字符之间',trigger: 'blur'}
        ],
        goodprice:[
          {required:true,message:'请输入商品价格',trigger:'blur'}
        ]
      },
      nopicWarning:false,
      picoversizeWarning:false,
      formData:new FormData()
    }
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.nopicWarning=false;
      this.removePic();
    },
    beforeUpload(file){
      //限制图片大小为2M以下
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(isLt2M){
        this.formData.append('goodpic',file)
        this.nopicWarning=false;
      }else{
        this.picoversizeWarning=true;
      }
      return false;//禁止elementUI的组件自动上传
    },
    closeAlert(){
      this.nopicWarning=false;
    },
    closeAlert1(){
      this.picoversizeWarning=false;
    },
    submitForm(formName){
      if(!this.form.goodpic) {
        this.nopicWarning=true
        return;
      }
      this.$refs[formName].validate(valid=>{
        if (valid){
          this.formData.append('goodcategory',this.form.goodcategory)
          this.formData.append('gooddescription',this.form.gooddescription)
          this.formData.append('goodname',this.form.goodname)
          this.formData.append('goodprice',this.form.goodprice)
          console.log(this.formData)
          this.axios.post('http://123.56.42.47:10492/sendGood',this.formData,{
            headers:{
              'Content-Type':'multipart/form-data',
              'Authorization': this.$store.state.Authorization
            }
          }).then(response=>{
            if(response.data.msg==200){
              console.log(response);
              this.$alert("发布商品成功", '发布成功', {
                confirmButtonText: '确定',
                center: true,
              });
            }
          })
        }
      })
    },
    getLocalImg(event){
      // 获取上传图片的本地url，用于上传前的本地预览
      const isLt2M = event.size / 1024 / 1024 < 2;
      if(isLt2M){
        let url = '';
        if (window.createObjectURL != undefined) {
          url = window.createObjectURL(event.raw);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(event.raw);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(event.raw);
        }
        this.form.goodpic = url;
        this.picoversizeWarning=false;
      }
    },
    removePic(){
      this.form.goodpic=null;
      this.formData.delete('goodpic');
    }
  }
}
</script>

<style scoped>
.formbox2 .el-form p{
  font-size: 20px;
  float: left;
}
.formbox2{
  width: 35%;
  margin:0 auto;
  background-color: white;
  padding-top:50px;
  padding-bottom: 50px;
}
.formbox2 .el-form-item{
  padding:0px 25px;
}
.formbox2 .el-form .el-form-item__label{
  font-size: 15px;
}
.formbox2 .goodcategory .el-radio-group .el-radio__label{
  font-size: 15px;
}
.formbox2 .uploadImage{
  margin-bottom: 20px;
}
.good_img{
  position: relative;
  width: 90%;
  height: 360px;
  background-color: white;
  box-shadow:  0 10px 9px 0 rgba(0, 0, 0, 0.2);
  margin: 0 auto ;
  display:flex;
  justify-content:center;
  align-items:center;

}
.good_img img{
  max-height: 90%;
  max-width: 95%;
  overflow: hidden;
  /*margin: 3% auto;*/
}
.good_img i{
  display: none;
  position: absolute;
  float: left;
  font-size: 50px;
  color: white;
}
.good_img:hover{
  box-shadow:  0 10px 9px 0 rgba(0, 0, 0, 0.4);
}
.good_img:hover img{
  filter: brightness(40%);
}
.good_img:hover i{
  display: block;
  cursor: pointer;
}

</style>
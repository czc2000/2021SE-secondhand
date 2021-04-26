<template>
  <div class="formbox">
  <el-form ref="ruleForm1" :rules="rules" :model="form" label-width="90px">
    <el-form-item label="需求标题" prop="needname">
      <el-input v-model="form.needname"></el-input>
    </el-form-item>
    <el-form-item label="需求描述" prop="needdescription">
      <el-input type="textarea" v-model="form.needdescription"></el-input>
    </el-form-item>
    <el-form-item label="需求类型" prop="needcategory">
      <el-radio-group v-model="form.needcategory" placeholder="生活用品">
        <el-radio :label="1">生活用品</el-radio>
        <el-radio :label="2">电子产品</el-radio>
        <el-radio :label="3">书籍资料</el-radio>
        <el-radio :label="4">其他</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="file" class="upload-img-form" >
      <el-upload
          action="#"
          :limit="1"
          :auto-upload="false"
          :on-change="getLocalImg">
        <div class="logo_upload_xuan">
          <i slot="default" class="el-icon-circle-plus-outline"></i>
          <span>选择图片</span>
        </div>
      </el-upload>
      <div class="logo_img">
        <div v-if="isHidden" class="logo_img_title">上传图片</div>
        <img v-else :src="form.needpic" />
      </div>
     </el-form-item>
  </el-form>
    <el-button type="primary" @click="submitForm('ruleForm1')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm1')">重置</el-button>
  </div>
</template>

<script>
export default {
  name: "needPost",
  data:function (){
    return{
      form:{
        needcategory:1,
        needdescription:'',
        needname:'',
        needpic:''
      },
      isHidden:true,
      rules:{
        needname: [
          { required: true, message: '请输入需求标题', trigger: 'blur' },
          { min: 5, max: 36, message: '长度在 5 到 36 个字符之间', trigger: 'blur' }
        ],
        needcategory: [
          {required:true,message:'请选择需求类型',trigger:'blur'},
        ],
        needdescription:[
          {required:true,message:'请输入需求描述',trigger:'blur'},
          {min:10,max:200,message: '长度在10到200个字符之间',trigger: 'blur'}
        ],
        file:[{required:true,message:'请上传一张图片',trigger:'blur'}]
      },
      previewurl:'',
      formData:new FormData()
    }
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeUpload(file){
      this.formData.append('needpic',file)
      return false;//禁止elementUI的组件自动上传
    },
    submitForm(formName){
      this.$refs[formName].validate(valid=>{
        if (valid){
          this.formData.append('needcategory',this.form.needcategory)
          this.formData.append('needdescription',this.form.needdescription)
          this.formData.append('needname',this.form.needname)
          console.log(this.formData)
          this.axios.post('http://123.56.42.47:10492/sendneed',this.formData,{
            headers:{
              'Content-Type':'multipart/form-data',
              'Authorization': this.$store.state.Authorization
            }
          }).then(response=>{
            console.log(response)
          })
        }
      })
    },
    getLocalImg(event){
      // 获取上传图片的本地url，用于上传前的本地预览
      let url = '';
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(event.raw);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(event.raw);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(event.raw);
      }
      this.form.needpic = url;
      this.isHidden = false;
    }
  }
}
</script>

<style scoped>
.formbox{
  width: 50%;
  margin:0 auto;
}
</style>
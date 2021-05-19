<template>
  <div class="PostPage">
    <div class="PostBackground"></div>
  <div class="formbox">
  <el-form label-position="right" ref="ruleForm1" :rules="rules" :model="form" label-width="90px">
    <el-form-item label="需求标题" prop="needname">
      <el-input v-model="form.needname"></el-input>
    </el-form-item>
    <el-form-item label="需求描述" prop="needdescription">
      <el-input type="textarea" v-model="form.needdescription"></el-input>
    </el-form-item>
    <el-form-item class="needcategory" label="需求类型" prop="needcategory">
      <el-radio-group v-model="form.needcategory" placeholder="生活用品">
        <el-radio :label="1">生活用品</el-radio>
        <el-radio :label="2">电子产品</el-radio>
        <el-radio :label="3">书籍资料</el-radio>
        <el-radio :label="4">其他</el-radio>
      </el-radio-group>
    </el-form-item>
		<el-tag :key="tag" v-for="(tag,index) in tags" closable
			:disable-transitions="false" @close="handleClose(index)">
				{{tag}}
		</el-tag>
		<el-input class="input-new-tag" v-if="inputVisible" v-model="tagInput"
			ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" 
			@blur="handleInputConfirm">
		</el-input>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
		<br/><br/><br/>
		<div class="uploadImage">
    <el-upload
          action="#"
          :limit="1"
          :before-upload="beforeUpload"
          :on-change="getLocalImg"
          list-type="picture-card"
          v-show="!form.needpic">
        <div class="need_upload">
          <i slot="default" class="el-icon-plus"></i>
        </div>
      </el-upload>
        <transition name="el-zoom-in-top">
      <div v-show="form.needpic" class="need_img">
        <img :src="form.needpic" />
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
        description="上传一张图片可以让大家更好的明白你的需求"
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
        needpic:null
      },
			tags:[],
			inputVisible: false,
			tagInput: '',
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
        this.formData.append('needpic',file)
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
		handleClose(index){
		   this.tags.splice(index, 1);
		 },
		showInput(){
		  this.inputVisible = true;
		  this.$nextTick(_ => {
				this.$refs.saveTagInput.$refs.input.focus();
		  });
		},
		handleInputConfirm(){
		  let inputValue=this.tagInput;
		  if (inputValue){
				var repeat=false;
				for(var i=0;i<this.tags.length;i++)
					if(this.tags[i]==inputValue){
						repeat=true;
						break;
					}
		    if(!repeat) this.tags.push(inputValue);
		  }
		  this.inputVisible=false;
		  this.tagInput='';
		},
    submitForm(formName){
      if(!this.form.needpic) {
        this.nopicWarning=true
        return;
      }
      this.$refs[formName].validate(valid=>{
        if (valid){
          this.formData.append('needcategory',this.form.needcategory)
          this.formData.append('needdescription',this.form.needdescription)
          this.formData.append('needname',this.form.needname)
					var tagsToString='';
					for(var i=0;i<this.tags.length;i++)
						tagsToString+='#'+this.tags[i];
					this.formData.append('needtags',tagsToString);
          console.log(this.formData)
          this.axios.post('http://123.56.42.47:10492/sendneed',this.formData,{
            headers:{
              'Content-Type':'multipart/form-data',
              'Authorization': this.$store.state.Authorization
            }
          }).then(response=>{
              if(response.data.msg==200){
                this.$alert("发布需求成功", '发布成功', {
                  confirmButtonText: '确定',
                  center: true,
                });
              }
          })
        }
      })
    },
    getLocalImg(event){
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
        this.form.needpic = url;
        this.picoversizeWarning=false;
      }
    },
    removePic(){
      this.form.needpic=null;
      this.formData.delete('needpic');
    }
  }
}
</script>

<style >
.PostBackground{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 1080px;
  background-image: url('../assets/Post/bg.jpg');
  background-size: cover;
  background-position: center;
}
.formbox{
  width: 35%;
  margin: 80px auto 200px;
  background-color: rgba(255,255,255,0.8);
  box-shadow:
      0 12.5px 2.6px rgba(0, 0, 0, 0.068),
      0 16.4px 5.9px rgba(0, 0, 0, 0.09),
      0 18.8px 10px rgba(0, 0, 0, 0.106),
      0 21.1px 15.4px rgba(0, 0, 0, 0.118),
      0 24.1px 22.8px rgba(0, 0, 0, 0.129),
      0 28.8px 33.5px rgba(0, 0, 0, 0.14),
      0 36.4px 50.2px rgba(0, 0, 0, 0.151),
      0 50.3px 80px rgba(0, 0, 0, 0.166),
      0 100px 150px rgba(0, 0, 0, 0.19)
;
  border-radius: 10px;
  padding:50px 0;
  transition-property: background-color , box-shadow;
  transition-duration:0.5s , 0.5s;
}
.formbox:hover{
  box-shadow:
      0 22.2px 5.4px rgba(0, 0, 0, 0.086),
      0 27.6px 12px rgba(0, 0, 0, 0.114),
      0 30.1px 20.3px rgba(0, 0, 0, 0.134),
      0 31.6px 31.4px rgba(0, 0, 0, 0.149),
      0 33.4px 46.5px rgba(0, 0, 0, 0.163),
      0 36.4px 68.3px rgba(0, 0, 0, 0.177),
      0 42px 102.4px rgba(0, 0, 0, 0.191),
      0 53.4px 163.3px rgba(0, 0, 0, 0.21),
      0 100px 306px rgba(0, 0, 0, 0.24)
;
  background-color: rgba(255,255,255,1);
}
.formbox .el-form-item{
  padding:0px 25px;
}
.formbox .el-form .el-form-item__label{
  font-size: 15px;
}
.formbox .needcategory .el-radio-group .el-radio__label{
  font-size: 15px;
}
.formbox .uploadImage{
  margin-bottom: 20px;
}
.need_img{
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
.need_img img{
  max-height: 90%;
  max-width: 95%;
  overflow: hidden;
  /*margin: 3% auto;*/
}
.need_img i{
  display: none;
  position: absolute;
  float: left;
  font-size: 50px;
  color: white;
}
.need_img:hover{
  box-shadow:  0 10px 9px 0 rgba(0, 0, 0, 0.4);
}
.need_img:hover img{
  filter: brightness(40%);
}
.need_img:hover i{
  display: block;
  cursor: pointer;
}
/*以下是关于标签的，从element ui抄的,对button有改动*/
.el-tag + .el-tag {
	margin-left: 10px;
}
.button-new-tag {
	margin-left: 10px;
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90px;
	margin-left: 10px;
	vertical-align: bottom;
}
/*以上是关于标签的，从element ui抄的,对button有改动*/
</style>
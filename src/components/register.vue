<template>
    <div class="background">
      <div class="kuang">
        <h1>REGISTER</h1>
      <el-form ref="ruleForm" :model="formdata" :rules="rules" label-width="120px" @keyup.enter.native="submitForm('ruleForm')">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="formdata.username" placeholder="请输入用户名"  prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
				<el-form-item label="性别" prop="usergender" >
					<el-select v-model="formdata.usergender" placeholder="请选择性别" style="width:100%">
						<i slot="prefix" class="el-input__icon el-icon-search"></i>
						<el-option value=0 label="女"></el-option>
						<el-option value=1 label="男"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="formdata.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2" >
          <el-input v-model="formdata.password2" type="password" placeholder="请确认密码" prefix-icon="el-icon-lock" show-password clearable></el-input>
        </el-form-item>
				<el-form-item label="邮箱" prop="useremail" >
          <el-input v-model="formdata.useremail" placeholder="请输入正确的邮箱地址" prefix-icon="el-icon-message" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="userphonenumber" >
          <el-input v-model="formdata.userphonenumber" placeholder="请输入正确的手机号码" prefix-icon="el-icon-mobile-phone" clearable></el-input>
        </el-form-item>
        <div class="jc">
          <jcrange :successFun="rangeSuccess"></jcrange>
        </div>
        <el-form-item>
          <el-button type="primary" icon="el-icon-upload" @click="submitForm('ruleForm')" round>注册</el-button>
          <el-button class="reset" type="danger" icon="el-icon-delete" round @click="resetForm('ruleForm')">重置</el-button></el-form-item>
      </el-form>
      </div>
    </div>
</template>

<script>
import jcrange from "@/components/jcrange";
export default {
  name: "register",
  components:{
    jcrange
  },
  data:function(){
    var validatePass=(rule,value,callback)=>{
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formdata.password2 !== '') {
          this.$refs.ruleForm.validateField('password2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formdata.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatemail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!/^([A-Za-z0-9_\-.])+@(163.com|qq.com|buaa.edu.cn)$/.test(this.formdata.useremail)) {
        callback(new Error('请您输入正确的163邮箱或者qq邮箱'));
      } else {
        callback();
      }
    };
    var validatephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.formdata.userphonenumber))) {
        callback(new Error('请您输入正确的手机号码'));
      } else {
        callback();
      }
    };
		var validategender = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请选择性别'));
			}
			else {
				callback();
			}
		}
    return {
      status:false,
      formdata:{
        password: '',
        password2:'',
        useremail: '',
        username: '',
        userphonenumber:'',
				usergender: '',
      },
      rules:{
        username:[{required: true, message: '请输入您的用户名', trigger: 'blur'},{min:3,max:18,message:'长度应当在3到18个字符',trigger: 'blur'}],
        password: [{ required: true, validator: validatePass, trigger: 'blur' },{min:6,max:18,message:'长度应当在6到18个字符',trigger: 'blur'}],
        password2: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        useremail:[{required: true, validator: validatemail, trigger: 'blur'}],
        userphonenumber:[{required: true, validator: validatephone, trigger: 'blur'}],
				usergender:[{required: true, validator: validategender, trigger: 'blur'}],
      }
    }
  },
  methods:{
    Register: function (){
			console.log(this.formdata.usergender);
        var url = 'http://123.56.42.47:10492/register'
        this.axios.post(url, null,
            {
              params: {
                password: this.formdata.password,
                useremail: this.formdata.useremail,
                username: this.formdata.username,
                userphonenumber: this.formdata.userphonenumber,
								usersex: this.formdata.usergender,
              }
            }
        ).then(response => {
          console.log(response.data)
          if (response.data.msg == -1) {
            this.$alert('抱歉,'+response.data.description, '注册失败', {
              confirmButtonText: '确定',
              center:true,
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          } else {
            this.$alert('请到您的邮箱内激活账号', '注册成功', {
              confirmButtonText: '确定',
              center:true,
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
            this.$router.push('/login');
          }
        })
    },
    submitForm(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.status) {
            this.Register();
          }
          else{
            this.$alert('请进行滑块验证', '注册错误', {
              confirmButtonText: '确定',
              center:true,
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    rangeSuccess() {
      this.status=true;
    }
  }
}
</script>

<style>
  .background{
    position: relative;
    width: 100%;
    height: 1080px;
    background-image: url("../assets/wallhaven-9mxz8k.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .kuang{
    width: 500px;
    height: 600px;
    background-color: rgba(	220,220,250,0.6);
    margin: 0 auto;
    position: absolute;
    left:37%;
    top:10%
  }
  .kuang h1{
    margin: 20px;
    font-family:  Garamond, serif;
    font-weight: 700;
    font-size: 40px;
  }
  .el-form .el-form-item__content .reset{
    margin-left: 160px;
  }
  .el-form .el-form-item__label{
    font-size: 15px;
  }
  .kuang .el-input{
    font-size: 15px;
  }
  .kuang:hover{
    background-color: rgba(	220,220,250,0.9);
    box-shadow:  0 15px 12px 0 rgba(0, 0, 0, 0.5);
  }
  .kuang .el-form{
    padding: 0px 40px 0px 20px;
  }
  .jc{
    margin-left: 80px;
  }
  .jc .jc-range{
    width: 320px;
  }
</style>
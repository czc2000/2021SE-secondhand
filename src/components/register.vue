<template>
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
<!--        <el-form-item>-->
<!--          <el-button type="primary" icon="el-icon-upload" @click="submitForm('ruleForm')" round>注册</el-button>-->
<!--          <el-button class="reset" type="danger" icon="el-icon-delete" round @click="resetForm('ruleForm')">重置</el-button></el-form-item>-->
      </el-form>
        <div class="button">
          <div class="magnifyBorder" @click="submitForm('ruleForm')"><i class="el-icon-upload" ></i>注册</div>
          <div class="magnifyBorder2" @click="resetForm('ruleForm')"><i class="el-icon-delete"></i>重置</div>
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
            });
          } else {
            this.$alert('请到您的邮箱内激活账号', '注册成功', {
              confirmButtonText: '确定',
              center:true,
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

  .kuang{
    width: 500px;
    height: 600px;
    border-radius: 8px;
    background-color: #f2f7ff;
    margin: 0 auto;
    transition: box-shadow 0.5s;
    box-shadow:  0 15px 12px 0 rgba(0, 0, 0, 0.5);
  }
  .kuang h1{
    padding-top: 20px;
    font-family:  Garamond, serif;
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 20px;
  }
  .el-form .el-form-item__content .reset{
    margin-left: 160px;
  }
.kuang  .el-form .el-form-item__label{
    font-family: "微软雅黑 Light";
    font-weight: 600;
    font-size: 15px;
  }
  .kuang .el-input{
    font-size: 15px;
  }
  .kuang:hover{
    box-shadow:
        0 17px 5.6px rgba(0, 0, 0, 0.034),
        0 21.4px 10.9px rgba(0, 0, 0, 0.051),
        0 24.7px 17px rgba(0, 0, 0, 0.065),
        0 28.5px 24.8px rgba(0, 0, 0, 0.077),
        0 34.7px 35.8px rgba(0, 0, 0, 0.091),
        0 52px 62px rgba(0, 0, 0, 0.11)
  ;

  }
  .kuang .el-form{
    padding: 0px 40px 0px 20px;
  }
  .jc{
    margin-left: 20px;
  }
  .jc .jc-range{
    width: 380px;
  }
.kuang .magnifyBorder {
  float: left;
    margin-left: 120px;
    margin-right: 105px;
    width: 50px;
    font-weight: 550;
    padding: 10px 20px;
    border-radius: 60px;
    box-shadow: inset 0 0 0 2px #2c6bf5;
    transition: 300ms box-shadow cubic-bezier(0.4, 0, 0.6, 1), 600ms background-color cubic-bezier(0.4, 0, 0.6, 1), 300ms color cubic-bezier(0.4, 0, 0.6, 1);;
    color: #2d6cdf;
    cursor: pointer;
  }

.kuang  .magnifyBorder:hover {
    box-shadow: inset 0 0 0 8px #2c6bf5;
    background-color: #2c6bf5;
    color: #e2f3f5;
  }
.kuang .magnifyBorder2 {
  float: left;
    width: 50px;
    font-weight: 550;
    padding: 10px 20px;
    border-radius: 60px;
    box-shadow: inset 0 0 0 2px #fc5185;
    cursor: pointer;
    transition: 300ms box-shadow cubic-bezier(0.4, 0, 0.6, 1), 600ms background-color cubic-bezier(0.4, 0, 0.6, 1), 300ms color cubic-bezier(0.4, 0, 0.6, 1);;
    color: #fc5185;
  }

.kuang  .magnifyBorder2:hover {
    box-shadow: inset 0 0 0 8px #fc5185;
    background-color: #fc5185;
    color: #e2f3f5;
  }

</style>
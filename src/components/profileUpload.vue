<template>
  <div>
  <!--HTML部分-->
  <div id="image">
    <!--上传图片的按钮-->
    <my-upload field="avatar"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="200"
               :height="200"
               url="http://123.56.42.47:10492/user/updateAvatar"
               :headers="headers"
               method="post"
               img-format="png">
    </my-upload>
  </div>
  </div>
</template>

<script>
import 'babel-polyfill'
import myUpload from 'vue-image-crop-upload/upload-2.vue';
export default {
  name:"profileUpload",
  data() {
    return {
      avatar: "",  //用于存储剪切完图片的base64Data和显示回调图片
      show: false,  //剪切框显示和隐藏的flag
      size:2.1,
      headers:{
        Authorization:this.$store.state.Authorization
      },
    }
  },
  //注册组件
  components: {
    "my-upload": myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    // eslint-disable-next-line no-unused-vars
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.avatar = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      this.$store.commit('uploaduseravatar','http://123.56.42.47:10492'+jsonData.avatarurl)
      console.log('field: ' + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log(status.avatarurl);
      console.log('field: ' + field);
    },
  }
}
</script>

<style>
.btn{background-color: indianred;padding: 7px 12px;color: white;}
</style>
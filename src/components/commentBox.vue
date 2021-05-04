<template>
  <div class="wholebox">
  <div class="commentbox">
    <div class="commentinfo">
      <img :src="useravatar" class="circleImg">
      <div class="time">
        {{commenttime}}
      </div>
    </div>
    <div class="commentcontent">
      {{commentcontent}}
    </div>
  </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "commentBox",
  props:['useravatar','commentcontent','commenttime']
}
</script>

<style scoped>
.commentbox{
  height: 80px;
}
.commentbox .commentinfo{
  float: left;
}
.commentbox .commentcontent{
  line-height: 80px;
  text-align: left;
}
.el-divider{
  margin-bottom: 20px;
}
</style>
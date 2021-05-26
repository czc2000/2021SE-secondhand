<template>
  <div class="container">
    <h1 style="margin-bottom: 0px;font-weight: bold;font-family:'微软雅黑 Light';color: white;font-size: 60px">
      抱歉,没找到网页
    </h1>
    <div>
      <span>4</span>
      <span class="middle"></span>
      <span>4</span>
    </div>
    <div class="background_img1">
      <vue-particles
          color="#ffffff"
          :particleOpacity="0.8"
          :particlesNumber="90"
          shapeType="polygon"
          :particleSize="4"
          linesColor="#ffffff"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.55"
          :linesDistance="180"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
      >
      </vue-particles>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage"
}
</script>

<style scoped>
.background_img1{
  position: fixed;
  width: 100%;
  height: 867px;
  top: 70px;
  z-index: -1;
  background-color: #2c3e50;
}
.container {
  height: 800px;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container span {
  display: inline-block;
  width: 200px;
  font-size: 240px;
  /* background-color: blueviolet; */
  text-align: center;
  font-weight: 800;
  font-family: Arial, Helvetica, sans-serif;
}

.container span.middle {
  position: relative;
  width: 200px;
  height: 200px;
  /* background-color: #22d1ee; */
}

.container span.middle::before,
.container span.middle::after {
  position: absolute;
  content: '';
  width: 200px;
  height: 200px;
  top: 0;
  left: 0;
  /* background-color: #e056fd; */
  /* 重点
  四个内阴影
  四种颜色
  透明度66（16进制）
  */
  box-shadow: /* 左侧 */
      inset 30px 0 0 #e2f3f566, /* 上方 */
      inset 0 30px 0 #22d1ee66, /* 右侧 */
      inset -30px 0 0 #3d5af166, /* 下方 */
      inset 0 -30px 0 #0e153a66;
  border-radius: 50%;
  animation: animate_before 4s linear infinite;
}

.container span.middle::after {
  transform: rotate(-45deg);
}


/* 制作动画 */


/* 分四次顺时针切换四个阴影的颜色 */

@keyframes animate_before {
  0% {
    box-shadow: /* 左侧 */
        inset 30px 0 0 #e2f3f566, /* 上方 */
        inset 0 30px 0 #22d1ee66, /* 右侧 */
        inset -30px 0 0 #3d5af166, /* 下方 */
        inset 0 -30px 0 #0e153a66;
  }
  25% {
    box-shadow: /* 左侧 */
        inset 30px 0 0 #0e153a66, /* 上方 */
        inset 0 30px 0 #e2f3f566, /* 右侧 */
        inset -30px 0 0 #22d1ee66, /* 下方 */
        inset 0 -30px 0 #3d5af166;
  }
  50% {
    box-shadow: /* 左侧 */
        inset 30px 0 0 #3d5af166, /* 上方 */
        inset 0 30px 0 #0e153a66, /* 右侧 */
        inset -30px 0 0 #e2f3f566, /* 下方 */
        inset 0 -30px 0 #22d1ee66;
  }
  75% {
    box-shadow: /* 左侧 */
        inset 30px 0 0 #22d1ee66, /* 上方 */
        inset 0 30px 0 #3d5af166, /* 右侧 */
        inset -30px 0 0 #0e153a66, /* 下方 */
        inset 0 -30px 0 #e2f3f566;
  }
  100% {
    box-shadow: /* 左侧 */
        inset 30px 0 0 #e2f3f566, /* 上方 */
        inset 0 30px 0 #22d1ee66, /* 右侧 */
        inset -30px 0 0 #3d5af166, /* 下方 */
        inset 0 -30px 0 #0e153a66;
  }
}


/* 左侧文字效果 */


/* 同样分四次将当前文字颜色变换为 左侧内阴影的颜色 */

.container span:nth-child(1) {
  animation: animate_span_1 4s linear infinite;
}


/* 创建一个动画 */

@keyframes animate_span_1 {
  0% {
    color: #e2f3f5;
  }
  25% {
    color: #5851ec;
  }
  50% {
    color: #3d5af1;
  }
  75% {
    color: #22d1ee;
  }
  100% {
    color: #e2f3f5;
  }
}


/* 右侧文字效果 */


/* 同样分四次将当前文字颜色变换为 右侧内阴影的颜色 */

.container span:nth-child(3) {
  animation: animate_span_3 4s linear infinite;
}


/* 创建一个动画 */

@keyframes animate_span_3 {
  0% {
    color: #3d5af1;
  }
  25% {
    color: #22d1ee;
  }
  50% {
    color: #e2f3f5;
  }
  75% {
    color: #5851ec;
  }
  100% {
    color: #3d5af1;
  }
}
</style>
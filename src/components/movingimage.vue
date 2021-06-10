<template>
  <div class="banner" style="width: 100%;">
    <div class="image" ref="image"><img width="3000" height="250" src="../assets/Home/images/bg.png"> </div>
    <div class="image" ref="image"><img width="3000" height="165" src="../assets/Home/images/cloud1.png"> </div>
    <div class="image" ref="image"><img width="3000" height="250" src="../assets/Home/images/cloud2.png"> </div>
    <div class="image" ref="image"><img width="3000" height="160" src="../assets/Home/images/cloud3.png"> </div>
    <div class="image" ref="image"><img width="3000" height="165" src="../assets/Home/images/plane.png"> </div>
  </div>
</template>

<script>
export default {
  name: "movingimage",
  mounted: function () {
    this.$nextTick(function () {
      let x = 0;
      let x_new = 0;
      let x_offset = 0;
      let banner = document.querySelector('.banner');
      let images = document.querySelectorAll('.image');
      let window_width = document.documentElement.clientWidth;
      let step = window_width / 2 / 5;
      let data_images = [
        { x: 0, b: 0 },
        { x: 0, b: 0 },
        { x: 0, b: 2 },
        { x: 0, b: 3 },
        { x: 0, b: 0 },
      ]
      let init = () => {
        // images[0].children[0].style = 'transform: translate(0px); filter: blur(4px);';
        // images[1].children[0].style = 'transform: translate(0px); filter: blur(0px);';
        // images[2].children[0].style = 'transform: translate(0px); filter: blur(1px);';
        // images[3].children[0].style = 'transform: translate(0px); filter: blur(4px);';
        // images[4].children[0].style = 'transform: translate(0px); filter: blur(5px);';
        // images[5].children[0].style = 'transform: translate(0px); filter: blur(6px);';
        for (const key in images) {
          if (images.hasOwnProperty(key)) {
            const element = images[key];
            const element_data = data_images[key];
            element.children[0].style = 'transition: .2s linear; transform: translate(' + element_data.x + 'px);';
          }
        }
      }

      banner.addEventListener('mouseover', (e) => {
        x = e.clientX;
        // console.log(x);
      });
      banner.addEventListener("mousemove", (e) => {
        x_new = e.clientX;
        // console.log(x_new);
        x_offset = x - x_new;
        // console.log(x_offset);
        for (const key in images) {
          if (images.hasOwnProperty(key)) {
            let level = (5 - parseInt(key)) * 10;
            const element = images[key];
            const element_data = data_images[key];
            let l_new = 0 - (x_offset / level);
            element.children[0].style = 'transform: translate(' + 1.5*l_new + 'px);';
          }
        }

      });


      banner.addEventListener("mouseout", (e) => {
        init();
      });
    })
  }
}
</script>

<style scoped>
.banner{
  position: absolute;
  width: 100vw;
  height: 155px;
  overflow: hidden;
  background-color: #00b894;
}

.image{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
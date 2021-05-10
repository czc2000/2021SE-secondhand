<template>
  <div class="banner">
    <div class="image" ref="image"><img width="2000" height="250" src="../assets/images/bg.png"> </div>
    <div class="image" ref="image"><img width="1800" height="165" src="../assets/images/girl1.png"> </div>
    <div class="image" ref="image"><img width="3000" height="250" src="../assets/images/grassland.png"> </div>
    <div class="image" ref="image"><img width="1800" height="160" src="../assets/images/mushroom.png"> </div>
    <div class="image" ref="image"><img width="1800" height="165" src="../assets/images/spirit.png"> </div>
    <div class="image" ref="image"><img width="1950" height="178" src="../assets/images/leaf.png"> </div>
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
        { x: 0, b: 4 },
        { x: 0, b: 0 },
        { x: 0, b: 1 },
        { x: 0, b: 4 },
        { x: 0, b: 5 },
        { x: 0, b: 6 },
      ]
      let init = () => {
        for (const key in images) {
          if (images.hasOwnProperty(key)) {
            const element = images[key];
            const element_data = data_images[key];
            element.children[0].style = 'transition: .2s linear; transform: translate(' + element_data.x + 'px); ';
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
            let level = (6 - parseInt(key)) * 10;
            const element = images[key];
            const element_data = data_images[key];
            let l_new = 0 - (x_offset / level);
            element.children[0].style = 'transform: translate(' + 2*l_new + 'px); ';
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
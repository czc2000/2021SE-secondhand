<template>
<div>
  <el-carousel height="680px" @change="beforeChange" :autoplay="autoplay">
    <el-carousel-item>
      <div class="CarouselItem" @click="goodsClick">
        <div>
        <div class="rev-1 content__title__inner">要便宜实惠？</div><br/>
        <div class="rev-2 content__title__inner--offset-1">购买已发布的二手商品</div>
        <div class="rev-3 content__title__inner--offset-img1"><img src="../assets/Carousel/img/CarouselImg2.png" alt=""></div>
        <transition name="el-zoom-in-center">
          <div v-show="loaded" class="content__title__inner--button">
            <div class="circleScaleBtn" @click="goodsClick"><span>点击购物</span></div>
          </div>
        </transition>
        </div>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="CarouselItem" @click="needpost">
        <div class="rev-4 content__title__inner">没找到想要的？</div><br/>
        <div class="rev-5 content__title__inner--offset-1">快来发布你的需求</div>
        <div class="rev-6 content__title__inner--offset-img1"><img src="../assets/Carousel/img/CarouselImg1.png" alt=""></div>
        <transition name="el-zoom-in-center">
          <div v-show="loaded" class="content__title__inner--button">
            <div class="circleScaleBtn" @click="needpost"><span>发布需求</span></div>
          </div>
        </transition>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="CarouselItem" @click="goodpost">
        <div class="rev-7 content__title__inner" >有闲置物品要卖？</div><br/>
        <div class="rev-8 content__title__inner--offset-1">发布你的二手商品</div>
        <div class="rev-9 content__title__inner--offset-img1"><img src="../assets/Carousel/img/CarouselImg3.png" alt=""></div>
        <transition name="el-zoom-in-center">
          <div v-show="loaded" class="content__title__inner--button">
            <div class="circleScaleBtn" @click="goodpost"><span>发布商品</span></div>
          </div>
        </transition>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="CarouselItem" @click="needsClick">
        <div class="rev-10 content__title__inner" >还没有想法？</div><br/>
        <div class="rev-11 content__title__inner--offset-1">大伙的需求能提供吗？</div>
        <div class="rev-12 content__title__inner--offset-img1"><img src="../assets/Carousel/img/CarouselImg5.png" alt=""></div>
        <transition name="el-zoom-in-center">
          <div v-show="loaded" class="content__title__inner--button">
            <div class="circleScaleBtn" @click="needsClick"><span>查看需求</span></div>
          </div>
        </transition>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="CarouselItem">
        <div class="rev-13 content__title__inner">对我们感兴趣？</div><br/>
        <div class="rev-14 content__title__inner--offset-1">了解我们的开发团队</div>
        <div class="rev-15 content__title__inner--offset-img1"><img src="../assets/Carousel/img/CarouselImg4.png" alt=""></div>
        <transition name="el-zoom-in-center">
          <div v-show="loaded" class="content__title__inner--button">
            <div class="circleScaleBtn"><span>了解我们</span></div>
          </div>
        </transition>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
  name: "Carousel",
  data:function (){
    return{
      imgurl:require('../assets/Carousel/img/CarouselImg1.png'),
      nowIndex:0,
      autoplay:true,
      loaded:false,
      ItemLoaded:true
    }
  },
  components: {
    'anime-js': {
      render(createElement) {
        return createElement(
            'script',
            {
              attrs: {
                type: 'text/javascript',
                src: './static/BlockRevealers/anime.min.js',
              },
            },
        );
      },
    },
    'main-js': {
      render(createElement) {
        return createElement(
            'script',
            {
              attrs: {
                type: 'text/javascript',
                src: './static/BlockRevealers/main.js',
              },
            },
        );
      },
    },

  },
  mounted() {
    this.BlockRevealers();
    this.loaded=true;
    document.addEventListener('visibilitychange', this.handleVisiable)
  },
  destroyed() {
    document.removeEventListener('visibilitychange', this.handleVisiable)
  },
  methods: {
    BlockRevealers: function () {
      setTimeout(this.init, 0);
    },
    init: function () {
      var number1 = this.nowIndex * 3 + 1;
      var number2 = this.nowIndex * 3 + 2;
      var number3 = this.nowIndex * 3 + 3;
      var rev1 = new RevealFx(document.querySelector('.rev-' + number1), {
        revealSettings: {
          bgcolor: '#7f40f1',
          onCover: function (contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev1.reveal();
      var rev2 = new RevealFx(document.querySelector('.rev-' + number2), {
        revealSettings: {
          bgcolor: '#409EFF',
          delay: 300,
          onCover: function (contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev2.reveal();
      var rev3 = new RevealFx(document.querySelector('.rev-' + number3), {
        revealSettings: {
          bgcolor: '#85e1ea',
          delay: 500,
          onCover: function (contentEl, revealerEl) {
            contentEl.style.opacity = 1;
          }
        }
      });
      rev3.reveal();
    },
    beforeChange: function (callback) {
      this.loaded=false;
      this.nowIndex = callback;
      this.BlockRevealers();
      setTimeout(() => {
        this.loaded = true
      }, 600)
    },
    handleVisiable(e) {
        if(e.target.visibilityState=="hidden"){
          this.autoplay=false;
        }else if (e.target.visibilityState=="visible"){
          this.autoplay=true;
        }
    },
    goodsClick:function(){
      this.$router.push('/goods');
    },
    needsClick:function(){
      this.$router.push('/needs');
    },
    needpost:function (){
      this.$router.push('/needpost')
    },
    goodpost:function (){
      this.$router.push('/goodpost')
    },
  }
}
</script>

<style scoped>
@import "../assets/Carousel/BlockRevealers/demo.css";
.CarouselItem{
  background-color: #e2f3f5;
  cursor: pointer;
  box-shadow:
      0 1px 1.5px rgba(0, 0, 0, 0.098),
      0 2.4px 3.5px rgba(0, 0, 0, 0.141),
      0 4.5px 6.6px rgba(0, 0, 0, 0.175),
      0 8px 11.8px rgba(0, 0, 0, 0.209),
      0 15px 22.1px rgba(0, 0, 0, 0.252),
      0 36px 53px rgba(0, 0, 0, 0.35)
;
}
.el-carousel{
  background-color: #ecfdff;
  padding: 50px 0;
}
</style>
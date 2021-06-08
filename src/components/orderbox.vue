<template>
  <transition name="el-zoom-in-center">
		<div v-show="show" class="orderbox-main">
      <div class="orderbox-left">
        <img class="od-goodimg" :src="'http://123.56.42.47:10492'+good.goodpicurl" alt="俺的图图呢">
        <p class="orderbox-goodname">{{good.goodname}}</p>
      </div>
      <div class="orderbox-center">
        <img class="od-sellerimg" :src="avatar" alt="俺的图图呢">
        <p class="orderbox-sellername">{{towho}}：{{name}}</p>
        <p class="orderbox-orderprice">出价：￥{{order.orderprice}}</p>
      </div>
      <div class="orderbox-right">

          <div id="progress-bar-container">
            <ul>
              <li class="step step01 active" ><div class="step-inner">发送意向</div></li>
              <li class="step step02 active" ><div class="step-inner">卖家同意</div></li>
              <li class="step step03" :class="{active:statu>2}"><div class="step-inner">卖家发货</div></li>
              <li class="step step04" :class="{active:statu>3}"><div class="step-inner">买家收货</div></li>
              <li class="step step05" :class="{active:statu>4}"><div class="step-inner">评价</div></li>
            </ul>

            <div id="line">
              <div id="line-progress" ref="line"></div>
            </div>
          </div>
        <p class="orderbox-status" style="margin-bottom:10px ">当前状态:<span>{{zh_status}}</span></p>
        <div class="orderbox-right-bottom">
          <div class="circleScaleBtn" v-if="showConfirmButton" @click="$emit('confirm')">
            <span><i class="el-icon-arrow-right"></i>{{confirmText}}</span></div>
          <div class="orderbox-sellercomment" v-if="showComment">
            <div v-if="order.sellercommentid==0">
              <p v-if="!commenting||towho=='卖家'">等待卖方评价</p>
              <div class="orderbox-comment" v-if="towho=='买家'">
                <div class="circleScaleBtn" v-if="!commenting" @click="commenting=!commenting">
                  <span>评价订单</span></div>
<!--                <el-button  v-if="!commenting" type="primary"-->
<!--                            plain size='medium' @click="commenting=!commenting">评价订单</el-button>-->
                <div v-else>
                  <el-rate v-model="rate" :colors="colors"></el-rate>
                  <el-input v-model="comment" type="primary" plain size='medium' style="width:50%"
                            @keyup.enter.native="commentConfirm" @blur="commentConfirm"></el-input>
                </div>
              </div>
            </div>
            <div v-else>
              <p>卖方评价：</p>
              <el-rate v-model="sellercomment.commentrank" :colors="colors" disabled></el-rate>
              <p>{{sellercomment.commentcontent}}</p>
            </div>
          </div>
          <div class="orderbox-buyercomment" v-if="showComment">
            <div v-if="order.buyercommentid==0">
              <p v-if="!commenting||towho=='买家'">等待买方评价</p>
              <div class="orderbox-comment" v-show="towho=='卖家'">
                <el-button v-if="!commenting" type="primary"
                           plain size='medium' @click="commenting=!commenting">评价该订单</el-button>
                <div v-else>
                  <el-rate v-model="rate" :colors="colors"></el-rate>
                  <el-input v-model="comment" type="primary" plain size='medium' style="width:50%"
                            @keyup.enter.native="commentConfirm" @blur="commentConfirm"></el-input>
                </div>
              </div>
            </div>
            <div v-else>
              <p>买方评价：</p>
              <el-rate v-model="buyercomment.commentrank" :colors="colors" disabled></el-rate>
              <p>{{buyercomment.commentcontent}}</p>
            </div>
          </div>
        </div>
      </div>
		</div>
	</transition>
</template>

<script>
export default{
	name: "orderbox",
	props:['good','order','buyer','seller','buyercomment','sellercomment','index','towho'],
	data:function(){
		return{
			show: true,
			commenting: false,
			rate: 0,
			comment: '',
			colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      statu:2
		}
	},
	computed:{
		avatar(){
			return 'http://123.56.42.47:10492'+(this.towho=='买家'?this.buyer.useravatarurl:this.seller.useravatarurl);
		},
		name(){
			return this.towho=='买家'?this.buyer.username:this.seller.username;
		},
		zh_status(){
			return this.order.status==1||(this.order.sellerconfirm&&this.order.buyerconfirm)?'已完成':this.order.sellerconfirm==1?'待收货':'待发货';
		},
		showConfirmButton(){
			return this.towho=='买家'?!this.order.sellerconfirm:this.order.sellerconfirm&&!this.order.buyerconfirm;
		},
		confirmText(){
			return this.towho=='买家'?'已发货':'已收货';
		},
		showComment(){
			return (this.order.status==1||(this.order.sellerconfirm&&this.order.buyerconfirm));
		},
    issellerComment(){
		  return this.order.sellercommentid
    },
    isbuyerComment(){
		  return this.order.buyercommentid
    }
	},
	watch:{
		showOptions(val){
			if(val==false&&this.status==-1){
				this.show=false;
			}
		},
		commenting(val){
			console.log(val);
		},
		/*buyercomment(val){
			console.log(val);
		}*/
    zh_status(val){
      if (val=='待收货'){
        this.statu=3;
        this.$refs.line.style.width='50%';
      }else if(val=='已完成'){
        this.statu=4
        this.$refs.line.style.width='75%';
      }
    },
	},
  mounted() {
    if (this.zh_status=='待收货'){
      this.statu=3;
      this.$refs.line.style.width='50%';
    }else if(this.zh_status=='已完成'&&(this.issellerComment!=0&&this.towho=='买家')||(this.isbuyerComment!=0&&this.towho=='卖家')){
      this.statu=5;
      this.$refs.line.style.width='100%';
    }else if(this.zh_status=='已完成'){
      this.statu=4
      this.$refs.line.style.width='75%';
    }
  },
  methods:{
		commentConfirm(){
			console.log('commentConfirm');
			if(this.comment)
				this.$emit('postComment',this.comment,this.rate,this.order.orderid,this.index);
			this.commenting=false;
			this.comment='';
			this.rate=0;
      this.statu=5
      this.$refs.line.style.width='100%';
		}
	}
}
</script>

<style>
.orderbox-main{
  display: flex;
  justify-content: start;
  align-items: center;
  flex: 0 0 auto;
  width: 900px;
  height: 330px;
  border-radius: 8px;
  position: relative;
  background-color: #f2f7ff;
  margin-bottom: 30px;
}
.orderbox-left{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 330px;
}
.orderbox-left img{
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 270px;
  max-height: 280px;
  border-radius: 8px;
}
.orderbox-left p{
  font-family: "微软雅黑 Light";
  color: #0e153a;
  font-weight: bold;
  font-size: 15px;
  height: 40px;
  width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /*  从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  -webkit-line-clamp: 2; /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数 */
}
.orderbox-center{
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  width: 180px;
  height: 330px;
}
.orderbox-center img{
  width: 66px;
  height: 66px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.orderbox-center .orderbox-sellername{
  font-family: "微软雅黑 Light";
  font-weight: bold;
  margin-bottom: 20px;
  color:#364f6b;
  font-size: 20px;
}
.orderbox-center .orderbox-orderprice{
  font-size: 22px;
  color: #ff1f5a;
  font-weight: 550;
}
.orderbox-right{
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  width: 420px;
  height: 330px;
}
.orderbox-button{
	position: relative;
}
.orderbox-sellercomment{
  font-family: "微软雅黑 Light";
	width: 30%;
	height: 50%;
	/*border: 1px solid black;*/
}
.orderbox-buyercomment{
  font-family: "微软雅黑 Light";
  width: 30%;
	height: 50%;
	/*border: 1px solid black;*/
}
.orderbox-comment{
}
.orderbox-commentInput{
	position: relative;
}
.orderbox-right #progress-bar-container {
  position:relative;
  width:100%;
  margin:0 auto ;
  height:80px;
}

.orderbox-right #progress-bar-container ul {
  font-family: "微软雅黑 Light";
  padding:0;
  margin:0;
  padding-top:15px;
  z-index:2;
  position:absolute;
  width:100%;
  margin-top:-40px
}

.orderbox-right #progress-bar-container li:before {
  content:" ";
  display:block;
  margin:auto;
  width:30px;
  height:30px;
  border-radius:50%;
  border:solid 2px #aaa;
  transition:all ease 0.3s;

}

.orderbox-right #progress-bar-container li.active:before{
  border:solid 2px #fff;
  content: '√';
  color: white;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  font-size: 20px;
  background: #6843d1;
}
.orderbox-right #progress-bar-container li.error:before{
  border:solid 2px #fff;
  content: '×';
  color: white;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  font-size: 20px;
  background: #f65454;
}

.orderbox-right #progress-bar-container li {
  list-style:none;
  float:left;
  width:20%;
  text-align:center;
  color:#aaa;
  text-transform:uppercase;
  font-size:11px;
  cursor:pointer;
  font-weight:700;
  transition:all ease 0.2s;
  vertical-align:bottom;
  height:60px;
  position:relative;
}

.orderbox-right #progress-bar-container li .step-inner {
  position:absolute;
  width:100%;
  bottom:0;
  font-size: 14px;
}

.orderbox-right #progress-bar-container li.active, #progress-bar-container li:hover {
  color:#444;
}

.orderbox-right #progress-bar-container li:after {
  content:" ";
  display:block;
  width:6px;
  height:6px;
  background:#777;
  margin:auto;
  border:solid 7px #fff;
  border-radius:50%;
  margin-top:40px;
  box-shadow:0 2px 13px -1px rgba(0,0,0,0.3);
  transition:all ease 0.2s;

}

.orderbox-right #progress-bar-container li:hover:after {
  background:#555;
}

.orderbox-right #progress-bar-container li.active:after {
  background:#207893;
}

.orderbox-right #progress-bar-container #line {
  width:80%;
  margin:auto;
  background: #eee;
  height:6px;
  position:absolute;
  left:10%;
  top:57px;
  z-index:1;
  border-radius:50px;
  transition:all ease 0.9s;
}

.orderbox-right #progress-bar-container #line-progress {
  content:" ";
  width:25%;
  height:100%;
  background: #21e6c1;
  background: linear-gradient(to left, #4b1cd0 0%,#cbd9ef 100%);
  position:absolute;
  z-index:2;
  border-radius:50px;
  transition:all ease 0.9s;
}
.orderbox-right .orderbox-status{
  font-size: 18px;
}
.orderbox-right .orderbox-status span{
  color: #6843d1;
  font-weight: bold;
}
.orderbox-right-bottom{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  align-items: center;
  width: 420px;
}
.orderbox-right .circleScaleBtn {
  display: inline-block;
  width: 70px;
  font-size: 16px;
  font-family: 微软雅黑;
  padding: 10px 20px;
  background-color: hsl(222, 100%, 95%);
  color: hsl(243, 80%, 62%);
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  z-index: 1;
}

.orderbox-right .circleScaleBtn span {
  z-index: 1;
  position: relative;
}

.orderbox-right .circleScaleBtn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  transform: translate3d(-50%,-50%,0) scale3d(0,0,0);
  transition: opacity .4s cubic-bezier(.19,1,.22,1),transform .75s cubic-bezier(.19,1,.22,1);
  background-color: hsl(243, 80%, 62%);
  opacity: 0;
}

.orderbox-right .circleScaleBtn:hover span {
  color: hsl(222, 100%, 95%);
}

.orderbox-right .circleScaleBtn:hover::before {
  opacity: 1;
  transition-duration: .85s;
  transform: translate3d(-50%,-50%,0) scale3d(1,1,1)
}

</style>

<template>
		<div v-show="show" class="intentionbox-main">
      <div class="intentionbox-left">
        <img class="ib-goodimg" :src="goodavatar" alt="俺的图图呢">
        <p class="intentionbox-goodname">{{goodname}}</p>
      </div>
      <div class="intentionbox-center">
        <img class="ib-sellerimg" :src="avatar" alt="俺的图图呢">
        <p class="intentionbox-sellername"><i class="el-icon-s-custom"></i>{{towho}}：{{name}}</p>
        <p class="intentionbox-goodprice"><i class="el-icon-s-shop"></i>原价：￥{{goodprice}}</p>
        <p class="intentionbox-intentionprice"><i class="el-icon-s-marketing"></i>出价：￥{{intentionprice}}</p>
      </div>
      <div class="intentionbox-right">
        <div id="progress-bar-container">
          <ul>
            <li class="step step01 active" ><div class="step-inner">发送意向</div></li>
            <li class="step step02 " :class="{active:stepactive,error:steperror}"><div class="step-inner">卖家同意</div></li>
          </ul>

          <div id="line">
            <div id="line-progress" ref="line"></div>
          </div>
        </div>
        <p class="intentionbox-status" :class="{error:status==-1}">当前状态: <span>{{zh_status}}</span></p>
        <div class="intentionbox-buttons">
          <el-button class="intentionbox-accept" v-if="showOptions" type="success"
                     icon="el-icon-check" size='medium' circle @click="$emit('accpet')"></el-button>
          <el-button class="intentionbox-refuse" v-if="showOptions" type="danger"
                     icon="el-icon-close" size='medium' circle @click="$emit('refuse')"></el-button>
          <el-button class="intentionbox-refuse" v-if="towho=='卖家'||status!=0" type="danger"
                     icon="el-icon-delete" size='medium' circle @click="$emit('deleteIntention');show = !show"></el-button>
        </div>
      </div>
		</div>
</template>

<script>
export default{
	name: "intentionbox",
	props:['avatar','name','intentionprice','goodprice','goodavatar','goodname','status','towho'],
	data:function(){
		return{
			show: true,
      stepactive:false,
      steperror:false
		}
	},
	computed:{
		showOptions(){
		  //如果对方是买家，也就是我是卖家，展示按钮给我提供选择
			return this.towho=='买家'&&this.status==0;
		},
		zh_status(){
			return this.towho=='卖家'?this.status1:this.status2;
		},
		status1(){
		  //这是给买家的状态
			return this.status==0?'等待卖方意见':this.status==1?'成交':'出价被拒绝';
		},
		status2(){
		  //这是给卖家的状态
			return this.status==0?'待处理':this.status==1?'成交':'已拒绝';
		}
	},
	watch:{
		showOptions(val){
			if(val==false&&this.status==-1){
				this.show=false;
			}
		},
		status(val){
      if(this.status==1){
        this.stepactive=true;
        this.$refs.line.style.width='100%';
      }else if(this.status==-1){
        this.steperror=true;
        this.$refs.line.style.width='100%';
      }
    }
	},
	mounted() {
    if(this.status==1){
      this.stepactive=true;
      this.$refs.line.style.width='100%';
    }else if(this.status==-1){
      this.steperror=true;
      this.$refs.line.style.width='100%';
    }
  }
}
</script>

<style>
.intentionbox-main{
  display: flex;
  justify-content: start;
  align-items: center;
  flex: 0 0 auto;
  width: 900px;
	height: 300px;
  border-radius: 8px;
	position: relative;
  background-color: #f2f7ff;
	margin-bottom: 20px;
}
.intentionbox-left{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
}
.intentionbox-left img{
  margin-bottom: 10px;
  max-width: 270px;
  max-height: 260px;
  border-radius: 8px;
}
.intentionbox-left p{
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
.intentionbox-center{
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  width: 180px;
  height: 300px;
}
.intentionbox-center img{
  width: 66px;
  height: 66px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.intentionbox-center .intentionbox-sellername{
  font-family: "微软雅黑 Light";
  font-weight: bold;
  margin-bottom: 20px;
  color:#364f6b;
  font-size: 20px;
}
.intentionbox-center .intentionbox-goodprice{
  font-size: 22px;
  color: #278ea5;
  font-weight: 550;
  margin-bottom: 10px;
}
.intentionbox-center .intentionbox-intentionprice{
  font-size: 22px;
  color: #ff1f5a;
  font-weight: 550;
}
.intentionbox-right{
  width: 420px;
  height: 300px;
}
.intentionbox-right .intentionbox-status{
  font-size: 18px;
}
.intentionbox-right .intentionbox-status span{
  color: #6843d1;
  font-weight: bold;
}
.intentionbox-right .intentionbox-status.error span{
  color: #f65454;
}
.intentionbox-right .intentionbox-buttons{
  margin-top: 20px;
}
.intentionbox-right #progress-bar-container {
  position:relative;
  width:100%;
  margin:auto;
  height:80px;
  margin-top:75px;
}

.intentionbox-right #progress-bar-container ul {
  font-family: "微软雅黑 Light";
  padding:0;
  margin:0;
  padding-top:15px;
  z-index:2;
  position:absolute;
  width:100%;
  margin-top:-40px
}

.intentionbox-right #progress-bar-container li:before {
  content:" ";
  display:block;
  margin:auto;
  width:30px;
  height:30px;
  border-radius:50%;
  border:solid 2px #aaa;
  transition:all ease 0.3s;

}

.intentionbox-right #progress-bar-container li.active:before{
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
.intentionbox-right #progress-bar-container li.error:before{
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

.intentionbox-right #progress-bar-container li {
  list-style:none;
  float:left;
  width:50%;
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

.intentionbox-right #progress-bar-container li .step-inner {
  position:absolute;
  width:100%;
  bottom:0;
  font-size: 14px;
}

.intentionbox-right #progress-bar-container li.active, #progress-bar-container li:hover {
  color:#444;
}

.intentionbox-right #progress-bar-container li:after {
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

.intentionbox-right #progress-bar-container li:hover:after {
  background:#555;
}

.intentionbox-right #progress-bar-container li.active:after {
  background:#207893;
}

.intentionbox-right #progress-bar-container #line {
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

.intentionbox-right #progress-bar-container #line-progress {
  content:" ";
  width:30%;
  height:100%;
  background: #21e6c1;
  background: linear-gradient(to left, #4b1cd0 0%,#cbd9ef 100%);
  position:absolute;
  z-index:2;
  border-radius:50px;
  transition:all ease 0.9s;
}
</style>

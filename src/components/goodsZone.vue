<template>
	<div class="goodsZoneMain">
		<ul class="gz-leftMenu">
			<li v-for="(item,index) in leftMenu_items" :key="index" 
			:class="classOfMenuItem(index)" @click="turnTo(index,1)">{{item.title}}</li>
		</ul>
		<el-button class="lastPageButton" icon="el-icon-back" round @click="turnToLastPage">上一页</el-button>
		<el-button class="nextPageButton" round @click="turnToNextPage">下一页<i class="el-icon-right el-icon--right"></i></el-button>
		<transition name="el-zoom-in-center">
		<div class="goodcontainer" v-show="show">
		      <Goodbox_goodshelf class="good" v-for="(item,index) in goodlist" :key="item.goodid"
		               :goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :favorite="item.favoriteNow" :goodprice="item.goodprice" :goodsenderid="item.goodsenderid" 
										:goodid="item.goodid" @favoriteOrNot="turnFavoriteState(index)">
		      </Goodbox_goodshelf>
		</div>
		</transition>
	</div>
</template>

<script>
import Goodbox_goodshelf from "@/components/Goodbox_goodshelf";
export default {
	name: "goodsZone",
	components:{
		Goodbox_goodshelf,
	}, 
	data: function(){
		return{
			leftMenu_items:[
				{title:"分区1",pageNum:null},
				{title:"分区2",pageNum:null},
				{title:"分区3",pageNum:null},
				{title:"分区4",pageNum:null},
			],
			partFocused:null,
			pageNow:null,
			goodlist:[],
			show:true
		}
	},
	computed:{
		classOfMenuItem(){
			return (index)=>{
				return index==this.partFocused?"gz-leftMenu-itemFocused":"";
			}
		}
	},
	methods: {
		turnToLastPage:function(){
			var vm=this;
			console.log('last');
			last_();
			async function last_(){
				await vm.getPageNum(vm.partFocused+1);
				await new Promise(function(resolve,reject){
					if(vm.pageNow==1)
						vm.$message({message: '已经是第一页了'});
					else if(vm.pageNow>vm.leftMenu_items[vm.partFocused]+1)
						vm.$message({message: '页码出错'});
					else vm.turnTo(vm.partFocused,vm.pageNow-1);
					resolve();
				})
			}
		},
		turnToNextPage:function(){
			var vm=this;
			console.log('next');
			next_();
			async function next_(){
				await vm.getPageNum(vm.partFocused+1);
				await new Promise(function(resolve,reject){
					console.log(vm.pageNow+' '+vm.leftMenu_items[vm.partFocused].pageNum);
					if(vm.pageNow<0)
						vm.$message({message: '页码出错'});
					else if(vm.pageNow==vm.leftMenu_items[vm.partFocused].pageNum)
						vm.$message({message: '已经是最后一页了'});
					else vm.turnTo(vm.partFocused,vm.pageNow+1);
					resolve();
				})
			}
		},
		turnTo:function(part,page){
			if(this.partFocused==part&&this.pageNow==page) return;
			if(this.page<1||this.page>this.leftMenu_items[part].pageNum)
			{
				this.$message({message:'页码出错'});
				return;
			}
			this.partFocused=part;
			this.pageNow=page;
			part++;
			var urlGet='http://123.56.42.47:10492/good/block';
			var urlCheck= 'http://123.56.42.47:10492/user/isfavorite';
			var vm=this;
			procedure();
			async function procedure(){
				await vm.postChange();
				var response=await vm.axios.get(urlGet+'/'+part+'/'+page);
				await new Promise(function(resolve,reject){
					vm.goodlist=response.data.goodList;
					resolve();
				})
				await new Promise(function(resolve,reject){
					for(var i=0;i<vm.goodlist.length;i++){
						new Promise(function(resolve,reject){
							var temp=JSON.parse(JSON.stringify(vm.goodlist[i]));
							temp.favorite=false;
							temp.favoriteNow=false;
							temp.index=i;
							resolve(temp);
						}).then(function(temp){
							if(!vm.$store.state.login) return temp;
							//console.log(vm.$store.state.userid+' '+temp.goodid);
							vm.axios.post(urlCheck+'/'+vm.$store.state.userid+'/'+temp.goodid).then(function(response){
							temp.favorite=response.data.isfavorite;
							temp.favoriteNow=temp.favorite;
							return temp;
							}).then(function(temp){
								//console.log('temp.i: '+temp.index+' temp.goodid: '+temp.goodid+' favorite: '+temp.favorite);
								return temp;
							}).then(function(temp){
								vm.$set(vm.goodlist,temp.index,temp);
							})
						})
					}
					resolve();
				})
			}
		},
		getPageNum: function(index){
			var urlGet='http://123.56.42.47:10492/getPageNum';
			var vm=this;
			this.axios.get(urlGet+'/'+index).then(function(response){
				vm.leftMenu_items[index-1].pageNum=response.data.PageNum;
			})
		},
		postChange: function(){
			if(this.$store.state.login){
				var urlAdd='http://123.56.42.47:10492/addtoFavorite';
				var urlCancel='http://123.56.42.47:10492/removeFavorite';
				var vm=this;
				for(var i=0;i<this.goodlist.length;i++)
				{
					if(!this.goodlist[i].favorite&&this.goodlist[i].favoriteNow){
						//console.log('add '+this.goodlist[i].goodid);
						this.goodlist[i].favorite=true;
						this.axios.post(urlAdd+'/'+this.goodlist[i].goodid,null,{
								headers:{'Authorization':this.$store.state.Authorization},
						})}
					else if(this.goodlist[i].favorite&&!this.goodlist[i].favoriteNow){
						//console.log('cancel '+this.goodlist[i].goodid);
						this.goodlist[i].favorite=false;
						this.axios.post(urlCancel+'/'+this.goodlist[i].goodid,null,{
								headers:{'Authorization':this.$store.state.Authorization}
						})}
				}}
		},
    removeItems: function (index) {
      this.goodlist.splice(index, 1);
    },
		turnFavoriteState: function(index){
			var temp=this.goodlist[index];
			temp.favoriteNow=!temp.favoriteNow;
			this.$set(this.goodlist,index,temp);
		},
		
	},
	created: function(){
		var vm=this;
		init();
		async function init(){
			await vm.getPageNum(1);
			await vm.turnTo(0,1);
		}
	},
	mounted: function(){
		window.addEventListener('beforeunload', e => this.postChange());
	},
	beforeRouteLeave(to, from, next) {
		this.postChange();
		next();
	}
}
</script>

<style>
.goodsZoneMain{
	height:720px;
	background-color: #f5f5f5;
}
.gz-leftMenu{
	position: relative;
	left: 70px;
	top: 50px;
	width: 100px;
	height: 200px;
	background-color: #ebffff;
	border-color: white;
	border-style: solid;
	border-width: 2px;
}
.gz-leftMenu>li{
	width: 100px;
	height: 49px;
	text-align: center;
	line-height: 49px;
	font-family: "microsoft yahei";
	cursor: pointer;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: #dddddd;
}
.gz-leftMenu>li:last-child{
	height: 50px;
	border-bottom-style: none;
}
.gz-leftMenu>li:hover{
	background-color: #dff1f1;
	font-weight: bolder;
}
.gz-leftMenu>li:active{
	background-color: #dde8e8;
	font-weight: bolder;
	color: #4169e1;
}
.gz-leftMenu-itemFocused{
	background-color: #dde8e8;
	font-weight: bolder;
	color: #4169e1;
}
.good{
  float: left;
  margin: 25px 12px;
}
.goodcontainer{
  margin-left: 120px;
	position: relative;
	left: 100px;
	top: -230px;
}
.lastPageButton{
	position: relative;
	left: -580px;
	top: 80px;
}
.nextPageButton{
	position: relative;
	left: -700px;
	top: 150px;
}
</style>

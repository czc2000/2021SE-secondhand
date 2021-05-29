<template>
  <div class="needsZoneMain">
    <div class="NZone_banner">
      <img src="../assets/NeedZone/banner.jpg" alt="">
    </div>
    <div class="NZone_menu">
      <ul class="nz-Menu">
        <li v-for="(item,index) in leftMenu_items" :key="index"
            :class="{activeItem:index==partFocused}" @click="turnTo(index,1)"><a>{{item.title}}</a></li>
      </ul>
    </div>
    <div class="NZone_goodcontainer" v-show="show">
      <needbox_needShelf class="Zone_need" v-for="(item,index) in needlist" :key="item.needid"
                         :needpicurl="'http://123.56.42.47:10492'+item.needpicurl" :needname="item.needname" :needsenderid="item.needsenderid"
                         :needid="item.needid" :needDescription="item.needdescription">
      </needbox_needShelf>
    </div>
    <div class="changePage">
      <a @click="turnToLastPage" class="page-link link-left">
        <span><i class="el-icon-caret-left"></i></span>
      </a>
      <a @click="turnToNextPage" class="page-link">
        <span><i class="el-icon-caret-right"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
import needbox_needShelf from "@/components/needbox_needShelf";
export default {
	name: "needsZone",
	components:{
		needbox_needShelf,
	}, 
	data: function(){
		return{
			leftMenu_items:[
        {title:"生活用品",pageNum:null},
        {title:"电子产品",pageNum:null},
        {title:"书籍资料",pageNum:null},
        {title:"其它类型",pageNum:null},
			],
			partFocused:null,
			pageNow:null,
			needlist:[],
			show:true
		}
	},
	computed:{
		classOfMenuItem(){
			return (index)=>{
				return index==this.partFocused?"nz-leftMenu-itemFocused":"";
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
					if(vm.pageNow<=1)
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
					else if(vm.pageNow>=vm.leftMenu_items[vm.partFocused].pageNum)
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
			var urlGet='http://123.56.42.47:10492/need/block';
			//var urlCheck= 'http://123.56.42.47:10492/user/isfavorite';
			var vm=this;
			procedure();
			async function procedure(){
				//await vm.postChange();
				var response=await vm.axios.get(urlGet+'/'+part+'/'+page);
				await new Promise(function(resolve,reject){
					vm.needlist=response.data.needList;
					resolve();
				})
				/*await new Promise(function(resolve,reject){
					for(var i=0;i<vm.needlist.length;i++){
						new Promise(function(resolve,reject){
							var temp=JSON.parse(JSON.stringify(vm.needlist[i]));
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
				})*/
			}
		},
		getPageNum: function(index){
			var urlGet='http://123.56.42.47:10492/getPageNum';
			var vm=this;
			this.axios.post(urlGet+'/'+index).then(function(response){
				vm.leftMenu_items[index-1].pageNum=response.data.PageNum;
			})
		},
		postChange: function(){
			/*if(this.$store.state.login){
				var urlAdd='http://123.56.42.47:10492/addtoFavorite';
				var urlCancel='http://123.56.42.47:10492/removeFavorite';
				for(var i=0;i<this.goodlist.length;i++)
				{
					if(!this.goodlist[i].favorite&&this.goodlist[i].favoriteNow){
						//console.log('add '+this.goodlist[i].goodid);
						this.axios.post(urlAdd+'/'+this.goodlist[i].goodid,null,{
								headers:{'Authorization':this.$store.state.Authorization}
						})}
					else if(this.goodlist[i].favorite&&!this.goodlist[i].favoriteNow){
						//console.log('cancel '+this.goodlist[i].goodid);
						this.axios.post(urlCancel+'/'+this.goodlist[i].goodid,null,{
								headers:{'Authorization':this.$store.state.Authorization}
						})}
				}}*/
		},
    removeItems: function (index) {
      this.needlist.splice(index, 1);
    },
		turnFavoriteState: function(index){
			var temp=this.needlist[index];
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
.NZone_banner{
  max-width: 100%;
  overflow-x: hidden;
}
.NZone_menu{
  width: 75%;
  height: 80px;
  margin: 50px auto 0;
  background-color: #364f6b;
  border-radius: 8px;
}
.nz-Menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 50%;
  margin: 0 auto ;
}
.nz-Menu li{
  display: inline-block;
}
.nz-Menu a {
  position: relative;
  color: #0e153a;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  padding: 6px 18px;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.8s;
  cursor: pointer;
}
.nz-Menu .activeItem a{
  color: white;
  background-color: #ee4c80;
}
.nz-Menu a:hover {
  color: white;
  background-color: #ee4c80;
}

.nz-Menu a::before {
  position: absolute;
  content: "";
  width: 18px;
  height: 18px;
  border: 3px solid #ee4c80;
  border-width: 0 0 3px 3px;
  left: 0;
  bottom: 0;
  opacity: 0;
  transition: 0.3s;
}

.nz-Menu a::after {
  position: absolute;
  content: "";
  width: 18px;
  height: 18px;
  border: 3px solid #ee4c80;
  border-width: 3px 3px 0 0;
  top: 0;
  right: 0;
  opacity: 0;
  transition: 0.3s;
}

.nz-Menu a:hover::before {
  left: -12px;
  bottom: -12px;
  opacity: 1;
}

.nz-Menu a:hover::after {
  top: -12px;
  right: -12px;
  opacity: 1;
}
.NZone_goodcontainer{
  width: 80%;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  display: flex;
  justify-content: start;
}
.Zone_need{
  margin-top: 60px;
  margin-left: 50px;
}
.changePage{
  height: 60px;
  margin: 60px auto;
}
.page-link{
  display: inline-block;
  font-size: 40px;
  padding: 0 5px;
  margin-left: 20px;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.8s;

}
.link-left{
  border-top-right-radius: 0rem;
  border-bottom-right-radius: 0rem;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.page-link:hover{
  background-color: #5c2678;
  color: white;
}
</style>

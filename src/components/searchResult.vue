<template>
	<div>
    <h1 style="margin: 40px auto 0;width: 75%;text-align: left;font-weight: 400">搜索关键词：
      <span style="font-weight: bold;color:coral">{{$store.state.searchParams.keyWord}}</span>
    </h1>
		<div class="GZone_goodcontainer" v-show="type==1">
		      <Goodbox_goodshelf class="Zone_good" v-for="(item,index) in goodlist" :key="item.goodid"
		               :goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :favorite="item.favoriteNow" :goodprice="item.goodprice" :goodsenderid="item.goodsenderid"
										:goodid="item.goodid" @favoriteOrNot="turnFavoriteState(index)" @wantobuy="createIntention(item.goodid,index)">
		      </Goodbox_goodshelf>
		</div>
    <div class="NZone_goodcontainer" v-show="type==2">
      <needbox_needShelf class="Zone_need" v-for="(item,index) in needlist" :key="item.needid"
                         :needpicurl="'http://123.56.42.47:10492'+item.needpicurl" :needname="item.needname" :needsenderid="item.needsenderid"
                         :needid="item.needid" :needDescription="item.needdescription">
      </needbox_needShelf>
    </div>
    <div class="changePage" v-if="goodlist.length!=0&&type==1||needlist.length!=0&&type==2">
      <a @click="turnToLastPage" class="page-link link-left">
        <span><i class="el-icon-caret-left"></i></span>
      </a>
      <a @click="turnToNextPage" class="page-link">
        <span><i class="el-icon-caret-right"></i></span>
      </a>
    </div>
    <div v-else style="margin-top: 50px; font-size: 25px;color: #666666;">抱歉，暂时没有相关物品</div>
  </div>
</template>

<script>
import Goodbox_goodshelf from "@/components/Goodbox_goodshelf";
import needbox_needShelf from "@/components/needbox_needShelf";
export default {
	name: "searchResult",
	components:{
		Goodbox_goodshelf,
		needbox_needShelf,
	}, 
	data: function(){
		return{
			pageNow:null,
			pageMax:null,
			goodlist:[],
			needlist:[],
		}
	},
	computed:{
		newSearch(){
			return this.$store.state.newSearch;
		},
		type(){
			return this.$store.state.searchType;
		}
	},
	watch:{
		newSearch(val){
			if(val==true){
				console.log('get');
				var vm=this;
				this.$store.commit('endSearch');	
				search();
				async function search(){
					await vm.getPageNum();
					await vm.turnTo(1);
				}
			}
		}
	},
	methods: {
		turnToLastPage:function(){
			var vm=this;
			console.log('last');
			last_();
			async function last_(){
				await vm.getPageNum();
				await new Promise(function(resolve,reject){
					if(vm.pageNow==1)
						vm.$message({message: '已经是第一页了'});
					else if(vm.pageNow>vm.pageMax)
						vm.$message({message: '页码出错'});
					else vm.turnTo(vm.pageNow-1);
					resolve();
				})
			}
		},
		turnToNextPage:function(){
			var vm=this;
			console.log('next');
			next_();
			async function next_(){
				await vm.getPageNum();
				await new Promise(function(resolve,reject){
					if(vm.pageNow<0)
						vm.$message({message: '页码出错'});
					else if(vm.pageNow==vm.pageMax)
						vm.$message({message: '已经是最后一页了'});
					else vm.turnTo(vm.pageNow+1);
					resolve();
				})
			}
		},
		turnTo:function(page){
			if(this.page<1||this.page>this.pageMax)
			{
				this.$message({message:'页码出错'});
				return;
			}
			this.pageNow=page;
			this.$store.commit('changeSearchPage',page);
			var urlGet1='http://123.56.42.47:10492/good/search',urlGet2='http://123.56.42.47:10492/need/search';
			var urlCheck= 'http://123.56.42.47:10492/user/isfavorite',urlGet=this.$store.state.searchType==1?urlGet1:urlGet2;
			var vm=this;
			procedure();
			async function procedure(){
				await vm.postChange();
				var response=await vm.axios.get(urlGet,{params:vm.$store.state.searchParams});
				if(vm.$store.state.searchType==2){
					vm.needlist=response.data.needList;
				}
				else{
					await new Promise(function(resolve,reject){
						console.log(response.data.goodList);
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
			}
		},
		getPageNum: function(index){
			var urlGet1='http://123.56.42.47:10492/good/search',urlGet2='http://123.56.42.47:10492/need/search';
			var vm=this,urlGet=this.$store.state.searchType==1?urlGet1:urlGet2;
			this.axios.get(urlGet,{params:this.$store.state.searchParams}).then(function(response){
				vm.pageMax=response.data.pageNum;
				console.log(vm.pageMax);
			})
		},
		postChange: function(){
			if(this.$store.state.login&&this.$store.state.searchType==1){
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
		turnFavoriteState: function(index){
			var temp=this.goodlist[index];
			temp.favoriteNow=!temp.favoriteNow;
			this.$set(this.goodlist,index,temp);
		},
		createIntention:function(goodid,index){
			if(this.goodlist[index].goodsenderid==this.$store.state.userid) return;
		}
	},
	created: function(){
		this.$store.commit('endSearch');
		var vm=this;
		init();
		async function init(){
			await vm.$store.commit('loadSearchParams');
			await vm.getPageNum();
			await vm.turnTo(1);
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
  flex-wrap:wrap;
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
.GZone_banner{
  max-width: 100%;
  overflow-x: hidden;
}
.GZone_menu{
  width: 75%;
  height: 80px;
  margin: 50px auto 0;
  background-color: #52a7b4;
  border-radius: 8px;
}
.gz-Menu{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 50%;
  margin: 0 auto ;
}
.gz-Menu li{
  display: inline-block;
}
.gz-Menu a {
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
.gz-Menu .activeItem a{
  color: white;
  background-color: coral;
}
.gz-Menu a:hover {
  color: white;
  background-color: coral;
}

.gz-Menu a::before {
  position: absolute;
  content: "";
  width: 18px;
  height: 18px;
  border: 3px solid coral;
  border-width: 0 0 3px 3px;
  left: 0;
  bottom: 0;
  opacity: 0;
  transition: 0.3s;
}

.gz-Menu a::after {
  position: absolute;
  content: "";
  width: 18px;
  height: 18px;
  border: 3px solid coral;
  border-width: 3px 3px 0 0;
  top: 0;
  right: 0;
  opacity: 0;
  transition: 0.3s;
}

.gz-Menu a:hover::before {
  left: -12px;
  bottom: -12px;
  opacity: 1;
}

.gz-Menu a:hover::after {
  top: -12px;
  right: -12px;
  opacity: 1;
}
.GZone_goodcontainer{
  width: 80%;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
}
.Zone_good{
  float: left;
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
  background-color: #1e2a78;
  color: white;
}
</style>

<template>
  <div class="background_userinfo">
		<div class="userinfo-main">
			<ul class="menu1">
				<li @click="modeTo('info')" :style="isChoosen('info')">资料</li>
				<li @click="modeTo('order')" :style="isChoosen('order')">订单</li>
				<ul class="submenu_fold order_fold" v-if="isMode('order')">
					<li @click="submodeTo('fromMe')" :style="isChoosen2('fromMe')">发的</li>
					<li @click="submodeTo('fromOthers')" :style="isChoosen2('fromOthers')">收的</li>
				</ul>
				<li @click="modeTo('favorite')" :style="isChoosen('favorite')">收藏</li>
				<li @click="modeTo('demand')" :style="isChoosen('demand')">需求</li>
				<li @click="modeTo('good')" :style="isChoosen('good')">商品</li>
				<li @click="modeTo('intention')" :style="isChoosen('intention')">意向</li>
				<ul class="submenu_fold intention_fold" v-if="isMode('intention')">
					<li @click="submodeTo('fromMe')" :style="isChoosen2('fromMe')">发的</li>
					<li @click="submodeTo('fromOthers')" :style="isChoosen2('fromOthers')">收的</li>
				</ul>
			</ul>
			
			<div class="info userinfo-maincard" v-if="isMode('info')">
				<div class="info-head">
					<profileUpload ref="avatar"></profileUpload>
					<img :src="getUseravatar" alt="">
					<div class="imgCover" @click="changeAvatar"><p>更换我的头像</p></div>
					<p>头像</p>
				</div>
				<el-form :model="form" class="info-body" :rules="rules" ref="ruleForm" label-width="65px">
					<el-form-item label="用户id">
						<el-input v-model="form.userid" prefix-icon="el-icon-user-solid" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="用户名">
						<el-input v-model="form.username" prefix-icon="el-icon-user" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="性别">
						<el-select v-model="form.usersex" style="width:100%" :disabled="!isEditMode">
							<i slot="prefix" class="el-input__incon el-icon-search"></i>
							<el-option value=0 label="女"></el-option>
							<el-option value=1 label="男"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="邮箱" prop="useremail">
						<el-input v-model="form.useremail" prefix-icon="el-icon-message" :disabled="!isEditMode"></el-input>
					</el-form-item>
					<el-form-item label="手机" prop="userphonenumber">
						<el-input v-model="form.userphonenumber" prefix-icon="el-icon-mobile phone" :disabled="!isEditMode"></el-input>
					</el-form-item>
				</el-form>
				<el-button class="info-edit" plain @click="enterEditMode" v-show="!isEditMode&&!isPWDChangeMode">修改信息</el-button>
				<el-button class="info-save" plain @click="saveEdit" v-show="isEditMode">保存修改</el-button>
				<el-button class="info-cancel" plain @click="leaveEditMode" v-show="isEditMode">取消修改</el-button>
				<el-form :model="form2" class="info-body2" :rules="rules2" ref="ruleForm2" label-width="75px" v-show="isPWDChangeMode">
					<el-form-item label="现有密码" prop="pwdNow">
						<el-input v-model="form2.pwdNow" prefix-icon="el-icon-lock"></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="pwdNew">
						<el-input v-model="form2.pwdNew" prefix-icon="el-icon-key"></el-input>
					</el-form-item>
				</el-form>
				<el-button class="pwd-change" plain @click="enterPWDChangeMode" v-show="!isPWDChangeMode&&!isEditMode">修改密码</el-button>
				<el-button class="pwd-save" plain @click="savePWDChangeMode" v-show="isPWDChangeMode">保存修改</el-button>
				<el-button class="pwd-cancel" plain @click="leavePWDChangeMode" v-show="isPWDChangeMode">取消修改</el-button>
			</div>
			
			<div class="order userinfo-maincard" v-if="isMode('order')">
				<div class="rectangleContainer" v-if="isMode2('fromMe')">
					<orderbox v-for="(item,index) in this.Isold" :key="item.order.orderid" :index="index" towho="买家"
						:good="item.good" :order="item.order" :buyer="item.buyer" :seller="{}"
						:buyercomment="item.buyercomment" :sellercomment="item.sellercomment"
						@confirm="sellerConfirm(item.order.orderid,index)" @postComment="postSellerComment">
					</orderbox>
				</div>
				<div class="rectangleContainer" v-if="isMode2('fromOthers')">
					<orderbox v-for="(item,index) in this.Ibought" :key="item.order.orderid" :index="index" towho="卖家"
						:good="item.good" :order="item.order" :buyer="{}" :seller="item.seller"
						:buyercomment="item.buyercomment" :sellercomment="item.sellercomment"
						@confirm="buyerConfirm(item.order.orderid,index)" @postComment="postBuyerComment">
					</orderbox>
				</div>
			</div>
			
			<div class="favorite userinfo-maincard" v-if="isMode('favorite')">
				<el-divider class="favorite-divider1"></el-divider>
				<el-divider class="favorite-divider2"></el-divider>
				<div class="favorite-goodContainer">
					<Goodbox_favoriteshelf class="goods" v-for="(item,index) in this.favorites" :key="item.goodid" pos="favorite"
						:goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :goodid="item.goodid"
						:goodprice="item.goodprice" :goodsenderid="item.goodsenderid" @cancelFavorite="recordCancel(item.goodid,index)">
					</Goodbox_favoriteshelf>
				</div>
			</div>
			
			<div class="demand userinfo-maincard" v-if="isMode('demand')">
				<el-divider class="demand-divider1"></el-divider>
				<el-divider class="demand-divider2"></el-divider>
				<div class="demand-needContainer">
					<needbox_infoShelf class="needs" v-for="(item,index) in this.$store.state.needs" :key="item.needid"
						:needpicurl="'http://123.56.42.47:10492'+item.needpicurl" :needname="item.needname" :needid="item.needid"
						:needsenderid="item.needsenderid" :needDescription="item.needdescription" @deleteNeed="recordDelete(item.needid)">
					</needbox_infoShelf>
				</div>
			</div>
			
			<div class="good___ userinfo-maincard" v-if="isMode('good')">
				<el-dialog title="修改商品" :visible.sync="goodEditing" width="30%" :show-close="false" :modal-append-to-body='false'>
						<el-form label-position="right" ref="ruleForm3" :rules="rules3" :model="form3" label-width="90px">
						  <el-form-item label="商品标题" prop="goodname">
						    <el-input v-model="form3.goodname"></el-input>
						  </el-form-item>
						  <el-form-item label="商品描述" prop="gooddescription">
						    <el-input type="textarea" v-model="form3.gooddescription"></el-input>
						  </el-form-item>
							<el-tag :key="tag" v-for="(tag,index) in form3.goodtags" closable
								:disable-transitions="false" @close="handleClose1(index)">
									{{tag}}
							</el-tag>
							<el-input class="input-new-tag" v-if="goodTagsEditing" v-model="goodTagInput"
								ref="saveTagInput1" size="small" @keyup.enter.native="handleInputConfirm">
							</el-input>
							<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
						  <br/><br/><br/>
							<el-form-item label="商品价格" prop="goodprice">
						    <p class="price">￥</p>
						    <el-input-number v-model="form3.goodprice" :precision="2" :step="1" :max="50000" :min="0" size="medium">
						    </el-input-number>
						  </el-form-item>
						</el-form>
					  <span slot="footer" class="dialog-footer">
					    <el-button @click="cancelGoodEdit">取 消</el-button>
					    <el-button type="primary" @click="confirmGoodEdit">确 定</el-button>
					  </span>
				</el-dialog>
				<el-divider class="favorite-divider1"></el-divider>
				<el-divider class="favorite-divider2"></el-divider>
				<div class="favorite-goodContainer">
					<Goodbox_favoriteshelf class="goods" v-for="(item,index) in this.goods" :key="item.goodid" pos="good"
						:goodpicurl="'http://123.56.42.47:10492'+item.goodpicurl" :goodname="item.goodname" :goodid="item.goodid"
						:goodprice="item.goodprice" :goodsenderid="item.goodsenderid" @cancelFavorite="deleteGood(item.goodid)" @edit="editGood(item.goodid,index)">
					</Goodbox_favoriteshelf>
				</div>
			</div>
			
			<div class="intention_ userinfo-maincard" v-if="isMode('intention')">
				<div class="rectangleContainer" v-if="isMode2('fromMe')">
					<intentionbox v-for="(item,index) in this.intentions" :key="item.intention.intentionid"
						:avatar="'http://123.56.42.47:10492'+item.seller.useravatarurl" :name="item.seller.username" 
						:intentionprice="item.intention.intentionprice" :goodprice="item.good.goodprice" :goodavatar="'http://123.56.42.47:10492'+item.good.goodpicurl"
						:goodname="item.good.goodname" :status="item.intention.intentionstatus" towho="卖家" @deleteIntention="deleteIntention(item.intention.intentionid,index)">
					</intentionbox>
				</div>
				<div class="rectangleContainer" v-if="isMode2('fromOthers')">
					<intentionbox v-for="(item,index) in this.receivedintentions" :key="item.intention.intentionid"
						:avatar="'http://123.56.42.47:10492'+item.buyer.useravatarurl" :name="item.buyer.username" 
						:intentionprice="item.intention.intentionprice" :goodprice="item.good.goodprice" :goodavatar="'http://123.56.42.47:10492'+item.good.goodpicurl"
						:goodname="item.good.goodname" :status="item.intention.intentionstatus" towho="买家"
						@accpet="acceptIntention(item.intention.intentionid,index)" @refuse="refuseIntention(item.intention.intentionid,index)">
					</intentionbox>
				</div>
			</div>
			
		</div>
  </div>
</template>

<script>
import profileUpload from "@/components/profileUpload";
import Goodbox_favoriteshelf from "@/components/Goodbox_favoriteshelf";
import needbox_infoShelf from "@/components/needbox_infoShelf";
import orderbox from "@/components/orderbox"
import intentionbox from "@/components/intentionbox"
export default {
  name: "userInformation",
  components:{
    profileUpload,
		Goodbox_favoriteshelf,
		needbox_infoShelf,
		orderbox,
		intentionbox
  },
  data:function () {
    var validatemail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!/^([A-Za-z0-9_\-.])+@(163.com|qq.com)$/.test(this.form.useremail)) {
        callback(new Error('请您输入正确的163邮箱或者qq邮箱'));
      } else {
        callback();
      }
    };
    var validatephone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.userphonenumber))) {
        callback(new Error('请您输入正确的手机号码'));
      } else {
        callback();
      }
    };
		var validatePwdNow = (rule, value, callback) => {
			if(value === ''){
				callback(new Error('请输入原有密码'));
			}else if(value!=this.$store.state.pwd){
				callback(new Error('请输入正确的密码'));
			}else{
				callback();
			}
		};
    var validatePwdNew=(rule,value,callback)=>{
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return{
			mode:"info",
			submode:"fromMe",
			menu1ChoosenOptionSytle:{
				"background-color": "#d2dede",
				"color": "#4169e1"
			},
			form:{},
			fPage:0,
			fVolume:6,
			deleleFavorites:new Array(),
			deleteNum:0,
			tobeCancelled:[],
			isEditMode:false,
			rules:{
			  useremail:[{validator: validatemail, trigger: 'blur'}],
			  userphonenumber:[{validator: validatephone, trigger: 'blur'}],
			},
			isPWDChangeMode:false,
			form2:{
				"pwdNow":"",
				"pwdNew":""
			},
			rules2:{
				pwdNow:[{validator: validatePwdNow, trigger:'blur'}],
				pwdNew:[{validator: validatePwdNew, trigger: 'blur' },{min:6,max:18,message:'长度应当在6到18个字符',trigger: 'blur'}]
			},
			rules3:{
			  goodname:[{required: true, message: '请输入商品标题', trigger: 'blur' },{min: 5, max: 36, message: '长度在 5 到 36 个字符之间', trigger: 'blur'}],
			  gooddescription:[{required:true,message:'请输入商品描述',trigger:'blur'},{min:10,max:200,message: '长度在10到200个字符之间',trigger: 'blur'}],
			  goodprice:[{required:true,message:'请输入商品价格',trigger:'blur'}]
			},
			intentions:[],
			receivedintentions:[],
			favorites:[],
			Isold:[],
			Ibought:[],
			goods:[],
			goodEditing:false,
			form3:{},
			rules3:{},
			goodTagsEditing:false,
			goodTagInput:'',
			tagsEditHistory:[],
			goodEdited:{},
    }
  },
  computed:{
    getUseravatar(){
      return this.$store.state.useravatar
    },
		isMode(){
			return(pattern)=>{
				return pattern==this.mode
			}
		},
		isMode2(){
			return(pattern)=>{
				return pattern==this.submode
			}
		},
		isChoosen(){
			return(pattern)=>{
				if(this.isMode(pattern)){
					return this.menu1ChoosenOptionSytle
				}
				return {}
			}
		},
		isChoosen2(){
			return(pattern)=>{
				if(this.isMode2(pattern)){
					return this.menu1ChoosenOptionSytle
				}
				return {}
			}
		},
		loadDone(){
			return this.$store.state.loadUserdataDone;
		}
  },
  watch:{
    getUseravatar(val){
      this.userdata.useravatarurl=val;
    },
		loadDone(val){
			if(val==true){
				var vm=this;
				new Promise((resolve,reject)=>{
					vm.intentions=vm.$store.state.intentions;
					vm.receivedintentions=vm.$store.state.receivedintentions;
					vm.favorites=vm.$store.state.favorites;
					vm.Isold=vm.$store.state.Isold;
					vm.Ibought=vm.$store.state.Ibought;
					vm.goods=vm.$store.state.goods;
					vm.intentions.reverse();
					vm.receivedintentions.reverse();
					vm.goods.reverse();
					vm.Isold.reverse();
					vm.Ibought.reverse();
					resolve();
				}).then(()=>{
					vm.completeIntentions();
				})
				this.$store.commit('prepareforUserdataReload');
			}
		}
  },
  created:function (){
			this.$store.commit('loadUserdataFromLocalStorage');
			this.$store.commit('loadUserspaceFromNet');
			this.form=JSON.parse(JSON.stringify(this.$store.state.userdata));//深拷贝
			this.form.usersex=this.form.usersex==0?'0':'1';
			//console.log(this.$store.state.favorites.length);
  },
  methods:{
    changeAvatar:function (){
      this.$refs.avatar.toggleShow();
			},
    modeTo:function(pattern){
			this.mode=pattern; 
		},
    submodeTo:function(pattern){
			this.submode=pattern; 
		},
		recordCancel:function(goodid,index){
			var url='http://123.56.42.47:10492/removeFavorite';
			this.axios.post(url+'/'+goodid,null,{
					headers:{'Authorization':this.$store.state.Authorization}
			}).then((response)=>{
				this.favorites.splice(index,1);
			})
		 this.$message(
			{
				message: '取消收藏成功',
				type: 'success',
				offset: 50
			});
		},
		recordDelete:function(needid){
			var url='http://123.56.42.47:10492/deleteNeed';
			this.axios.post(url+'/'+needid,null,{
					headers:{
						'Authorization':this.$store.state.Authorization
					}
				})
		 this.$message(
			{
				message: '删除需求成功',
				type: 'success',
				offset: 50
			});
		},
		deleteGood:function(goodid){
			var url='http://123.56.42.47:10492/deleteGood';
			this.axios.post(url+'/'+goodid,null,{
				headers:{'Authorization':this.$store.state.Authorization},
			})
		 this.$message(
			{
				message: '删除商品成功',
				type: 'success',
				offset: 50
			});
		},
		editGood:function(goodid,index){
			this.form3=JSON.parse(JSON.stringify(this.goods[index]));
			if(this.form3.goodtags===null) this.form3.goodtags=[];
			this.goodEditing=true;
			this.goodEdited={"goodid":goodid,"index":index};
			this.$nextTick(()=>{
				this.$refs.ruleForm3.resetFields();
			})
			//console.log('?');
		},
		handleClose1:function(index){
			this.tagsEditHistory.push({"tag":this.form3.goodtags[index],"type":0});
			this.form3.goodtags.splice(index,1);
		},
		showInput(){
		  this.goodTagsEditing = true;
		  this.$nextTick(_ => {
				this.$refs.saveTagInput1.$refs.input.focus();
		  });
		},
		handleInputConfirm(){
		  let inputValue=this.goodTagInput;
		  if (inputValue){
				var repeat=false;
				for(var i=0;i<this.form3.goodtags.length;i++)
					if(this.form3.goodtags[i]==inputValue){
						repeat=true;
						break;
					}
		    if(!repeat){
					this.tagsEditHistory.push({"tag":inputValue,"type":1});
					this.form3.goodtags.push(inputValue);
				}
		  }
		  this.goodTagsEditing=false;
		  this.goodTagInput='';
		},
		cancelGoodEdit:function(){
			this.goodEditing=false;
			this.form3={},
			this.tagsEditHistory=[],
			this.goodTagsEditing=false;
			this.goodTagInput='';
		},
		confirmGoodEdit:function(){
			this.$refs.ruleForm3.validate(valid=>{
				if(valid){
					//console.log(valid);
					var url='http://123.56.42.47:10492/editGood';
					if(this.form3.goodname!=this.goods[this.goodEdited.index].goodname)
						this.axios.post(url+'/'+this.goodEdited.goodid+'/name',null,{
							params:{newname:this.form3.goodname},
							headers:{'Authorization':this.$store.state.Authorization}
						})
					if(this.form3.goodprice!=this.goods[this.goodEdited.index].goodprice)
						this.axios.post(url+'/'+this.goodEdited.goodid+'/price',null,{
							params:{newprice:this.form3.goodprice},
							headers:{'Authorization':this.$store.state.Authorization}
						})
					if(this.form3.gooddescription!=this.goods[this.goodEdited.index].gooddescription)
						this.axios.post(url+'/'+this.goodEdited.goodid+'/description',null,{
							params:{newdescription:this.form3.gooddescription},
							headers:{'Authorization':this.$store.state.Authorization}
						})
					this.postTagsEdit(this.goodEdited.goodid,0,0);
					this.$set(this.goods,this.goodEdited.index,this.form3);
					//console.log(this.goods[this.goodEdited.index]);
					this.goodEditing=false;
					this.form3={},
					this.goodTagsEditing=false;
					this.goodTagInput='';
					this.goodEdited={};
				}
			})
		},
		postTagsEdit:function(id,index,type){
			if(index==this.tagsEditHistory.length){
				this.tagsEditHistory=[];
				return;
			}
			var urlAdd=type==0?"http://123.56.42.47:10492/good/addTag":"http://123.56.42.47:10492/need/addTag",
				urlDelete=type==0?"http://123.56.42.47:10492/good/deleteTag":"http://123.56.42.47:10492/need/deleteTag",
				vm=this;
			this.axios.post(this.tagsEditHistory[index].type==0?urlDelete:urlAdd,null,{
				params:type==0?{goodid:id,tag:this.tagsEditHistory[index].tag}:{needid:id,tag:this.tagsEditHistory[index].tag},
				headers:{'Authorization':this.$store.state.Authorization}
			}).then((response)=>{vm.postTagsEdit(id,index+1,type)})
		},
		sellerConfirm:function(orderid,index){
			var url='http://123.56.42.47:10492/sellerconfirm';
			this.axios.post(url+'/'+orderid,null,{
				headers:{'Authorization':this.$store.state.Authorization}
			})
			var temp=this.Isold[index];
			temp.order.sellerconfirm=1;
			this.$set(this.Isold,index,temp);
		},
		buyerConfirm:function(orderid,index){
			var url='http://123.56.42.47:10492/buyerconfirm';
			this.axios.post(url+'/'+orderid,null,{
				headers:{'Authorization':this.$store.state.Authorization}
			})
			var temp=this.Ibought[index];
			temp.order.buyerconfirm=1;
			this.$set(this.Ibought,index,temp);
		},
		postSellerComment:function(comment,rate,orderid,index){
			console.log('seller comment: '+comment+', '+rate+', '+orderid);
			var url='http://123.56.42.47:10492/sellercomment';
			this.axios.post(url+'/'+orderid,null,{
				params:{content:comment,rank:rate},
				headers:{'Authorization':this.$store.state.Authorization}
			})
			var temp=this.Isold[index];
			temp.order.sellercommentid=1;
			temp.sellercomment={"commentcontent":comment,"commentrank":rate};
			this.$set(this.Isold,index,temp);
		},
		postBuyerComment:function(comment,rate,orderid,index){
			console.log('buyer comment: '+comment+', '+rate+', '+orderid);
			/*var url='http://123.56.42.47:10492/buyercomment';
			this.axios.post(url+'/'+orderid,null,{
				params:{content:comment,rank:rate},
				headers:{'Authorization':this.$store.state.Authorization}
			})*/
			var temp=this.Ibought[index];
			temp.order.buyercommentid=1;
			temp.buyercomment={"commentcontent":comment,"commentrank":rate};
			this.$set(this.Ibought,index,temp);
		},
		completeIntentions:function(){
			var urlGood='http://123.56.42.47:10492/goodInfo',urlUser='http://123.56.42.47:10492/userinfo',
				vm=this;
			/*for(var i=0;i<this.Isold.length;i++)
				console.log(this.Isold[i].order);*/
			//console.log('completeIntentions '+this.intentions.length+' '+this.receivedintentions.length);
			for(var i=0;i<this.receivedintentions.length;i++){
				if(this.receivedintentions[i].intention.intentionstatus!=0)
				{
					//console.log('已处理： '+this.receivedintentions[i].intentionid);
					this.receivedintentions.splice(i,1);
					i--;
					continue;
				}
			}
		},
		acceptIntention: function(intentionid,index){
			console.log('accept');
			var urlDeal='http://123.56.42.47:10492/deal';
			this.axios.post(urlDeal+'/'+intentionid,null,{
				headers:{'Authorization':this.$store.state.Authorization}
			})
			var temp=this.receivedintentions[index];
			temp.intention.intentionstatus=1;
			this.$set(this.receivedintentions,index,temp);
			/*var urlDelete='http://123.56.42.47:10492/deleteGood';
			this.axios.post(urlDelete+'/'+goodid,null,{
				headers:{'Authorization':this.$store.state.Authorization},
			})
		 this.$message(
			{
				message: '已成交，自动删除商品',
				type: 'success',
				offset: 50
			});*/
		},
		refuseIntention: function(intentionid,index){
			console.log('refuse');
			var url='http://123.56.42.47:10492/reject';
			this.axios.post(url+'/'+intentionid,null,{
				headers:{'Authorization':this.$store.state.Authorization}
			})
			var temp=this.receivedintentions[index];
			temp.intention.intentionstatus=-1;
			this.$set(this.receivedintentions,index,temp);
		},
		deleteIntention: function(intentionid,index){
			console.log('delete');
			var url='http://123.56.42.47:10492/deleteIntention';
			this.axios.post(url+'/'+intentionid,null,{
				headers:{'Authorization':this.$store.state.Authorization}
			})
			this.intentions.splice(index,1);
		},
		enterEditMode: function(){
			console.log('enter edit mode');
			this.isEditMode=true;
		},
		leaveEditMode: function(){
			console.log('leave edit mode');
			this.isEditMode=false;
			this.form=JSON.parse(JSON.stringify(this.$store.state.userdata));
			this.form.password='';
			this.form.usersex=this.form.usersex==0?'0':'1';
			this.$refs.ruleForm.resetFields();
		},
		saveEdit: function(){
			console.log('save edit');
			this.$refs.ruleForm.validate(valid=>{
				if(valid){
					this.isEditMode=false;
					this.postEdit();
				}
				else{
					console.log('error submit');
					return false;
				}
			})
		},
		postEdit: function(){
			var urlSexChange='http://123.56.42.47:10492/user/updateSex';
			var urlEmailChange='http://123.56.42.47:10492/user/updateEmail';
			var urlPhonenumChange='http://123.56.42.47:10492/user/updatePhone';
			var vm=this;
			//console.log('form: '+this.form.usersex);
			postSex();
			function postSex()
			{
				if(vm.form.usersex!=vm.$store.state.userdata.usersex)
				{
					console.log('sex changed');
					vm.axios.post(urlSexChange,null,
						{
							params:{sex:vm.form.usersex},
							headers:{'Authorization':vm.$store.state.Authorization}
						}
					).then((response)=>{postEmail()})
				}
				else postEmail();
			}
			function postEmail()
			{
				if(vm.form.useremail!=vm.$store.state.userdata.useremail){
					console.log('email changed');
					vm.axios.post(urlEmailChange,null,
						{
							params:{email:vm.form.useremail},
							headers:{'Authorization':vm.$store.state.Authorization}
						}
					).then((response)=>{postPhonenum()})
				}
				else postPhonenum();
			}
			function postPhonenum()
			{
				if(vm.form.userphonenumber!=vm.$store.state.userdata.userphonenumber){
					console.log('phonenum changed');
					vm.axios.post(urlPhonenumChange,null,
						{
							params:{phone:vm.form.userphonenumber},
							headers:{'Authorization':vm.$store.state.Authorization}
						}
					).then((response)=>{vm.reloadUserData()})
				}
				else vm.reloadUserData();
			}
			console.log('post!');
		},
		reloadUserData: function(){
      var url='http://123.56.42.47:10492/WhoAmI'
			var vm=this;
			if(vm.form.usersex==vm.$store.state.userdata.usersex&&vm.form.useremail==vm.$store.state.userdata.useremail&&vm.form.userphonenumber==vm.$store.state.userdata.userphonenumber)
				return;
      this.axios.get(url,{
        headers:{
          'Authorization':this.$store.state.Authorization
        }
      }).then(response=>{
				var data=response.data.WhoAmI;
				//console.log('response: '+data.usersex);
        data.useravatarurl='http://123.56.42.47:10492'+data.useravatarurl;
        this.$store.commit("saveuserinfo",data);
      }).then(function(){
				vm.form=JSON.parse(JSON.stringify(vm.$store.state.userdata));
				vm.form.usersex=vm.form.usersex==0?'0':'1';
			})
		},
		enterPWDChangeMode:function(){
			this.isPWDChangeMode=true;
		},
		leavePWDChangeMode:function(){
			this.form2.pwdNow="";
			this.form2.pwdNew="";
			this.$refs.ruleForm2.resetFields();
			this.isPWDChangeMode=false;
		},
		savePWDChangeMode:function(){
			this.$refs.ruleForm2.validate(valid=>{
				if(valid){
					console.log('valid change');
					this.isPWDChangeMode=false;
					this.postPWDChange();
				}
				else{
					console.log('error submit');
					return false;
				}
			})
		},
		postPWDChange:function(){
			var urlPWDChange='http://123.56.42.47:10492/user/updatePWD';
			var vm=this;
			this.axios.post(urlPWDChange,null,{
				params:{password:this.form2.pwdNew},
				headers:{'Authorization':this.$store.state.Authorization}
			}).then((response)=>{
				var pwd=this.form2.pwdNow;
				if(response.data.msg==200)
				{
					this.$message({message:'修改密码成功',type:'success'});
					pwd=this.form2.pwdNew;
				}
				else this.$message({message:'修改不成功，好像哪里有问题'});
				return pwd;
			}).then((pwd)=>{
				vm.$store.commit('savePWD',pwd);
				return;
			}).then(()=>{
				vm.leavePWDChangeMode();
			})
		}
  }
}
</script>

<style scoped>
@import "../assets/userInformation.css";
</style>
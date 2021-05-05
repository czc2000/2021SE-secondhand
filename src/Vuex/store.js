import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex)

const state = {
	Authorization: null,
	login: null,
	userid: null,
	useravatar:null,
	userdata: null,
	needs: null,
	favorites: null,
	receivedintentions: null,
	goods: null,
	intentions: null,
	pwd:null
}
const mutations = {
	saveAu(state,Au) {
		state.Authorization=Au;
		window.localStorage.setItem('Authorization',state.Authorization);
	},
	savePWD(state,PWD){
		state.pwd=PWD;
		window.localStorage.setItem('pwd',state.pwd);
	},
	loginout(state){
		state.Authorization=null;
		state.useravatar=null
		state.login=false;
		state.userid=null,
		state.pwd=null,
		window.localStorage.removeItem('Authorization');
		window.localStorage.removeItem('useravatar');
		window.localStorage.removeItem('userdata');
		window.localStorage.removeItem('userid');
		window.localStorage.removeItem('pwd');
	},
	saveuserinfo(state,userdata_){
		state.useravatar=userdata_.useravatarurl;
		window.localStorage.setItem('useravatar',state.useravatar);
		state.userid=userdata_.userid;
		window.localStorage.setItem('userid',state.userid);
		state.login=true;
		state.userdata=userdata_;
		//向localStorage中存放对象
		window.localStorage.setItem('userdata',JSON.stringify(state.userdata));
	},
	saveAuthorization(state,Au){
		state.Authorization=Au;
	},
	uploaduseravatar(state,useravatar_){
		state.useravatar=useravatar_;
		window.localStorage.setItem('useravatar',state.useravatar);
		state.userdata.useravatarurl=useravatar_;
		window.localStorage.setItem('userdata',JSON.stringify(state.userdata));
	},
	loadFromLocalStorage(state){
		state.Authorization=window.localStorage.getItem('Authorization');
		state.useravatar=window.localStorage.getItem('useravatar');
		state.userid=window.localStorage.getItem('userid');
		state.pwd=window.localStorage.getItem('pwd');
		//从localStorage中读取对象(只在个人信息页面才需要，故取消)
		//state.userdata=JSON.parse(window.localStorage.getItem('userdata'));
		//调试信息 console.log('from loadFromLocalStorage\n');
	},
	checkAuValidity(state){
		if(state.Authorization!=null){
			var WhoAmI='http://123.56.42.47:10492/WhoAmI';
			axios.get(WhoAmI,{
				headers: {
					'Authorization': state.Authorization
				}
			}).then(response => {
				//console.log('from store_checkAuValidity:\n');
				if(typeof(response.data.WhoAmI.userid)!="undefined"){
					state.login=true;
				}
				else{
					state.login=false;
					this.commit('loginout');
				}
				//console.log('store.state.Authorization='+state.Authorization+'\nstore.state.useravatar='+state.useravatar+'\nstore.state.login='+state.login);
			})
		}
	},
	loadUserdataFromLocalStorage(state){
		state.userdata=JSON.parse(window.localStorage.getItem('userdata'));
	},
	loadUserspaceFromNet(state){
		var space='http://123.56.42.47:10492/space';
		axios.get(space,{
			headers: {
				'Authorization': state.Authorization
			}
		}).then(response=>{
			//console.log(response.status);
			if(response.status==200){
				state.needs=response.data.needs;
				state.favorites=response.data.favorites;
				state.receivedintentions=response.data.receivedintentions;
				state.goods=response.data.goods;
				state.intentions=response.data.intentions;
				//console.log(state.favorites.length);
			}
		})
	}
}
export default new Vuex.Store({
	state,
	mutations
})
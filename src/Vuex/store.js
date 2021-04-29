import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex)

const state = {
		Authorization: null,
    useravatar:null,
		login: null,
		userdata: null
}
const mutations = {
    saveAu(state,Au) {
        state.Authorization=Au;
    },
    loginout(state){
        state.Authorization=null;
        state.useravatar=null
				state.login=false;
        window.localStorage.removeItem('Authorization');
				window.localStorage.removeItem('useravatar');
				window.localStorage.removeItem('userdata');
    },
    saveuserinfo(state,userdata_){
        state.useravatar=userdata_.useravatarurl;
				window.localStorage.setItem('useravatar',state.useravatar);
				state.login=true;
				window.localStorage.setItem('Authorization',state.Authorization);
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
				//从localStorage中读取对象
				state.userdata=JSON.parse(window.localStorage.getItem('userdata'));
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
						if(!(response.data.status==-1)){
							state.login=true;
						}
						else{
							state.login=false;
							commit(loginout);
						}
						//console.log('store.state.Authorization='+state.Authorization+'\nstore.state.useravatar='+state.useravatar+'\nstore.state.login='+state.login);
					})
				}
		}
}
export default new Vuex.Store({
    state,
    mutations
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
		Authorization: null,
    useravatar:null
}
const mutations = {
    login(state,Au) {
        state.Authorization=Au;
        window.localStorage.setItem('Authorization',Au);
    },
    loginout(state){
        state.Authorization=null;
        state.useravatar=null
        window.localStorage.removeItem('Authorization');
				window.localStorage.removeItem('useravatar');
    },
    saveuserinfo(state,useravatar){
        state.useravatar=useravatar;
				window.localStorage.setItem('useravatar',useravatar);
    },
		loadFromLocalStorage(state){
				state.Authorization=window.localStorage.getItem('Authorization');
				state.useravatar=window.localStorage.getItem('useravatar');
				//console.log('load '+state.useravatar+'\n');
		},
		saveAuthorization(state,Au){
				state.Authorization=Au;
		}
}
export default new Vuex.Store({
    state,
    mutations
})

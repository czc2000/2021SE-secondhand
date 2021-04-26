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
        window.sessionStorage.setItem('Authorization',Au);
    },
    loginout(state){
        state.Authorization=null;
        state.useravatar=null
        window.sessionStorage.removeItem('Authorization');
    },
    saveuserinfo(state,useravatar){
        state.useravatar=useravatar;
    }
}
export default new Vuex.Store({
    state,
    mutations
})

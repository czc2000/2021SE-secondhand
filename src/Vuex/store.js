import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    Authorization: null
}
const mutations = {
    login(state,Au) {
        state.Authorization=Au;
    }

}
export default new Vuex.Store({
    state,
    mutations
})

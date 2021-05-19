//配置路由信息
import  Vue from 'vue'
import VueRouter from "vue-router";
import login from "@/components/login";
import Home from "@/components/Home";
import register from "@/components/register";
import store from "@/Vuex/store";
import userInformation from "@/components/userInformation";
import needPost from "@/components/needPost";
import goodPost from "@/components/goodPost";
import { Message } from 'element-ui';
import goodsZone from "@/components/goodsZone";
import GoodShowPage from "@/components/GoodShowPage";
import needsZone from "@/components/needsZone"
import NeedShowPage from "@/components/NeedShowPage";
import Carousel from "@/components/Carousel";
import LoginWithRegister from "@/components/LoginWithRegister";
import searchResult from "@/components/searchResult";
import messagePart from "@/components/messagePart";
Vue.use(VueRouter);
const routes=[
    {
      path:'',
      redirect:'/home'
    },
    {
        path:'/login',
        component:LoginWithRegister
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/register',
        component:LoginWithRegister
    },
    {
        path: '/userinfo',
        component: userInformation,
        meta:{
            requireAuth:true
        }
    },
    {
        path: '/needpost',
        component: needPost,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/goodpost',
        component: goodPost,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/goods',
        component: goodsZone
    },

    {
        path: '/goodinfo',
        component: GoodShowPage,
    },

    {
        path: '/needs',
        component: needsZone
    },
    {
        path:'/needinfo',
        component: NeedShowPage
    },
    {
        path: '/moduletest',
        component:null
    },

		{
				path: '/searchResult',
				component:searchResult
		}
]
const vueRouter = new VueRouter({
    routes,
    mode:'hash'
});
vueRouter.beforeEach((to,from,next)=>{
		if(store.state.Authorization===null){
			store.commit('loadFromLocalStorage');}
		store.commit('checkAuValidity');
    //console.log('from router: store.state.Authorization='+store.state.Authorization+'\nstore.state.useravatar='+store.state.useravatar);
    if(to.meta.requireAuth){
        let token=store.state.Authorization;
        if(token===null||token===''){
            Message({
                message: "请先登录哟",
                type: 'waring'
            })
            next('/login');
        }else{
            next();
        }
    }
    else{
        next();
    }
});
export default vueRouter;
//下面的代码作用是防止导航到当前有的页面时发生报错，具体原理暂未研究，目前来看表现就是取消导航
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
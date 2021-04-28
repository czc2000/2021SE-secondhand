//配置路由信息
import  Vue from 'vue'
import VueRouter from "vue-router";
import login from "@/components/login";
import Home from "@/components/Home";
import register from "@/components/register";
import store from "@/Vuex/store";
import userInformation from "@/components/userInformation";
import needPost from "@/components/needPost";
import { Message } from 'element-ui';
Vue.use(VueRouter);
const routes=[
    {
      path:'',
      redirect:'/home'
    },
    {
        path:'/login',
        component:login
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/register',
        component:register
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
    }
]
const vueRouter = new VueRouter({
    routes,
    mode:'hash'
});
vueRouter.beforeEach((to,from,next)=>{
    //store.loadFromLocalStorage();
		//store.state.Authorization=store.state.Authorization?store.state.Authorization:window.localStorage.getItem("Authorization");
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

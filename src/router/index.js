//配置路由信息
import  Vue from 'vue'
import VueRouter from "vue-router";
import login from "@/components/login";
import Home from "@/components/Home";
import register from "@/components/register";
import userSpace from "@/components/userSpace";
import store from "@/Vuex/store";
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
        path: '/userSpace',
        component: userSpace
    }
]
const vueRouter = new VueRouter({
    routes,
    mode:'history'
});
vueRouter.beforeEach((to,from,next)=>{
    if(to.path==='/login'||to.path==='/register'||to.path==='/home'||to.path==='/'){
        console.log(1);
        next();
    }
    else{
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
});
export default vueRouter;

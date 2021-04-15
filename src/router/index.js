//配置路由信息
import  Vue from 'vue'
import VueRouter from "vue-router";
import login from "@/components/login";
import Home from "@/components/Home";
import register from "@/components/register";
Vue.use(VueRouter);
const routes=[
    {
      path:'',
      redirect:'/Home'
    },
    {
        path:'/login',
        component:login
    },
    {
        path: '/Home',
        component: Home
    },
    {
        path: '/register',
        component:register
    }
]
export default new VueRouter({
    routes,
    mode:'history'
});
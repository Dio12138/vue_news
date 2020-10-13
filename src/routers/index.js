import VueRouter from "vue-router";
import Vue from "vue";
import config from "./config";
import store from "../store";

// 1.安装
Vue.use(VueRouter);

// 2.创建路由对象
var router = new VueRouter(config);

// 导航守卫，一些特定的页面不能直接输入地址路径就跳转，必须先登录
router.beforeEach(function(to,from,next){
    if(to.meta.auth){
        // 需要登录才能访问
        if(store.state.loginUser.isLoading) {
            next({name:"Auth",query:{returnurl:to.fullPath}});
        }else if (store.state.loginUser.data) {
            next();
        }else{
            next({name:"Login"});
        }
    }else{
        next();
    }
});

export default router;
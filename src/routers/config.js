import Home from "@/views/Home.vue";

// 路由配置
export default {
    routes: [
      {
        path:"/",
        name:"Home",
        // component: Home,
        // 懒加载
        // 要用什么组件就加载什么组件
        // 避免普通导入存在的问题：组件过多时就算只显示一个组件，但也会导入所有组件的代码
        component:()=>import("@/views/Home.vue"),
      },
      {
        path:"/login",
        name:"Login",
        component: ()=>import("@/views/Login.vue"),
      },
      {
        // 动态路由
        path:"/channel/:id",
        name:"Channel",
        component: ()=>import("@/views/ChannelNews.vue"),
      },
      {
        path:"/reg",
        name:"Reg",
        component: ()=>import("@/views/Reg.vue"),
      },
      {
        path:"*", // 匹配所有路径
        name:"404",
        component: ()=>import("@/views/NotFound.vue"),
      },
      {
        path:"/personal",
        name:"Personal",
        component: ()=>import("@/views/Personal.vue"),
        meta:{
          auth: true,
        }
      },
      {
        path:"/auth",
        name:"Auth",
        component: ()=>import("@/views/Auth.vue"),
      },
    ],
    mode:"history",
}
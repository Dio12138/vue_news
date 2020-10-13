import Vue from 'vue'
import App from './App.vue'
import "./assets/styles/global.css";
import "./assets/styles/reset.css";
import {getNewsChannels,getNews} from "./services/newsServices.js";
import router from "./routers/index";
import store from "./store/index";
import {login} from "./services/userService";

// 1：
login({
  loginId:"user",
  loginPwd:"123123",
}).then((resp) => {
  console.log(resp);
});

// 或者2：
// async function test(){
//   var resp = await login({
//     loginId:"user",
//     loginPwd:"123456",
//   });
//   console.log(resp);
// }
// test();

// 第一种使用方式：
// getNewsChannels().then((resp) => {
//   console.log(resp);
// });

// 第二种
// async function test(){
//   var resp = await getNewsChannels();
//   console.log(resp);
// };
// test();

// getNews("5572a108b3cdc86cf39001cd").then((resp) => {
//   console.log(resp);
// })

// 频道数据一开始就需要获取
// 这里dispatch已经触发了action，store中的state已经读到了数据，
// 所以后续组件要想用store里的数据，直接mapState映射一下就行了，就不用次次都去访问接口获取数据
store.dispatch("channels/fetchDatas");
// 防止用户登录后刷新页面，顶部信息显示没登录的状态
store.dispatch("loginUser/whoAmIAction");

new Vue({
  render: h => h(App),
  router,  // 3.配置路由到vue实例中
  store,   // 3.配置仓库到vue实例中
}).$mount('#app')

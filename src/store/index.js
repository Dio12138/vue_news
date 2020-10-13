import Vue from "vue";
import vuex from "vuex";
import channels from "./channels";
import loginUser from "./loginUser";

// 1.安装
Vue.use(vuex);
var store = new vuex.Store({
    // 2.配置
    modules:{
        channels,
        loginUser,
    }
});

export default store;   // 等同于vue实例中的this.$store
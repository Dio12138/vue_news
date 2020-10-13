<template>
  <div class="header">
    <div class="header-container">
      <div class="container">
        <div class="logo">
          <!-- 声明式导航 -->
          <!-- <router-link to="/"> -->
          <!-- 命名路由 -->
          <router-link :to="{name:'Home'}">
            <img src="../assets/logo.png" alt="">
          </router-link>
        </div>
        <ul class="nav">
            <li><router-link :to="{name:'Home'}">首页</router-link></li>
            <li v-if="isLoading">isLoading</li>
            <li v-for="item in data.slice(0,5)" :key="item.channelId">
              <router-link 
                :to="{
                  name:'Channel',
                  params: {
                    id:item.channelId,
                  },
                }">{{item.name}}</router-link>
            </li>
            <!-- <li>{{isLoading}}</li> -->
        </ul>
        <div class="user">
            <!-- 情况1：正在远程加载中 -->
            <span v-if="isLogining">loading...</span>
            <!-- 情况2：当前有用户登录 -->
            <!-- 这里的template标签仅仅是将两个a元素包在一起，没有其他任何作用 -->
            <template v-else-if="loginUser">
              <router-link :to="{name:'Personal'}">{{loginUser.nickname}}</router-link>
              <a href="" @click.prevent="handleLoginOut">退出</a>
            </template>
            <!-- 情况3：当前没有登录 -->
            <template v-else>
              <router-link :to="{name:'Login'}">登录</router-link>
              <router-link :to="{name:'Reg'}">注册</router-link>
            </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {getNewsChannels} from "../services/newsServices";
import { mapState } from "vuex";
// mapState("命名空间的名字","想要获取的数据"),返回一个对象,将store里的state映射到result里,供当前组件使用
// var result = mapState("channels",["data","isLoading"]);
export default {
  // 用store里的数据
  computed: {
    ...mapState("channels",["data","isLoading"]),
    // 将"data"和"isLoading"重命名，避免数据冲突
    ...mapState("loginUser",{
      loginUser:"data",
      isLogining:"isLoading",
    }),
  },
  methods: {
    handleLoginOut(){
      this.$store.dispatch("loginUser/loginOutAction");
      this.$router.push({name:"Login"});
    }
  }
  // 相当于：computed：{data:  , isLoading:  }

  // created(){
  //   setTimeout(()=>{
  //     // 派发action，获取数据
  //     this.$store.dispatch("channels/fetchDatas");
  //   },1000);
  // },
  // 直接获取数据
  // data() {
  //   return{
  //     channels:[],
  //   }
  // },
  // async created(){
  //   this.channels = await getNewsChannels();
  // }
}
</script>

<style scoped>
.header {
  height: 60px;
}
.header-container {
  height: 60px;
  background: #000;
  color: #fff;
  line-height: 60px;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
}
.container {
  display: flex;
}
.logo a {
  display: flex;
  align-items: center;
  height: 100%;
}
.logo img {
  width: 42px;
  height: 42px;
}
.nav {
  margin: 0 60px;
  display: flex;
  flex-grow: 1;
}
.nav a {
  display: block;
  padding: 0 30px;
}
.nav .router-link-exact-active {
  color: #fcb85f;
}
.user {
  font-size: 14px;
}
.user * {
  margin-left: 10px;
}
.header a {
  color: #fff;
}
</style>
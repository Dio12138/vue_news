<template>
<div>
    <Banner :banners="banners" :duration="duration"/>
    <Channels @change="handleChange"/>
    <Loading v-show="isLoading"/>
    <NewsList v-show="!isLoading" :news="news"/>
</div>
</template>

<script>
import Center from "../components/Center";
import Loading from "../components/Loading";
import NewsList from "../components/news/NewsList";
import Channels from "../components/news/Channels";
import Banner from "../components/Banner.vue";
// import banner1 from "../assets/banner/banner1.jpeg";
// import banner2 from "../assets/banner/banner2.jpeg";
// import banner3 from "../assets/banner/banner3.jpeg";
import { getNews } from '../services/newsServices';
export default {
  components: {
    Banner,
    Channels,
    NewsList,
    Loading,
    Center,
  },
  data(){
      return {
          banners: [
              {
                // url:banner1,
                url:require("../assets/banner/banner1.jpeg"),
                link:"https://duyi.ke.qq.com",
              },
              {
                // url:banner2,
                url:require("../assets/banner/banner2.jpeg"),
                link:"https://duyi.ke.qq.com",
              },
              {
                // url:banner3,
                url:require("../assets/banner/banner3.jpeg"),
                link:"https://duyi.ke.qq.com",
              },
          ],
          duration:4000,
          news: [],
          isLoading : true,
      }
  },
  methods: {
    async handleChange(channelId){
      this.isLoading = true;
      var resp =await getNews(channelId,1,10);
      console.log(resp);
      this.news = resp.contentlist;
      this.isLoading = false;
    }
  },
}
</script>

<style>

</style>
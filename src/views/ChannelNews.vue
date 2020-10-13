<template>
  <div>
    <div class="type-title">
      {{ channelName }}
    </div>
    <NewsList :news="news"/>
    <Loading v-if="isLoading"/>
    <!-- 接收到pageChange事件，调用handleChange函数 -->
    <Page :page="page" :limit="limit" :total="total" :panelNumber="panelNumber" @pageChange="handleChange"></Page>
  </div>
</template>

<script>
import Page from "../components/Page";
import NewsList from "../components/news/NewsList"
import * as newsServ from "../services/newsServices";
import Loading from "../components/Loading";
export default {
  components: {
      Page,
      NewsList,
      Loading,
  },
  data(){
    return {
      // channelName: "",
      limit:15,
      total:0,
      panelNumber: 10,
      news:[],
      isLoading:true,
    }
  },
  computed:{
    page(){
      return +this.$route.query.page || 1;
    },
    channelName(){
      var channels = this.$store.state.channels.data;
      if(channels.length > 0){
        var channel = channels.find((item) => item.channelId === this.$route.params.id);
        console.log(channel.name);
        return channel.name;
      }
      return "";
    }
  },
  methods: {
    // 处理事件传递过来的数据newPage
    handleChange(newPage){
      // 如何在代码中导航
      // 命令式导航
      // 1.
      // this.$router.push("?page="+newPage);
      // 2. (如果在当前页面内跳转，可以省略name: 和id:)
      this.$router.push({
        query:{
          page:newPage,
        },
      })
      this.setDatas();
    },
    // 设置频道名称
    // async setChannelName(){
    //   var channels = await newsServ.getNewsChannels();
    //   // ES6查找目标元素的find()函数：遍历查找元素，返回满足{}内条件的值，找不到返回undefined。
    //   // item：每一次迭代查找的数组元素
    //   // console.log(channels,this.$route);
    //   var channel = channels.find(item => {
    //     return item.channelId === this.$route.params.id;
    //   });
    //   console.log(channel);
    //   this.channelName = channel.name;
    // },
    // 设置所有新闻相关数据
    async setDatas(){
      this.isLoading = true;
      var resp = await newsServ.getNews(this.$route.params.id,this.page,this.limit);
      console.log(resp);
      this.news = resp.contentlist;
      this.total = resp.allNum;
      this.isLoading = false;
    }
  },
  // 监控某些数据的变化，当数据变化时要做一些事
  watch:{
    "$route.params.id":{
      immediate:true,  // 一开始的数据也要当作是一种变化，即一开始就要执行
      handler() {
        // this.setChannelName();
        this.setDatas();
      },
    },
  },
}
</script>

<style scoped>
.type-title{
  font-size: 2em;
  color: #888;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>
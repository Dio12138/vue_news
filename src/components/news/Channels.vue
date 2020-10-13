<template>
  <div class="news-types" v-if="data.length > 0">
      <div
        class="item"
        v-for="item in showChannels"
        :key="item.channelId"
        :class="{active:item.channelId === chooseId}"
        @click="switchTo(item.channelId)">
          <span class="name">{{item.name}}</span>
      </div>
      <!-- .prevent: 阻止事件的默认动作,这里是阻止a标签的默认刷新动作 -->
      <a href="" @click.prevent="isCollapse=!isCollapse">{{isCollapse?"展开":"收起"}}</a>
  </div>
</template>

<script>
import { getNewsChannels } from "../../services/newsServices";
import { mapState } from "vuex";

export default {
    data(){
        return{
            // channels: [],
            isCollapse: true, // 当前是否为折叠状态
            chooseId: null,
        };
    },
    computed:{
      // ...:对象展开：即把一个对象(数组)的元素全部加到另一个对象(数组)里
        ...mapState("channels",["data"]),
        // 需要显示的频道
        showChannels() {
            if(this.isCollapse){
                // 折叠状态
                return this.data.slice(0,8);
            }else{
                // 展开状态
                return this.data;
            }
        },
    },
    // async created(){
    //     var resp = await getNewsChannels();
    //     this.channels = resp;
    //     // 此时才有频道
    //     this.switchTo(this.channels[0].channelId);
    // },
    watch:{
      data:{
        immediate:true,
        handler() {
          if(this.data.length > 0){
          this.switchTo(this.data[0].channelId);
          }
        }
      },
    },
    methods: {
        switchTo(id){
            this.chooseId = id;
            // 我知道我的频道切换了，但，我不知道切换过后要干嘛？
            // 触发一个事件,让组件的使用者去搞定这件事
            this.$emit("change",this.chooseId);
        },
    },
};
</script>

<style scoped>
.news-types {
  margin: 30px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding-bottom: 15px;
}
.item {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 15px;
  margin: 7px 15px 7px 0;
  cursor: pointer;
  position: relative;
}
.item:hover {
  background: #ccc;
}
.item.active {
  background: #000;
  color: #fff;
}
.news-types a {
  align-self: flex-end;
  margin-bottom: 20px;
  color: #409eff;
}
</style>
  <!-- 模板 -->
<template>
    <div class="banner-container" @mouseenter="autoStop" @mouseleave="autoStart">
      <ul class="images"
      :style="{
        width:banners.length*100+'%',
        marginLeft: -index*100+'%',
      }">
        <li v-for="(item,i) in banners" :key="i">
          <a :href="item.link"><img :src="item.url" alt=""></a>
        </li>
      </ul>
      <ul class="dots">
        <li
          v-for="(item,i) in banners"
          :key="i"
          :class="{
            active:i === index,
          }"
          @click="index=i"></li>
      </ul>
    </div>
</template>

<script> 
// js代码
export default {
  props: {
    banners:{
      type: Array,
      required:true,
    },
    duration:{
      type:Number,
      default:2000,
    }
  },
  // 组件创建时执行
  created(){
    this.autoStart()
  },
  // 组件销毁时执行
  destroyed(){
    this.autoStop()
  },
  data(){
      return {
        index:0,
        timer:null,
      };
  },
  methods:{
    // 自动切换
    autoStart(){
      if(this.timer) {
        return;
      }
      this.timer = setInterval(() => {
        this.index = (this.index+1)%this.banners.length;
      },this.duration)
    },
    // 自动停止切换
    autoStop(){
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style scoped>
/* scoped：表示这里的样式只影响当前组件，不会影响到其他组件 */
/* 样式 */
.banner-container {
  height: 350px;
  position: relative;
  overflow: hidden;
}
.banner-container li {
  display: block;
  width: 1080px;
  height: 100%;
  float: left;
}
.images {
  height: 100%;
  transition: 0.5s;
}
.banner-container img{
    width: 1080px;
    height: 100%;
}
.dots {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
}
.dots li {
  width: 10px;
  cursor: pointer;
  height: 10px;
  margin: 0 3px;
  border-radius: 50%;
  border: 1px solid;
  color: #fff;
}
.dots li.active {
  background: #fff;
}
</style>
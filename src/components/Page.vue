<template>
  <div class="pager" v-if="total>0">
      <a href=""
        class="pager-item"
        :class="{disabled:page===1}"
        @click.prevent="handleChange(1)"
      >首页</a>
      <a href="" 
        class="pager-item"
        :class="{disabled:page===1}"
        @click.prevent="handleChange(page-1)"
      >上一页</a>
      <a href=""
        class="pager-item"
        v-for="n in numbers"
        :key="n"
        @click.prevent="handleChange(n)"
        :class="{active:n===page}"
        >{{n}}</a>
      <a href="" 
        class="pager-item"
        :class="{disabled:page===pageNumber}"
        @click.prevent="handleChange(page+1)"
      >下一页</a>
      <a href="" 
        class="pager-item"
        :class="{disabled:page===pageNumber}"
        @click.prevent="handleChange(pageNumber)"
      >尾页</a>
      <span class="pager-text">
          <i>{{page}}</i>
          /
          <i>{{pageNumber}}</i>
      </span>
  </div>
</template>

<script>
export default {
    props:{
        page: {
            // 当前页码
            type: Number,
            default: 1,
        },
        total:{
            // 总数据量
            type:Number,
            default: 0,
        },
        limit: {
            // 页容量：每页显示多少数据
            type: Number,
            default: 10,
        },
        panelNumber:{
            // 最多显示多少个数字页码
            type: Number,
            default: 10,
        }
    },
    computed: {
        pageNumber(){
            return Math.ceil(this.total/this.limit);   // 向上取整
        },
        minNumber(){
            var n =this.page-Math.floor(this.panelNumber/2);   // 向下取整
            if (n<1) {
                n = 1;
            }
            return n;
        },
        maxNumber(){
            var n = this.minNumber + this.panelNumber - 1;
            if(n > this.pageNumber){
                n = this.pageNumber;
            }
            return n;
        },
        numbers(){
            var num = [];
            for (let i = this.minNumber; i <= this.maxNumber; i++) {
                num.push(i);
            }
            return num;
        }
    },
    methods:{
        handleChange(newPage){
            if(newPage<1){
                newPage = 1;
            }else if(newPage>this.pageNumber){
                newPage = this.pageNumber;
            }
            if (newPage === this.page) {
                return;
            }
            // 触发事件,事件名为pageChange，传递的数据是newPage
            this.$emit("pageChange",newPage);
        }
    }
}
</script>

<style scoped>
.pager {
  text-align: center;
  margin: 20px 0;
}

.pager .pager-item {
  display: inline-block;
  padding: 5px 7px;
  border: 1px solid #ccc;
  margin: 8px;
  cursor: pointer;
  color: rgb(96, 96, 224);
}

.pager .pager-item.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.pager .pager-item.active {
  color: #f40;
  border: none;
  cursor: auto;
}
</style>
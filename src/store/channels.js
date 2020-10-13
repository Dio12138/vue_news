// channels的仓库数据
import {getNewsChannels} from "../services/newsServices";

export default {
    namespaced:true,  // 开启命名空间(别写到state里！！！)
    state:{
        data:[],
        isLoading:false,
    },
    mutations: {
        // 这里配置多种变异方式
        // state:原来的状态
        // payload：负荷，true或false
        setIsLoading(state,payload){
            state.isLoading = payload;
        },
        // payload：负荷，约定是一个数组
        setData(state,payload){
            state.data = payload;
        }
    },
    // 带有副作用的操作写在actions里
    actions:{
        async fetchDatas(context){
            // 设置isLoading为true
            // 在vuex中，提交mutation是数据变化的唯一原因，所以要改变数据，必须commit一个mutation
            // commit("要提交的mutation名",传入的payload数据)
            context.commit("setIsLoading",true);
            // 设置data为channels
            var channels = await getNewsChannels();
            context.commit("setData",channels);
            // 设置isLoading为false
            context.commit("setIsLoading",false);
        },
    }
};
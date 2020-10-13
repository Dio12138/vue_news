// 远程获取新闻和新闻类别的数据
import axios from "axios";
import { APPCODE } from "./config.js";
// 获取所有的新闻类别
// async、await : ES7的知识，表示异步函数里面可能会有等待
export async function getNewsChannels(){
  var resp =  await axios.get("http://ali-news.showapi.com/channelList",{
    headers:{
        Authorization: `APPCODE ${APPCODE}`,
    },
  });
  return resp.data.showapi_res_body.channelList;
};

/**
*按照频道，分页获取新闻
*@param {*} channelId 频道id
*@param {*} page 页码，从1开始
*@param {*} limit 每页多少条数据
*/
export async function getNews(channelId,page=1,limit=10){
    var resp = await axios.get("http://ali-news.showapi.com/newsList",{
        headers: {
            Authorization: `APPCODE ${APPCODE}`,
        },
        params: {
            channelId,
            page,
            maxResult: limit,
            needAllList: false,
            needContent: 1,
        },
    });
    return resp.data.showapi_res_body.pagebean;
};
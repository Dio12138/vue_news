import axios from "axios";

// 登录
export async function login(loginInfo){
    // 接口(post)：http://study.yuanjin.tech/api/user/login
    var resp = await axios.post("/api/user/login",loginInfo);
    var token = resp.headers.authorization;  // 拿到服务器令牌
    console.log(token);
    if(token){
        localStorage.setItem("token",token);
    }
    return resp.data;
};

// 使用保存过的令牌从服务器换取登录信息
export async function whoAmI(){
    // GET  http://study.yuanjin.tech/api/user/whoami
    // authorization: bearer tokenxxxx
    var token = localStorage.getItem("token");
    if(!token){
        return null;
    }
    var resp = await axios.get("/api/user/whoami",{
        headers: {
            authorization: `bearer ${token}`,
        },
    });
    // 返回用户的登录信息
    return resp.data.data;
};

// 注销
export async function loginOut(){
    localStorage.removeItem("token");
};

// 注册用户
export async function reg(userInfo){
    var resp = await axios.post("/api/user/reg",userInfo);
    return resp.data;
}
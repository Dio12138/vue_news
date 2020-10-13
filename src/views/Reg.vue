<template>
  <Center>
    <form action="" class="login-container" @submit.prevent="handleSubmit">
        <div class="form-item">
          <div class="input">
            <label>账号：</label>
            <input type="text" v-model="userInfo.loginId" @input="validateEmpty('loginId','账号不能为空')">
          </div>
          <FormError :msg="error.loginId"></FormError>
        </div>
        <div class="form-item">
          <div class="input">
            <label>密码：</label>
                                    <!-- 设置每次进入登录界面时输入栏为空 -->
            <input type="password" v-model="userInfo.loginPwd" autocomplete="new-password" @input="validateEmpty('loginPwd','密码不能为空')">
          </div>
          <FormError :msg="error.loginPwd"></FormError>
        </div>
        <div class="form-item">
          <div class="input">
            <label>重复密码：</label>
            <input type="password" v-model="userInfo.pwdAgain" autocomplete="new-password" @input="validatePwdAgain">
          </div>
          <FormError :msg="error.pwdAgain"></FormError>
        </div>
        <div class="form-item">
          <div class="input">
            <label>昵称：</label>
            <input type="text" v-model="userInfo.nickname" autocomplete="new-password" @input="validateEmpty('nickname','昵称不能为空')">
          </div>
          <FormError :msg="error.nickname"></FormError>
        </div>
        <div class="form-item">
          <div class="input">
            <label></label>
            <button>注册</button>
          </div>
          <FormError :isCenter="true" :msg="error.serve"></FormError>
        </div>
      </form>
  </Center>
</template>

<script>
import Center from "../components/Center";
import FormError from "../components/FormError";
import { reg } from "../services/userService";

export default {
  components: {
      Center,
      FormError,
  },
  data(){
    return {
      userInfo: {
        loginId:"",
        loginPwd:"",
        pwdAgain:"",
        nickname:"",
      },
      error:{
        loginId:"",
        loginPwd:"",
        pwdAgain:"",
        nickname:"",
        serve:"",
      },
    }
  },
  methods: {
    validateEmpty(field,msg){
      if(this.userInfo[field]){
        this.error[field]="";
        return true;
      }else{
        this.error[field]=msg;
        return false;
      }
    },
    validatePwdAgain(){
      var result = this.validateEmpty("pwdAgain","重复密码不能为空");
      if(result){
        if(this.userInfo.loginPwd !== this.userInfo.pwdAgain){
          this.error.pwdAgain = "两次密码不一致";
          return false;
        }
        return true;
      }
      return false;
    },
    async handleSubmit(){
        if(this.validateEmpty("loginId","账号不能为空") &&
      this.validateEmpty("loginPwd","密码不能为空") &&
      this.validatePwdAgain &&
      this.validateEmpty("nickname","请输入昵称")) {
        var resp = await reg(this.userInfo);
        if(resp.data){
            alert("注册成功!!!");
          this.$router.push({
              name:"Login",
          });
          return true;
        }else{
            this.error.loginId = resp.msg;
          return false;
        }
      }
      return false;
    },
  },
}
</script>

<style scoped>
.login-container {
  width: 400px;
}
.form-item .error.text-center {
  text-align: center;
}
.form-item .input {
  display: flex;
}
.form-item label {
  width: 100px;
  display: inline-block;
  text-align: right;
  line-height: 41px;
}
.form-item .error {
  font-size: 14px;
  color: #a44242;
  padding-left: 100px;
  height: 30px;
  line-height: 30px;
}
.form-item input,
.form-item button {
  flex-grow: 1;
}
</style>
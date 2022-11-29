<template>
  <div class="login">
    <img
      src="../assets/img/login_head.png?imageView2/1/w/375/h/190/q/75"
      alt=""
    />
    <div class="login-box">
      <input class="text" type="text" placeholder="账号" v-model="username" />
      <input type="password" placeholder="密码" v-model="password" />
      <input
        class="btn"
        @click="
          loginHandler();
          login();
        "
        type="submit"
        value="登录"
      />
    </div>
    <div class="qt">其他方式登录</div>
    <div class="fs">
      <img src="../assets/img/bubble_wechat.png" alt="" />
      <img src="../assets/img/bubble_qq.png" alt="" />
      <img src="../assets/img/bubble_weibo.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginHandler: function () {
      console.log("登录");
      console.log(localStorage.token);
    },
    login() {
      if (this.username.length >= 1 && this.password.length >= 1) {
        // 登录成功
        // 1. 存储 token
        // console.log("cg");
        localStorage.setItem("token", "mople 123");
        // 2. 跳转到后台主页
        this.$router.push("/users");
        this.$router.go(0);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  // display: flex;
  // align-items: center;
}
.pic {
  width: 45rem;
}
.login-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10rem auto;
  input {
    width: 200rem;
    height: 30rem;
    margin: 10rem 0;
  }
  .btn {
    color: #fff;
    background-color: rgb(124, 124, 124);
  }
}
.qt {
  text-align: center;
  margin-top: 40rem;
  color: #999;
}
.fs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rem;
  padding: 15rem;
  img {
    width: 40rem;
    height: 40rem;
  }
}
</style>
<template>
  <div class="user">
    <div class="prom">
      <div class="pic-img">
        <img class="top-pic" src="../assets/img/indi_head_day.png" alt="" />
      </div>
      <img class="dl" src="../assets/img/sign_up.png" alt="" @click="dengl()" />
      <div class="content">
        <div class="zc">还没有账号？立即注册</div>
        <div class="bt">
          <van-checkbox v-model="checked"></van-checkbox>
          我已阅读并同意 <span>《用户服务协议》</span>和<span
            >《隐私政策》</span
          >
        </div>
      </div>
      <div class="qt">其他方式登录</div>
      <div class="fs">
        <img src="../assets/img/bubble_wechat.png" alt="" />
        <img src="../assets/img/bubble_qq.png" alt="" />
        <img src="../assets/img/bubble_weibo.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data: function () {
    return {
      checked: false,
    };
  },
  methods: {
    dengl: function () {
      if (this.checked == true) {
        this.$router.push({ path: "./login" });
      } else {
        Dialog.alert({ title: "请同意对应协议和政策" });
      }
    },
  },
};
</script>

<style lang="less">
div {
  .pic-img {
    width: 100%;
    height: 200rem;
    margin-bottom: 150rem;
  }
  .dl {
    width: 80rem;
    height: 80rem;
  }
  .content {
    text-align: center;
    .zc {
      font-weight: bold;
      margin: 10rem 0;
    }
    .bt {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 10rem;
        height: 10rem;
        margin-right: 5rem;
      }
      span {
        font-weight: bold;
      }
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
}
</style>
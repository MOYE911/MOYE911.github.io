<template>
  <div class="writer">
    <h2>热门作者</h2>
    <div
      class="user-box"
      v-for="(writer, index) in writers"
      :key="index"
      @click="
        $router.push({
          path: '/writer',
          query: { id: writer.user_id },
        });
        Navshow();
      "
    >
      <img :src="writer.web_url" alt="" />
      <div class="title">
        <h3>{{ writer.user_name }}</h3>
        <span>{{ writer.summary }}</span>
      </div>
      <div class="btn">
        <button>关注</button>
      </div>
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      writers: "",
      guanz: true,
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navshow"]),
    getWriter() {
      this.loading = true;
      this.axios.get("https://apis.netstart.cn/one/author/hot").then((res) => {
        this.writers = res.data.data;
        this.loading = false;
      });
    },
    getGuanz() {
      this.guanz = !this.guanz;
    },
  },
  created: function () {
    this.getWriter();
  },
};
</script>
<style lang="less">
.writer {
  padding: 0 10rem;
  h2 {
    text-align: left;
    margin-bottom: 10rem;
    color: #999;
    font-size: 16rem;
  }
  .user-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rem;
    .btn {
      width: 15%;
    }
    button {
      background-color: #fff;
      border-radius: 15rem;
    }
    img {
      width: 40rem;
      height: 40rem;
      border-radius: 50%;
    }
    .title {
      margin-left: 10rem;
      text-align: left;
      h3 {
        font-size: 14rem;
      }
      span {
        display: block;
        width: 200rem;
        font-size: 12rem;
        color: #dcdcdc;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.locadingmask {
  position: fixed;
  top: 40rem;
  left: 0;
  width: 100%;
  height: 87%;
  background-color: #fff;
  z-index: 999;

  .locading {
    width: 154rem;
    height: 155rem;
    background-image: url("../assets/loading.jpg");
    background-repeat: no-repeat;
    animation-name: xxx;
    animation-duration: 3s;
    margin: 220rem auto;
    animation-iteration-count: infinite;
    /* animation-timing-function: linear; */
    animation-timing-function: steps(13, end);
  }
}
</style>

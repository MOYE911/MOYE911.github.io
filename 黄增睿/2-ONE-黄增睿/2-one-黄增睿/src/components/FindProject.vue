<template>
  <div class="project">
    <div
      class="pro-box"
      v-for="pro in projects"
      :key="pro.id"
      @click="
        $router.push({ path: '/findca', query: { id: pro.content_id } });
        Navshow();
      "
    >
      <div class="pic">
        <img :src="pro.cover" alt="" />
      </div>
      <div class="zhuan"><h2>#专题</h2></div>
      <div class="pro-text">
        <h2>{{ pro.title }}</h2>
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
      projects: [],
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navshow"]),
    getRead: function () {
      this.loading = true;
      this.axios
        .get("https://apis.netstart.cn/one/banner/list/4")
        .then((res) => {
          // console.log(res);
          this.loading = false;
          this.projects = res.data.data;
        });
    },
  },
  created: function () {
    this.getRead();
  },
};
</script>
<style lang="less">
.pro-box {
  width: 95%;
  margin-bottom: 15rem;
  margin: 0 auto;
  margin-bottom: 35rem;
  position: relative;
  .pic {
    width: 100%;
    height: 180rem;
    overflow: hidden;
    border-top-left-radius: 10rem;
    border-top-right-radius: 10rem;
    img {
      width: 100%;
      // transform: scale(1.1);
    }
  }
  .zhuan {
    color: #deded9;
    position: absolute;
    top: 160rem;
    left: 13rem;
  }
  .pro-text {
    padding: 10rem 0;
    border: 2rem solid #dcdcdc;
    border-top: none;
    border-bottom-left-radius: 10rem;
    border-bottom-right-radius: 10rem;
    h2 {
      text-align: left;
      padding-left: 5rem;
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

<template>
  <div class="sercard">
    <div class="topse">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          Navfshow();
        "
      />
      <h2>{{ $route.query.name }}</h2>
    </div>
    <div class="main">
      <ul>
        <li
          v-for="sercard in sercards"
          :key="sercard.id"
          @click="
            $router.push({
              path: './card',
              query: { id: sercard.id, model: 2 },
            })
          "
        >
          <img :src="sercard.cover" alt="" />
          <div class="main-text">
            <h2>{{ sercard.title }}</h2>
            <span>{{ sercard.subtitle }}</span>
          </div>
        </li>
      </ul>
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
      sercards: "",
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navfshow"]),
    getSercard(id) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/find/serial/list/${id}`)
        .then((res) => {
          this.loading = false;
          this.sercards = res.data.data;
          //   console.log(this.sercards);
        });
    },
  },
  created: function () {
    this.getSercard(this.$route.query.id);
  },
};
</script>
<style lang="less">
.topse {
  display: flex;
  padding: 15rem;
  justify-content: flex-start;
  //   border-bottom: 2rem solid #dcdcdc;
  img {
    width: 15rem;
    margin-right: 10rem;
  }
}
.main {
  ul {
    li {
      display: flex;
      padding: 5rem 10rem;
      img {
        width: 55rem;
        border-radius: 6rem;
        margin: 0 10rem;
      }
      .main-text {
        text-align: left;
        h2 {
          margin-bottom: 15rem;
          font-size: 14rem;
          font-weight: 600;
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
<template>
  <div class="hot">
    <div class="hotcard" v-for="(hot, index) in hots" :key="index">
      <div class="toph">
        <h2>{{ hot.title }}</h2>
        <p
          @click="
            $router.push({
              path: '/hot',
              query: { id: hot.id, title: hot.title },
            });
            Navshow();
          "
        >
          完整表单
        </p>
      </div>
      <div class="hot-box">
        <img
          :src="hot.img_url"
          alt=""
          @click="
            $router.push({
              path: '/hot',
              query: { id: hot.id, title: hot.title },
            });
            Navshow();
          "
        />
        <div class="fr">
          <p
            v-for="(cont, index) in hot.contents"
            :key="index"
            @click="
              $router.push({
                path: './card',
                query: {
                  id: cont.id,
                  model: 1,
                  category: cont.category,
                },
              })
            "
          >
            <span>{{ index + 1 }}.</span>{{ cont.title }}
          </p>
        </div>
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
      hots: "",
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navshow"]),
    getHot: function () {
      this.loading = true;
      this.axios.get(" https://apis.netstart.cn/one/find/rank").then((res) => {
        // console.log(res);
        this.hots = res.data.data;
        this.loading = false;
      });
    },
  },
  created: function () {
    this.getHot();
  },
};
</script>
<style lang="less">
.hot {
  .hotcard {
    padding: 15rem;
    .toph {
      display: flex;
      justify-content: space-between;
      h2 {
        text-align: left;
        margin-bottom: 10rem;
      }
      p {
        color: #c6c6c6;
      }
    }
    img {
      width: 85rem;
      border-radius: 15rem;
    }
    .hot-box {
      display: flex;
      .fr {
        margin-left: 20rem;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        p {
          &:nth-child(1) span {
            color: #d80303;
          }
          &:nth-child(2) span {
            color: #ff6565;
          }
          &:nth-child(3) span {
            color: #ffa50b;
          }
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

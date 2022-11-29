<template>
  <div>
    <div class="top">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          Navfshow();
        "
      />
      <h3>{{ $route.query.title }}</h3>
    </div>
    <ul>
      <li
        class="item"
        v-for="(exple, index) in hotples"
        :key="index"
        @click="
          $router.push({
            path: './card',
            query: {
              id: exple.id,
              model: 1,
              category: exple.category,
            },
          })
        "
      >
        <!--         @click="
          $router.push({
            path: '/HomeArticle',
            query: { id: exple.id, index: exple.category },
          })
        " -->
        <div class="fl">
          <img
            v-if="`${exple.cover}?imageView=1&type=webp&thumbnail=253x0`"
            :src="exple.cover"
            alt=""
          />
          <span :class="{ active: index === 0, active2: index === 1 }"
            >No.{{ index + 1 }}</span
          >
        </div>
        <div class="fr">
          <div class="title">{{ exple.title }}</div>
          <div class="author">{{ exple.subtitle }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      hotples: "",
    };
  },
  methods: {
    ...mapMutations(["Navfshow"]),
    getHotPle() {
      this.axios
        .get(`https://apis.netstart.cn/one/find/rank/${this.$route.query.id}`)
        .then((res) => {
          this.hotples = res.data.data;
        });
    },
  },
  created: function () {
    this.getHotPle();
  },
};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  padding: 15rem;
  z-index: 999;
  justify-content: flex-start;
  background-color: #fff;
  border-bottom: 2rem solid #dcdcdc;
  img {
    width: 15rem;
  }
}
ul {
  margin-top: 50rem;
  .item {
    display: flex;
    margin: 20rem 0;
    margin-left: 10rem;
    .fl {
      position: relative;
      width: 70rem;
      height: 70rem;

      img {
        border-radius: 17rem;
      }

      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 45rem;
        background-color: orange;
        height: 20rem;
        border-radius: 17rem 0 17rem 0;
        color: white;
        text-align: center;
        line-height: 20rem;
        font-size: 10rem;

        // &:nth-of-type(1) {
        //     background-color: red;

        // }
        &.active {
          background-color: red;
        }
        &.active2 {
          background-color: rgb(255, 128, 0);
        }
      }
    }

    .fr {
      margin-left: 20rem;

      .title {
        font-size: 14rem;
        font-weight: 600;
        padding: none;
        text-align: left;
      }

      .author {
        display: block;
        width: 200rem;
        margin-top: 25rem;
        color: #999;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
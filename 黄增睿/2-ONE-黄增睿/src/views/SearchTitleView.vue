<template>
  <div class="serachtitle">
    <div class="top">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="$router.go(-1)"
      />
      <div class="picker" @click="showpicker = !showpicker">
        <h2>
          {{ $route.query.title }}
        </h2>
        <img src="../assets/img/arrow_down_black.png" alt="" />
      </div>
      <div class="mask" v-if="showpicker" @click="showpicker = !showpicker">
        <ul class="list">
          <li
            v-for="(column, index) in searchs"
            :key="index"
            @click="change(column.id, column.title)"
            :class="{ active: $route.query.id == column.id }"
          >
            {{ column.title }}
          </li>
        </ul>
      </div>
    </div>
    <FindSub v-if="$route.query.id == 1" />
    <FindAnswers v-if="$route.query.id == 2" />
    <FindRead v-if="$route.query.id == 3" />
    <FindMovie v-if="$route.query.id == 5" />
    <FindRudio v-if="$route.query.id == 7" />
  </div>
</template>
<script>
import FindSub from "@/components/FindSub.vue";
import FindAnswers from "@/components/FindAnswers.vue";
import FindRead from "@/components/FindRead.vue";
import FindMovie from "@/components/FindMovie.vue";
import FindRudio from "@/components/FindRudio.vue";
// import { mapMutations } from "vuex";
import merge from "webpack-merge";
export default {
  components: {
    FindSub,
    FindAnswers,
    FindRead,
    FindMovie,
    FindRudio,
    // ...mapMutations(["Navfshow"]),
  },
  data: function () {
    return {
      searchs: [
        { id: 1, title: "图文" },
        { id: 2, title: "问答" },
        { id: 3, title: "阅读" },
        { id: 5, title: "影视" },
        { id: 7, title: "电台" },
      ],
      showpicker: false,
    };
  },
  methods: {
    change(id, title) {
      this.$router.push({
        query: merge(this.$route.query, { id: id, title: title }),
      });
      this.show = false;
    },
  },
};
</script>
<style lang="less">
.top {
  width: 100%;
  display: flex;
  padding: 15rem;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  img {
    width: 15rem;
    margin-right: 10rem;
  }
  .picker {
    display: flex;
    align-items: center;
    margin-left: 133rem;
    h2 {
      font-size: 16rem;
      color: #999;
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  background-color: #2c2c2c;
  position: fixed;
  top: 60rem;
  left: 0;
  z-index: 999;
  .list {
    width: 100%;
    height: 50%;
    position: fixed;
    z-index: 100;
    top: 60rem;
    left: 0;
    background-color: white;
    text-align: center;
    font-size: 16rem;

    li {
      margin: 30rem 0;
      color: #999;
      &.active {
        color: black;
      }
    }
  }
}
</style>

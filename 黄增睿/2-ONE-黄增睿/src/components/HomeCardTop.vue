<template>
  <div class="card-top">
    <van-overlay
      :show="show"
      @click="
        show = false;
        Navshowf();
      "
      style="background-color: rgb(0 0 0 / 89%)"
    >
      <div class="wrapper">
        <h2>{{ homecards?.volume }}</h2>
        <img :src="homecards ? homecards?.img_url : ''" alt="" />
        <p>{{ homecards?.title }} | {{ homecards?.pic_info }}</p>
      </div>
    </van-overlay>
    <div
      class="card-frist"
      @click="
        show = true;
        Navshowf();
      "
    >
      <img :src="homecards ? homecards?.img_url : ''" alt="" />
      <div class="card-text">
        <h2>
          {{ homecards ? homecards?.title : "" }} |
          {{ homecards ? homecards?.pic_info : "" }}
        </h2>
        <p class="title">
          {{ homecards ? homecards?.forward : "" }}
        </p>
        <h2>{{ homecards ? homecards?.words_info : "" }}</h2>
      </div>
    </div>
    <div class="card-pj">
      <div class="fl">
        <img class="zn" src="../assets/img/discovery.png" alt="" />
        <span>小记</span>
      </div>
      <div class="fr">
        <img src="../assets/img/diary_icon.png" alt="" />
        <img src="../assets/img/favourite_gray.png" alt="" />
        <div class="sight">
          <img src="../assets/img/discover_laud_unselected.png" alt="" />
          <span>{{ homecards?.like_count }}</span>
        </div>
        <img src="../assets/img/discover_repost.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    homecards: Object,
  },
  data: function () {
    return { update: "", time: "", show: false };
  },
  methods: {
    ...mapMutations(["Navshowf"]),
  },
};
</script>

<style lang="less">
.card-top {
  width: 100%;
  padding: 10rem;
  padding-top: 0;
  background-color: #fff;
  margin-top: 35rem;
  // margin-bottom: 20rem;
}
.wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  padding: 0 12rem;
  margin-top: 50rem;
  h2 {
    color: #fff;
  }
  img {
    width: 355rem;
    margin: 10rem auto;
  }
  p {
    color: #fff;
  }
}
.card-frist {
  background-color: #fff;
  img {
    border-top-left-radius: 10rem;
    border-top-right-radius: 10rem;
  }
  .card-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10rem;
    height: 150rem;
    border: 2rem solid #dcdcdc;
    border-top: none;
    border-bottom-left-radius: 10rem;
    border-bottom-right-radius: 10rem;
    .title {
      height: 70rem;
      text-align: left;
    }
    h2 {
      color: #dcdcdc;
    }
  }
}
.card-pj {
  margin-top: 10rem;
  margin-right: 10rem;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 20rem;
  }
  .fl {
    padding-left: 10rem;
    width: 17%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #8c8c8c;
  }
  .fr {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sight {
      display: flex;
      align-items: center;
      color: #8c8c8c;
      img {
        margin-right: 2rem;
      }
    }
  }
}
</style>
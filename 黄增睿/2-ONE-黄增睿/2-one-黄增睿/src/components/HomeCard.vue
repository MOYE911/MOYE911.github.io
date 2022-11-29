<template>
  <div class="homecard">
    <div class="card-box">
      <div
        class="card-ple"
        v-for="card in cards"
        :key="card.id"
        @click="
          $router.push({
            path: '/card',
            query: { id: card.item_id, model: 1, category: card.category },
          });
          Navshow();
        "
      >
        <div class="type-tle" v-if="card.category == 1">-阅读-</div>
        <div class="type-tle" v-if="card.category == 3">-问答-</div>
        <div class="type-tle" v-if="card.category == 8">-电台-</div>
        <div class="card-text">
          <h3>{{ card.title }}</h3>
          <p>{{ card.share_list.wx_timeline.desc?.split(" ")[0] }}</p>
          <h4>{{ card.forward }}</h4>
        </div>
        <img class="pic" :src="card?.img_url" alt="" />
        <div class="fr">
          <div class="sight">
            <img src="../assets/img/discover_laud_unselected.png" alt="" />
            <span>{{ card.like_count }}</span>
          </div>
          <img src="../assets/img/discover_repost.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    ...mapState(["show"]),
  },
  props: {
    cards: Array,
  },
  data: function () {
    return {
      update: "",
      time: "",
      menus: "",
      readmodel: [
        { id: 1, tle: "阅读" },
        { id: 2, tle: "图文" },
        { id: 3, tle: "专题" },
        { id: 4, tle: "热榜" },
        { id: 5, tle: "问答" },
        { id: 6, tle: "影视" },
        { id: 7, tle: "电台" },
        { id: 8, tle: "小记" },
        { id: 9, tle: "作者" },
      ],
      categorys: {
        1: "阅读",
        3: "问答",
        8: "电台",
      },
    };
  },
  methods: {
    ...mapMutations(["Navshow"]),
  },
  //   getHome: function () {
  //     this.update = new Date().toLocaleString().slice(0, 10).split("/");
  //     this.time = this.update[0] + "-" + this.update[1] + "-" + this.update[2];
  //     this.axios
  //       .get("https://apis.netstart.cn/one/channel/one/" + this.time)
  //       // .get("https://apis.netstart.cn/one/channel/one/2022-10-8")
  //       .then((res) => {
  //         this.menus = res.data.data.menu;
  //         this.cards = res.data.data.content_list.slice(1);
  //       });
  //   },
  // },
  // created: function () {
  //   this.getHome();
  //   // ...mapMutations(["getHome"]),
  // },
};
</script>

<style lang="less" scoped>
.homecard {
  margin-bottom: 50rem;
}
.card-box {
  width: 100%;
  background-color: rgba(220, 218, 218, 0.364);
  .card-ple {
    width: 100%;
    margin: 0 auto;
    padding: 30rem 10rem;

    margin-top: 10rem;
    margin-bottom: 20rem;
    background-color: #fff;
    .type-tle {
      color: #717171;
    }
    .card-text {
      margin-top: 10rem;
    }
    h3 {
      text-align: left;
      font-size: 16rem;
      font-weight: 600;
      margin-bottom: 5rem;
    }
    h4 {
      text-align: left;
    }
    p {
      text-align: left;
      margin-bottom: 15rem;
      color: #dcdcdc;
    }
    .pic {
      margin-top: 5rem;
      border-radius: 10rem;
    }
    .fr {
      margin-top: 10rem;
      margin-right: 10rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #8c8c8c;
      img {
        width: 20rem;
      }
      .sight {
        display: flex;
        align-items: center;
        margin-right: 30rem;
        img {
          margin-right: 2rem;
        }
      }
    }
  }
}
</style>
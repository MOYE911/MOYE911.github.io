<template>
  <div class="cardv">
    <div class="top" v-show="$route.query.model != 8">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          fan();
        "
      />
      <div class="type" v-if="$route.query.model == 2">连载</div>
      <div class="type" v-if="$route.query.category == 1">-阅读-</div>
      <div class="type" v-if="$route.query.category == 3">-问答-</div>
      <div class="type" v-if="$route.query.category == 8">-电台-</div>
      <img src="../assets/img/favourite_gray.png" alt="" />
    </div>
    <div class="top-dt" v-if="$route.query.model == 8">
      <img
        class="fl"
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          fan();
        "
      />
      <img class="bg" :src="cardtext.cover" alt="" />
      <img class="fr" src="../assets/img/favourite_gray.png" alt="" />
    </div>
    <div class="cardname">
      <h4>{{ cardtext.title }}</h4>
      <p>
        {{ cardtext?.simple_author?.length ? cardtext?.simple_author[0] : "" }}
      </p>
    </div>
    <div class="title" v-html="cardtext.content"></div>
    <div class="title-botm">
      <h2>{{ cardtext?.editor }}</h2>
      <h2>{{ cardtext?.copyright }}</h2>
    </div>
    <div class="write">
      <h2 v-if="$route.query.model != 8">作者</h2>
      <h2 v-if="$route.query.model == 8">主播</h2>
      <div class="btm"></div>
      <div class="content">
        <div class="fl">
          <img v-if="author?.avatar" :src="author?.avatar" alt="" />
          <img v-else src="../assets/img/head.png" alt="" />
        </div>
        <div
          class="md"
          @click="
            $router.push({
              path: '/writer',
              query: { id: author.id },
            })
          "
        >
          <h3>{{ author?.name }}</h3>
          <h3 v-if="!author?.name">一个朋友</h3>
          <p>{{ author?.brief }}</p>
        </div>
        <div class="fr">
          <button>关注</button>
        </div>
      </div>
    </div>
    <div class="xiang" v-if="commends.length">
      <h2>相关推荐</h2>
      <div class="botm"></div>
      <ul>
        <ReferrerCard
          v-for="commend in commends"
          :key="commend.id"
          :commend="commend"
        />
      </ul>
    </div>
    <div class="pingl" id="pingl" ref="pingl">
      <h2>评论列表</h2>
      <div class="botm"></div>
      <ul>
        <DiscussCard v-for="(dcu, index) in dcus" :key="index" :dcu="dcu" />
      </ul>
    </div>
    <div class="last">
      <input type="text" placeholder="写下一个评论..." />
      <div class="fr">
        <div class="dz">
          <img
            v-if="!dz"
            @click="
              dz = !dz;
              dzs++;
            "
            src="../assets/img/feeds_laud_default.png"
            alt=""
          />
          <img
            v-if="dz"
            @click="
              dz = !dz;
              dzs--;
            "
            src="../assets/img/bottom_laud_selected.png"
            alt=""
          />
          <span>{{ dzs }}</span>
        </div>
        <div class="pl" @click="pingl()">
          <a> <img src="../assets/img/comment_image.png" alt="" /></a>
          <span>{{ pls }}</span>
        </div>
        <img class="fx" src="../assets/img/share_image.png" alt="" />
      </div>
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import DiscussCard from "@/components/DiscussCard.vue";
import ReferrerCard from "@/components/ReferrerCard.vue";
export default {
  components: {
    DiscussCard,
    ReferrerCard,
  },
  data: function () {
    return {
      cardtext: "",
      dz: false,
      loading: false,
      dzs: "",
      pls: "",
      dcus: "",
      author: "",
      commends: "",
      moveples: {
        1: "阅读",
        3: "问答",
        4: "一个音乐",
        5: "影视",
        8: "电台",
      },
      categorys: {
        1: "阅读",
        3: "问答",
        8: "电台",
      },
    };
  },
  methods: {
    ...mapMutations(["Navfshow"]),
    getCard1: function (id) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/essay/htmlcontent/${id}`)
        .then((res) => {
          // console.log(res);
          this.loading = false;
          // location.reload();
          this.cardtext = res.data.data.json_content;
          this.author = res.data.data.json_content.author.authors[0];
          this.dzs = res.data.data.praisenum;
          this.pls = res.data.data.commentnum;
        });
      this.axios
        .get(`https://apis.netstart.cn/one/comment/praiseandtime/essay/${id}/0`)
        .then((res) => {
          this.loading = false;
          this.dcus = res.data.data.data;
        });
      this.axios

        .get(` https://apis.netstart.cn/one/relatedforwebview/essay/${id}`)
        .then((res) => {
          this.loading = false;
          this.commends = res.data.data;
        });
    },
    getCard2: function (id) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/serialcontent/htmlcontent/${id}`)
        .then((res) => {
          this.loading = false;
          this.cardtext = res.data.data.json_content;
          this.author = res.data.data.json_content.author.authors[0];
          this.dzs = res.data.data.praisenum;
          this.pls = res.data.data.commentnum;
        });
      this.axios
        .get(
          `https://apis.netstart.cn/one/comment/praiseandtime/serial/${id}/0`
        )
        .then((res) => {
          this.loading = false;
          this.dcus = res.data.data.data;
        });
      this.axios
        .get(` https://apis.netstart.cn/one/serialcontent/htmlcontent/${id}`)
        .then((res) => {
          this.loading = false;
          this.commends = res.data.data;
        });
    },
    getCard3: function (id) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/movie/htmlcontent/${id}`)
        .then((res) => {
          this.loading = false;
          this.cardtext = res.data.data.json_content;
          this.author = res.data.data.json_content.author.authors[0];
          this.dzs = res.data.data.praisenum;
          this.pls = res.data.data.commentnum;
        });
      this.axios
        .get(`https://apis.netstart.cn/one/comment/praiseandtime/movie/${id}/0`)
        .then((res) => {
          this.loading = false;
          this.dcus = res.data.data.data;
        });
      this.axios
        .get(`https://apis.netstart.cn/one/relatedforwebview/movie/${id}`)
        .then((res) => {
          this.loading = false;
          this.commends = res.data.data;
        });
    },
    getCard4: function (id) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/radio/htmlcontent/${id}`)
        .then((res) => {
          this.loading = false;
          this.cardtext = res.data.data.json_content;
          this.author = res.data.data.json_content.author.authors[0];
          this.dzs = res.data.data.praisenum;
          this.pls = res.data.data.commentnum;
        });
      this.axios
        .get(`https://apis.netstart.cn/one/comment/praiseandtime/radio/${id}/0`)
        .then((res) => {
          // this.loading = false;
          this.dcus = res.data.data.data;
        });
    },
    getCard5: function (id) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/question/htmlcontent/${id}`)
        .then((res) => {
          this.loading = false;
          this.cardtext = res.data.data.json_content;
          this.author = res.data.data.json_content.author.authors[0];
          this.dzs = res.data.data.praisenum;
          this.pls = res.data.data.commentnum;
        });
      this.axios
        .get(
          `https://apis.netstart.cn/one/comment/praiseandtime/question/${id}/0`
        )
        .then((res) => {
          // this.loading = false;
          this.dcus = res.data.data.data;
        });
      this.axios
        .get(`https://apis.netstart.cn/one/relatedforwebview/question/${id}`)
        .then((res) => {
          this.loading = false;
          this.commends = res.data.data;
        });
    },
    fan: function () {
      if (this.$route.query.model == 1) {
        this.Navfshow();
      }
    },
    pingl: function () {
      this.$refs.pingl.scrollIntoView();
    },
  },
  created: function () {
    if (this.$route.query.model == 1) {
      this.getCard1(this.$route.query.id);
    } else if (this.$route.query.model == 2) {
      this.getCard2(this.$route.query.id);
    } else if (this.$route.query.model == 5) {
      this.getCard3(this.$route.query.id);
    } else if (this.$route.query.model == 8) {
      this.getCard4(this.$route.query.id);
    } else if (this.$route.query.model == 3) {
      this.getCard5(this.$route.query.id);
    }
  },
};
</script>
<style lang="less" scoped>
.type {
  font-size: 16rem;
  font-weight: 600;
}
.cardv {
  text-align: left !important;
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    padding: 15rem;
    margin-bottom: 50rem;
    font-size: 14rem;
    letter-spacing: 2rem;
    line-height: 20rem;
    img {
      margin: 5rem 0;
    }
  }
  .top {
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    padding: 15rem;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 2rem solid #dcdcdc;
    img {
      width: 20rem;
    }
  }
  .top-dt {
    position: relative;
    img {
      width: 20rem;
    }
    .fl {
      position: absolute;
      top: 10rem;
      left: 10rem;
    }
    .fr {
      position: absolute;
      top: 10rem;
      right: 10rem;
    }
    .bg {
      width: 100%;
    }
  }
  .cardname {
    margin-top: 50rem;
    text-align: left !important;
    padding: 20rem 10rem 10rem 19rem;
    h4 {
      font-size: 20rem;
      font-weight: 600;
    }
    p {
      font-size: 12rem;
      margin-top: 50rem;
    }
  }
  .title-botm {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15rem;
    font-size: 12rem;
    color: rgba(158, 158, 158, 0.838);
  }
  .last {
    width: 100%;
    display: flex;
    height: 45rem;
    background-color: #fbfbfb;
    justify-content: space-between;
    padding: 15rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    input {
      width: 120rem;
      padding: 12rem;
      margin-top: -4rem;
      border-color: #999;
      border-radius: 6rem;
    }

    .fr {
      display: flex;

      img {
        width: 20rem;
        height: 20rem;
        margin: 0 10rem;
      }

      .dz,
      .pl {
        display: flex;
        align-items: center;
        span {
          font-size: 10rem;
          display: block;
          line-height: 10rem;
          color: #999;
        }
      }

      .fx {
        margin-top: -4rem;
      }
    }
  }
  .write {
    padding: 15rem;
    margin-bottom: 15rem;

    h2 {
      font-size: 12rem;
      font-weight: 600;
    }

    .btm {
      margin-top: 10rem;
      width: 23rem;
      height: 3rem;
      background-color: black;
    }

    .content {
      display: flex;
      margin-top: 20rem;
      align-items: center;
      justify-content: space-between;
      .fl {
        img {
          width: 40rem;
          height: 40rem;
          border-radius: 50%;
        }
      }

      .md {
        width: 220rem;
        h3 {
          font-size: 16rem;
          font-weight: 600;
        }

        p {
          color: #999;
        }
      }

      .fr {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          background-color: #fff;
          border: 2rem solid #989898;
        }
      }
    }
  }

  .xiang {
    padding: 15rem;

    h2 {
      font-size: 12rem;
      font-weight: 600;
    }

    .botm {
      margin-top: 10rem;
      width: 45rem;
      height: 3rem;
      background-color: black;
    }
  }

  .pingl {
    padding: 15rem;
    margin-bottom: 50rem;
    h2 {
      font-size: 12rem;
      font-weight: 600;
    }

    .botm {
      margin-top: 10rem;
      width: 45rem;
      height: 3rem;
      background-color: black;
    }
  }
}
</style>

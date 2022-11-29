<template>
  <div>
    <div class="top-box">
      <img
        class="top-pic"
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          Navfshow();
        "
      />
    </div>
    <div class="topw" v-show="$route.query.model != 8">
      <div v-for="writer in writers" :key="writer.id">
        <div class="writer-box" v-if="writer.user_id == $route.query.id">
          <img class="pic" :src="writer.web_url" alt="" />
          <h3>{{ writer.user_name }}</h3>
          <p>{{ writer.desc }}</p>
          <button>关注</button>
          <span>{{ writer.fans_total }}关注</span>
        </div>
      </div>
      <div v-if="writercards">
        <div
          class="writer-box"
          v-if="writercards[0]?.answerer?.user_id == $route.query.id"
        >
          <img class="pic" :src="writercards[0]?.answerer?.web_url" alt="" />
          <h3>{{ writercards[0]?.answerer?.user_name }}</h3>
          <p>{{ writercards[0]?.answerer?.desc }}</p>
          <button>关注</button>
          <span>{{ writercards[0]?.answerer?.fans_total }}关注</span>
        </div>
      </div>
    </div>
    <div class="ment">
      <ul>
        <li
          v-for="writer in writercards"
          :key="writer.id"
          @click="
            $router.push({
              path: '/card',
              query: {
                id: writer.item_id,
                category: writer.category,
                model: writer.category,
              },
            })
          "
        >
          <div class="type" v-if="writer.category == 1">-阅读-</div>
          <div class="type" v-if="writer.category == 3">-问答-</div>
          <div class="type" v-if="writer.category == 8">-电台-</div>
          <div class="dian" v-if="writer.category == 8">
            <div class="ple">
              <img src="../assets/img/one_radio_icon.png" alt="" />
              <span>{{ writer.volume }}</span>
            </div>
            <div class="audio-text">
              <h2 v-if="writer.title">{{ writer.title }}</h2>
            </div>
            <div class="card-text-dt">
              <p>{{ writer.share_list.wx_timeline.desc?.split(" ")[0] }}</p>
              <h4>{{ writer.forward }}</h4>
            </div>
            <img class="pic-img" :src="writer.img_url" alt="" />
          </div>
          <div v-if="writer.category != 8">
            <div class="card-text">
              <h3 v-if="writer.title">{{ writer.title }}</h3>
              <p>{{ writer.share_list.wx_timeline.desc?.split(" ")[0] }}</p>
              <h4>{{ writer.forward }}</h4>
            </div>
            <img class="pic-img" :src="writer.img_url" alt="" />
          </div>
          <div class="bot">
            <div class="fl" v-if="writer.category == 8">
              <img :src="writer.author.web_url" alt="" />
              <span>{{ writer?.author.user_name }}</span>
            </div>
            <div class="sight">
              <img src="../assets/img/discover_laud_unselected.png" alt="" />
              <span>{{ writer.like_count }}</span>
            </div>
            <img src="../assets/img/discover_repost.png" alt="" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: function () {
    return { loading: false, writercards: "", writers: "", writerlists: "" };
  },
  methods: {
    ...mapMutations(["Navfshow"]),
    getWriterCard(id) {
      this.loading = true;
      this.axios
        .get(
          `https://apis.netstart.cn/one/author/works?author_id=${id}&page_num=0`
        )
        .then((res) => {
          this.writercards = res.data.data;
          this.loading = false;
        });
    },
    getWriter() {
      this.loading = true;
      this.axios.get("https://apis.netstart.cn/one/author/hot").then((res) => {
        this.writers = res.data.data;
        this.loading = false;
      });
    },
  },
  created: function () {
    this.getWriterCard(this.$route.query.id);
    this.getWriter();
    // Promise.all([
    //   this.axios.get(
    //     `https://apis.netstart.cn/one/author/works?author_id=${this.$route.query.id}&page_num=0`
    //   ),
    //   this.axios.get("https://apis.netstart.cn/one/author/hot"),
    // ]).then(([n, m]) => {
    //   this.writercards = n.data.data;
    //   this.writers = m.data.data;
    // });
  },
};
</script>

<style lang="less" scoped>
.topw {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15rem;
  background-color: #fff;
  //   border-bottom: 2rem solid #dcdcdc;
  border-bottom: 5rem solid #dcdcdc;
  .writer-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .pic {
      width: 50rem;
      border-radius: 50%;
      margin: 0;
    }
    h3 {
      margin: 10rem 0;
      font-size: 16rem;
      font-weight: 600;
    }
    button {
      background-color: #fff;
      padding: 2rem 10rem;
      border: 2rem solid #989898;
      margin: 10rem 0;
    }
    span {
      font-size: 12rem;
      color: #a7a7a7;
    }
  }
}
.top-box {
  width: 100%;
  position: fixed;
  top: 0;
  .top-pic {
    position: absolute;
    top: 10rem;
    left: 10rem;
    width: 20rem;
  }
}
.ment {
  //   margin-top: 160rem;
  padding: 30rem 10rem;
  padding-top: 0;
  background-color: #fff;
  ul {
    li {
      padding-top: 0;
      padding: 10rem;
      margin-bottom: 35rem;
      .card-text {
        h3 {
          text-align: left;
          font-size: 16rem;
          font-weight: 600;
          margin-bottom: 5rem;
        }
        h4 {
          text-align: left;
          color: #8a8a8a;
        }
        p {
          text-align: left;
          margin-bottom: 15rem;
          color: #dcdcdc;
        }
        .title {
          height: 70rem;
          text-align: left;
        }
      }
      .bot {
        margin-top: 10rem;
        display: flex;
        justify-content: space-between;
        .fl {
          display: flex;
          align-items: center;
          span {
            padding-left: 5rem;
          }
        }
        img {
          width: 20rem;
        }
        .sight {
          display: flex;
          align-items: center;
          span {
            margin-left: 2rem;
          }
        }
      }
      .pic-img {
        width: 100%;
        margin-top: 5rem;
        border-radius: 10rem;
      }
    }
  }
}
.dian {
  position: relative;
  .audio-text {
    h2 {
      position: absolute;
      top: 222rem;
      left: 12rem;
      color: #fff;
    }
  }
  p {
    text-align: left;
    margin-bottom: 15rem;
    color: #dcdcdc;
  }
  .ple {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50rem;
    left: 10rem;
    img {
      height: 12rem;
    }
    span {
      display: block;
      padding-left: 2rem;
      color: #fff;
    }
  }
}
</style>
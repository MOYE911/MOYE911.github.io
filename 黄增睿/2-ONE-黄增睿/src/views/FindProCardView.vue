<template>
  <div
    class="findca"
    :style="`background-color:${findcas?.bg_color};color:${findcas?.font_color}`"
  >
    <img
      class="fan"
      src="../assets/img/ali_feedback_common_back_btn_pressed.png"
      alt=""
      @click.stop="
        $router.go(-1);
        Navfshow();
      "
    />
    <div
      class="fin"
      v-if="findcas?.json_content"
      :style="{
        backgroundImage: `
        url(${findcas?.json_content?.special.cover}?imageView=1&type=webp&thumbnail=253x0`,
      }"
    ></div>
    <div class="head">
      <div class="head-text">{{ findcas.title }}</div>
      <div class="litte-title">{{ findcas?.share_list?.wx.desc }}</div>
    </div>
    <div class="box">
      <ul>
        <li
          v-for="find in findcas?.json_content?.oneDataArticles"
          :key="find.id"
          @click="
            $router.push({
              path: '/card',
              query: { id: find.item_id, category: find.category, model: 1 },
            })
          "
        >
          <img :src="find.img_url" alt="" />
          <div class="title">
            <div class="title-content">{{ find.forward }}</div>
            <div class="bottom">
              <div class="author">{{ find?.author.user_name }}</div>
              <div class="bom">
                <div class="tags">
                  <img
                    v-if="!Tags"
                    src="../assets/img/discover_laud_unselected.png"
                    alt=""
                  />
                  <img
                    v-else
                    src="../assets/img/bottom_laud_selected.png"
                    alt=""
                  />
                  <div class="all">{{ find.like_count }}</div>
                </div>
                <img class="fen" src="../assets/img/share_image.png" alt="" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="loading" class="locadingfin">
      <div class="locading"></div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      findcas: "",
      Tags: false,
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navfshow"]),
    getFindca(id) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/topic/htmlcontent/${id}`)
        .then((res) => {
          this.loading = false;
          this.findcas = res.data.data;
        });
    },
  },
  created: function () {
    this.getFindca(this.$route.query.id);
  },
};
</script>
<style lang="less" scoped>
.fin {
  display: flex;
  padding: 15rem;
  justify-content: flex-start;
  width: 375rem;
  height: 226rem;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.head {
  padding: 15rem;
  text-align: left;
  .head-text {
    font-size: 20em;
    font-weight: 600;
  }
}
img.fan {
  position: absolute;
  top: 10rem;
  left: 10rem;
  width: 15rem;
  margin-right: 10rem;
}
.box {
  ul {
    li {
      padding: 10rem;
      text-align: left;
    }
  }
}
.title {
  background-color: #fff;
  padding: 15rem;
  .title-content {
    margin-bottom: 15rem;
  }
}

.bottom {
  display: flex;
  justify-content: space-between;
  .bom {
    display: flex;
    width: 100rem;
    img {
      width: 18rem;
    }
    .fen {
      margin-left: 20rem;
    }
    .tags {
      display: flex;
      width: 50rem;
      .all {
        margin-left: 10rem;
      }
    }
  }
}
.locadingfin {
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
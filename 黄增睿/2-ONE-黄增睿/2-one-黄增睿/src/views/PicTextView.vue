<template>
  <div class="pictext">
    <div class="toppic">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          Navfshow();
        "
      />
      <h2>{{ pictime[0] }}/{{ pictime[1] }}/{{ pictime[2] }}</h2>
      <img src="../assets/img/share_image.png" alt="" />
    </div>
    <HomeCardTop :homecards="pictext" />
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import HomeCardTop from "@/components/HomeCardTop.vue";
export default {
  components: {
    HomeCardTop,
  },
  data: function () {
    return {
      pictext: {},
      pictime: "",
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navfshow"]),
    getPic: function (date) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/channel/one/${date}`)
        .then((res) => {
          this.loading = false;
          this.pictext = res.data.data.content_list[0];
          this.pictime = this.pictext.post_date.slice(0, 10).split("-");
          //   console.log(this.pictext);
        });
    },
  },
  created: function () {
    this.getPic(this.$route.query.date);
  },
};
</script>
<style lang="less">
.pictext {
  .toppic {
    display: flex;
    padding: 15rem;
    justify-content: space-between;
    border-bottom: 2rem solid #dcdcdc;
    img {
      width: 15rem;
    }
  }
}
.pic-box {
  width: 100%;
  padding: 10rem;
  background-color: #fff;
  margin-bottom: 20rem;
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

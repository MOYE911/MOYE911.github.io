<template>
  <div class="datecard">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      style="height: 98vh"
    >
      <div class="sub-main" v-for="(subeve, index) in subtotals" :key="index">
        <div class="sub">
          <div
            class="sub-box"
            v-for="(sub, index) in subeve.subs"
            :key="index"
            @click="
              Navfshow();
              Dateshow();
              $emit('chang-date', sub.maketime.slice(0, 10));
            "
          >
            <img :src="sub.cover" alt="" />
            <div class="sub-text">
              <p>{{ sub ? sub?.maketime?.split(" ")[0] : "" }}</p>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    ...mapState(["dateshow"]),
  },
  data: function () {
    return {
      subtotals: [],
      date: "",
      loading: false,
      finished: false,
      yy: new Date().getFullYear(),
      mm: String(new Date().getMonth() + 1).padStart(2, "0"),
      dates: JSON.parse(window.localStorage.getItem("dates") || "0"),
    };
  },
  methods: {
    ...mapMutations(["Navfshow", "Dateshow"]),
    getSub(yy, mm) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/find/bymonth/0/${yy}-${mm}`)
        .then((res) => {
          this.subtotals = [...this.subtotals, { subs: res.data.data, yy, mm }];
          // console.log(this.subtotals);
          this.loading = false;
        });
    },
    onLoad() {
      let d = new Date();
      d.setFullYear(this.subtotals[this.subtotals.length - 1]?.yy);
      d.setMonth(this.subtotals[this.subtotals.length - 1]?.mm - 1);

      this.getSub(d.getFullYear(), String(d.getMonth()).padStart(2, "0"));
    },
  },
  created: function () {
    this.getSub(this.yy, this.mm);
  },
  watch: {
    dates() {
      window.localStorage.setItem("dates", JSON.stringify(this.dates));
    },
  },
};
</script>

<style lang="less" scoped>
// .datecard {
//   // margin-top: 50rem;
// }
.sub-main {
  h3 {
    margin-bottom: 10rem;
  }
  .sub {
    padding: 10rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .sub-box {
      width: 170rem;
      margin-bottom: 20rem;
      img {
        border-top-left-radius: 5rem;
        border-top-right-radius: 5rem;
      }
      .sub-text {
        padding: 5rem;
        border: 2rem solid #dcdcdc;
        border-top: none;
        border-bottom-left-radius: 7rem;
        border-bottom-right-radius: 7rem;
      }
    }
  }
}
.locadingmask {
  position: fixed;
  top: 0rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 999;

  .locading {
    width: 154rem;
    height: 155rem;
    background-image: url("../assets/loading.jpg");
    background-repeat: no-repeat;
    animation-name: xxx;
    animation-duration: 3s;
    margin: 300rem auto;
    animation-iteration-count: infinite;
    /* animation-timing-function: linear; */
    animation-timing-function: steps(13, end);
  }
}
</style>
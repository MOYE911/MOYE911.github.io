<template>
  <div class="home">
    <div class="home-top">
      <div
        class="date"
        @click="
          Cardshow();
          Dateshow();
        "
      >
        <span class="fl-title" v-if="updatetime[2] == datetimes[2]">{{
          updatetime[2]
        }}</span>
        <span class="fl-title" v-else>{{ datetimes[2] }}</span>
        <!-- 000000000000000000000000000000000000000000000 -->
        <span class="fr-title" v-if="updatetime[1] == datetimes[1]">{{
          new Date(updatetime).toDateString().split(" ")[1]
        }}</span>

        <span class="fr-title" v-else>{{ datetimes[1] }}</span>
        <!-- 000000000000000000000000000000000000000000000 -->
        <span class="fr-title" v-if="updatetime[0] == datetimes[0]">{{
          updatetime[0]
        }}</span>
        
        <span class="fr-title" v-else>{{ datetimes[0] }}</span>

        <svg
          t="1665453823381"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2694"
          width="1em"
          height="1em"
        >
          <path
            d="M535.466667 812.8l450.133333-563.2c14.933333-19.2 2.133333-49.066667-23.466667-49.066667H61.866667c-25.6 0-38.4 29.866667-23.466667 49.066667l450.133333 563.2c12.8 14.933333 34.133333 14.933333 46.933334 0z"
            p-id="2695"
          ></path>
        </svg>
      </div>

      <div>
        <h2>
          {{ hcard.city_name }}-{{ hcard.climate }}
          <span>{{ hcard.temperature }}℃</span>
        </h2>
      </div>
    </div>
    <div class="card">
      <DateCard v-show="$store.state.dateshow" @chang-date="getHcard" />
      <HomeCardTop :homecards="homecards" v-show="!$store.state.dateshow" />
      <HomeCard :cards="cards" v-show="!$store.state.dateshow" />
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>

<script>
import HomeCardTop from "@/components/HomeCardTop.vue";
import HomeCard from "@/components/HomeCard.vue";
import DateCard from "@/components/DateCard.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    HomeCard,
    HomeCardTop,
    DateCard,
    ...mapState(["dateshow", "show", "showmle"]),
  },
  data: function () {
    return {
      updatetime: "",
      times: "",
      hcard: "",
      datetimes: "",
      homecards: {},
      cards: [],
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navshow", "Dateshow", "Navfshow"]),
    getTime: function () {
      this.updatetime = new Date().toLocaleString().slice(0, 10).split("/");
      this.times =
        this.updatetime[0] +
        "-" +
        this.updatetime[1] +
        "-" +
        this.updatetime[2];
    },
    getHcard: function (date) {
      this.loading = true;
      this.datetimes = date.split("-");
      this.axios
        .get(`https://apis.netstart.cn/one/channel/one/${date}`)
        .then((res) => {
          this.loading = false;
          this.hcard = res.data.data.weather;
          this.homecards = res.data.data.content_list[0];
          this.cards = res.data.data.content_list.slice(1);
        });
    },
    Cardshow: function () {
      if (this.$store.state.show === true) {
        this.Navshow();
      } else {
        this.Navfshow();
      }
    },
  },
  created: function () {
    this.getTime();
    this.getHcard(this.times);
  },
  watch: {
    showmle() {
      window.localStorage.setItem("showmle", JSON.stringify(this.showmle));
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  background-color: rgba(220, 218, 218, 0.364);
  .home-top {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    height: 40rem;
    line-height: 30rem;
    padding: 5rem;
    padding-top: 10rem;
    background-color: #fff;
    color: #8c8c8c;
    // span {
    //   padding-left: 4rem;
    // }
  }
  .date {
    color: black;
    display: flex;
    align-items: center;
    padding-left: 5rem;
    .fl-title {
      font-size: 30rem;
      font-weight: 700;
      padding-right: 5rem;
    }
    .fr-title {
      font-size: 12rem;
      font-weight: 700;
      line-height: 10rem;
      margin-top: 10rem;
    }
    svg {
      width: 20rem;
      height: 20rem;
      color: black;
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  // .locadingmask {
  //   height: 100%;
  // }
}
</style>
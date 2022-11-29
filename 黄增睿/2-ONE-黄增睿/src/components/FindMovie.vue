<template>
  <div class="movie">
    <div class="newcard" @click="dateshow =  !dateshow">
      <span> {{ datey }}年-{{ datem }}月</span>
      <img src="../assets/img/arrow_down_black.png" alt="" />
    </div>
    <div class="datepick" v-show="dateshow">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title=""
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        confirm-button-text=" "
        cancel-button-text=" "
      />
      <span
        @click="
          dateshow = false;
          isquer = true;
          DateYM();
        "
      >
        确认
      </span>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="box" v-for="movie in movies" :key="movie.date">
        <h3 v-show="movie.moviele.length">{{ movie?.mm * 1 }}月</h3>
        <div
          class="read-box"
          v-for="(answer, index) in movie.moviele"
          :key="index"
          @click="
            $router.push({
              path: '/card',
              query: { id: answer.id, model: 5 },
            })
          "
        >
          <img :src="answer?.cover" alt="" />
          <div class="read-text">
            <h2>{{ answer?.title }}</h2>
            <span>{{ answer?.subtitle }}</span>
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
// import { nextTick } from "vue";
export default {
  data: function () {
    return {
      movies: [],
      loading: false,
      finished: false,
      loadingshow: false,
      dateshow: false,
      updatetime: "",
      times: "",
      date: "",
      datey: "",
      datem: "",
      yy: new Date().getFullYear(),
      mm: String(new Date().getMonth() + 1).padStart(2, "0"),
      minDate: new Date(2016, 0),
      maxDate: new Date(2022, 9),
      currentDate: new Date(),
    };
  },
  methods: {
    getmovie: function (yy, mm) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/find/bymonth/5/${yy}-${mm}`)
        .then((res) => {
          this.movies = [...this.movies, { moviele: res.data.data, yy, mm }];
          this.loading = false;
          // nextTick(() => {
          //   this.loading = false;
          // });
        });
    },
    onLoad() {
      // console.log("load");
      // console.log("触底");
      let d = new Date();
      d.setFullYear(this.movies[this.movies.length - 1]?.yy);
      d.setMonth(this.movies[this.movies.length - 1]?.mm - 1);

      this.getmovie(d.getFullYear(), String(d.getMonth()).padStart(2, "0"));
      // console.log(d.getFullYear(), String(d.getMonth()).padStart(2, "0"));
    },
    formatter(type, val) {
      if (type === "year") {
        // console.log(val);
        this.datey = val;
        return `${val}年`;
      } else if (type === "month") {
        // console.log(val);
        this.datem = val;
        return `${val}月`;
      }
      // console.log(val);
      return val;
    },
    getTime: function () {
      this.updatetime = new Date().toLocaleString().slice(0, 10).split("/");
      this.times =
        this.updatetime[0] +
        "-" +
        this.updatetime[1] +
        "-" +
        this.updatetime[2];
    },
    DateYM: function () {
      this.loading = true;
      this.movies = [];
      this.axios
        .get(
          ` https://apis.netstart.cn/one/find/bymonth/5/${this.datey}-${this.datem}`
        )
        .then((res) => {
          this.movies = [
            ...this.movies,
            { moviele: res.data.data, yy: this.datey, mm: this.datem },
          ];
          this.loading = false;
        });
    },
  },
  created: function () {
    this.getmovie(this.yy, this.mm);
    this.getTime();
  },
};
</script>
<style lang="less">
.newcard {
  width: 100%;
  // height: 50rem;
  position: fixed;
  top: 50rem;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14rem;
  font-weight: 600;
  color: #dcdcdc;
  background-color: #fff;
  img {
    width: 15rem;
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
    margin: 200rem auto;
    animation-iteration-count: infinite;
    /* animation-timing-function: linear; */
    animation-timing-function: steps(13, end);
  }
}
</style>

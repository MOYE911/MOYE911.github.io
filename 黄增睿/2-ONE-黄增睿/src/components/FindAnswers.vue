<template>
  <div class="answers">
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
      <div v-for="answs in answers" :key="answs.date">
        <h3>{{ answs?.mm * 1 }}月</h3>
        <div
          class="read-box"
          v-for="(answer, index) in answs.answ"
          :key="index"
          @click="
            $router.push({
              path: '/card',
              query: {
                id: answer.id,
                title: answer.title,
                category: 3,
                model: 3,
              },
            });
            Navshow();
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
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      answers: [],
      loading: false,
      finished: false,
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
    ...mapMutations(["Navshow"]),
    getAnswers: function (yy, mm) {
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/find/bymonth/3/${yy}-${mm}`)
        .then((res) => {
          this.loading = false;
          this.answers = [...this.answers, { answ: res.data.data, yy, mm }];
          //   console.log(this.answers);
          // this.loading = false;
        });
    },
    onLoad() {
      // console.log("load");
      let d = new Date();
      d.setFullYear(this.answers[this.answers.length - 1]?.yy);
      d.setMonth(this.answers[this.answers.length - 1]?.mm - 1);

      this.getAnswers(d.getFullYear(), String(d.getMonth()).padStart(2, "0"));
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
      this.answers = [];
      this.axios
        .get(
          ` https://apis.netstart.cn/one/find/bymonth/3/${this.datey}-${this.datem}`
        )
        .then((res) => {
          this.answers = [
            ...this.answers,
            { answ: res.data.data, yy: this.datey, mm: this.datem },
          ];
          this.loading = false;
        });
    },
  },
  created: function () {
    this.getAnswers(this.yy, this.mm);
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
  background-color: #fff;
  img {
    width: 15rem;
  }
}
.datepick {
  span {
    width: 100rem;
    margin: 0 auto;
    margin-top: 20rem;
    display: block;
    padding: 10rem;
    border-radius: 15rem;
    border: 2rem solid #dcdcdc;
  }
}
.van-list {
  margin-top: 75rem;
  h3 {
    font-weight: 600;
    color: #dcdcdc;
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

<template>
  <div class="read">
    <div class="newcard" @click="dateshow = !dateshow">
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
      <div v-for="month in reading" :key="month.date">
        <h3>{{ month.mm * 1 }}月</h3>
        <div
          class="read-box"
          v-for="(read, index) in month.reads"
          :key="index"
          @click.stop="
            $router.push({
              path: '/card',
              query: { id: read.id, model: 1, category: read.category },
            });
            Navshow();
          "
        >
          <img :src="read?.cover" alt="" />
          <div class="read-text">
            <h2>{{ read?.title }}</h2>
            <span>{{ read?.subtitle }}</span>
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
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      reading: [],
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
    getRead(yy, mm) {
      this.loading = true;
      this.axios
        .get(` https://apis.netstart.cn/one/find/bymonth/1/${yy}-${mm}`)
        // .get(`/test.json`)
        .then((res) => {
          this.reading = [...this.reading, { reads: res.data.data, yy, mm }];

          this.loading = false;
        });
    },
    onLoad() {
      // console.log("load");
      let d = new Date();
      d.setFullYear(this.reading[this.reading.length - 1]?.yy);
      d.setMonth(this.reading[this.reading.length - 1]?.mm - 1);

      this.getRead(d.getFullYear(), String(d.getMonth()).padStart(2, "0"));
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
      this.reading = [];
      this.axios
        .get(
          ` https://apis.netstart.cn/one/find/bymonth/1/${this.datey}-${this.datem}`
        )
        // .get(`/test.json`)
        .then((res) => {
          this.reading = [
            ...this.reading,
            { reads: res.data.data, yy: this.datey, mm: this.datem },
          ];
          this.loading = false;
        });
    },
  },
  created: function () {
    this.getRead(this.yy, this.mm);
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
.read-box {
  display: flex;
  padding: 10rem 5rem;
  img {
    width: 55rem;
    border-radius: 6rem;
    margin: 0 10rem;
  }
  .read-text {
    text-align: left;
    h2 {
      margin-bottom: 15rem;
      font-size: 14rem;
      font-weight: 600;
    }
    span {
      font-size: 12rem;
      color: #dcdcdc;
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
    animation-timing-function: steps(0, end);
  }
}
</style>

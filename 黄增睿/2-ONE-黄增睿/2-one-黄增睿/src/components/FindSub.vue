<template>
  <div class="subtotal">
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
      style="height: 98vh"
    >
      <div class="sub-main" v-for="(subeve, index) in subtotals" :key="index">
        <h2>{{ subeve.mm }}月</h2>
        <div class="sub">
          <div
            class="sub-box"
            v-for="(sub, index) in subeve.subs"
            :key="index"
            @click="
              $router.push({
                path: '/pictext',
                query: { date: sub.maketime.slice(0, 10) },
              });
              Navshow();
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
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      subtotals: [],
      dateshow: false,
      updatetime: "",
      times: "",
      date: "",
      datey: "",
      datem: "",
      loading: false,
      finished: false,
      yy: new Date().getFullYear(),
      mm: String(new Date().getMonth() + 1).padStart(2, "0"),
      minDate: new Date(2016, 0),
      maxDate: new Date(2022, 9),
      currentDate: new Date(),
    };
  },
  methods: {
    ...mapMutations(["Navshow"]),
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
    formatter(type, val) {
      if (type === "year") {
        this.datey = val;
        return `${val}年`;
      } else if (type === "month") {
        this.datem = val;
        return `${val}月`;
      }
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
      this.subtotals = [];
      this.axios
        .get(
          ` https://apis.netstart.cn/one/find/bymonth/0/${this.datey}-${this.datem}`
        )
        // .get(`/test.json`)
        .then((res) => {
          this.subtotals = [
            ...this.subtotals,
            { subs: res.data.data, yy: this.datey, mm: this.datem },
          ];
          this.loading = false;
        });
    },
  },
  created: function () {
    // this.getdate();
    this.getSub(this.yy, this.mm);
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
.subtotal {
  .sub-main {
    h2 {
      margin-bottom: 10rem;
      color: #dcdcdc;
      font-weight: 600;
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
}
.van-list {
  margin-top: 50rem;
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

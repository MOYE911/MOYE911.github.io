<template>
  <div class="audio">
    <div class="newcard" @click="dateshow =  !dateshow">
      {{ datey }}年-{{ datem }}月
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
      <div v-for="audio in audios" :key="audio.date">
        <h3 v-show="audio.audiole.length">{{ audio?.mm * 1 }}月</h3>
        <div
          class="audio-box"
          v-for="(answer, index) in audio.audiole"
          :key="index"
          @click="
            $router.push({
              path: '/card',
              query: { id: answer.id, model: 8 },
            })
          "
        >
          <img :src="answer?.cover" alt="" />
          <div class="ple">
            <img src="../assets/img/one_radio_icon.png" alt="" />
            <span>{{ answer.volume }}</span>
          </div>
          <div class="audio-text">
            <h2>{{ answer?.title }}</h2>
          </div>
          <div class="bot">
            <div class="fl">
              <img :src="answer.author.web_url" alt="" />
              <span>{{ answer?.subtitle.slice(3, 9) }}</span>
            </div>
            <div class="sight">
              <img src="../assets/img/discover_laud_unselected.png" alt="" />
              <span>{{ answer.like_count }}</span>
            </div>
            <img src="../assets/img/discover_repost.png" alt="" />
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
export default {
  data: function () {
    return {
      audios: [],
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
    getaudio: function (yy, mm) {
      this.axios
        .get(`https://apis.netstart.cn/one/find/bymonth/8/${yy}-${mm}`)
        .then((res) => {
          this.audios = [...this.audios, { audiole: res.data.data, yy, mm }];

          this.loading = false;
        });
    },
    onLoad() {
      // console.log("load");
      let d = new Date();
      d.setFullYear(this.audios[this.audios.length - 1]?.yy);
      d.setMonth(this.audios[this.audios.length - 1]?.mm - 1);

      this.getaudio(d.getFullYear(), String(d.getMonth()).padStart(2, "0"));
    },
    formatter(type, val) {
      if (type === "year") {
        this.datey = val;
        return `${val}年`;
      } else if (type === "month") {
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
      this.audios = [];
      this.axios
        .get(
          ` https://apis.netstart.cn/one/find/bymonth/8/${this.datey}-${this.datem}`
        )
        .then((res) => {
          this.audios = [
            ...this.audios,
            { audiole: res.data.data, yy: this.datey, mm: this.datem },
          ];
          this.loading = false;
        });
    },
  },

  created: function () {
    this.getaudio(this.yy, this.mm);
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
  font-size: 14rem;
  font-weight: 600;
  background-color: #fff;
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
  }
}
.audio-box {
  padding: 15rem;
  position: relative;
  color: #c2c2c2;
  img {
    border-radius: 7rem;
  }
  .audio-text {
    h2 {
      position: absolute;
      top: 195rem;
      left: 30rem;
      color: #fff;
    }
  }
  .ple {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20rem;
    left: 25rem;
    img {
      height: 12rem;
    }
    span {
      display: block;
      padding-left: 2rem;
      color: #fff;
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
    margin: 300rem auto;
    animation-iteration-count: infinite;
    /* animation-timing-function: linear; */
    animation-timing-function: steps(13, end);
  }
}
</style>

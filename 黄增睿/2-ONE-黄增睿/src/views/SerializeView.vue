<template>
  <div class="serialize">
    <div class="ser-top">
      <ul>
        <li
          v-for="ser in sers"
          :key="ser.id"
          @click="
            getSer(ser.year);
            serializeId = ser.id;
          "
          :class="{ active: serializeId == ser.id }"
        >
          {{ ser.year }}
        </li>
        <div class="ple">
          <img
            src="../assets/img/search.png"
            alt=""
            @click="
              $router.push({ path: './search' });
              Navshow();
            "
          />
        </div>
      </ul>
    </div>
    <div class="ser-box" v-for="ser in serializes" :key="ser.id">
      <div
        class="pic"
        @click="
          $router.push({
            path: './sercard',
            query: { id: ser.serial_id, name: ser.title },
          });
          Navshow();
        "
      >
        <img :src="ser.cover" alt="" />
      </div>
      <div class="ser-text">
        <h2>{{ ser.forward }}</h2>
        <h3 class="ser-title">《{{ ser.title }}》</h3>
      </div>
      <div class="model">
        <span v-if="ser.finished">#已完结</span>
        <span v-else>#连载中</span>
      </div>
    </div>
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
      sers: [
        { id: 1, year: 2022 },
        { id: 2, year: 2021 },
        { id: 3, year: 2020 },
        { id: 4, year: 2019 },
        { id: 5, year: 2018 },
        { id: 6, year: 2017 },
        { id: 7, year: 2016 },
      ],
      serializeId: JSON.parse(
        window.localStorage.getItem("serializeId") || "1"
      ),
      serializes: [],
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["Navshow"]),
    getSer: function (year) {
      this.serializes = [];
      this.loading = true;
      this.axios
        .get(`https://apis.netstart.cn/one/find/serial/byyear/${year}`)
        .then((res) => {
          // console.log(res);
          this.loading = false;
          this.serializes = res.data.data;
        });
    },
  },
  created: function () {
    this.getSer(this.sers[this.serializeId - 1].year);
  },
  watch: {
    serializeId() {
      window.localStorage.setItem(
        "serializeId",
        JSON.stringify(this.serializeId)
      );
    },
  },
};
</script>
<style lang="less">
.serialize {
  margin: 50rem 0;
}
.ser-top {
  background-color: #fff;
  padding: 0 10rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  ul {
    display: flex;
    align-items: center;
    height: 50rem;
    li {
      padding: 5rem 10rem;
      border-radius: 10rem;
    }
    .active {
      background-color: #363636;
      color: #fff;
    }
    .ple {
      width: 30rem;
      height: 50rem;
      position: fixed;
      top: 0;
      right: 0;
      background-color: #fff;
      img {
        width: 20rem;
        margin-top: 15rem;
        margin-right: 10rem;
      }
    }
  }
}

.ser-box {
  width: 95%;
  margin-bottom: 15rem;
  margin: 0 auto;
  margin-bottom: 35rem;
  position: relative;
  .model {
    position: absolute;
    top: 10rem;
    left: 10rem;
    span {
      color: #fff;
    }
  }
  .pic {
    width: 100%;
    height: 180rem;
    overflow: hidden;
    border-top-left-radius: 10rem;
    border-top-right-radius: 10rem;
    img {
      width: 100%;
      // transform: scale(1.1);
    }
  }
  .ser-text {
    padding: 10rem 0;
    border: 2rem solid #dcdcdc;
    border-top: none;
    border-bottom-left-radius: 10rem;
    border-bottom-right-radius: 10rem;
    position: relative;
    h2 {
      text-align: left;
      padding-left: 5rem;
    }
    .ser-title {
      position: absolute;
      top: -29rem;

      color: #fff;
      font-size: 16rem;
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
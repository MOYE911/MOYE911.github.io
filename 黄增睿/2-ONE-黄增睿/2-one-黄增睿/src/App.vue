<template>
  <div id="app">
    <nav v-if="$store.state.showmle">
      <div class="app-list">
        <router-link to="/">
          <img class="active" src="./assets/img/icon_home.png" alt="" />
          <img class="act" src="./assets/img/icon_home_selected.png" alt="" />
        </router-link>
      </div>
      <div class="app-list">
        <router-link to="/find">
          <img class="active" src="./assets/img/icon_dicover.png" alt="" />
          <img
            class="act"
            src="./assets/img/icon_discover_selected.png"
            alt=""
          />
        </router-link>
      </div>
      <div class="app-list">
        <router-link to="/serialize">
          <img class="active" src="./assets/img/icon_serial.png" alt="" />
          <img class="act" src="./assets/img/icon_serial_selected.png" alt="" />
        </router-link>
      </div>
      <div class="app-list">
        <router-link to="/user" v-if="!denglu?.length">
          <img class="active" src="./assets/img/icon_me.png" alt="" />
          <img class="act" src="./assets/img/icon_me_selected.png" alt=""
        /></router-link>
        <router-link to="/users" v-else>
          <img class="active" src="./assets/img/icon_me.png" alt="" />
          <img class="act" src="./assets/img/icon_me_selected.png" alt=""
        /></router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {
    ...mapState(["showmle"]),
  },
  data: function () {
    return {
      denglu: localStorage.token,
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // background-color: #f4f3f7;
}
a {
  text-decoration: none;
}
@keyframes xxx {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: -2000px;
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
    background-image: url("./assets/loading.jpg");
    background-repeat: no-repeat;
    animation-name: xxx;
    animation-duration: 3s;
    margin: 220rem auto;
    animation-iteration-count: infinite;
    /* animation-timing-function: linear; */
    animation-timing-function: steps(13, end);
  }
}
nav {
  width: 100%;
  height: 50rem;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 2rem solid #dcdcdc;
  background-color: #fff;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .app-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 25%;
    height: 50rem;
    a {
      display: flex;
      align-items: center;

      width: 100%;
      height: 50rem;
      padding-top: 5rem;
      img {
        width: 30rem;
        margin: 0 auto;
      }
      .act {
        display: none;
      }
      .active {
        display: block;
      }
    }
  }
}

nav a.router-link-exact-active {
  color: #42b983;
  .act {
    display: block;
  }
  .active {
    display: none;
  }
}
</style>

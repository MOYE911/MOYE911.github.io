<template>
  <div class="users">
    <div class="topheader">
      <img
        class="background"
        src="../assets/img/default_indi_bg.png?imageView2/1/w/375/h/190/q/75"
        alt=""
      />
      <div class="header-personal">
        <div class="header-name">
          <img
            class="webimg"
            src="../assets/img/save_to_center_checked_night.png"
            alt=""
          />
          <h3>ONE 用户</h3>
        </div>
      </div>
    </div>
    <div class="my-totes">
      <div class="topq">
        <h3>我的小记</h3>
        <div class="quan">
          <h5>全部</h5>
          <img src="../assets/img/forward.png" alt="" />
        </div>
      </div>
      <div class="newwant">
        <div class="newwant-ac">
          <div class="newwant-top">
            <img src="../assets/img/diary_icon.png" alt="" />
            <h5 class="newwant-text">制作小记</h5>
          </div>
          <p class="want">记录你此刻的想法</p>
        </div>
      </div>
    </div>
    <div class="my-collection">
      <h3>我的收藏</h3>
      <div class="four-card">
        <div class="image-text">
          <img src="../assets/img/indi_hp_icon.png" alt="" />
          <h5>图文</h5>
        </div>
        <div class="article">
          <img src="../assets/img/indi_article_icon.png" alt="" />
          <h5>文章</h5>
        </div>
        <div class="music">
          <img src="../assets/img/indi_music_icon.png" alt="" />
          <h5>音乐</h5>
        </div>
        <div class="movies">
          <img src="../assets/img/indi_movie_icon.png" alt="" />
          <h5>影视</h5>
        </div>
        <div class="radio">
          <img src="../assets/img/indi_radio_icon.png" alt="" />
          <h5>电台</h5>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-card">
        <div
          class="follow card"
          @click="$router.push({ path: '/MyConcerns', query: {} })"
        >
          <img src="../assets/img/my_attention_icon.png" alt="" />
          <div class="right">
            <h5>我的关注</h5>
            <img src="../assets/img/forward.png" alt="" />
          </div>
        </div>
        <div class="song-sheet card">
          <img src="../assets/img/songlist_play_gray.png" alt="" />
          <div class="right">
            <h5>歌单</h5>
            <img src="../assets/img/forward.png" alt="" />
          </div>
        </div>
        <div class="contribution card">
          <img src="../assets/img/contribute_day.png" alt="" />
          <div class="right">
            <h5>投稿</h5>
            <img src="../assets/img/forward.png" alt="" />
          </div>
        </div>
        <div
          class="setup card"
          @click="$router.push({ path: '/MySettings', query: {} })"
        >
          <img src="../assets/img/设置.png" alt="" />
          <div class="right">
            <h5>设置</h5>
            <img src="../assets/img/forward.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.users {
  .topheader {
    height: 190rem;
    position: relative;
    color: white;
    overflow: hidden;
    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -999;
      transform: scale(1.5);
    }

    .header-personal {
      height: 45rem;
      line-height: 45rem;
      position: absolute;
      bottom: 20rem;
      left: 10rem;

      .header-name {
        display: flex;

        .webimg {
          width: 40rem;
          height: 40rem;
          // border-radius: 50%;
          // border: 1rem solid white;
        }

        h3 {
          margin-left: 10rem;
        }
      }
    }
  }

  .my-totes {
    .topq {
      display: flex;
      padding: 5rem 10rem;
      justify-content: space-between;

      .quan {
        display: flex;
        align-items: center;
        margin-left: 20rem;
        img {
          width: 15rem;
        }
      }
      h5 {
        color: rgb(178, 180, 182);
      }
    }

    .newwant {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30rem;
      color: rgb(194, 197, 200);

      .newwant-ac {
        border: 1rem dashed rgb(210, 209, 209);
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        padding: 20rem;
        border-radius: 10rem;

        .newwant-top {
          display: flex;
          align-items: center;

          .newwant-text {
          }

          img {
            width: 20rem;
            height: 20rem;
          }
        }

        p.want {
          transform: scale(0.75);
        }
      }
    }
  }

  .my-collection {
    padding: 0 5rem;
    h3 {
      font-size: 14rem;
      text-align: left;
    }

    .four-card {
      display: flex;
      align-items: center;
      justify-content: space-around;
      text-align: center;
      margin: 5rem 0 10rem;

      img {
        width: 32rem;
        height: 36rem;
      }

      h5 {
        color: rgb(104, 105, 107);
        font-size: 10rem;
      }
    }
  }

  .bottom {
    background-color: rgb(232, 232, 232);
    height: 30vh;
    position: relative;
    .bottom-card {
      width: 100%;
      position: absolute;
      top: 10rem;
      left: 0;

      .card {
        display: flex;
        align-items: center;
        background-color: white;
        padding: 3rem 0;
        img {
          width: 24rem;
          height: 24rem;
          margin: 5rem;
        }

        .right {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          // border-bottom: 1rem solid rgb(197, 197, 197);
          // padding: 4rem 0;
          h5 {
            color: rgb(97, 98, 99);
          }
          .icon {
            color: rgb(199, 200, 202);
            font-size: 18rem;
          }
        }
      }
    }
  }
}
</style>
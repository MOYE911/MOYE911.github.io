<template>
  <li class="lep">
    <div class="lep-top">
      <div class="fl">
        <img v-if="dcu?.user" :src="dcu?.user?.web_url" alt="" />
        <span class="name">{{ dcu.user.user_name }}</span>
      </div>
      <div class="fr">
        <div class="data">{{ dcu.input_date }}</div>
      </div>
    </div>
    <div class="middle">
      {{ dcu.content }}
    </div>
    <div class="bottom">
      <img src="../assets/img/comment_image.png" alt="" />
      <div class="tags">
        <img
          v-if="!dzs"
          @click="dzing"
          src="../assets/img/comment_laud.png"
          alt=""
        />
        <img
          v-else
          @click="dzing"
          src="../assets/img/comment_laud_selected.png"
          alt=""
        />
        <div class="sl">{{ dzmath }}</div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    dcu: Object,
  },
  data: function () {
    return {
      dzs: false,
      dzmath: this.dcu.praisenum,
    };
  },
  methods: {
    dzing() {
      this.dzs = !this.dzs;
      if (this.dzs) {
        this.dzmath++;
      } else {
        this.dzmath--;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.lep {
  padding: 15rem;

  .lep-top {
    display: flex;
    justify-content: space-between;

    .fl {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 20rem;
        height: 20rem;
        border-radius: 50%;
      }

      .name {
        font-size: 12rem;
        color: rgb(169, 169, 169);
        margin-left: 10rem;
      }

      .content {
        font-size: 12rem;
      }
    }

    .fr {
      color: rgb(169, 169, 169);
    }
  }

  .middle {
    padding: 10rem 31rem;
    font-size: 14rem;
  }

  .bottom {
    padding: 15rem;
    display: flex;
    justify-content: end;
    align-items: center;

    img {
      width: 20rem;
      height: 20rem;
      margin: 0 10rem;
    }

    .tags {
      display: flex;
      justify-content: center;
      align-items: center;

      .sl {
        color: rgb(169, 169, 169);
      }
    }

    border-bottom: 1rem solid rgba(201, 201, 201, 0.57);
  }
}
</style>
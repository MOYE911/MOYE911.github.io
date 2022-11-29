<template>
  <li
    class="referr"
    @click="
      $router.push({
        path: '/card',
        query: { id: commend.content_id, model: 1, category: commend.category },
      })
    "
  >
    <div class="type" v-if="$route.query.category == 1">阅读</div>
    <div class="type" v-if="$route.query.category == 3">问答</div>
    <div class="type" v-if="$route.query.category == 8">电台</div>
    <div class="fr">
      <div class="title">{{ commend.title }}</div>
      <div class="author">{{ commend.author_list[0].user_name }}</div>
    </div>
  </li>
</template>

<script>
// import merge from "webpack-merge";
export default {
  props: {
    commend: Object,
  },
};
</script>

<style lang="less" scoped>
.type {
  min-width: 25rem;
}
.referr {
  display: flex;
  padding: 15rem 0rem;
  .fl {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10rem;
    color: #999;
  }

  .fr {
    margin-left: 20rem;

    .title {
      font-size: 12rem;
    }

    .author {
      font-size: 10rem;
      color: #999;
    }
  }
}
</style>
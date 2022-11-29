<template>
  <li
    @click="
      $router.push({
        path: '/pictext',
        query: { date: maple.date.slice(0, 10) },
      })
    "
  >
    <div class="fl">
      <img :src="maple.cover" alt="" />
    </div>
    <div class="fr">
      <div class="text">{{ maple.title }}</div>
      <div class="tag">{{ maple.subtitle }}</div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    maple: Object,
  },
};
</script>

<style lang="less" scoped>
li {
  display: flex;
  padding: 10rem;
  border-bottom: 1rem solid rgb(214, 214, 214);
  .fl {
    width: 50rem;
    height: 50rem;
  }

  .fr {
    margin-left: 10rem;
    text-align: left;
    .text {
      width: 260rem;
      font-size: 14rem;
      font-weight: 600;
      height: 20rem;
      overflow: hidden;
    }

    .tag {
      font-size: 12rem;
      color: #999;
      margin-top: 15rem;
    }
  }
}
</style>
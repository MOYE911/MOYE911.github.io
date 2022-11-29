<template>
  <div>
    <div class="top">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          Navshow();
        "
      />
      <h3>{{ $route.query.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  padding: 15rem;
  justify-content: flex-start;
  border-bottom: 2rem solid #dcdcdc;
  img {
    width: 15rem;
  }
}
</style>
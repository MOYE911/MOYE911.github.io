<template>
  <div>
    <div class="top">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          Navfshow();
        "
      />
      <h2>{{ $route.query.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>
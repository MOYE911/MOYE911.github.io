<template>
  <div class="datecard">
    <div class="top">
      <img
        src="../assets/img/return_image_4_0.png"
        alt=""
        @click.stop="
          $router.go(-1);
          Navshow();
        "
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.top {
  position: fixed;
  top: 0;
  display: flex;
  padding: 15rem;
  justify-content: space-between;
  border-bottom: 2rem solid #dcdcdc;
  img {
    width: 15rem;
  }
}
</style>
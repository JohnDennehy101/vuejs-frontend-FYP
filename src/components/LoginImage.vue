<template>
  <div class="login-page-image-container">
    <img src="../assets/loginImage.jpg" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.login-page-image-container {
  width: 50%;
  height: 80vh;
  display: flex;
  align-items: center;

  @include for-phone-only {
    width: 100%;
    height: 20vh;
    margin: 1rem auto 0 auto;
  }
}
img {
  width: 70%;
  height: 55vh;
  margin: 0 auto;

  @include for-phone-only {
    height: 20vh;
    margin: 1rem auto;
    width: 90%;
  }
}
</style>

<template>
  <div id="wrapper">
    <LoginImage />
    <LoginForm title="Login" />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
import LoginImage from "../components/LoginImage";

export default {
  name: "Login Page",
  components: {
    LoginForm,
    LoginImage,
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  display: flex;

  @include for-phone-only {
    flex-direction: column;
  }
}
</style>

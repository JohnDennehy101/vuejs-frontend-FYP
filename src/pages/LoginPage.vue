<template>
  <div id="wrapper">
    <LoginForm />
    <LoginImage />
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
}
</style>

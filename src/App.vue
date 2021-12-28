<template>
  <div id="wrapper">
    <LoginForm />
    <LoginImage />
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";
import LoginImage from "./components/LoginImage.vue";

export default {
  name: "App",
  components: {
    LoginForm,
    LoginImage,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  background-color: grey;
}
#wrapper {
  display: flex;
}
</style>

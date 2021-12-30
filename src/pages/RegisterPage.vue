<template>
  <div id="wrapper">
    <RegisterForm />
    <LoginImage />
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
import LoginImage from "../components/LoginImage";

export default {
  name: "Register Page",
  components: {
    RegisterForm,
    LoginImage,
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  display: flex;
}
</style>

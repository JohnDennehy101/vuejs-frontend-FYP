<template>
  <div id="wrapper">
    <LoginImage />
    <RegisterForm />
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

  @include for-phone-only {
    flex-direction: column;
  }
}
</style>

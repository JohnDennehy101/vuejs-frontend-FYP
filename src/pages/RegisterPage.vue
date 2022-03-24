<template>
  <div id="wrapper">
    <transition name="toast">
      <Toast v-if="displayToast" :message="registeredMessage" />
    </transition>
    <LoginImage />
    <RegisterForm v-on:showToast="showToast" />
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
import LoginImage from "../components/LoginImage";
import Toast from "../components/Toast";

export default {
  name: "Register Page",
  components: {
    RegisterForm,
    LoginImage,
    Toast,
  },
  data() {
    return {
      displayToast: false,
      registeredMessage:
        "Successful registration. You will receive an email to confirm the account. You will be able to login following verification via the email.",
    };
  },
  methods: {
    showToast() {
      this.displayToast = true;
      setTimeout(() => (this.displayToast = false), 4000);
    },
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
.toast-enter-active {
  animation: toast 0.5s ease;
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
@keyframes toast {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
    opacity: 1;
  }
  70% {
    transform: translateX(-8px);
    opacity: 1;
  }
  80% {
    transform: translateX(4px);
    opacity: 1;
  }
  90% {
    transform: translateX(-4px);
    opacity: 1;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>

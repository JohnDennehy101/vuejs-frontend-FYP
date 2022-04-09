<template>
  <Header />
  <router-view v-slot="slotProps">
    <transition name="fade-between-routes" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&family=Open+Sans&display=swap");

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
}
.fade-between-routes-enter-from,
.fade-between-routes-leave-to {
  opacity: 0;
}

.fade-between-routes-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-between-routes-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-between-routes-enter-to,
.fade-between-routes-leave-from {
  opacity: 1;
}

.route-enter-from {
}
.route-enter-active {
  animation: slide-between-routes 0.4s ease-out;
}
.route-enter-to {
}

.route-leave-active {
  animation: slide-between-routes 0.4s ease-in;
}

@keyframes slide-between-routes {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}
</style>

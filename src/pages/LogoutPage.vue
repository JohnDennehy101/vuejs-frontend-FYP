<template>
  <div class="vld-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :opacity="loaderOpacity"
      :loader="loaderType"
      :color="loaderColour"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import userService from "../services/UserService";
export default {
  data() {
    return {
      isLoading: true,
      fullPage: false,
      loaderType: "dots",
      loaderColour: "#0384ff",
      loaderOpacity: 1,
    };
  },
  components: {
    Loading,
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
    logoutUser() {
      this.$store.dispatch("setUserId", null);
      this.$store.dispatch("setUserEmail", null);
      this.$store.dispatch("logout");
      this.$store.dispatch("event/populateUserCreatedEvents", []);
      this.$store.dispatch("event/populateUserInvitedEvents", []);
      this.$store.dispatch("setJWT", null);
      userService.logoutUser();
      setTimeout(() => this.$router.push({ name: "Login" }), 2500);
    },
  },
  created() {
    this.logoutUser();
  },
};
</script>

<style scoped lang="scss">
.vld-parent {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}
</style>

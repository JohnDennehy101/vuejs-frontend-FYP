<template>
  <div class="vld-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :loader="loaderType"
      :color="loaderColour"
    />
    <UserSettingsProfileImage
      v-if="user"
      v-on:updateUserImage="updateUserImage"
      :userId="user.id"
      :image="user.profileImageUrl"
    />
    <UserSettingsForm v-if="user" :user="user" />
  </div>
</template>

<script>
import UserSettingsForm from "../components/UserSettingsForm";
import UserSettingsProfileImage from "../components/UserSettingsProfileImage";
import UserService from "../services/UserService";
import { mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
const userService = new UserService();
export default {
  data() {
    return {
      user: null,
      isLoading: false,
      fullPage: false,
      loaderType: "dots",
      loaderColour: "#0384ff",
    };
  },
  components: {
    UserSettingsForm,
    UserSettingsProfileImage,
    Loading,
  },
  computed: {
    ...mapGetters({
      userId: "userId",
    }),
  },
  methods: {
    async getUserInfo() {
      console.log(this.userId);
      const response = await userService.getUser(await this.userId);

      console.log(response);

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.user = response.data;
      }
    },
    updateUserImage(value) {
      console.log(value);
      this.isLoading = value;
    },
  },
  async created() {
    await this.getUserInfo();
  },
};
</script>

<style scoped lang="scss"></style>

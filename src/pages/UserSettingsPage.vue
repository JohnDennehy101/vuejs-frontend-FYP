<template>
  <div class="vld-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :loader="loaderType"
      :opacity="loaderOpacity"
      :color="loaderColour"
    />
    <transition name="toast">
      <Toast v-if="displayToast" :message="message" />
    </transition>
    <UserSettingsProfileImage
      v-if="user"
      v-on:updateUserImage="updateUserImage"
      :userId="user.id"
      :image="user.profileImageUrl"
    />
    <UserSettingsForm
      v-if="user"
      v-on:updateUserForm="formUpdateSuccessful"
      :user="user"
    />
  </div>
</template>

<script>
import UserSettingsForm from "../components/UserSettingsForm";
import UserSettingsProfileImage from "../components/UserSettingsProfileImage";
import userService from "../services/UserService";
import { mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Toast from "../components/Toast";
export default {
  props: {
    userService: {
      default: userService,
    },
  },
  data() {
    return {
      user: null,
      isLoading: false,
      fullPage: false,
      loaderType: "dots",
      loaderColour: "#0384ff",
      loaderOpacity: 1,
      displayToast: false,
      message: "User Image successfully updated.",
    };
  },
  components: {
    UserSettingsForm,
    UserSettingsProfileImage,
    Loading,
    Toast,
  },
  computed: {
    ...mapGetters({
      userId: "userId",
    }),
  },
  methods: {
    async getUserInfo() {
      console.log(this.userId);
      const response = await this.userService.getUser(this.userId);

      console.log(response);

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.user = response.data;
      }
    },
    updateUserImage(value) {
      console.log(value);
      if (value === false) {
        this.displayToast = true;
        setTimeout(() => (this.displayToast = false), 4000);
      }
      this.isLoading = value;
    },
    formUpdateSuccessful(value) {
      if (value) {
        this.message = "User account successfully updated.";
        this.displayToast = true;
        setTimeout(() => (this.displayToast = false), 4000);
      }
    },
  },
  async created() {
    await this.getUserInfo();
  },
};
</script>

<style scoped lang="scss">
.vld-parent {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
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

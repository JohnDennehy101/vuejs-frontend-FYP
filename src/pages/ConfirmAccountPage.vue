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
    <div class="parent-component" v-if="emailConfirmed && !passwordProvided">
      <AccountConfirmationInfoMessage
        :message="emailConfirmedPasswordRequiredMessage"
      />

      <AccountConfirmationProvidePassword
        v-on:updateUserPassword="updateUser"
      />
    </div>
    <div
      class="parent-component"
      v-else-if="emailConfirmed && passwordProvided"
    >
      <AccountConfirmationInfoMessage
        :message="emailConfirmedPasswordNotRequiredMessage"
      />
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import userService from "../services/UserService";
import AccountConfirmationInfoMessage from "../components/AccountConfirmationInfoMessage";
import AccountConfirmationProvidePassword from "../components/AccountConfirmationProvidePassword";
export default {
  data() {
    return {
      isLoading: true,
      fullPage: false,
      loaderType: "dots",
      loaderColour: "#0384ff",
      token: null,
      emailConfirmed: null,
      passwordProvided: null,
      password: "",
      email: null,
      id: null,
      emailConfirmedPasswordRequiredMessage:
        "Thanks for confirming your email, please provide a password for your account.",
      emailConfirmedPasswordNotRequiredMessage:
        "Thank you for confirming your email, you will now be re-directed to the login page to access the service.",
    };
  },
  props: {
    userService: {
      default: userService,
    },
  },
  components: {
    Loading,
    AccountConfirmationInfoMessage,
    AccountConfirmationProvidePassword,
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
    extractJwtFromUrl() {
      this.token = this.$route.query.token;
    },
    async confirmUserEmail() {
      const response = await this.userService.confirmUserEmail(this.token);

      if (response) {
        this.emailConfirmed = response.data.emailConfirmed;
        this.passwordProvided = response.data.passwordProvided;
        this.email = response.data.email;
        this.id = response.data.id;
        this.isLoading = false;

        if (this.emailConfirmed && this.passwordProvided) {
          setTimeout(() => this.$router.push({ name: "Login" }), 2500);
        }
      }
    },
    async updateUser(value) {
      if (value.length > 5) {
        const payload = {
          email: this.email,
          password: value,
          passwordProvided: true,
        };
        const response = await this.userService.updateUser(
          this.id,
          payload,
          this.token
        );

        if (response.status === 200) {
          setTimeout(() => this.$router.push({ name: "Login" }), 2500);
        }
      }
    },
  },
  async created() {
    this.extractJwtFromUrl();
    await this.confirmUserEmail();
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
.parent-component {
  height: 40vh;
  padding: 1rem 0;
  width: 60%;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  background-color: white;
}
</style>

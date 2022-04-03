<template>
  <div class="settings-form-container">
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <h2>{{ formTitle }}</h2>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter email"
          v-model="email"
        />
        <p class="error-message" v-if="emailNotProvided">
          Please provide an email
        </p>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          v-model="password"
        />
        <p class="error-message" v-if="passwordNotProvided">
          Please provide a password with a minimum length of 7 and a mix of
          lowercase, uppercase, numbers and special characters
        </p>
      </div>

      <div class="form-control">
        <input
          id="reEnterPassword"
          name="reEnterPassword"
          type="password"
          placeholder="Please Re-enter password"
          v-model="reEnterPassword"
        />
        <p class="error-message" v-if="passwordsNotMatching">
          Passwords not matching
        </p>
      </div>
      <div class="form-control">
        <button>Update Account Settings</button>
      </div>

      <AccountErrorMessage
        :toggle="this.invalidUpdate"
        :errorMessage="this.errorMessage"
        v-on:hideErrorMessage="hideErrorMessage"
      />
    </form>
  </div>
</template>

<script>
import userService from "../services/UserService";
import AccountErrorMessage from "./AccountErrorMessage";
import StringUtils from "../utils/stringUtils";
export default {
  props: {
    user: Object,
    userService: {
      default: userService,
    },
  },
  data() {
    return {
      email: this.user.email,
      password: "",
      reEnterPassword: "",
      formTitle: "Edit settings",
      errorMessage: "Values must be provided for email and password.",
      invalidUpdate: false,
      emailNotProvided: false,
      passwordNotProvided: false,
      passwordsNotMatching: false,
    };
  },
  methods: {
    async submitForm() {
      if (
        StringUtils.validatePassword(this.password) &&
        this.password === this.reEnterPassword &&
        this.email
      ) {
        const payload = {
          email: this.email,
          password: this.password,
        };
        const response = await this.userService.updateUser(
          this.user.id,
          payload
        );

        if (response) {
          await localStorage.setItem("token", response.data.jwtToken);
          this.$store.dispatch("setUserId", response.data.userId);
          this.$emit("updateUserForm", true);
          setTimeout(
            () =>
              this.$router.push({ path: `/dashboard/${response.data.userId}` }),
            5000
          );
        }
      } else {
        if (!StringUtils.validateEmail(this.email)) {
          this.emailNotProvided = true;
        } else {
          this.emailNotProvided = false;
        }
        if (!StringUtils.validatePassword(this.password)) {
          this.passwordNotProvided = true;
        } else {
          this.passwordNotProvided = false;
        }
        if (
          StringUtils.validatePassword(this.password) &&
          this.password !== this.reEnterPassword
        ) {
          this.passwordsNotMatching = true;
        } else {
          this.passwordsNotMatching = false;
        }
        this.invalidUpdate = true;
      }
    },
    hideErrorMessage() {
      this.invalidUpdate = false;
    },
  },
  components: {
    AccountErrorMessage,
  },
};
</script>

<style scoped lang="scss">
.settings-form-container {
  width: 60%;

  margin: 1rem auto;
  display: flex;
  align-items: center;

  @include for-phone-only {
    width: 100%;
    height: 60vh;
  }
}
form {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid #eeeeee;

  .error-message {
    margin-top: 0.4rem;
    margin-left: 0.1rem;
    font-size: 0.9rem;
    color: red;
  }

  @include for-phone-only {
    height: 80%;
    width: 90%;
  }

  .form-control {
    width: 80%;
    margin: 0.5rem auto;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }
    input {
      height: 2.5rem;
      border-radius: 12px;
      border: 1px solid grey;
      padding-left: 10px;
    }
  }
  button {
    border-radius: 10px;
    border: none;
    width: 30%;
    width: 100%;
    height: 2.5rem;
    margin: 1rem 0;
    background-color: $primary-button-background-colour;
    color: $primary-button-text-colour;
  }
  img {
    width: 1.5rem;
  }
}
</style>

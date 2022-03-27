<template>
  <div class="login-form-container">
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
          required
        />
        <p class="error-message" v-if="!validEmail && email.length > 0">
          Please provide a valid email
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
          required
          minlength="7"
        />
        <p class="error-message" v-if="!validPassword && password.length > 0">
          Password must have mininum length of 7, contain uppercase, lowercase,
          special characters.
        </p>
      </div>
      <div class="form-control">
        <button>Sign up</button>
      </div>

      <AccountErrorMessage
        :toggle="this.invalidRegistration"
        :errorMessage="this.errorMessage"
        v-on:hideErrorMessage="hideErrorMessage"
      />
    </form>
  </div>
</template>

<script>
import AccountErrorMessage from "./AccountErrorMessage";
import userService from "../services/UserService";
import StringUtils from "../utils/stringUtils";
export default {
  data() {
    return {
      email: "",
      password: "",
      formTitle: "Register",
      invalidRegistration: false,
      errorMessage: "There was an error registering your account details.",
    };
  },
  computed: {
    validEmail() {
      return StringUtils.validateEmail(this.email);
    },
    validPassword() {
      return StringUtils.validatePassword(this.password);
    },
  },
  props: {
    userService: {
      default: userService,
    },
  },
  methods: {
    async submitForm() {
      let user;
      if (this.validEmail && this.validPassword) {
        user = await this.userService.registerUser(this.email, this.password);
      }

      if (!user) {
        this.invalidRegistration = true;
      } else {
        this.$emit("showToast", true);
        this.email = "";
        this.password = "";
      }
    },
    hideErrorMessage() {
      this.invalidRegistration = false;
    },
  },
  components: { AccountErrorMessage },
};
</script>

<style scoped lang="scss">
.login-form-container {
  width: 50%;
  height: 80vh;
  display: flex;
  align-items: center;

  @include for-phone-only {
    width: 100%;
    height: 60vh;
  }
}
form {
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;
  border: 1px solid #eeeeee;

  @include for-phone-only {
    width: 90%;
    height: 80%;
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
      width: 95%;
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

  .error-message {
    margin-top: 0.4rem;
    margin-left: 0.1rem;
    font-size: 0.9rem;
    color: red;
  }
}
</style>

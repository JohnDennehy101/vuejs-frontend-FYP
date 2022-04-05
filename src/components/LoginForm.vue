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
          Please provide a password
        </p>
      </div>
      <div class="form-control">
        <button>Login</button>
      </div>

      <ResponseErrorMessage
        :toggle="this.invalidLogin"
        :errorMessage="this.errorMessage"
        v-on:hideErrorMessage="hideErrorMessage"
      />
    </form>
  </div>
</template>

<script>
import ResponseErrorMessage from "./ResponseErrorMessage";
import userService from "../services/UserService";
export default {
  props: {
    title: String,
    userService: {
      default: userService,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      formTitle: this.title,
      invalidLogin: false,
      errorMessage: "There was an error logging you in.",
      passwordNotProvided: false,
      emailNotProvided: false,
    };
  },
  components: {
    ResponseErrorMessage,
  },
  methods: {
    async submitForm() {
      if (this.email.length > 0 && this.password.length > 0) {
        const user = await this.userService.loginUser(
          this.email,
          this.password
        );

        if (typeof user !== "string") {
          this.$store.dispatch("setUserId", user.userId);
          this.$store.dispatch("setUserEmail", user.userEmail);
          this.$store.dispatch("login");
          this.$router.push({ path: `/dashboard/${user.userId}` });
        } else {
          this.errorMessage = user;
          this.invalidLogin = true;
        }
      } else {
        if (this.email.length === 0) {
          this.emailNotProvided = true;
        }
        if (this.password.length === 0) {
          this.passwordNotProvided = true;
        }
      }
    },
    hideErrorMessage() {
      this.invalidLogin = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  img {
    width: 1.5rem;
  }
  .error-message {
    margin-top: 0.4rem;
    margin-left: 0.1rem;
    font-size: 0.9rem;
    color: red;
  }
}
</style>

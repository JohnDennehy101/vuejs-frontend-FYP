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
      </div>

      <div class="form-control">
        <input
          id="reEnterPassword"
          name="reEnterPassword"
          type="password"
          placeholder="Please Re-enter password"
          v-model="reEnterPassword"
        />
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
import UserService from "../services/UserService";
import AccountErrorMessage from "./AccountErrorMessage";
const userService = new UserService();
export default {
  props: ["user"],
  data() {
    return {
      email: this.user.email,
      password: "",
      reEnterPassword: "",
      formTitle: "Edit settings",
      errorMessage: "Values must be provided for email and password.",
      invalidUpdate: false,
    };
  },
  methods: {
    async submitForm() {
      if (
        this.password.length > 0 &&
        this.password === this.reEnterPassword &&
        this.email
      ) {
        const payload = {
          email: this.email,
          password: this.password,
        };
        const response = await userService.updateUser(this.user.id, payload);

        if (response) {
          await localStorage.setItem("token", response.data.jwtToken);
          this.$store.dispatch("setUserId", response.data.userId);
          //Bug here - user email is not currently returned
          //this.$store.dispatch("setUserEmail", response.data.email);

          this.$router.push({ path: `/dashboard/${response.data.userId}` });
        }
      } else {
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
  height: 80vh;
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

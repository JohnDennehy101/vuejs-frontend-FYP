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
      <div class="banner-message-container">
        <i class="fas fa-check-circle"></i>
        <p>
          Thanks for confirming your email, please provide a password for your
          account.
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
      </div>
      <div class="form-control">
        <button v-on:click="updateUser">Submit</button>
      </div>
    </div>
    <div
      class="parent-component"
      v-else-if="emailConfirmed && passwordProvided"
    >
      <div class="banner-message-container">
        <i class="fas fa-check-circle"></i>
        <p>
          Thank you for confirming your email, you will now be re-directed to
          the login page to access the service.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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
    };
  },
  components: {
    Loading,
  },
  methods: {
    onCancel() {
      console.log("User cancelled the loader.");
    },
    extractJwtFromUrl() {
      this.token = this.$route.query.token;
    },
    async confirmUserEmail() {
      const payload = { token: this.token };

      const response = await axios
        .post("http://localhost:3000/users/confirm-email", payload, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .catch((error) => {
          return { error };
        });

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
      console.log(response);
    },
    async updateUser(event) {
      event.preventDefault();

      if (this.password.length > 5) {
        const payload = {
          email: this.email,
          password: this.password,
        };

        console.log(payload);

        const response = await axios
          .patch(`http://localhost:3000/users/${this.id}`, payload, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .catch((error) => {
            return { error };
          });

        console.log(response);

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

  .banner-message-container {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  p {
    margin: 0 0.5rem;
    color: #647196;
    font-size: 1rem;
  }
  svg {
    color: #647196;
    font-size: 1rem;
  }

  .form-control {
    width: 70%;
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
    width: 95%;
    text-align: center;
    height: 2.5rem;
    margin: 1rem auto;
    background-color: $primary-button-background-colour;
    color: $primary-button-text-colour;
  }
  button:hover {
    cursor: pointer;
  }
}
</style>

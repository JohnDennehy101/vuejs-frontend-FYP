<template>
  <div class="login-form-container">
    <form @submit.prevent="submitForm">
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
        <button>Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      console.log(this.email + " " + this.password);
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
}
</style>

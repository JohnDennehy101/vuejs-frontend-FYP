<template>
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
    <button @click="updateUser">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    updateUser(event) {
      event.preventDefault();
      this.$emit("updateUserPassword", this.password);
    },
  },
};
</script>

<style scoped lang="scss">
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
</style>

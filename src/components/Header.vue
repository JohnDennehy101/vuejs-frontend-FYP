<template>
  <header v-if="loggedInHeader"></header>
  <header v-else>
    <div class="parent-container">
      <div class="logo-and-title-container">
        <img src="../assets/logoIcon.png" />
        <p>Group Activity Planner</p>
      </div>
      <ul>
        <li>Heading 1</li>
        <li>Heading 2</li>
        <li>Heading 3</li>
        <li>Heading 4</li>
      </ul>
    </div>
    <ul>
      <li class="login">Login</li>
      <li class="register">Register</li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      loggedInHeader: false,
    };
  },
  watch: {
    $route() {
      if (this.$route.path !== "/") {
        this.loggedInHeader = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;

  margin: 0px 0 40px 0;
  padding: 30px 100px;
  background-color: $header-background-colour;
  color: #ffffff;
}
p {
  font-weight: bold;
  font-family: "Great Vibes", cursive;
  font-size: 1.5rem;
  margin-left: 1rem;
  width: 100%;
}
img {
  width: 3rem;
  height: 2rem;
}
.parent-container {
  display: flex;
}
.logo-and-title-container {
  display: flex;
  align-items: center;
}
ul {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;

  li {
    list-style-type: none;
    margin: 0 1.5rem;
    width: 100%;
    font-size: 1rem;
  }
}
.login {
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 50px;
}
</style>

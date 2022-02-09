<template>
  <header>
    <div class="parent-container">
      <div class="logo-and-title-container">
        <img src="../assets/logoIcon.png" />
        <p>Group Activity Planner</p>
      </div>

      <ul v-if="isLoggedIn && !isMobile()">
        <li>
          <router-link
            :to="{
              name: 'Create Event Page',
            }"
          >
            Add Event
          </router-link>
        </li>
        <li>
          <router-link
            :to="{
              name: 'User Settings Page',
            }"
          >
            Account Settings
          </router-link>
        </li>
        <li>Heading 3</li>
        <li>Heading 4</li>
      </ul>
    </div>
    <ul v-if="!isLoggedIn && !isMobile()">
      <li v-bind:class="{ activeHeader: loginPage }">
        <router-link to="/login"> Login </router-link>
      </li>
      <li v-bind:class="{ activeHeader: registerPage }">
        <router-link to="/register">Register </router-link>
      </li>
    </ul>

    <MobileNavBar
      v-if="isMobile()"
      name="Logo Name"
      :navLinks="[
        {
          name: 'Register',
          link: '/register',
        },
        { name: 'Login', link: '/login' },
      ]"
    />

    <ul v-if="isLoggedIn && !isMobile()">
      <li>
        <router-link class="activeHeader" to="/logout">Logout </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import MobileNavBar from "./MobileNavBar";
export default {
  data() {
    return {
      loggedInHeader: false,
      loginPage: false,
      registerPage: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  components: { MobileNavBar },
  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.path === "/login") {
        this.loginPage = true;
        this.registerPage = false;
      } else if (this.$route.path === "/register") {
        this.registerPage = true;
        this.loginPage = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 30px 100px;
  background-color: $header-background-colour;
  color: #ffffff;

  @include for-phone-only {
    padding: 1rem;
  }
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
  justify-content: space-between;

  @include for-phone-only {
    width: 90%;
  }
}
.logo-and-title-container {
  display: flex;
  align-items: center;
}
ul {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4rem;

  li {
    list-style-type: none;
    margin: 0 1.5rem;
    min-width: 7rem;
    text-align: center;
    font-size: 1rem;
    text-decoration: none;
    color: #ffffff;
  }
}
.activeHeader {
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 50px;
}
a {
  color: #ffffff;
  text-decoration: none;
}
</style>

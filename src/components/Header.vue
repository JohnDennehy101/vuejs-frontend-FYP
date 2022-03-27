<template>
  <header>
    <div class="parent-container">
      <div class="logo-and-title-container">
        <img src="../assets/logoIcon.png" />
        <p data-testid="title">Group Activity Planner</p>
      </div>

      <ul v-if="isLoggedIn && !isMobile()">
        <li data-testid="createEventLink">
          <router-link
            :to="{
              name: 'Create Event Page',
            }"
          >
            Add Event
          </router-link>
        </li>
        <li data-testid="userSettingsLink">
          <router-link
            :to="{
              name: 'User Settings Page',
            }"
          >
            Account Settings
          </router-link>
        </li>
        <li data-testid="dashboardLink">
          <router-link
            :to="{
              name: 'Dashboard',
              params: {
                id: userId,
              },
            }"
          >
            Dashboard
          </router-link>
        </li>
      </ul>
    </div>
    <ul v-if="!isLoggedIn && !isMobile()">
      <li data-testid="loginLink" v-bind:class="{ activeHeader: loginPage }">
        <router-link to="/login"> Login </router-link>
      </li>
      <li
        data-testid="registerLink"
        v-bind:class="{ activeHeader: registerPage }"
      >
        <router-link to="/register">Register </router-link>
      </li>
    </ul>

    <MobileNavBar
      v-if="isMobile() && !isLoggedIn"
      name="Logo Name"
      :navLinks="[
        {
          name: 'Register',
          link: '/register',
        },
        { name: 'Login', link: '/login' },
      ]"
    />

    <MobileNavBar
      v-if="isMobile() && isLoggedIn"
      name="Logo Name"
      :navLinks="[
        { name: 'User Settings Page', link: '/settings' },
        {
          name: 'Dashboard',
          link: `/dashboard/${userId}`,
        },
        { name: 'Logout', link: '/logout' },
      ]"
    />

    <ul v-if="isLoggedIn && !isMobile()">
      <li data-testid="logoutLink">
        <router-link class="activeHeader" to="/logout">Logout </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import MobileNavBar from "./MobileNavBar";
import { mapGetters } from "vuex";
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
    ...mapGetters({
      userId: "userId",
    }),
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
    margin: 0 2.5rem;
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

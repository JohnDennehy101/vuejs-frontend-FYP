<template>
  <div id="wrapper">
    <div id="create-event-call-to-action-container">
      <i class="fas fa-folder-open"></i>
      <h4>You haven't created any events.</h4>
      <button @click="$router.push('createEvent')">Create Event</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      events: [],
      invalidEventCreation: false,
      errorMessage:
        "There was an error adding this event, not successfully created.",
    };
  },
  methods: {
    async getUserCreatedEvents() {
      const jwtToken = localStorage.getItem("token");
      console.log(jwtToken);
      const response = await axios
        .get("http://localhost:3000/users/findOne/" + jwtToken, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .catch((error) => {
          return { error };
        });

      console.log(response);

      if (!("error" in response)) {
        this.$router.push({ path: "/dashboard/1" });
      } else {
        this.invalidEventCreation = true;
      }
    },
  },
  created() {
    this.getUserCreatedEvents();
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
#create-event-call-to-action-container {
  height: 20vh;
  padding: 1rem;
  width: 50%;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
}
button {
  border-radius: 10px;
  border: none;
  width: 30%;
  width: 40%;
  height: 2.5rem;
  margin: 1rem 0;
  background-color: $primary-button-background-colour;
  color: $primary-button-text-colour;
}
button:hover {
  cursor: pointer;
}
svg {
  font-size: 1.5rem;
  padding: 1rem;
}
</style>

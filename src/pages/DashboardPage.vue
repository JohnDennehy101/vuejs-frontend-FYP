<template>
  <div id="wrapper">
    <div v-if="events.length === 0" id="create-event-call-to-action-container">
      <i class="fas fa-folder-open"></i>
      <h4>You haven't created any events.</h4>
      <button @click="$router.push('createEvent')">Create Event</button>
    </div>
    <div v-if="events.length > 0" id="events-parent-container">
      <h2>Your Events</h2>
      <div
        v-for="item in events"
        v-bind:key="item.title"
        class="individual-event-container"
      >
        <div
          v-if="item.type === 'DOMESTIC_DAY'"
          class="domestic-day-colour-mark"
        ></div>
        <div
          v-else-if="item.type === 'DOMESTIC_OVERNIGHT'"
          class="domestic-overnight-colour-mark"
        ></div>

        <div v-else class="foreign-overnight-colour-mark"></div>

        <div class="event-information-container">
          <h3>{{ item.title }}</h3>
          <p>More info about group trip here...description</p>
          <span>{{ item.type }}</span>
        </div>
      </div>
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
      domesticDayColourHex: "#F49F85",
      domesticOvernightColourHex: "#AD1FEA",
      foreignOvernightColourHex: "#62BCFA",
    };
  },
  methods: {
    async getUserCreatedEvents() {
      const jwtToken = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      const response = await axios
        .get("http://localhost:3000/events/user/" + userId, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .catch((error) => {
          return { error };
        });

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.events = response.data;
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
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
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
#events-parent-container {
  height: 80vh;
  width: 85%;
  border: 1px solid black;

  h2 {
    text-align: center;
  }
}
.individual-event-container {
  width: 30%;
  height: 30%;
  display: inline-block;
  margin: 1rem;
  border-radius: 5px;
  background-color: #ffffff;

  .domestic-day-colour-mark {
    background-color: v-bind(domesticDayColourHex);
    height: 3%;
  }

  .domestic-overnight-colour-mark {
    background-color: v-bind(domesticOvernightColourHex);
    height: 3%;
  }

  .foreign-overnight-colour-mark {
    background-color: v-bind(foreignOvernightColourHex);
    height: 3%;
  }

  .event-information-container {
    width: 80%;
    height: 100%;
    margin: 1rem auto;

    h3 {
      font-size: 1.1rem;
      color: #3a4374;
    }
    p {
      margin: 0.8rem auto;
      color: #647196;
      font-size: 1rem;
    }
    span {
      padding: 0.4rem;
      background-color: #f2f4fe;
      color: #3a4374;
      border-radius: 10px;
      font-weight: bold;
      font-size: 0.7rem;
    }
  }
}
.individual-event-container:hover {
  cursor: pointer;
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

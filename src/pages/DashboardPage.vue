<template>
  <div id="wrapper">
    <NoCreatedItems
      v-if="events.length === 0"
      :message="noCreatedEventsMessage"
      :callToAction="noCreatedEventsCallToAction"
      :routerLink="noCreatedEventsCallToActionLink"
    />

    <div v-if="events.length > 0" id="events-parent-container">
      <h2>Your Events</h2>

      <div
        v-for="item in events"
        v-bind:key="item.title"
        class="individual-event-container"
      >
        <router-link
          :to="{
            name: 'Event Detail Page',
            params: {
              userId: userId,
              eventId: item.id,
              editEvent: false,
              event: JSON.stringify(item),
            },
          }"
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
            <p style="display: none">{{ item.id }}</p>
            <span>{{ item.type }}</span>
            <div class="event-user-actions-parent-container">
              <span
                ><router-link
                  :to="{
                    name: 'Event Detail Page',
                    params: {
                      userId: userId,
                      eventId: item.id,
                      editEvent: true,
                      event: JSON.stringify(item),
                    },
                  }"
                >
                  <i class="fas fa-pen"></i> </router-link
              ></span>
              <span @click.prevent="showDeleteModal">
                <i class="fas fa-times-circle"></i
              ></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <DeleteModal
    v-if="displayDeleteModal"
    :title="deleteEventTitle"
    :uuid="deleteEventId"
    @close="displayDeleteModal = false"
  />
</template>

<script>
import axios from "axios";
import NoCreatedItems from "../components/NoCreatedItems";
import DeleteModal from "../components/DeleteModal";
export default {
  data() {
    return {
      events: [],
      invalidEventCreation: false,
      noCreatedEventsMessage: "You haven't created any events",
      noCreatedEventsCallToAction: "Create Event",
      noCreatedEventsCallToActionLink: "createEvent",
      errorMessage:
        "There was an error adding this event, not successfully created.",
      domesticDayColourHex: "#F49F85",
      domesticOvernightColourHex: "#AD1FEA",
      foreignOvernightColourHex: "#62BCFA",
      userId: null,
      displayDeleteModal: false,
      deleteEventTitle: "",
      deleteEventId: "",
    };
  },
  methods: {
    async getUserCreatedEvents() {
      const jwtToken = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      this.userId = userId;
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
    showDeleteModal(event) {
      console.log(event);
      this.deleteEventId = event.path[4].children[2].textContent;
      this.deleteEventTitle = event.path[4].children[0].textContent;
      this.displayDeleteModal = true;
    },
  },
  async created() {
    await this.getUserCreatedEvents();
  },
  components: {
    NoCreatedItems,
    DeleteModal,
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

  a {
    text-decoration: none;
  }

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
    margin: 1rem auto 0 auto;

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

    .event-user-actions-parent-container {
      display: flex;
      justify-content: space-between;
      margin: 1rem auto;
      svg {
        font-size: 1rem;
        padding: 0.2rem;
        color: #3a4374;
      }
      span {
        height: 100%;
      }
    }
  }
}
.individual-event-container:hover {
  cursor: pointer;
}
</style>

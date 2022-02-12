<template>
  <div id="wrapper">
    <UserInfoDisplay
      v-if="user"
      :user="user"
      :createdEventsQuantity="createdEvents.length"
      :invitedEventsQuantity="invitedEvents.length"
    />
    <NoCreatedItems
      v-if="createdEvents.length === 0"
      :message="noCreatedEventsMessage"
      :callToAction="noCreatedEventsCallToAction"
      :routerLink="noCreatedEventsCallToActionLink"
    />

    <div v-if="createdEvents.length > 0" class="events-parent-container">
      <h2>Your Created Events</h2>

      <div
        v-for="item in createdEvents"
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

    <div v-if="invitedEvents.length > 0" class="events-parent-container">
      <h2>Your Invited Events</h2>

      <div
        v-for="item in invitedEvents"
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
              <span>
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
                  <i class="fas fa-external-link-square-alt"></i>
                </router-link>
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <DeleteModal
    v-if="displayDeleteModal"
    :title="deleteEventTitle"
    :eventId="deleteEventId"
    :modalHeading="deleteEventModalHeading"
    @close="displayDeleteModal = false"
  />
</template>

<script>
import NoCreatedItems from "../components/NoCreatedItems";
import DeleteModal from "../components/DeleteModal";
import EventService from "../services/EventService";
import UserService from "../services/UserService";
import UserInfoDisplay from "../components/UserInfoDisplay";
const eventService = new EventService();
const userService = new UserService();
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      invalidEventCreation: false,
      errorMessage:
        "There was an error adding this event, not successfully created.",
      domesticDayColourHex: "#F49F85",
      domesticOvernightColourHex: "#AD1FEA",
      foreignOvernightColourHex: "#62BCFA",
      displayDeleteModal: false,
      user: null,
    };
  },
  computed: {
    ...mapGetters({
      noCreatedEventsMessage: "event/noCreatedEventsMessage",
      noCreatedEventsCallToAction: "event/noCreatedEventsCallToAction",
      noCreatedEventsCallToActionLink: "event/noCreatedEventsCallToActionLink",
      deleteEventModalHeading: "event/deleteEventModalHeading",
      deleteEventTitle: "event/deleteEventTitle",
      deleteEventId: "event/deleteEventId",
      createdEvents: "event/createdEvents",
      invitedEvents: "event/invitedEvents",
      userId: "userId",
    }),
  },
  methods: {
    async getUserCreatedEvents() {
      const response = await eventService.getUserEvents(this.userId);

      console.log(response);

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.$store.dispatch(
          "event/populateUserCreatedEvents",
          response.data.created
        );
        this.$store.dispatch(
          "event/populateUserInvitedEvents",
          response.data.invited
        );
      }
    },
    async getUserInfo() {
      const response = await userService.getUser(this.userId);

      if ("error" in response) {
        console.log("Invalid");
      } else {
        this.user = response.data;
      }
    },
    showDeleteModal(event) {
      this.$store.dispatch("event/populateDeleteModal", {
        deleteEventTitle: event.path[4].children[0].textContent,
        deleteEventId: event.path[4].children[2].textContent,
      });

      this.displayDeleteModal = true;
    },
  },
  async created() {
    await this.getUserInfo();
    await this.getUserCreatedEvents();
  },
  components: {
    NoCreatedItems,
    DeleteModal,
    UserInfoDisplay,
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;

  @include for-phone-only {
    min-height: 100vh;
  }
}

h2 {
  width: 82%;
  margin-top: 2rem;
}
.events-parent-container {
  width: 85%;

  margin: 1rem auto;

  @include for-phone-only {
    width: 90%;
  }

  h2 {
    margin-left: 1rem;
  }
}
.individual-event-container {
  width: 30%;
  height: 28vh;
  display: inline-block;
  margin: 1rem 1.2rem;
  border-radius: 5px;
  background-color: #ffffff;

  @include for-phone-only {
    width: 90%;
    height: 30vh;
  }

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

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

      <DashboardEventItems
        :events="createdEvents"
        :userUuid="userId"
        :createdEvents="true"
        v-on:showDeleteModal="showDeleteModal"
      />
    </div>

    <div v-if="invitedEvents.length > 0" class="events-parent-container">
      <h2>Your Invited Events</h2>

      <DashboardEventItems
        :events="createdEvents"
        :userUuid="userId"
        :createdEvents="false"
      />
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
import eventService from "../services/EventService";
import userService from "../services/UserService";
import UserInfoDisplay from "../components/UserInfoDisplay";
import DashboardEventItems from "../components/DashboardEventItems";

import { mapGetters } from "vuex";
export default {
  props: {
    userService: {
      default: userService,
    },
    eventService: {
      default: eventService,
    },
  },
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
      const response = await this.eventService.getUserEvents(this.userId);

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
      const response = await this.userService.getUser(this.userId);

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
    DashboardEventItems,
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
</style>

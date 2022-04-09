<template>
  <div id="wrapper">
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :loader="loaderType"
      :lock-scroll="true"
      :opacity="loaderOpacity"
      :color="loaderColour"
    />
    <Toast v-if="displayToast" :message="toastMessage" />
    <EventForm
      v-if="showEditForm"
      :edit="this.edit"
      :individualEvent="this.individualEvent"
      @hideEditEventActionClick="this.hideEditForm"
    />
    <EventOverview
      v-else-if="showEditForm == false && showEventInfo"
      :individualEvent="this.individualEvent"
      :invitedUser="this.invitedUser"
      :itineraryCreated="itineraryAlreadyCreated"
      :itineraryCompleted="itineraryCompleted"
      :pollCompleted="mostVotedPollOption"
      :key="eventOverviewKey"
      @editActionClick="editEventInfo"
    />

    <EventItinerary
      v-if="
        mostVotedPollOption &&
        individualEvent &&
        checkedAccommodation &&
        checkedFlight
      "
      :accommodation="checkedAccommodation"
      :flight="checkedFlight"
      :activities="checkedThingsToDo"
      :eventId="eventId"
      :city="this.individualEvent.city"
      :editItinerary="itineraryAlreadyCreated"
      :key="eventItineraryKey"
      v-on:editItineraryClick="editItineraryButtonClick"
      v-on:removeItineraryAccommodationClick="removeItineraryAccommodation"
      v-on:removeItineraryFlightsClick="removeItineraryFlights"
      v-on:removeItineraryActivityClick="removeItineraryActivity"
      v-on:itineraryRequest="showLoader"
      v-on:showToast="showToast"
      :editItineraryClick="editItineraryClick"
      :itemType="individualEvent.type"
      :guestUserCheck="invitedUser"
      :complete="itineraryCompleted"
      :displayFinaliseCheckbox="showFinaliseItineraryCheck"
    />

    <NoCreatedItems
      v-if="polls.length === 0 && noCreatedPollsCallToActionLink.length > 0"
      :message="noCreatedPollsMessage"
      :callToAction="noCreatedPollsCallToAction"
      :invitedUser="this.invitedUser"
      :routerLink="noCreatedPollsCallToActionLink"
    />

    <h2 v-if="showEventChat">Comments</h2>
    <ChatMessagesDisplay
      v-if="messages.length > 0 && userId && onlineUsers && showEventChat"
      v-on:deleteComment="deleteComment"
      :chatMessages="messages"
      :userId="userId"
      :onlineUsers="onlineUsers"
      :key="chatIndex"
    />

    <h2>Users Online</h2>
    <ChatOnlineUsers
      v-if="onlineUsers && this.individualEvent"
      :eventUsers="this.individualEvent.invitedUsers"
      :onlineUsers="onlineUsers"
      :key="chatIndex"
      v-on:showEventChat="toggleEventChat"
    />

    <ChatMessagesInput v-if="showEventChat" v-on:addComment="addComment" />

    <div id="polls-display-parent-container" v-if="polls.length > 0">
      <h2>Event Polls</h2>

      <PollsOverview
        v-if="polls && mostVotedPollOption !== null"
        :topVotedOption="mostVotedPollOption"
        :pollItems="polls"
        :userUuid="userId"
        :individualEventId="eventId"
        :guestUser="invitedUser"
        v-on:showDeleteModal="showDeleteModal"
      />
    </div>
    <EventDetailInfoSectionPlaceholder
      v-if="!displayAccommodation && mostVotedPollOption"
      :title="accommodationSectionTitle"
      :icon="accommodationSectionIcon"
      :key="accommodationSectionKey"
      v-on:showScrapedInfo="toggleEventDetailInfo"
    />

    <div
      class="scraped-info-wrapper"
      v-if="displayAccommodation && mostVotedPollOption"
    >
      <EventDetailInfoToggleTableDisplay
        v-on:toggleEventDetailInfo="toggleEventDetailInfo"
        infoType="Accommodation"
      />

      <EventDetailInfoAccommodationTable
        v-if="accommodationInfo && accommodationDateRange"
        :accommodation="accommodationInfo"
        :checkedAccommodation="checkedAccommodation"
        :dateRange="accommodationDateRange"
        :key="accommodationTableKey"
        v-on:checkedAccommodationChange="checkedAccommodationChange"
      />
    </div>

    <EventDetailInfoSectionPlaceholder
      v-if="!displayActivities && mostVotedPollOption"
      :title="activitySectionTitle"
      :icon="activitySectionIcon"
      :key="activitySectionKey"
      v-on:showScrapedInfo="toggleEventDetailInfo"
    />

    <div
      class="scraped-info-wrapper"
      v-if="
        individualEvent &&
        googlePlacesInfo &&
        displayActivities &&
        mostVotedPollOption
      "
    >
      <EventDetailInfoToggleTableDisplay
        v-on:toggleEventDetailInfo="toggleEventDetailInfo"
        infoType="Tourist Attractions"
      />

      <EventDetailInfoActivitiesTable
        v-if="googlePlacesInfo.length > 0 && individualEvent"
        v-on:checkedActivityChange="checkedThingToDoChange"
        :activitiesInfo="googlePlacesInfo"
        :eventCity="individualEvent.city"
        :checkedThingsToDo="checkedThingsToDo"
        :activityTableKey="activityTableKey"
      />
    </div>

    <EventDetailInfoSectionPlaceholder
      v-if="
        !displayFlights &&
        individualEvent.type === 'FOREIGN_OVERNIGHT' &&
        mostVotedPollOption
      "
      :title="flightsSectionTitle"
      :icon="flightsSectionIcon"
      :key="flightSectionKey"
      v-on:showScrapedInfo="toggleEventDetailInfo"
    />

    <div
      class="scraped-info-wrapper"
      v-if="flightInfo && displayFlights && mostVotedPollOption"
    >
      <h2>Flight Results</h2>

      <EventDetailInfoToggleTableDisplay
        infoType="Flights"
        v-on:toggleEventDetailInfo="toggleEventDetailInfo"
      />

      <EventDetailInfoFlightsTable
        v-if="flightInfo"
        :flights="flightInfo"
        :mobile="mobileCheck"
        v-on:checkedFlightChange="checkedFlightChange"
        :checkedFlight="checkedFlight"
        :key="flightsTablekey"
      />
    </div>
    <transition name="modal-transition">
      <DeleteModal
        v-if="displayDeleteModal"
        :title="deletePollTitle"
        :eventId="this.eventId"
        :pollId="this.pollId"
        :modalHeading="deletePollModalHeading"
        @close="displayDeleteModal = false"
      />
    </transition>
  </div>
</template>

<script>
import EventForm from "../components/EventForm";
import EventOverview from "../components/EventOverview";
import NoCreatedItems from "../components/NoCreatedItems";
import DeleteModal from "../components/DeleteModal";
import EventItinerary from "../components/EventItinerary";
import StringUtils from "../utils/stringUtils";
import EventDetailInfoSectionPlaceholder from "../components/EventDetailInfoSectionPlaceholder";
import { mapGetters } from "vuex";
import WebSocketService from "../services/WebSocketService.js";
import ChatMessagesDisplay from "../components/ChatMessagesDisplay";
import ChatMessagesInput from "../components/ChatMessagesInput";
import ChatOnlineUsers from "../components/ChatOnlineUsers";
import PollsOverview from "../components/PollsOverview";
import EventDetailInfoToggleTableDisplay from "../components/EventDetailInfoToggleTableDisplay";
import EventDetailInfoAccommodationTable from "../components/EventDetailInfoAccommodationTable";
import EventDetailInfoFlightsTable from "../components/EventDetailInfoFlightsTable";
import EventDetailInfoActivitiesTable from "../components/EventDetailInfoActivitiesTable";
import eventService from "../services/EventService";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Toast from "../components/Toast";
export default {
  name: "eventDetailPage",
  props: {
    editEvent: Boolean,
    eventService: {
      default: eventService,
    },
  },
  data() {
    return {
      showEditForm: false,
      edit: this.editEvent,
      polls: [],
      noCreatedPollsMessage: "No polls have been created yet for this event.",
      noCreatedPollsCallToAction: "Create Poll",
      noCreatedPollsCallToActionLink: "",
      displayDeleteModal: false,
      deletePollTitle: "",
      deletePollModalHeading: "Poll",
      pollId: null,
      showEventInfo: false,
      eventId: "",
      invitedUser: null,
      accommodationInfo: null,
      page: 1,
      checkedAccommodation: [],
      acommodationDateRange: null,
      flightInfo: null,
      checkedFlight: [[]],
      mostVotedPollOption: null,
      eventItineraryKey: 0,
      itineraryAlreadyCreated: false,
      editItineraryClick: false,
      itineraryCompleted: null,
      showFinaliseItineraryCheck: false,
      googlePlacesInfo: [],
      checkedThingsToDo: [],
      accommodationSectionTitle: "Accommodation",
      accommodationSectionIcon: "fas fa-home",
      accommodationSectionKey: 0,
      activitySectionTitle: "Tourist Attractions",
      activitySectionIcon: "fas fa-landmark",
      flightsSectionTitle: "Flights",
      flightsSectionIcon: "fas fa-plane",
      flightsSectionKey: 0,
      displayFlights: false,
      displayAccommodation: false,
      displayActivities: false,
      activitiesSectionKey: 0,
      messages: [],
      socket: null,
      memberOfChatRoom: null,
      message: "",
      onlineUsers: [],
      chatIndex: 0,
      showEventChat: false,
      isLoading: true,
      fullPage: true,
      loaderType: "dots",
      loaderColour: "#0384ff",
      loaderOpacity: 1,
      eventOverviewKey: 0,
      displayToast: false,
      toastMessage: "",
      accommodationTableKey: 0,
      activityTableKey: 0,
      flightsTablekey: 0,
    };
  },
  computed: {
    ...mapGetters({
      individualEvent: "event/individualEvent",
      userId: "userId",
      userEmail: "userEmail",
      jwt: "jwt",
    }),
    mobileCheck() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
  },
  watch: {
    checkedAccommodation: function () {
      this.eventItineraryKey++;
    },
  },
  components: {
    EventDetailInfoSectionPlaceholder,
    EventForm,
    EventItinerary,
    EventOverview,
    NoCreatedItems,
    DeleteModal,
    ChatMessagesDisplay,
    ChatMessagesInput,
    ChatOnlineUsers,
    PollsOverview,
    EventDetailInfoToggleTableDisplay,
    EventDetailInfoAccommodationTable,
    EventDetailInfoFlightsTable,
    EventDetailInfoActivitiesTable,
    Loading,
    Toast,
  },
  methods: {
    async checkEditAction() {
      if (this.edit === "true") {
        this.showEditForm = true;
      }
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    editEventInfo(value) {
      this.showEditForm = value;
    },
    hideEditForm(value) {
      this.showEditForm = value;
    },
    async extractIdFromUrl() {
      this.eventId = window.location.pathname.split("/")[3];
    },
    async getEventInfo() {
      const response = await this.eventService.getIndividualEvent(
        this.eventId,
        this.jwt
      );
      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        const event = response.data[0];

        if (event["createdByUser"].id === this.userId) {
          this.invitedUser = false;
        } else {
          this.invitedUser = true;
        }

        this.noCreatedPollsCallToActionLink = `${response.data[0].id}/poll`;

        this.$store.dispatch("event/setIndividualEvent", event);

        this.showEventInfo = true;
        this.polls = response.data[0].polls;

        let pollCompletionCheck = response.data[0].polls.filter(
          (poll) => poll.completed === true
        );
        if (pollCompletionCheck.length > 0) {
          this.mostVotedPollOption = pollCompletionCheck[0].pollOptions.reduce(
            function (prev, current) {
              return prev.y > current.y ? prev : current;
            }
          );

          await this.getEventItinerary();

          this.eventItineraryKey++;
        } else {
          this.mostVotedPollOption = undefined;
        }
      }
      this.isLoading = false;
    },

    async getEventItinerary() {
      const response = await this.eventService.getIndividualEventItinerary(
        this.eventId,
        this.jwt
      );

      if (response.status === 200) {
        if (response.data !== "") {
          this.checkedAccommodation = response.data.accommodation;
          this.checkedThingsToDo = response.data.activities;
          this.checkedFlight[0] = response.data.flight;
          this.itineraryAlreadyCreated = true;
          this.itineraryCompleted = response.data.completed;
          this.eventOverviewKey++;
        }
      }
    },

    async getEventAccommodationInfo(startDate, endDate) {
      this.isLoading = true;
      const response = await this.eventService.getAccommodationInformation(
        this.eventId,
        startDate,
        endDate,
        this.jwt
      );

      this.isLoading = false;

      if (response.status === 200) {
        this.accommodationInfo = response.data.resultPages;
        this.accommodationDateRange =
          response.data.resultPages[1][0].startDate +
          " - " +
          response.data.resultPages[1][0].endDate;
      }
    },

    async getEventFlightInfo(startDate, endDate) {
      this.isLoading = true;
      const response = await this.eventService.getFlightInformation(
        this.eventId,
        startDate,
        endDate,
        this.jwt
      );

      this.isLoading = false;

      if (response.status === 200) {
        this.flightInfo = response.data;
      }
    },
    async getEventPlacesInfo(latitude, longitude) {
      this.isLoading = true;
      const response = await this.eventService.getActivityInformation(
        this.eventId,
        latitude,
        longitude,
        this.jwt
      );

      this.isLoading = false;

      if (response.status === 200) {
        this.googlePlacesInfo = response.data.results;
      }
    },
    showDeleteModal(item) {
      this.deletePollTitle = item.title;
      this.pollId = item.id;
      this.displayDeleteModal = true;
    },
    checkedFlightChange(value) {
      this.checkedFlight = [];
      this.checkedFlight.push(value.item);
      this.eventItineraryKey++;
      this.flightsTablekey++;
    },
    checkedAccommodationChange(value) {
      if (value.event.target.checked) {
        this.checkedAccommodation = [];
        this.checkedAccommodation.push(value.item);
        this.accommodationTableKey++;

        this.eventItineraryKey++;
      } else {
        this.checkedAccommodation = [];
      }
    },
    checkedThingToDoChange(value) {
      if (
        value.event.target.checked &&
        this.checkedThingsToDo.filter(
          (activity) => activity.name === value.item.name
        ).length === 0
      ) {
        this.checkedThingsToDo.push({
          name: value.item.name,
          placesId: value.item.place_id,
          mapLink: this.extractLink(value.item.photos[0].html_attributions[0]),
          rating: value.item.rating,
          user_ratings_total: value.item.user_ratings_total,
          vicinity: value.item.vicinity,
        });
      } else if (!value.event.target.checked) {
        this.checkedThingsToDo = this.checkedThingsToDo.filter(
          (activity) => activity.name !== value.item.name
        );
      }
      this.activityTableKey++;
      this.eventItineraryKey++;
    },
    editItineraryButtonClick() {
      this.editItineraryClick = !this.editItineraryClick;
      this.showFinaliseItineraryCheck = !this.showFinaliseItineraryCheck;
      this.eventItineraryKey++;
    },
    removeItineraryAccommodation() {
      this.checkedAccommodation = [];
    },
    removeItineraryFlights() {
      this.checkedFlight = [[]];
      this.eventItineraryKey++;
    },
    removeItineraryActivity(value) {
      this.checkedThingsToDo = this.checkedThingsToDo.filter(
        (activity) => activity.name !== value
      );
      this.eventItineraryKey++;
    },
    extractLink(link) {
      let extractedLink = StringUtils.extractGoogleMapLink(link);
      return extractedLink;
    },
    async toggleEventDetailInfo(value) {
      console.log(value);
      if (value === "Accommodation") {
        if (this.mostVotedPollOption && !this.accommodationInfo) {
          await this.getEventAccommodationInfo(
            this.mostVotedPollOption.startDate,
            this.mostVotedPollOption.endDate
          );
        }
        this.displayAccommodation = !this.displayAccommodation;
        this.accommodationSectionKey++;
      } else if (value === "Tourist Attractions") {
        if (
          this.mostVotedPollOption &&
          this.individualEvent &&
          this.googlePlacesInfo.length === 0
        ) {
          await this.getEventPlacesInfo(
            this.individualEvent.cityLatitude,
            this.individualEvent.cityLongitude
          );
        }

        this.displayActivities = !this.displayActivities;
        this.activitiesSectionKey++;
      } else if (value === "Flights") {
        if (this.mostVotedPollOption && !this.flightInfo) {
          await this.getEventFlightInfo(
            this.mostVotedPollOption.startDate,
            this.mostVotedPollOption.endDate
          );
        }
        this.displayFlights = !this.displayFlights;
        this.flightsSectionKey++;
      }
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
    receiveSocketMessage(message) {
      this.messages.push({
        author: {
          id: message.author.id,
          email: message.author.email,
          profileImageUrl: message.author.profileImageUrl,
        },
        content: message.content,
        created_at: message.created_at,
      });
    },
    initialLoadSocketMessages(messages) {
      if (this.messages.length === 0) {
        this.messages = messages;
      }
    },
    initialLoadSocketOnlineUsers(users) {
      if (this.onlineUsers.length === 0) {
        this.onlineUsers = users;
      }
    },
    addComment(value) {
      if (value.length > 0) {
        this.socket.emit("messageToServer", {
          author: this.userEmail,
          content: value,
          room: this.eventId,
        });
      }
    },
    deleteComment(value) {
      this.socket.emit("deleteChatMessage", {
        messageId: value,
        room: this.eventId,
      });
    },
    socketMessageCommentDeletion(messageId) {
      this.messages.splice(
        this.messages.findIndex((message) => message.id === messageId),
        1
      );
    },
    joinChatRoom() {
      if (!this.memberOfChatRoom) {
        this.socket.emit("joinChatRoom", {
          room: this.eventId,
          user: this.userEmail,
        });
        this.socket.emit("requestAllEventChatMessages", {
          room: this.eventId,
        });
      }
    },
    requestOnlineMembers() {
      this.socket.emit("requestAllEventOnlineUsers", {
        room: this.eventId,
      });
    },
    toggleEventChat() {
      this.showEventChat = !this.showEventChat;
    },
    showLoader(value) {
      this.isLoading = value;
    },
    showToast(value) {
      this.displayToast = value.boolean;
      if (value.edit === true) {
        this.toastMessage = "Successfully updated itinerary.";
      } else if (value.edit === "") {
        this.toastMessage = "Successfully deleted itinerary.";
      } else {
        this.toastMessage = "Successfully created itinerary.";
      }
      setTimeout(() => (this.displayToast = false), 5000);
    },
  },
  async created() {
    await this.extractIdFromUrl();
    this.socket = WebSocketService.createSocketConnection(this.userEmail);

    this.socket.on("messageToClient", (message) => {
      this.receiveSocketMessage(message);
    });
    this.joinChatRoom();
    this.requestOnlineMembers();
    this.socket.on("userChange", (message) => {
      this.memberOfChatRoom = message.room;

      this.onlineUsers = message.onlineUsers;
      this.chatIndex++;
    });

    this.socket.on("allEventChatMessages", (messages) => {
      this.initialLoadSocketMessages(messages);
    });

    this.socket.on("allEventOnlineUsers", (users) => {
      this.initialLoadSocketOnlineUsers(users);
    });

    this.socket.on("chatMessageDeleted", (messageId) => {
      this.socketMessageCommentDeletion(messageId);
    });

    await this.getEventInfo();
    await this.checkEditAction();
  },

  beforeRouteLeave(to, from, next) {
    WebSocketService.disconnect();
    this.chatIndex++;

    next();
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
}
h2 {
  text-align: left;
  width: 85%;
}
#polls-display-parent-container {
  width: 85%;
  margin: 1rem auto;

  @include for-phone-only {
    width: 90%;
    margin: 1rem;
  }
}

.scraped-info-wrapper {
  margin: 25px 0;
  width: 85%;

  @include for-phone-only {
    width: 90%;
  }
}

.toast-enter-active {
  animation: toast 0.5s ease;
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
}
@keyframes toast {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
    opacity: 1;
  }
  70% {
    transform: translateX(-8px);
    opacity: 1;
  }
  80% {
    transform: translateX(4px);
    opacity: 1;
  }
  90% {
    transform: translateX(-4px);
    opacity: 1;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

.modal-transition-enter-active {
  animation: modal-animation 0.3s ease-out;
}

.modal-transition-leave-active {
  animation: modal-animation 0.3s ease-in;
}

@keyframes modal-animation {
  from {
    opacity: 0;
    transform: translateY(0) scale(1);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

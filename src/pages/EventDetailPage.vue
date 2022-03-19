<template>
  <div id="wrapper">
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

    <h2>Comments</h2>
    <ChatMessagesDisplay
      v-if="messages.length > 0 && userId && onlineUsers"
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
    />

    <ChatMessagesInput v-on:addComment="addComment" />

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
      v-if="!displayAccommodation"
      :title="accommodationSectionTitle"
      :icon="accommodationSectionIcon"
      :key="accommodationSectionKey"
      v-on:showScrapedInfo="toggleEventDetailInfo"
    />

    <div class="scraped-info-wrapper" v-if="displayAccommodation">
      <EventDetailInfoToggleTableDisplay
        v-on:toggleEventDetailInfo="toggleEventDetailInfo"
        infoType="Accommodation"
      />

      <EventDetailInfoAccommodationTable
        v-if="accommodationInfo"
        :accommodation="accommodationInfo"
        :dateRange="accommodationDateRange"
        v-on:checkedAccommodationChange="checkedAccommodationChange"
      />
    </div>

    <EventDetailInfoSectionPlaceholder
      v-if="!displayActivities"
      :title="activitySectionTitle"
      :icon="activitySectionIcon"
      :key="activitySectionKey"
      v-on:showScrapedInfo="toggleEventDetailInfo"
    />

    <div
      class="scraped-info-wrapper"
      v-if="individualEvent && googlePlacesInfo && displayActivities"
    >
      <EventDetailInfoToggleTableDisplay
        v-on:toggleEventDetailInfo="toggleEventDetailInfo"
        infoType="Tourist Attractions"
      />
      <table
        id="tourist-attractions-information-table"
        class="web-scraped-info-parent-container"
      >
        <caption>
          Tourist Attractions in
          {{
            individualEvent.city
          }}
        </caption>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Address</th>
            <th>Review Score</th>
            <th>Review Quantity</th>
            <th>Map</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="value in googlePlacesInfo" v-bind:key="value">
            <td>
              <input
                type="checkbox"
                :value="value"
                @change="checkedThingToDoChange($event, value)"
              />
            </td>

            <td>{{ value.name }}</td>
            <td>{{ value.vicinity }}</td>
            <td>{{ value.rating }}</td>
            <td>{{ value.user_ratings_total }}</td>
            <td>
              <a :href="extractLink(value.photos[0].html_attributions[0])">
                <i class="fas fa-map-marker-alt"></i>
              </a>
            </td>
            <td><img :src="value.icon" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <EventDetailInfoSectionPlaceholder
      v-if="!displayFlights && individualEvent.type === 'FOREIGN_OVERNIGHT'"
      :title="flightsSectionTitle"
      :icon="flightsSectionIcon"
      :key="flightSectionKey"
      v-on:showScrapedInfo="toggleEventDetailInfo"
    />

    <div class="scraped-info-wrapper" v-if="flightInfo && displayFlights">
      <h2>Flight Results</h2>

      <EventDetailInfoToggleTableDisplay
        infoType="Flights"
        v-on:toggleEventDetailInfo="toggleEventDetailInfo"
      />
      <table
        id="flight-information-table"
        class="web-scraped-info-parent-container"
        v-for="value in flightInfo"
        v-bind:key="value"
        @change="checkedFlightChange(value)"
      >
        <thead>
          <tr>
            <th></th>
            <th>Airport</th>
            <th>Flight Date</th>

            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Duration</th>
            <th>Carrier</th>
            <th>Return Price Per Person</th>
            <th>Total Return Price</th>
            <th>Link</th>
          </tr>
        </thead>

        <tbody>
          <tr
            id="mobile-flight-overview-row"
            v-for="(item, key) of value"
            :key="key"
          >
            <td v-if="key === 0 && isMobile()" rowspan="2">
              <input type="checkbox" :value="item" />
            </td>
            <td v-if="key === 0 && isMobile()" rowspan="2">
              {{ item.pricePerPerson }}
            </td>
            <td v-if="key === 0 && isMobile()" rowspan="2">
              {{ item.priceTotal }}
            </td>
            <td v-if="key === 0 && isMobile()" rowspan="2">
              <a :href="item.flightUrl" target="_blank">
                <i class="fas fa-external-link-square-alt"></i>
              </a>
            </td>
          </tr>
          <tr v-for="(item, key) of value" :key="key">
            <td v-if="key === 0 && !isMobile()" rowspan="2">
              <input type="checkbox" :value="item" />
            </td>

            <td>{{ item.airport }}</td>
            <td v-if="key === 0">
              {{ item.startDate }}
            </td>
            <td v-else>
              {{ item.endDate }}
            </td>
            <td>{{ item.departureTime }}</td>
            <td>{{ item.arrivalTime }}</td>
            <td>{{ item.duration }}</td>
            <td>{{ item.carrier }}</td>
            <td v-if="key === 0 && !isMobile()" rowspan="2">
              {{ item.pricePerPerson }}
            </td>

            <td v-if="key === 0 && !isMobile()" rowspan="2">
              {{ item.priceTotal }}
            </td>

            <td v-if="key === 0 && !isMobile()" rowspan="2">
              <a :href="item.flightUrl" target="_blank">
                <i class="fas fa-external-link-square-alt"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DeleteModal
      v-if="displayDeleteModal"
      :title="deletePollTitle"
      :eventId="this.eventId"
      :pollId="this.pollId"
      :modalHeading="deletePollModalHeading"
      @close="displayDeleteModal = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import EventForm from "../components/EventForm";
import EventOverview from "../components/EventOverview";
import NoCreatedItems from "../components/NoCreatedItems";
import DeleteModal from "../components/DeleteModal";
import EventItinerary from "../components/EventItinerary";
import StringUtils from "../utils/stringUtils";
import EventDetailInfoSectionPlaceholder from "../components/EventDetailInfoSectionPlaceholder";
//Using test data to construct UI to save on API
import data from "../components/googleplaces_response.json";
import { mapGetters } from "vuex";
import WebSocketService from "../services/WebSocketService.js";
import ChatMessagesDisplay from "../components/ChatMessagesDisplay";
import ChatMessagesInput from "../components/ChatMessagesInput";
import ChatOnlineUsers from "../components/ChatOnlineUsers";
import PollsOverview from "../components/PollsOverview";
import EventDetailInfoToggleTableDisplay from "../components/EventDetailInfoToggleTableDisplay";
import EventDetailInfoAccommodationTable from "../components/EventDetailInfoAccommodationTable";
export default {
  name: "eventDetailPage",
  props: ["editEvent"],
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
    };
  },
  computed: {
    ...mapGetters({
      individualEvent: "event/individualEvent",
      userId: "userId",
      userEmail: "userEmail",
    }),
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
  },
  methods: {
    async checkEditAction() {
      if (this.edit === "true") {
        this.showEditForm = true;
      }
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
      const jwtToken = localStorage.getItem("token");
      const response = await axios
        .get("http://localhost:3000/events/" + this.eventId, {
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

          //Commenting out to save on API calls
          /*await this.getEventPlacesInfo(
            this.individualEvent.cityLatitude,
            this.individualEvent.cityLongitude
          );*/

          this.eventItineraryKey++;
        } else {
          this.mostVotedPollOption = undefined;
        }
      }
    },

    async getEventItinerary() {
      const jwtToken = localStorage.getItem("token");

      const response = await axios
        .get(`http://localhost:3000/events/${this.eventId}/itinerary`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .catch((error) => {
          return { error };
        });

      if (response.status === 200) {
        if (response.data !== "") {
          this.checkedAccommodation = response.data.accommodation;
          this.checkedThingsToDo = response.data.activities;
          this.checkedFlight[0] = response.data.flight;
          this.itineraryAlreadyCreated = true;
          this.itineraryCompleted = response.data.completed;
        }
      }
    },

    async getEventAccommodationInfo(startDate, endDate) {
      const jwtToken = localStorage.getItem("token");

      const response = await axios
        .get(
          `http://localhost:3000/events/${this.eventId}/accommodation?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .catch((error) => {
          return { error };
        });

      if (response.status === 200) {
        this.accommodationInfo = response.data.resultPages;
        this.accommodationDateRange =
          response.data.resultPages[1][0].startDate +
          " - " +
          response.data.resultPages[1][0].endDate;
      }
    },

    async getEventFlightInfo(startDate, endDate) {
      const jwtToken = localStorage.getItem("token");

      const response = await axios
        .get(
          `http://localhost:3000/events/${this.eventId}/flights?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .catch((error) => {
          return { error };
        });

      if (response.status === 200) {
        this.flightInfo = response.data;
      }
    },
    async getEventPlacesInfo(latitude, longitude) {
      const jwtToken = localStorage.getItem("token");

      const response = await axios
        .get(
          `http://localhost:3000/events/${this.eventId}/places?latitude=${latitude}&longitude=${longitude}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .catch((error) => {
          return { error };
        });

      if (response.status === 200) {
        this.googlePlacesInfo = response.data.results;
      }
    },
    showDeleteModal(event) {
      this.deletePollTitle =
        event.path[3].children[0].childNodes[0].childNodes[1].textContent;
      this.pollId =
        event.path[3].children[0].children[0].children[3].textContent;
      this.displayDeleteModal = true;
    },
    checkedFlightChange(value) {
      this.checkedFlight = [];
      this.checkedFlight.push(value);
      this.eventItineraryKey++;
    },
    checkedAccommodationChange(value) {
      if (value.event.target.checked) {
        this.checkedAccommodation = [];
        this.checkedAccommodation.push(value.item);

        this.eventItineraryKey++;
      } else {
        this.checkedAccommodation = [];
      }
    },
    checkedThingToDoChange(event, value) {
      if (
        event.target.checked &&
        this.checkedThingsToDo.filter(
          (activity) => activity.name === value.name
        ).length === 0
      ) {
        this.checkedThingsToDo.push({
          name: value.name,
          placesId: value.place_id,
          mapLink: this.extractLink(value.photos[0].html_attributions[0]),
          rating: value.rating,
          user_ratings_total: value.user_ratings_total,
          vicinity: value.vicinity,
        });
      } else if (!event.target.checked) {
        this.checkedThingsToDo = this.checkedThingsToDo.filter(
          (activity) => activity.name !== value.name
        );
      }

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
          !this.googlePlacesInfo
        ) {
          //Commenting out to save on API calls
          /*await this.getEventPlacesInfo(
            this.individualEvent.cityLatitude,
            this.individualEvent.cityLongitude
          );*/
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
  },
  async created() {
    await this.extractIdFromUrl();
    this.googlePlacesInfo = data.results;
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
  width: 80%;
}
#polls-display-parent-container {
  width: 80%;
  margin: 1rem auto;

  @include for-phone-only {
    width: 90%;
    margin: 1rem;
  }
}

.scraped-info-wrapper {
  margin: 25px 0;
  width: 80%;

  @include for-phone-only {
    width: 90%;
  }
}

.web-scraped-info-parent-container {
  overflow-x: auto;
  border-collapse: collapse;
  margin: 0.8rem auto;
  width: 100%;

  font-size: 0.9em;
  font-family: sans-serif;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  caption {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    margin: 1rem 0;
    align-items: center;

    @include for-phone-only {
      display: block;
      font-size: 1rem;
      text-align: center;
    }
  }

  thead {
    background-color: #373f68;
    color: white;
    text-align: left;

    th {
      padding: 12px 15px;
    }
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  td {
    padding: 12px 15px;

    @include for-phone-only {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50% !important;
    }
  }

  td table {
    margin: -2px;
    width: calc(100% + 4px);
  }

  td img {
    height: 1.5rem;
  }

  @include for-phone-only {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      border: 1px solid #ccc;
    }

    td:before {
      position: absolute;
      top: 0px;
      left: 6px;
      width: 45%;
      font-weight: bold;
      padding: 12px 0px 12px 15px;
      white-space: nowrap;
    }
  }
}
@include for-phone-only {
  #tourist-attractions-information-table {
    td:nth-of-type(1):before {
      content: "Select";
    }

    td:nth-of-type(2):before {
      content: "Title";
    }
    td:nth-of-type(3):before {
      content: "Address";
    }
    td:nth-of-type(4):before {
      content: "Review Score";
    }
    td:nth-of-type(5):before {
      content: "Review Quantity";
    }
    td:nth-of-type(6):before {
      content: "Map";
    }
    td:nth-of-type(7):before {
      content: "Icon";
    }
  }
}

#flight-information-table {
  #mobile-flight-overview-row {
    display: none;
  }
}
@include for-phone-only {
  #flight-information-table {
    #mobile-flight-overview-row {
      display: block;
      background-color: #373f68;
      color: #ffffff;

      svg {
        color: white;
      }

      td:nth-of-type(1):before {
        content: "Select";
      }
      td:nth-of-type(2):before {
        content: "Price Per Person";
      }
      td:nth-of-type(3):before {
        content: "Total Price";
      }
      td:nth-of-type(4):before {
        content: "Flight Link";
      }
    }
    td:nth-of-type(1):before {
      content: "Airport";
    }
    td:nth-of-type(2):before {
      content: "Date";
    }
    td:nth-of-type(3):before {
      content: "Departure Time";
    }
    td:nth-of-type(4):before {
      content: "Arrival Time";
    }
    td:nth-of-type(5):before {
      content: "Duration";
    }
    td:nth-of-type(6):before {
      content: "Carrier";
    }
  }
}
</style>

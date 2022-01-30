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
      :eventId="eventId"
      :city="this.individualEvent.city"
      :editItinerary="itineraryAlreadyCreated"
      :key="eventItineraryKey"
      v-on:editItineraryClick="editItineraryButtonClick"
      v-on:removeItineraryAccommodationClick="removeItineraryAccommodation"
      v-on:removeItineraryFlightsClick="removeItineraryFlights"
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

    <div id="polls-display-parent-container" v-if="polls.length > 0">
      <h2>Event Polls</h2>
      <div
        class="individual-poll-container"
        v-for="poll in polls"
        :key="poll.id"
      >
        <div class="poll-info-parent-container">
          <div class="poll-info-container">
            <h3>Title</h3>
            {{ poll.title }}
            <h3 v-if="mostVotedPollOption">Most Suitable Start Date</h3>
            <p v-if="mostVotedPollOption">
              {{ formatDate(mostVotedPollOption.startDate) }}
            </p>
            <h3 style="display: none">
              {{ poll.id }}
            </h3>
          </div>
          <div class="poll-info-container">
            <h3>Created</h3>
            {{ transformTimeStampFormat(new Date(poll.created_at)) }}
            <h3 v-if="mostVotedPollOption">Most Suitable End Date</h3>
            <p v-if="mostVotedPollOption">
              {{ formatDate(mostVotedPollOption.endDate) }}
            </p>
          </div>

          <div class="poll-info-container">
            <h3>Updated</h3>
            {{ transformTimeStampFormat(new Date(poll.updated_at)) }}
            <h3 v-if="mostVotedPollOption">Number of Votes</h3>
            <p v-if="mostVotedPollOption">
              {{ mostVotedPollOption.votes.length }}
            </p>
          </div>

          <div class="poll-info-container">
            <h3>Complete</h3>

            <span id="pollCompletedIcon" v-if="poll.completed">
              <i class="fas fa-calendar-check"></i>
            </span>
            <span id="pollNotCompletedIcon" v-else>
              <i class="fas fa-calendar-times"></i>
            </span>
          </div>
        </div>

        <div class="poll-call-to-action-container">
          <span>
            <router-link
              :to="{
                name: 'Take Poll Page',
                params: {
                  userId: userId,
                  eventId: this.eventId,
                  pollId: poll.id,
                },
              }"
            >
              <i class="fas fa-check-circle"></i> </router-link
          ></span>
          <span v-if="!invitedUser" v-on:click="$emit('editActionClick', true)">
            <router-link
              :to="{
                name: 'Create Poll Page',
                params: {
                  userId: userId,
                  eventId: this.eventId,
                  editPoll: true,
                  poll: JSON.stringify(poll),
                },
              }"
            >
              <i class="fas fa-pen"></i></router-link
          ></span>
          <span v-if="!invitedUser" @click.prevent="showDeleteModal">
            <i class="fas fa-trash-alt"></i
          ></span>
        </div>
      </div>
    </div>
    <div
      class="scraped-info-wrapper"
      v-if="checkedAccommodation.length == 0 || editItineraryClick"
    >
      <table
        class="web-scraped-info-parent-container"
        v-for="(value, page) in accommodationInfo"
        v-bind:key="value"
      >
        <caption>
          Accommodation Results for
          {{
            accommodationDateRange
          }}
          - Page
          {{
            page
          }}
        </caption>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Price</th>
            <th>Room Type</th>
            <th>Beds</th>
            <th>Review Category</th>
            <th>Review Score</th>
            <th>Review Quantity</th>
            <th>Location</th>
            <!--<th>Cancellation</th>-->
            <th>Link</th>
            <th>Map</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, key) of value" :key="key">
            <td>
              <input
                type="checkbox"
                :value="item"
                @change="checkedAccommodationChange($event, item)"
                v-model="checkedAccommodation"
              />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.roomTypeRecommendedBooking }}</td>
            <td>{{ item.numberOfBedsRecommendedBooking }}</td>
            <td>{{ item.ratingScoreCategory }}</td>
            <td>{{ item.ratingScore }}</td>
            <td>{{ item.reviewQuantity }}</td>
            <td>{{ item.locationDistance }}</td>
            <td>
              <a :href="item.bookingSiteLink" target="_blank">
                <i class="fas fa-external-link-square-alt"></i>
              </a>
            </td>
            <td>
              <a :href="item.bookingSiteDisplayLocationMapLink" target="_blank">
                <i class="fas fa-map-marker-alt"></i>
              </a>
            </td>
            <!-- <td>{{ item.freeCancellationText }}</td>-->
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="scraped-info-wrapper"
      v-if="(flightInfo && checkedFlight[0].length == 0) || editItineraryClick"
    >
      <h2>Flight Results</h2>
      <table
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
          <tr v-for="(item, key) of value" :key="key">
            <td v-if="key === 0" rowspan="2">
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
            <td v-if="key === 0" rowspan="2">
              {{ item.pricePerPerson }}
            </td>

            <td v-if="key === 0" rowspan="2">
              {{ item.priceTotal }}
            </td>

            <td v-if="key === 0" rowspan="2">
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
import DateUtils from "../utils/dateUtils";
import EventItinerary from "../components/EventItinerary";
export default {
  name: "eventDetailPage",
  props: ["editEvent"],
  data() {
    return {
      showEditForm: false,
      edit: this.editEvent,
      individualEvent: {},
      polls: [],
      userId: localStorage.getItem("id"),
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
    };
  },
  watch: {
    checkedAccommodation: function () {
      this.eventItineraryKey++;
    },
  },
  components: {
    EventForm,
    EventItinerary,
    EventOverview,
    NoCreatedItems,
    DeleteModal,
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
      const userId = localStorage.getItem("id");
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

      console.log(response);

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        const event = response.data[0];

        console.log(event);

        if (event["createdByUser"].id === userId) {
          this.invitedUser = false;
        } else {
          this.invitedUser = true;
        }

        this.noCreatedPollsCallToActionLink = `${response.data[0].id}/poll`;
        this.individualEvent = event;

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

          await this.getEventAccommodationInfo(
            this.mostVotedPollOption.startDate,
            this.mostVotedPollOption.endDate
          );

          //Commenting out to save on API calls
          /*await this.getEventPlacesInfo(
            this.individualEvent.cityLatitude,
            this.individualEvent.cityLongitude
          );*/

          this.eventItineraryKey++;

          if (event.type === "FOREIGN_OVERNIGHT") {
            await this.getEventFlightInfo(
              this.mostVotedPollOption.startDate,
              this.mostVotedPollOption.endDate
            );
          }
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
          //console.log(response.data);
          this.checkedAccommodation = response.data.accommodation;
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

      //console.log(response);

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

      console.log(response);

      if (response.status === 200) {
        this.googlePlacesInfo = response.data.results;
      }
    },
    transformTimeStampFormat(date) {
      return DateUtils.returnFormattedDateWithTime(date);
    },
    formatDate(date) {
      return DateUtils.returnFormattedDate(date);
    },
    showDeleteModal(event) {
      this.deletePollTitle =
        event.path[3].children[0].childNodes[0].childNodes[1].textContent;
      this.pollId =
        event.path[3].children[0].childNodes[0].childNodes[2].textContent;
      this.displayDeleteModal = true;
    },
    checkedFlightChange(value) {
      this.checkedFlight = [];
      this.checkedFlight.push(value);
      this.eventItineraryKey++;
    },
    checkedAccommodationChange(event, value) {
      console.log(event.target.checked);
      console.log(value);
      if (event.target.checked) {
        this.checkedAccommodation = [];
        this.checkedAccommodation.push(value);
        console.log(this.checkedAccommodation);
        this.eventItineraryKey++;
      } else {
        this.checkedAccommodation = [];
      }
    },
    editItineraryButtonClick(value) {
      console.log(value);

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
  },
  async created() {
    await this.extractIdFromUrl();
    await this.getEventInfo();
    await this.checkEditAction();
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

  .individual-poll-container {
    height: 6rem;
    padding: 1rem 3rem;
    border-radius: 5px;
    margin: 1rem auto;
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;

    .poll-info-parent-container {
      width: 75%;
      display: flex;
    }

    .poll-call-to-action-container {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1rem auto;
      svg {
        font-size: 1rem;
        padding: 0.2rem;
        color: #3a4374;
      }
      svg:hover {
        cursor: pointer;
      }
      span {
        margin: 0 1rem;
        padding: 0.4rem;
        background-color: #f2f4fe;
        color: #3a4374;
        border-radius: 10px;
        font-weight: bold;
        font-size: 0.7rem;
      }
    }

    .poll-info-container {
      margin: 0 auto;
      min-height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      span {
        margin: 0 auto;
        border-radius: 0.5rem;
        padding: 0.2rem;

        svg {
          font-size: 1.2rem;
          color: white;
        }
      }

      #pollCompletedIcon {
        svg {
          color: green;
        }
      }

      #pollNotCompletedIcon {
        svg {
          color: red;
        }
      }
    }
  }
}

.scraped-info-wrapper {
  margin: 25px 0;
  width: 80%;
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
  }

  td table {
    margin: -2px;
    width: calc(100% + 4px);
  }
}
</style>

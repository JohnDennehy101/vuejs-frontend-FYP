<template>
  <h2>Itinerary</h2>
  <div id="event-itinerary-parent-container">
    <div class="event-itinerary-info">
      <div id="itinerary-map"></div>
    </div>
    <div class="event-itinerary-info">
      <div v-if="itineraryAccommodation" class="event-itinerary-category">
        <div class="event-itinerary-category-header">
          <h3>Accommodation</h3>

          <span
            data-testid="removeAccommodationIcon"
            v-if="itineraryAccommodation[0]"
            v-on:click="$emit('removeItineraryAccommodationClick', true)"
            ><i class="fas fa-times-circle"></i
          ></span>
        </div>
        <h4 v-if="!itineraryAccommodation[0]">No Accommodation Selected</h4>

        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Title:</h4>
          <p data-testid="accommodationTitle">
            {{ itineraryAccommodation[0].title }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>City:</h4>
          <p data-testId="accommodationCity">
            {{ itineraryAccommodation[0].locationTitle }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Start Date:</h4>
          <p data-testid="startDate">
            {{ itineraryAccommodation[0].startDate }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>End Date:</h4>
          <p data-testid="endDate">{{ itineraryAccommodation[0].endDate }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Nights:</h4>
          <p data-testid="numberOfNightsAndGuests">
            {{ itineraryAccommodation[0].numberOfNightsAndGuests }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Room:</h4>
          <p data-testid="numberOfRoomsRecommendedBooking">
            {{ itineraryAccommodation[0].numberOfRoomsRecommendedBooking }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Beds:</h4>
          <p data-testid="numberOfBedsRecommendedBooking">
            {{ itineraryAccommodation[0].numberOfBedsRecommendedBooking }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Price:</h4>
          <p data-testid="price">{{ itineraryAccommodation[0].price }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Distance:</h4>
          <p data-testid="locationDistance">
            {{ itineraryAccommodation[0].locationDistance }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Review Category:</h4>
          <p data-testid="ratingScoreCategory">
            {{ itineraryAccommodation[0].ratingScoreCategory }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Average Review Score:</h4>
          <p data-testid="ratingScore">
            {{ itineraryAccommodation[0].ratingScore }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Review Quantity:</h4>
          <p data-testid="reviewQuantity">
            {{ itineraryAccommodation[0].reviewQuantity }}
          </p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Booking Link:</h4>
          <a
            data-testid="bookingSiteLink"
            :href="itineraryAccommodation[0].bookingSiteLink"
            target="_blank"
          >
            <i class="fas fa-external-link-square-alt"></i>
          </a>
        </div>

        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Map Link:</h4>
          <a
            data-testid="bookingSiteDisplayLocationMapLink"
            :href="itineraryAccommodation[0].bookingSiteDisplayLocationMapLink"
            target="_blank"
          >
            <i class="fas fa-map-marker-alt"></i>
          </a>
        </div>
      </div>

      <div
        v-if="
          itineraryFlight &&
          itineraryFlight[0].length > 0 &&
          eventType == 'FOREIGN_OVERNIGHT'
        "
        class="event-itinerary-category"
      >
        <div class="event-itinerary-category-header">
          <h3>Flights</h3>

          <span
            v-if="itineraryFlight[0].length > 0"
            data-testid="removeItineraryFlightsIcon"
            v-on:click="$emit('removeItineraryFlightsClick', true)"
            ><i class="fas fa-times-circle"></i
          ></span>
        </div>

        <h4 v-if="!itineraryFlight[0]">No Flights Selected</h4>

        <h4 v-if="itineraryFlight[0].length > 0">Overview</h4>
        <div
          v-if="itineraryFlight[0].length > 0"
          class="event-itinerary-category-info"
        >
          <h4>Price Per Person:</h4>
          <p data-testid="pricePerPerson" v-if="itineraryFlight[0].length > 0">
            {{ itineraryFlight[0][0].pricePerPerson }}
          </p>
        </div>

        <div
          v-if="itineraryFlight[0].length > 0"
          class="event-itinerary-category-info"
        >
          <h4>Total Price:</h4>
          <p data-testid="priceTotal">
            {{ itineraryFlight[0][0].priceTotal }}
          </p>
        </div>

        <div
          v-if="itineraryFlight[0].length > 0"
          class="event-itinerary-category-info"
        >
          <h4>Flights Link:</h4>
          <a
            data-testid="flightUrl"
            :href="itineraryFlight[0][0].flightUrl"
            target="_blank"
          >
            <i class="fas fa-external-link-square-alt"></i>
          </a>
        </div>

        <h4 v-if="itineraryFlight[0].length > 0">Detail</h4>
        <div v-if="itineraryFlight[0].length > 0">
          <div
            v-for="(flight, index) in itineraryFlight[0]"
            v-bind:key="flight"
          >
            <div class="event-itinerary-category-info">
              <h3 v-if="index == 0">Departure Flight</h3>
              <h3 v-else>Return Flight</h3>
              <div class="event-itinerary-category-info">
                <h4>Departure City:</h4>
                <p data-testid="departureCity" v-if="index == 0">
                  {{ flight.departureCity }}
                </p>
                <p data-testid="arrivalCity" v-else>{{ flight.arrivalCity }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Departure Time:</h4>
                <p data-testid="departureTime">{{ flight.departureTime }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Arrival City:</h4>
                <p v-if="index == 0">{{ flight.arrivalCity }}</p>
                <p v-else>{{ flight.departureCity }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Arrival Time:</h4>
                <p data-testid="arrivalTime">{{ flight.arrivalTime }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Carrier:</h4>
                <p data-testid="carrier">{{ flight.carrier }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Duration:</h4>
                <p data-testid="duration">{{ flight.duration }}</p>
              </div>
            </div>
            <div class="event-itinerary-category-info">
              <h4>Airport:</h4>
              <p data-testid="airport">{{ flight.airport }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="itineraryActivities" class="event-itinerary-category">
        <div class="event-itinerary-category-header">
          <h3>Activities</h3>
        </div>

        <h4 data-testid="noActivities" v-if="!itineraryActivities[0]">
          No Activities Selected
        </h4>

        <div
          id="activity-parent-container"
          v-for="value in itineraryActivities"
          v-bind:key="value"
        >
          <div class="event-itinerary-activity-remove-item-container">
            <span
              data-testid="deleteActivityIcon"
              v-on:click="$emit('removeItineraryActivityClick', value.name)"
              ><i class="fas fa-times-circle"></i
            ></span>
          </div>
          <div class="event-itinerary-category-info">
            <h4>Title:</h4>
            <p data-testid="activityName">{{ value.name }}</p>
          </div>
          <div class="event-itinerary-category-info">
            <h4>Address:</h4>
            <p data-testid="activityVicinity">{{ value.vicinity }}</p>
          </div>
          <div class="event-itinerary-category-info">
            <h4>Rating:</h4>
            <p data-testid="activityRating">{{ value.rating }}</p>
          </div>
          <div class="event-itinerary-category-info">
            <h4>Rating Quantity:</h4>
            <p data-testid="activityRatingQuantity">
              {{ value.user_ratings_total }}
            </p>
          </div>
          <div class="event-itinerary-category-info">
            <h4>Map Link:</h4>
            <a
              v-if="!value.mapLink"
              data-testid="activityApiResponse"
              :href="extractLink(value.photos[0].html_attributions[0])"
              target="_blank"
            >
              <i class="fas fa-map-marker-alt"></i>
            </a>
            <a
              data-testid="activityMapLink"
              v-else
              :href="value.mapLink"
              target="_blank"
            >
              <i class="fas fa-map-marker-alt"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="event-itinerary-category">
        <button
          v-if="editAction"
          data-testid="editItineraryButton"
          v-on:click="$emit('editItineraryClick', true)"
          id="edit-itinerary-button"
        >
          Edit Itinerary
        </button>
      </div>

      <div
        v-if="
          !guestUserCheck &&
          displayFinaliseCheckbox &&
          (itineraryAccommodation.length > 0 || itineraryFlight[0].length > 0)
        "
        class="event-itinerary-category"
      >
        <label for="finalise-itinerary">Finalise Itinerary</label>
        <input
          id="finalise-itinerary"
          type="checkbox"
          data-testid="finaliseItineraryCheckBox"
          v-model="finaliseItinerary"
        />
      </div>
      <div v-if="!editAction || editClick" class="event-itinerary-category">
        <button
          data-testid="submitButton"
          v-if="!emptyItineraryCheck"
          @click="submitItinerary"
        >
          Submit
        </button>
        <ResponseErrorMessage
          :toggle="showErrorMessage"
          :errorMessage="errorMessage"
        />
      </div>

      <div v-if="editClick" class="event-itinerary-category">
        <button id="delete-itinerary-button" @click="deleteItinerary">
          Delete Itinerary
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import eventService from "../services/EventService";
import StringUtils from "../utils/stringUtils";
import LocationUtils from "../utils/locationUtils";
import ResponseErrorMessage from "./ResponseErrorMessage";
export default {
  props: {
    eventService: {
      default: eventService,
    },
    accommodation: Array,
    activities: Array,
    flight: Array,
    eventId: String,
    editItinerary: Boolean,
    editItineraryClick: Boolean,
    guestUserCheck: Boolean,
    itemType: String,
    city: String,
    complete: Boolean,
    displayFinaliseCheckbox: Boolean,
    jwt: String,
  },
  data() {
    return {
      itineraryAccommodation: this.accommodation,
      itineraryFlight: this.flight,
      id: this.eventId,
      editAction: this.editItinerary,
      editClick: this.editItineraryClick,
      eventType: this.itemType,
      destinationCity: this.city,
      guestUser: this.guestUserCheck,
      finaliseItinerary: this.complete,
      showFinaliseItineraryCheck: this.displayFinaliseCheckbox,
      itineraryActivities: this.activities,
      showErrorMessage: false,
      errorMessage: "",
      token: this.jwt,
    };
  },
  methods: {
    async submitItinerary(event) {
      let flight = [];
      event.preventDefault();

      if (this.itineraryFlight) {
        if (this.itineraryFlight.length > 0) {
          flight = this.itineraryFlight[0];
        }
      }
      const payload = {
        flight: flight,
        accommodation: this.itineraryAccommodation,
        activities: this.itineraryActivities,
        completed: this.finaliseItinerary,
      };

      if (!this.editItinerary) {
        if (
          this.itineraryAccommodation.length > 0 ||
          this.itineraryActivities.length > 0 ||
          this.itineraryFlight[0].length > 0
        ) {
          this.$emit("itineraryRequest", true);
          const response = await this.eventService.createEventItinerary(
            this.id,
            payload,
            this.token
          );

          if (response.status === 201) {
            this.$emit("itineraryRequest", false);
            this.$emit("showToast", { boolean: true, edit: false });
            this.$router.go(0);
          } else {
            this.showErrorMessage = true;
            this.errorMessage = "Error creating itinerary.";
          }
        } else {
          this.showErrorMessage = true;
          this.errorMessage = "Please provide a value for the itinerary.";
        }
      } else {
        if (
          this.itineraryAccommodation.length > 0 ||
          this.itineraryActivities.length > 0 ||
          this.itineraryFlight[0].length > 0
        ) {
          const response = await this.eventService.updateEventItinerary(
            this.id,
            payload
          );
          if (response.status === 200) {
            this.$emit("itineraryRequest", false);
            this.$emit("showToast", { boolean: true, edit: true });
            this.$router.go(0);
          } else {
            this.showErrorMessage = true;
            this.errorMessage = "Error updating itinerary.";
          }
        } else {
          this.showErrorMessage = true;
          this.errorMessage = "Please provide a value for the itinerary.";
        }
      }
    },
    async deleteItinerary() {
      this.$emit("itineraryRequest", true);
      const response = await this.eventService.deleteEventItinerary(
        this.id,
        this.token
      );

      if (response.status === 200) {
        this.$emit("itineraryRequest", false);
        this.$emit("showToast", { boolean: true, edit: "" });
        this.$router.go(0);
      } else {
        this.showErrorMessage = true;
        this.errorMessage = "Error deleting itinerary.";
      }
    },
    createMap() {
      let mymap;

      /* istanbul ignore next */
      let latLng = LocationUtils.returnCityCoordinates(this.destinationCity);

      /* istanbul ignore next */
      mymap = leaflet.map("itinerary-map").setView(latLng, 13);

      /* istanbul ignore next */
      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: `${process.env.VUE_APP_MAPBOX_API_KEY}`,
          }
        )
        .addTo(mymap);
    },
    extractLink(link) {
      let extractedLink = StringUtils.extractGoogleMapLink(link);
      return extractedLink;
    },
  },
  computed: {
    emptyItineraryCheck: function () {
      return this.flight.length === 0 && this.accommodation.length === 0;
    },
  },
  components: {
    ResponseErrorMessage,
  },
  mounted() {
    this.createMap();
  },
};
</script>

<style scoped lang="scss">
#event-itinerary-parent-container {
  width: 85%;
  margin: 1rem auto;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;

  @include for-phone-only {
    width: 90%;
    flex-direction: column;
    min-height: 60vh;
  }
}
h2 {
  text-align: left;
  width: 80%;
}
.event-itinerary-info {
  width: 50%;

  @include for-phone-only {
    width: 100%;
    min-height: 50vh;
  }
}
.event-itinerary-category {
  margin: 1rem auto;
  width: 80%;

  @include for-phone-only {
    width: 90%;
  }
}
.event-itinerary-category-header {
  display: flex;
  justify-content: space-between;
  padding-right: 0.5rem;
  margin: 1rem auto;
  h3 {
    display: inline-block;
    width: 33%;
  }
  svg:hover {
    cursor: pointer;
  }
}
.event-itinerary-category-info {
  h4 {
    display: inline-block;
    width: 33%;

    @include for-phone-only {
      width: 65%;
    }
  }
  p {
    display: inline-block;

    @include for-phone-only {
      width: 35%;
    }
  }
}

button {
  border-radius: 1rem;
  border: none;
  width: 50%;
  height: 2.5rem;
  margin: 1rem auto;
  background-color: $primary-button-background-colour;
  color: $primary-button-text-colour;
}
button:hover {
  cursor: pointer;
}

#edit-itinerary-button {
  width: 40%;
  background-color: #3a4374;
}
#delete-itinerary-button {
  width: 40%;
  background-color: red;
}
label {
  margin-right: 1rem;
}
#itinerary-map {
  width: 100%;
  height: 100%;

  @include for-phone-only {
    height: 300px;
  }
}
#activity-parent-container {
  margin: 1rem auto;
}
.event-itinerary-activity-remove-item-container {
  display: flex;
  justify-content: flex-end;

  svg:hover {
    cursor: pointer;
  }
}
</style>

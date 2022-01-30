<template>
  <h2>Itinerary</h2>
  <div id="event-itinerary-parent-container">
    <div class="event-itinerary-info">
      <div v-if="itineraryAccommodation" class="event-itinerary-category">
        <div class="event-itinerary-category-header">
          <h3>Accommodation</h3>

          <span
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
          <p>{{ itineraryAccommodation[0].title }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>City:</h4>
          <p>{{ itineraryAccommodation[0].locationTitle }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Start Date:</h4>
          <p>{{ itineraryAccommodation[0].startDate }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>End Date:</h4>
          <p>{{ itineraryAccommodation[0].endDate }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Nights:</h4>
          <p>{{ itineraryAccommodation[0].numberOfNightsAndGuests }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Room:</h4>
          <p>{{ itineraryAccommodation[0].numberOfRoomsRecommendedBooking }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Beds:</h4>
          <p>{{ itineraryAccommodation[0].numberOfBedsRecommendedBooking }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Price:</h4>
          <p>{{ itineraryAccommodation[0].price }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Distance:</h4>
          <p>{{ itineraryAccommodation[0].locationDistance }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Review Category:</h4>
          <p>{{ itineraryAccommodation[0].ratingScoreCategory }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Average Review Score:</h4>
          <p>{{ itineraryAccommodation[0].ratingScore }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Review Quantity:</h4>
          <p>{{ itineraryAccommodation[0].reviewQuantity }}</p>
        </div>
        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Booking Link:</h4>
          <a :href="itineraryAccommodation[0].bookingSiteLink" target="_blank">
            <i class="fas fa-external-link-square-alt"></i>
          </a>
        </div>

        <div
          v-if="itineraryAccommodation[0]"
          class="event-itinerary-category-info"
        >
          <h4>Map Link:</h4>
          <a
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
          <p v-if="itineraryFlight[0].length > 0">
            {{ itineraryFlight[0][0].pricePerPerson }}
          </p>
        </div>

        <div
          v-if="itineraryFlight[0].length > 0"
          class="event-itinerary-category-info"
        >
          <h4>Total Price:</h4>
          <p>
            {{ itineraryFlight[0][0].priceTotal }}
          </p>
        </div>

        <div
          v-if="itineraryFlight[0].length > 0"
          class="event-itinerary-category-info"
        >
          <h4>Flights Link:</h4>
          <a :href="itineraryFlight[0][0].flightUrl" target="_blank">
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
                <p v-if="index == 0">{{ flight.departureCity }}</p>
                <p v-else>{{ flight.arrivalCity }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Departure Time:</h4>
                <p>{{ flight.departureTime }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Arrival City:</h4>
                <p v-if="index == 0">{{ flight.arrivalCity }}</p>
                <p v-else>{{ flight.departureCity }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Arrival Time:</h4>
                <p>{{ flight.arrivalTime }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Carrier:</h4>
                <p>{{ flight.carrier }}</p>
              </div>
              <div class="event-itinerary-category-info">
                <h4>Duration:</h4>
                <p>{{ flight.duration }}</p>
              </div>
            </div>
            <div class="event-itinerary-category-info">
              <h4>Airport:</h4>
              <p>{{ flight.airport }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="event-itinerary-category">
        <h3>Activities</h3>
      </div>
      <div class="event-itinerary-category">
        <button
          v-if="editAction"
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
          v-model="finaliseItinerary"
        />
      </div>
      <div v-if="!editAction || editClick" class="event-itinerary-category">
        <button v-if="!emptyItineraryCheck" @click="submitItinerary">
          Submit
        </button>
      </div>

      <div v-if="editClick" class="event-itinerary-category">
        <button id="delete-itinerary-button" @click="deletetItinerary">
          Delete Itinerary
        </button>
      </div>
    </div>

    <div class="event-itinerary-info">
      <div id="itinerary-map"></div>
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import EventService from "../services/EventService";
const eventService = new EventService();
export default {
  props: [
    "accommodation",
    "flight",
    "eventId",
    "editItinerary",
    "editItineraryClick",
    "guestUserCheck",
    "itemType",
    "city",
    "complete",
    "displayFinaliseCheckbox",
  ],
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
        activities: [],
        completed: this.finaliseItinerary,
      };

      if (!this.editItinerary) {
        await eventService.createEventItinerary(this.id, payload);
      } else {
        await eventService.updateEventItinerary(this.id, payload);
      }
    },
    async deletetItinerary() {
      const response = await eventService.deleteEventItinerary(this.id);

      if (response.status === 200) {
        this.$router.go(0);
      }
    },
    createMap() {
      let mymap;

      let locations = {
        Limerick: [52.6638, -8.6267],
        Cork: [51.8985, -8.4756],
        Dublin: [53.3498, -6.2603],
        Galway: [53.2707, -9.0568],
        Waterford: [52.2593, -7.1101],
        Kilkenny: [52.6541, -7.2448],
      };

      let latLng = locations[this.destinationCity];

      mymap = leaflet.map("itinerary-map").setView(latLng, 13);

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
  },
  computed: {
    emptyItineraryCheck: function () {
      return this.flight.length === 0 && this.accommodation.length === 0;
    },
  },
  mounted() {
    //Commenting out to save on API calls
    //this.createMap();
  },
};
</script>

<style scoped lang="scss">
#event-itinerary-parent-container {
  width: 80%;
  margin: 1rem auto;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
}
h2 {
  text-align: left;
  width: 80%;
}
.event-itinerary-info {
  width: 50%;
}
.event-itinerary-category {
  margin: 1rem auto;
  width: 80%;
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
  }
  p {
    display: inline-block;
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
}
</style>

<template>
  <h2>Itinerary</h2>
  <div id="event-itinerary-parent-container">
    <div class="event-itinerary-info">
      <div v-if="itineraryAccommodation" class="event-itinerary-category">
        <h3>Accommodation</h3>
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
        v-if="itineraryFlight && itineraryFlight.length > 0"
        class="event-itinerary-category"
      >
        <h3>Flights</h3>
        <h4>Overview</h4>
        <div class="event-itinerary-category-info">
          <h4>Price Per Person:</h4>
          <p>{{ itineraryFlight[0][0].pricePerPerson }}</p>
        </div>

        <div class="event-itinerary-category-info">
          <h4>Total Price:</h4>
          <p>{{ itineraryFlight[0][0].priceTotal }}</p>
        </div>

        <div class="event-itinerary-category-info">
          <h4>Flights Link:</h4>
          <a :href="itineraryFlight[0][0].flightUrl" target="_blank">
            <i class="fas fa-external-link-square-alt"></i>
          </a>
        </div>

        <h4>Detail</h4>
        <div v-for="(flight, index) in itineraryFlight[0]" v-bind:key="flight">
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
      <div class="event-itinerary-category">
        <h3>Activities</h3>
      </div>
      <div class="event-itinerary-category">
        <button @click="submitItinerary">Submit Itinerary</button>
      </div>
    </div>

    <div class="event-itinerary-info">
      <p>Map Will go here</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["accommodation", "flight", "eventId", "editItinerary"],
  data() {
    return {
      itineraryAccommodation: this.accommodation,
      itineraryFlight: this.flight,
      id: this.eventId,
      editAction: this.editItinerary,
    };
  },
  methods: {
    async submitItinerary(event) {
      event.preventDefault();
      console.log("SUBMITTING");
      let flight =
        this.itineraryFlight.length > 0 ? this.itineraryFlight[0] : [];
      const payload = {
        flight: flight,
        accommodation: this.itineraryAccommodation,
        activities: [],
        completed: false,
      };
      const jwtToken = localStorage.getItem("token");

      if (!this.editItinerary) {
        const response = await axios
          .post(`http://localhost:3000/events/${this.id}/itinerary`, payload, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .catch((error) => {
            return { error };
          });

        console.log(response);
      } else {
        const response = await axios
          .patch(`http://localhost:3000/events/${this.id}/itinerary`, payload, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .catch((error) => {
            return { error };
          });

        console.log(response);
      }
    },
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
</style>

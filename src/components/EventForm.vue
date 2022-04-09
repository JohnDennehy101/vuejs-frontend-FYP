<template>
  <form @submit.prevent="submitForm">
    <div
      v-if="editEventAction"
      class="form-control"
      id="hide-form-icon-container"
    >
      <span v-on:click="$emit('hideEditEventActionClick', false)"
        ><i class="fas fa-times-circle"></i
      ></span>
    </div>
    <div class="form-control">
      <h2>{{ formTitle }}</h2>
    </div>

    <div class="form-control">
      <label for="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter event title"
        v-model="title"
      />
      <p class="error-message" v-if="titleNotProvided">
        Please provide an event title
      </p>
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <input
        id="description"
        name="title"
        type="text"
        placeholder="Enter event description"
        v-model="description"
      />
      <p class="error-message" v-if="descriptionNotProvided">
        Please provide an event description
      </p>
    </div>
    <div class="form-control">
      <h3>Event Type</h3>

      <div class="radio-parent-container">
        <input
          id="DOMESTIC_DAY"
          name="eventType"
          type="radio"
          value="DOMESTIC_DAY"
          v-on:change="eventTypeChange"
          v-model="eventType"
        />
        <label class="radio-label" for="DOMESTIC_DAY">Domestic Day Trip</label>
      </div>
      <div class="radio-parent-container">
        <input
          id="DOMESTIC_OVERNIGHT"
          name="eventType"
          type="radio"
          value="DOMESTIC_OVERNIGHT"
          v-model="eventType"
          v-on:change="eventTypeChange"
        />
        <label class="radio-label" for="DOMESTIC_OVERNIGHT"
          >Domestic Overnight Trip</label
        >
      </div>
      <div class="radio-parent-container">
        <input
          id="FOREIGN_OVERNIGHT"
          name="eventType"
          type="radio"
          value="FOREIGN_OVERNIGHT"
          v-model="eventType"
          v-on:change="eventTypeChange"
        />
        <label class="radio-label" for="FOREIGN_OVERNIGHT"
          >Foreign Overnight Trip</label
        >
      </div>
      <p class="error-message" v-if="typeNotProvided">
        Please select an event type
      </p>
    </div>

    <div v-if="foreignTrip" class="form-control">
      <label class="radio-label" for="location">Departure</label>
      <select id="location" v-model="departureCity">
        <option disabled value="">Please select location</option>
        <option v-for="city in domesticCityLocations" v-bind:key="city">
          {{ city }}
        </option>
      </select>
      <p class="error-message" v-if="departureNotProvided">
        Please select a departure city
      </p>
    </div>

    <div v-if="foreignTrip" class="form-control">
      <label class="radio-label" for="location">Destination</label>
      <select id="location" v-model="location">
        <option disabled value="">Please select location</option>
        <option v-for="city in foreignCityLocations" v-bind:key="city">
          {{ city }}
        </option>
      </select>
      <p class="error-message" v-if="destinationNotProvided">
        Please select a destination city
      </p>
    </div>

    <div v-else class="form-control">
      <label class="radio-label" for="location">Destination</label>
      <select id="location" v-model="location">
        <option disabled value="">Please select location</option>
        <option v-for="city in domesticCityLocations" v-bind:key="city">
          {{ city }}
        </option>
      </select>
      <p class="error-message" v-if="destinationNotProvided">
        Please select a destination city
      </p>
    </div>

    <div class="form-control">
      <label for="users"> Users</label>
      <input
        id="useremail"
        name="useremail"
        type="text"
        placeholder="Enter user email"
        v-model="userEmail"
      />
    </div>

    <div class="form-control">
      <p class="error-message" v-if="emailNotProvided">
        Please provide an email
      </p>
      <button @click="addUserEmail" id="add-option-button">Add Email</button>
    </div>
    <div v-if="userEmails.length > 0" class="form-control">
      <label for="userEmails">User Emails</label>
      <ul v-for="email in userEmails" :key="email">
        <EventFormUserEmailDisplay
          v-on:removeUserEmail="removeIndividualUserEmail"
          :email="email"
        />
      </ul>
    </div>
    <div class="form-control button-container">
      <button>{{ buttonTitle }}</button>
    </div>

    <ResponseErrorMessage
      :toggle="this.invalidEventCreation"
      :errorMessage="this.errorMessage"
      v-on:hideErrorMessage="hideErrorMessage"
    />
  </form>
</template>

<script>
import ResponseErrorMessage from "../components/ResponseErrorMessage";
import EventFormUserEmailDisplay from "../components/EventFormUserEmailDisplay";
import eventService from "../services/EventService";
import { mapGetters } from "vuex";
import StringUtils from "../utils/stringUtils";
export default {
  props: {
    edit: Boolean,
    eventService: {
      default: eventService,
    },
    individualEvent: Object,
  },
  data() {
    return {
      title: "",
      invalidEventCreation: false,
      errorMessage:
        "There was an error adding this event, not successfully created.",
      formTitle: "",
      eventType: null,
      editEventAction: this.edit,
      editEventInfo: this.individualEvent,
      userEmails: [],
      userEmail: "",
      domesticCityLocations: [
        "Cork",
        "Dublin",
        "Galway",
        "Kilkenny",
        "Limerick",
        "Waterford",
      ],
      foreignCityLocations: ["London", "Manchester"],
      location: "",
      departureCity: "",
      foreignTrip: false,
      titleNotProvided: false,
      typeNotProvided: false,
      departureNotProvided: false,
      destinationNotProvided: false,
      emailNotProvided: false,
      buttonTitle: "Add Event",
      description: "",
      descriptionNotProvided: false,
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      jwt: "jwt",
    }),
  },
  methods: {
    async submitForm() {
      if (this.editEventAction) {
        if (
          this.title.length > 0 &&
          this.eventType !== null &&
          this.location.length > 0 &&
          this.description.length > 0
        ) {
          const payload = {
            title: this.title,
            description: this.description,
            type: this.eventType,
            userEmails: this.userEmails,
            city: this.location,
            departureCity: this.departureCity,
          };

          const response = await this.eventService.updateEvent(
            this.editEventInfo.id,
            payload,
            this.jwt
          );

          if (!("error" in response)) {
            this.$store.dispatch("event/updateEvent", {
              data: response.data,
              id: this.editEventInfo.id,
            });
            this.$router.push({ path: `/dashboard/${this.userId}` });
          } else {
            this.invalidEventCreation = true;
            if (response.error.response.data.statusCode === 409) {
              this.errorMessage =
                "Error updating event. An event already exists with this title.";
            }
          }
        } else {
          if (this.title.length === 0) {
            this.titleNotProvided = true;
          } else if (this.title.length > 0) {
            this.titleNotProvided = false;
          }
          if (this.eventType === null) {
            this.typeNotProvided = true;
          } else if (this.eventType) {
            this.typeNotProvided = false;
          }
          if (this.location.length === 0) {
            this.destinationNotProvided = true;
          } else {
            this.destinationNotProvided = false;
          }
          if (this.description.length === 0) {
            this.descriptionNotProvided = true;
          } else {
            this.descriptionNotProvided = false;
          }
        }
      } else {
        if (
          this.title.length > 0 &&
          this.description.length > 0 &&
          this.eventType !== null &&
          this.location.length > 0
        ) {
          const payload = {
            title: this.title,
            description: this.description,
            type: this.eventType,
            userEmails: this.userEmails,
            city: this.location,
            departureCity: this.departureCity,
          };

          const response = await this.eventService.createEvent(
            this.userId,
            payload,
            this.jwt
          );

          if (!("error" in response)) {
            this.$store.dispatch("event/createEvent", response.data);
            this.$router.push({ path: `/dashboard/${this.userId}` });
          } else {
            this.invalidEventCreation = true;
            if (response.error.response.data.statusCode === 409) {
              this.errorMessage =
                "Error creating event. An event already exists with this title.";
            } else if (response.error.response.data.statusCode === 400) {
              this.errorMessage =
                "Error creating event. Bad request. Please ensure values are provided for each field and try again.";
            }
          }
        } else {
          if (this.title.length === 0) {
            this.titleNotProvided = true;
          } else if (this.title.length > 0) {
            this.titleNotProvided = false;
          }
          if (this.eventType === null) {
            this.typeNotProvided = true;
          } else if (this.eventType) {
            this.typeNotProvided = false;
          }
          if (this.location.length === 0) {
            this.destinationNotProvided = true;
          } else {
            this.destinationNotProvided = false;
          }
          if (this.description.length === 0) {
            this.descriptionNotProvided = true;
          } else {
            this.descriptionNotProvided = false;
          }
        }
      }
    },
    addUserEmail(event) {
      event.preventDefault();
      if (!StringUtils.validateEmail(this.userEmail)) {
        this.emailNotProvided = true;
      } else if (
        this.userEmail.length > 0 &&
        !this.userEmails.includes(this.userEmail)
      ) {
        this.userEmails.push(this.userEmail);
        this.emailNotProvided = false;

        this.userEmail = "";
      }
    },
    removeIndividualUserEmail(id) {
      this.userEmails.splice(this.userEmails.indexOf(id), 1);
    },
    hideErrorMessage() {
      this.invalidEventCreation = false;
    },
    populateFormInfo() {
      if (this.editEventAction) {
        this.formTitle = "Edit Event";
        this.buttonTitle = "Update Event";
        const eventInfo = this.editEventInfo;

        this.title = eventInfo.title;
        this.description = eventInfo.description;
        this.eventType = eventInfo.type;
        this.location = eventInfo.city;

        if (this.eventType === "FOREIGN_OVERNIGHT") {
          this.foreignTrip = true;
          this.departureCity = eventInfo.departureCity;
        }

        for (let email in eventInfo.invitedUsers) {
          this.userEmails.push(eventInfo.invitedUsers[email].email);
        }
      } else {
        this.formTitle = "Create Event";
      }
    },
    eventTypeChange(event) {
      if (event.target.value === "FOREIGN_OVERNIGHT") {
        this.foreignTrip = true;
      } else {
        this.foreignTrip = false;
        this.departureCity = "N/A";
      }
    },
  },
  created() {
    this.populateFormInfo();
  },
  components: {
    ResponseErrorMessage,
    EventFormUserEmailDisplay,
  },
};
</script>

<style scoped lang="scss">
form {
  width: 80%;
  height: 95%;

  background-color: #fff;
  margin: 1rem auto;
  border-radius: 10px;
  border: 1px solid #eeeeee;

  @include for-phone-only {
    width: 90%;
  }

  #hide-form-icon-container {
    display: flex;
    justify-content: flex-end;
    padding: 0 0.8rem;

    span {
      padding: 0 0.5rem;
    }

    svg {
      font-size: 1.3rem;
    }
    svg:hover {
      cursor: pointer;
    }
  }

  .form-control {
    width: 80%;
    margin: 0.5rem auto;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }
    input {
      height: 2.5rem;
      width: 98%;
      border-radius: 12px;
      border: 1px solid grey;
      padding-left: 10px;

      @include for-phone-only {
        height: 2rem;
      }
    }
    select {
      height: 2.5rem;
      width: 100%;
      border-radius: 12px;
      border: 1px solid grey;
      padding-left: 10px;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 0.5rem center;
      background-size: 1em;

      @include for-phone-only {
        height: 2rem;
      }
    }
    input[type="radio"] {
      height: 1rem;
      width: 2%;
      margin-right: 0.5rem;
      text-align: left;
      padding-left: 0;
      display: inline-block;

      @include for-phone-only {
        width: 5%;
      }
    }
    .radio-parent-container {
      margin: 0.5rem auto;
      display: flex;
      align-items: center;
    }
    .radio-label {
      display: inline-block;
      margin-bottom: 0;
    }
    h3 {
      font-size: 1rem;
      text-align: left;
    }
  }
  button {
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 2.5rem;
    margin: 1rem auto;
    background-color: $primary-button-background-colour;
    color: $primary-button-text-colour;
  }
  .button-container {
    text-align: center;
  }

  img {
    width: 1.5rem;
  }
  .error-message {
    margin-top: 0.4rem;
    margin-left: 0.1rem;
    font-size: 0.9rem;
    color: red;
  }
}
</style>

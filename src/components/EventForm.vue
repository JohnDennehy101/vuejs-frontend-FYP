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
        required
      />
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
          required="required"
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
          required="required"
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
          required="required"
        />
        <label class="radio-label" for="FOREIGN_OVERNIGHT"
          >Foreign Overnight Trip</label
        >
      </div>
    </div>

    <div v-if="foreignTrip" class="form-control">
      <label class="radio-label" for="location">Departure</label>
      <select id="location" v-model="departureCity">
        <option disabled value="">Please select location</option>
        <option v-for="city in domesticCityLocations" v-bind:key="city">
          {{ city }}
        </option>
      </select>
    </div>

    <div class="form-control">
      <label class="radio-label" for="location">Destination</label>
      <select id="location" v-model="location">
        <option disabled value="">Please select location</option>
        <option v-for="city in domesticCityLocations" v-bind:key="city">
          {{ city }}
        </option>
      </select>
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
      <button>Add Event</button>
    </div>

    <AccountErrorMessage
      :toggle="this.invalidEventCreation"
      :errorMessage="this.errorMessage"
      v-on:hideErrorMessage="hideErrorMessage"
    />
  </form>
</template>

<script>
import AccountErrorMessage from "../components/AccountErrorMessage";
import EventFormUserEmailDisplay from "../components/EventFormUserEmailDisplay";
import eventService from "../services/EventService";
import { mapGetters } from "vuex";
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
      location: "",
      departureCity: "",
      foreignTrip: false,
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
    }),
  },
  methods: {
    async submitForm() {
      if (this.editEventAction) {
        const payload = {
          title: this.title,
          type: this.eventType,
          userEmails: this.userEmails,
          city: this.location,
          departureCity: this.departureCity,
        };

        const response = await this.eventService.updateEvent(
          this.editEventInfo.id,
          payload
        );

        if (!("error" in response)) {
          this.$router.push({ path: `/dashboard/${this.userId}` });
        } else {
          this.invalidEventCreation = true;
        }
      } else {
        if (this.title.length > 0 && this.eventType !== null) {
          const payload = {
            title: this.title,
            type: this.eventType,
            userEmails: this.userEmails,
            city: this.location,
            departureCity: this.departureCity,
          };

          const response = await this.eventService.createEvent(
            this.userId,
            payload
          );

          if (!("error" in response)) {
            this.$router.push({ path: `/dashboard/${this.userId}` });
          } else {
            this.invalidEventCreation = true;
          }
        }
      }
    },
    addUserEmail(event) {
      event.preventDefault();
      //Add email validation here as well
      if (
        this.userEmail.length > 0 &&
        !this.userEmails.includes(this.userEmail)
      ) {
        this.userEmails.push(this.userEmail);

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
        const eventInfo = this.editEventInfo;

        this.title = eventInfo.title;
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
    AccountErrorMessage,
    EventFormUserEmailDisplay,
  },
};
</script>

<style scoped lang="scss">
.login-form-container {
  width: 50%;
  height: 80vh;
  display: flex;
  align-items: center;

  @include for-phone-only {
    width: 90%;
  }
}
form {
  width: 60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
}
</style>

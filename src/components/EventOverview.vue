<template>
  <div id="event-information-container">
    <div id="event-overview-info-container">
      <div>
        <h3>Title</h3>
        <p data-testid="title">{{ title }}</p>
      </div>
      <div id="description">
        <h3>Description:</h3>
        <p data-testid="description">
          {{ description }}
        </p>
      </div>

      <div v-if="departureCity.length > 0">
        <h3>Departure City</h3>
        <p data-testid="departureCity">{{ departureCity }}</p>
      </div>

      <div>
        <h3>Destination City</h3>
        <p data-testid="destinationCity">{{ destinationCity }}</p>
      </div>

      <div>
        <h3>Event Type</h3>
        <p data-testid="domesticDayEvent" v-if="type === 'DOMESTIC_DAY'">
          Domestic Day Event
        </p>
        <p
          data-testid="domesticOvernightEvent"
          v-else-if="type === 'DOMESTIC_OVERNIGHT'"
        >
          Domestic Overnight Event
        </p>
        <p v-else data-testid="foreignOvernightEvent">
          Foreign Overnight Event
        </p>
      </div>
    </div>

    <div id="event-users-parent-container">
      <h4>Users</h4>
      <div
        v-for="user in item.invitedUsers"
        v-bind:key="user.email"
        class="event-user-container"
      >
        <span> <i class="fas fa-user"></i> </span>
        <p>{{ user.email }}</p>
      </div>
    </div>
    <h4>Event Status</h4>
    <div id="event-stages-parent-container">
      <div class="individual-stage" data-testid="eventCreatedMilestone">
        <span> <i class="fas fa-check"></i> </span>
        <p>1. Event Created</p>
      </div>
      <div class="individual-stage" data-testid="pollCreatedMilestone">
        <span>
          <i v-if="pollAlreadyCreated" class="fas fa-check"></i>
          <i v-else class="fas fa-times-circle"></i>
        </span>
        <p>2. Poll Created</p>
      </div>
      <div class="individual-stage" data-testid="pollCompletedMilestone">
        <span>
          <i v-if="pollAlreadyCompleted" class="fas fa-check"></i>
          <i v-else class="fas fa-times-circle"></i>
        </span>
        <p>3. Poll Completed</p>
      </div>
      <div class="individual-stage" data-testid="itineraryCreatedMilestone">
        <span>
          <i v-if="itineraryAlreadyCreated" class="fas fa-check"></i>
          <i v-else class="fas fa-times-circle"></i>
        </span>
        <p>4. Itinerary Created</p>
      </div>
      <div class="individual-stage" data-testid="itineraryFinalisedMilestone">
        <span>
          <i v-if="itineraryAlreadyCompleted" class="fas fa-check"></i>
          <i v-else class="fas fa-times-circle"></i>
        </span>
        <p>5. Itinerary Finalised</p>
      </div>
    </div>
    <div v-if="!guestUser" class="event-user-actions-parent-container">
      <span id="editEventIcon" v-on:click="$emit('editActionClick', true)">
        <i class="fas fa-pen"></i
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "individualEvent",
    "invitedUser",
    "itineraryCreated",
    "itineraryCompleted",
    "pollCompleted",
  ],
  data() {
    return {
      item: this.individualEvent,
      title: "",
      description: "",
      type: "",
      destinationCity: "",
      departureCity: "",
      guestUser: this.invitedUser,
      pollAlreadyCreated: null,
      pollAlreadyCompleted: this.pollCompleted,
      itineraryAlreadyCreated: this.itineraryCreated,
      itineraryAlreadyCompleted: this.itineraryCompleted,
    };
  },
  methods: {
    populateEventInfo() {
      const eventInfo = this.item;

      if (eventInfo !== null) {
        this.title = eventInfo.title;
        this.description = eventInfo.description;
        this.type = eventInfo.type;
        this.destinationCity = eventInfo.city;

        if (eventInfo.departureCity) {
          this.departureCity = eventInfo.departureCity;
        }

        if (eventInfo.polls.length > 0) {
          this.pollAlreadyCreated = true;
        }
      }
    },
  },
  created() {
    this.populateEventInfo();
  },
};
</script>

<style scoped lang="scss">
#event-information-container {
  width: 85%;
  text-align: center;
  margin: 1rem auto;
  border-radius: 5px;
  background-color: #ffffff;

  @include for-phone-only {
    width: 90%;
  }

  #event-overview-info-container {
    margin: 1rem 3rem;
    display: flex;
    justify-content: space-evenly;

    @include for-phone-only {
      flex-direction: column;
    }
  }

  #description {
    max-width: 40%;

    @include for-phone-only {
      max-width: 100%;
    }
  }

  h3 {
    margin-top: 0.5rem;
    font-size: 1.1rem;
    color: #3a4374;
  }
  p {
    margin: 0.8rem auto;
    color: #647196;
    font-size: 1rem;

    @include for-phone-only {
      margin: 1rem;
    }
  }
  span {
    padding: 0.4rem;
    background-color: #f2f4fe;
    color: #3a4374;
    border-radius: 10px;
    font-weight: bold;
    font-size: 0.7rem;
  }

  #event-users-parent-container {
    h4 {
      margin-top: 1rem;
      font-size: 1rem;
      color: #3a4374;
      text-align: center;
    }
  }

  #event-stages-parent-container {
    display: flex;
    align-items: center;
    justify-content: center;

    @include for-phone-only {
      flex-direction: column;
    }
  }
  h4 {
    margin-top: 1rem;
    font-size: 1rem;
    color: #3a4374;
    text-align: center;
  }

  .event-user-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    p {
      display: inline-block;
      margin: 0 0.8rem;
      min-width: 220px;
      text-align: left;
    }
    svg {
      font-size: 1rem;
      padding: 0.2rem;
    }
  }

  .individual-stage {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;

    @include for-phone-only {
      justify-content: start;
      min-width: 60%;
    }

    p {
      display: inline-block;
      margin: 0 0.8rem;
      text-align: center;
    }

    svg {
      font-size: 1rem;
      padding: 0.2rem;
    }
  }

  .event-user-actions-parent-container {
    display: flex;
    justify-content: center;
    margin: 1rem auto;
    svg {
      font-size: 1rem;
      padding: 0.2rem;
      color: #3a4374;
    }
    span {
      height: 100%;
    }
    span:hover {
      cursor: pointer;
    }
  }
}
</style>

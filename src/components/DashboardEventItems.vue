<template>
  <div
    v-for="item in eventItems"
    v-bind:key="item.title"
    class="individual-event-container"
  >
    <router-link
      data-testid="eventDetailLink"
      :to="{
        name: 'Event Detail Page',
        params: {
          userId: userId,
          eventId: item.id,
          editEvent: false,
          event: JSON.stringify(item),
        },
      }"
    >
      <div
        v-if="item.type === 'DOMESTIC_DAY'"
        class="domestic-day-colour-mark"
        data-testid="domesticDay"
      ></div>
      <div
        v-else-if="item.type === 'DOMESTIC_OVERNIGHT'"
        class="domestic-overnight-colour-mark"
        data-testid="domesticOvernight"
      ></div>

      <div
        v-else
        data-testid="foreignOvernight"
        class="foreign-overnight-colour-mark"
      ></div>

      <div class="event-information-container">
        <h3 data-testid="eventTitle">{{ item.title }}</h3>
        <p>More info about group trip here...description</p>
        <p style="display: none">{{ item.id }}</p>
        <span data-testid="eventType">{{ item.type }}</span>
        <div class="event-user-actions-parent-container">
          <span v-if="showAllEventActions"
            ><router-link
              data-testid="editEventLink"
              :to="{
                name: 'Event Detail Page',
                params: {
                  userId: userId,
                  eventId: item.id,
                  editEvent: true,
                  event: JSON.stringify(item),
                },
              }"
            >
              <i class="fas fa-pen"></i> </router-link
          ></span>
          <span
            data-testid="deleteEvent"
            v-if="showAllEventActions"
            @click.prevent="showDeleteModal"
          >
            <i class="fas fa-times-circle"></i
          ></span>

          <span v-if="!showAllEventActions">
            <router-link
              data-testid="invitedEventLinkToEvent"
              :to="{
                name: 'Event Detail Page',
                params: {
                  userId: userId,
                  eventId: item.id,
                  editEvent: false,
                  event: JSON.stringify(item),
                },
              }"
            >
              <i class="fas fa-external-link-square-alt"></i>
            </router-link>
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    events: Array,
    createdEvents: Boolean,
    userUuid: String,
  },
  data() {
    return {
      eventItems: this.events,
      showAllEventActions: this.createdEvents,
      userId: this.userUuid,
      domesticDayColourHex: "#F49F85",
      domesticOvernightColourHex: "#AD1FEA",
      foreignOvernightColourHex: "#62BCFA",
    };
  },
  methods: {
    showDeleteModal(event) {
      this.$emit("showDeleteModal", event);
    },
  },
};
</script>

<style scoped lang="scss">
.individual-event-container {
  width: 30%;
  height: 28vh;
  display: inline-block;
  margin: 1rem 1.2rem;
  border-radius: 5px;
  background-color: #ffffff;

  @include for-phone-only {
    width: 90%;
    height: 30vh;
  }

  a {
    text-decoration: none;
  }

  .domestic-day-colour-mark {
    background-color: v-bind(domesticDayColourHex);
    height: 3%;
  }

  .domestic-overnight-colour-mark {
    background-color: v-bind(domesticOvernightColourHex);
    height: 3%;
  }

  .foreign-overnight-colour-mark {
    background-color: v-bind(foreignOvernightColourHex);
    height: 3%;
  }

  .event-information-container {
    width: 80%;
    height: 100%;
    margin: 1rem auto 0 auto;

    h3 {
      font-size: 1.1rem;
      color: #3a4374;
    }
    p {
      margin: 0.8rem auto;
      color: #647196;
      font-size: 1rem;
    }
    span {
      padding: 0.4rem;
      background-color: #f2f4fe;
      color: #3a4374;
      border-radius: 10px;
      font-weight: bold;
      font-size: 0.7rem;
    }

    .event-user-actions-parent-container {
      display: flex;
      justify-content: space-between;
      margin: 1rem auto;
      svg {
        font-size: 1rem;
        padding: 0.2rem;
        color: #3a4374;
      }
      span {
        height: 100%;
      }
    }
  }
}
.individual-event-container:hover {
  cursor: pointer;
}
</style>

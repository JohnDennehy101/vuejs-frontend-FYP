<template>
  <div class="individual-poll-container" v-for="poll in polls" :key="poll.id">
    <div class="poll-info-parent-container">
      <div class="poll-info-container">
        <h3>Title</h3>
        <p data-testid="title">{{ poll.title }}</p>
        <h3 v-if="mostVotedPollOption">Most Suitable Start Date</h3>
        <p data-testid="mostVotedOptionStartDate" v-if="mostVotedPollOption">
          {{ formatDate(mostVotedPollOption.startDate) }}
        </p>
        <h3 style="display: none">
          {{ poll.id }}
        </h3>
      </div>
      <div class="poll-info-container">
        <h3>Created</h3>
        <p data-testid="createdAt">
          {{ transformTimeStampFormat(new Date(poll.created_at)) }}
        </p>
        <h3 v-if="mostVotedPollOption">Most Suitable End Date</h3>
        <p data-testid="mostVotedEndDate" v-if="mostVotedPollOption">
          {{ formatDate(mostVotedPollOption.endDate) }}
        </p>
      </div>

      <div class="poll-info-container">
        <h3>Updated</h3>
        <p data-testid="updatedAt">
          {{ transformTimeStampFormat(new Date(poll.updated_at)) }}
        </p>
        <h3 v-if="mostVotedPollOption">Number of Votes</h3>
        <p v-if="mostVotedPollOption">
          {{ mostVotedPollOption.votes.length }}
        </p>
      </div>

      <div class="poll-info-container">
        <h3>Complete</h3>

        <span
          data-testid="pollCompletedIcon"
          id="pollCompletedIcon"
          v-if="poll.completed"
        >
          <i class="fas fa-calendar-check"></i>
        </span>
        <span
          data-testid="pollNotCompletedIcon"
          id="pollNotCompletedIcon"
          v-else
        >
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
      <span
        data-testid="editFunctionality"
        v-if="!invitedUser"
        v-on:click="$emit('editActionClick', true)"
      >
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
      <span
        data-testid="deleteFunctionality"
        v-if="!invitedUser"
        @click.prevent="showDeleteModal(poll)"
      >
        <i class="fas fa-trash-alt"></i
      ></span>
    </div>
  </div>
</template>

<script>
import DateUtils from "../utils/dateUtils";
export default {
  props: {
    pollItems: Array,
    userUuid: String,
    topVotedOption: Object,
    individualEventId: String,
    guestUser: Boolean,
  },
  data() {
    return {
      polls: this.pollItems,
      userId: this.userUuid,
      mostVotedPollOption: this.topVotedOption,
      eventId: this.individualEventId,
      invitedUser: this.guestUser,
    };
  },
  methods: {
    transformTimeStampFormat(date) {
      return DateUtils.returnFormattedDateWithTime(date);
    },
    formatDate(date) {
      return DateUtils.returnFormattedDate(date);
    },
    showDeleteModal(item) {
      this.$emit("showDeleteModal", item);
    },
  },
};
</script>

<style scoped lang="scss">
.individual-poll-container {
  height: 6rem;
  padding: 1rem 3rem;
  border-radius: 5px;
  margin: 1rem auto;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @include for-phone-only {
    flex-direction: column;
    padding: 1rem;
    min-height: 20rem;
  }

  .poll-info-parent-container {
    width: 75%;
    display: flex;

    @include for-phone-only {
      flex-direction: column;
      width: 85%;
    }
  }

  .poll-call-to-action-container {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;

    @include for-phone-only {
      flex-direction: column;
      width: 15%;
      height: 100%;
    }

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

      @include for-phone-only {
        margin: 0.5rem auto;
      }
    }
  }

  .poll-info-container {
    margin: 0 auto;
    min-height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include for-phone-only {
      min-height: 20%;
      margin: 0;
      justify-content: start;
    }

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

      @include for-phone-only {
        margin: 0;
      }
    }

    #pollNotCompletedIcon {
      svg {
        color: red;
      }

      @include for-phone-only {
        margin: 0;
      }
    }
  }
}
</style>

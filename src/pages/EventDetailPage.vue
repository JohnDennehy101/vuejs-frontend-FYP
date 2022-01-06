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
      @editActionClick="editEventInfo"
    />
    <NoCreatedItems
      v-if="polls.length === 0 && noCreatedPollsCallToActionLink.length > 0"
      :message="noCreatedPollsMessage"
      :callToAction="noCreatedPollsCallToAction"
      :routerLink="noCreatedPollsCallToActionLink"
    />

    <div id="polls-display-parent-container" v-if="polls.length > 0">
      <div
        class="individual-poll-container"
        v-for="poll in polls"
        :key="poll.id"
      >
        <div class="poll-info-parent-container">
          <div class="poll-info-container">
            <h3>Title</h3>
            {{ poll.title }}
            <h3 style="display: none">
              {{ poll.id }}
            </h3>
          </div>
          <div class="poll-info-container">
            <h3>Created At</h3>
            {{ poll.title }}
          </div>

          <div class="poll-info-container">
            <h3>Last Updated At</h3>
            {{ poll.title }}
          </div>
        </div>
        <div class="poll-call-to-action-container">
          <span v-on:click="$emit('editActionClick', true)">
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
          <span @click.prevent="showDeleteModal">
            <i class="fas fa-trash-alt"></i
          ></span>
        </div>
      </div>
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
      noCreatedPollsMessage: "You have not created any polls for this event.",
      noCreatedPollsCallToAction: "Create Poll",
      noCreatedPollsCallToActionLink: "",
      displayDeleteModal: false,
      deletePollTitle: "",
      deletePollModalHeading: "Poll",
      pollId: null,
      showEventInfo: false,
      eventId: "",
    };
  },
  components: {
    EventForm,
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
        this.individualEvent = response.data[0];
        this.noCreatedPollsCallToActionLink = `${response.data[0].id}/poll`;

        this.showEventInfo = true;
        this.polls = response.data[0].polls;
      }
    },
    showDeleteModal(event) {
      this.deletePollTitle =
        event.path[3].children[0].childNodes[0].childNodes[1].textContent;
      this.pollId =
        event.path[3].children[0].childNodes[0].childNodes[2].textContent;
      this.displayDeleteModal = true;
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
#polls-display-parent-container {
  width: 60%;
  margin: 1rem auto;

  .individual-poll-container {
    height: 6rem;
    padding: 1rem 3rem;
    border-radius: 5px;
    margin: 1rem auto;
    background-color: #ffffff;
    display: flex;

    justify-content: space-between;

    .poll-info-parent-container {
      width: 80%;
      display: flex;
    }

    .poll-call-to-action-container {
      width: 20%;
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

      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>

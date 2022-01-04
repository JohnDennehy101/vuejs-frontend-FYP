<template>
  <div id="wrapper">
    <EventForm
      v-if="showEditForm"
      :edit="this.edit"
      :individualEvent="this.individualEvent"
      @hideEditEventActionClick="this.hideEditForm"
    />
    <EventOverview
      v-else-if="showEditForm == false"
      :individualEvent="this.individualEvent"
      @editActionClick="editEventInfo"
    />
    <NoCreatedItems
      v-if="polls"
      :message="noCreatedPollsMessage"
      :callToAction="noCreatedPollsCallToAction"
      :routerLink="noCreatedPollsCallToActionLink"
    />
  </div>
</template>

<script>
import EventForm from "../components/EventForm";
import EventOverview from "../components/EventOverview";
import NoCreatedItems from "../components/NoCreatedItems";
export default {
  name: "eventDetailPage",
  props: ["editEvent", "event", "eventId"],
  data() {
    return {
      showEditForm: false,
      edit: this.editEvent,
      individualEvent: this.event,
      polls: true,
      noCreatedPollsMessage: "You have not created any polls for this event.",
      noCreatedPollsCallToAction: "Create Poll",
      noCreatedPollsCallToActionLink: `${this.eventId}/poll`,
    };
  },
  components: {
    EventForm,
    EventOverview,
    NoCreatedItems,
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
    async createPollLink() {
      localStorage.setItem("eventId", this.individualEvent.id);
    },
  },
  async created() {
    await this.checkEditAction();
    await this.createPollLink();
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
}
</style>

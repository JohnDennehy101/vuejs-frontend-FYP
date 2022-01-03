<template>
  {{ this.individualEvent.title }}
  <EventForm :edit="this.edit" :individualEvent="this.individualEvent" />
</template>

<script>
import EventForm from "../components/EventForm";
export default {
  name: "eventDetailPage",
  props: ["editEvent", "event"],
  data() {
    return {
      edit: this.editEvent,
      individualEvent: this.event,
    };
  },
  components: {
    EventForm,
  },
};
</script>

<style scoped lang="scss"></style>

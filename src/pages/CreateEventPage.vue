<template>
  <div id="wrapper">
    <EventForm />
  </div>
</template>

<script>
import EventForm from "../components/EventForm";
export default {
  data() {
    return {};
  },

  components: {
    EventForm,
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>

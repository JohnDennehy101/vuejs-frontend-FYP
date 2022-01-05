<template>
  <div id="wrapper">
    <PollForm :editPoll="this.editPoll" :poll="this.poll" />
  </div>
</template>

<script>
import PollForm from "../components/PollForm";
export default {
  props: ["editPoll", "poll"],
  data() {
    return {
      eventId: null,
    };
  },
  components: {
    PollForm,
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

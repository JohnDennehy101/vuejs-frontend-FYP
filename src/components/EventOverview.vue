<template>
  <div id="event-information-container">
    <h3>{{ title }}</h3>
    <p>More info about group trip here...description</p>
    <span>{{ type }}</span>
    <div class="event-user-actions-parent-container">
      <span v-on:click="$emit('editActionClick', true)">
        <i class="fas fa-pen"></i
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["individualEvent"],
  data() {
    return {
      item: this.individualEvent,
      title: "",
      type: "",
    };
  },
  methods: {
    populateEventInfo() {
      const eventInfo = JSON.parse(this.item);
      console.log(eventInfo);

      this.title = eventInfo.title;
      this.type = eventInfo.type;
    },
  },
  created() {
    this.populateEventInfo();
  },
};
</script>

<style scoped lang="scss">
#event-information-container {
  width: 60%;
  text-align: center;
  margin: 1rem auto;
  border-radius: 5px;
  background-color: #ffffff;

  h3 {
    margin-top: 0.5rem;
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

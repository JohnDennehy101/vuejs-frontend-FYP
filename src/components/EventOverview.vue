<template>
  <div id="event-information-container">
    <h3>{{ title }}</h3>
    <p>More info about group trip here...description</p>
    <span>{{ type }}</span>
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
    <div v-if="!guestUser" class="event-user-actions-parent-container">
      <span v-on:click="$emit('editActionClick', true)">
        <i class="fas fa-pen"></i
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["individualEvent", "invitedUser"],
  data() {
    return {
      item: this.individualEvent,
      title: "",
      type: "",
      guestUser: this.invitedUser,
    };
  },
  methods: {
    populateEventInfo() {
      const eventInfo = this.item;

      if (eventInfo !== null) {
        this.title = eventInfo.title;
        this.type = eventInfo.type;
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

  #event-users-parent-container {
    h4 {
      margin-top: 1rem;
      font-size: 1rem;
      color: #3a4374;
    }
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

<template>
  <div id="chat-online-users-container">
    <div
      class="individual-user-container"
      v-for="user in onlineUsers"
      :key="user.id"
    >
      <div
        v-if="eventUsers.find((oneUser) => oneUser.email === user.email)"
        id="user-image-container"
      >
        <img
          data-testid="userImage"
          v-if="user.profileImageUrl"
          :src="user.profileImageUrl"
        />
        <img
          data-testid="defaultImage"
          v-else
          src="../assets/defaultUserImage.png"
        />
      </div>
      <p v-if="eventUsers.find((oneUser) => oneUser.email === user.email)">
        {{ user.email }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["onlineUsers", "eventUsers"],
  data() {
    return {
      users: this.onlineUsers,
      eventListUsers: this.eventUsers,
    };
  },
  computed: {
    onlineEventUsers() {
      return this.users.filter((user) =>
        this.eventListUsers.find((liveUser) => liveUser.email === user.email)
      );
    },
  },
};
</script>

<style scoped lang="scss">
#chat-online-users-container {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20vh;

  margin: 1rem auto;
  border-radius: 5px;
  background-color: #ffffff;

  @include for-phone-only {
    width: 90%;
    flex-direction: column;
  }
}
.individual-user-container {
  margin: 2rem 3rem;
}
#user-image-container {
  max-width: 50px;
  height: 50px;
  overflow: hidden;
  margin: 1rem auto;

  vertical-align: middle;

  align-items: center;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>

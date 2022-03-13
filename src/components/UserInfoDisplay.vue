<template>
  <div id="user-info-display-wrapper-container">
    <div id="user-info-display-parent-container">
      <div id="user-image-container">
        <img
          data-testid="userImageProvided"
          v-if="userInfo.profileImageUrl"
          :src="userInfo.profileImageUrl"
        />
        <img
          data-testid="userImageNotProvided"
          v-else
          src="../assets/defaultUserImage.png"
        />
      </div>
      <div id="user-info-container">
        <h3>Email</h3>
        <div class="user-individual-info">
          <p data-testid="userEmail">{{ userInfo.email }}</p>
        </div>
      </div>
    </div>
    <div id="user-info-stats-display-parent-container">
      <i class="far fa-address-book"></i>

      <div class="user-individual-info">
        <p data-testid="numberOfCreatedEvents">
          {{ createdEventsQuantity }} events created
        </p>
      </div>
      <i class="fas fa-user-friends"></i>

      <div class="user-individual-info">
        <p data-testid="numberOfInvitedEvents">
          {{ invitedEventsQuantity }} event invites
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "invitedEventsQuantity", "createdEventsQuantity"],
  data() {
    return {
      userInfo: this.user,
      numberOfCreatedEvents: this.createdEventsQuantity,
      numberOfInvitedEvents: this.invitedEventsQuantity,
    };
  },
};
</script>

<style scoped lang="scss">
#user-info-display-wrapper-container {
  width: 52%;
  margin: 2rem auto 1rem auto;
  display: flex;
  background-color: white;

  @include for-phone-only {
    width: 82%;
    flex-direction: column;
  }
}
#user-info-display-parent-container {
  width: 50%;
  display: flex;
  flex-direction: column;

  align-items: center;

  @include for-phone-only {
    width: 95%;
  }
}
#user-image-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 1rem auto 0 auto;
  overflow: hidden;

  display: inline-block;
  vertical-align: middle;

  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
}

#user-info-container {
  margin: 1rem;

  @include for-phone-only {
    margin: 1rem auto 0 auto;
  }
}

h3 {
  text-align: center;
}

.user-individual-info {
  display: flex;
  align-items: center;
  margin: 1rem auto;
}

#user-info-stats-display-parent-container {
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    margin-top: 0.5rem;
    font-size: 1.3rem;
  }

  @include for-phone-only {
    width: 95%;
  }
}
</style>

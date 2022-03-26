<template>
  <div id="no-items-call-to-action-container">
    <i class="fas fa-folder-open"></i>
    <h4>{{ messageForUser }}</h4>

    <button v-if="!guestUser" @click="$router.push({ path: `${this.link}` })">
      {{ callToActionForUser }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["display", "message", "callToAction", "routerLink", "invitedUser"],
  data() {
    return {
      messageForUser: this.message,
      callToActionForUser: this.callToAction,
      link: this.routerLink,
      noItemsPresent: this.display,
      guestUser: this.invitedUser,
    };
  },
};
</script>

<style scoped lang="scss">
#no-items-call-to-action-container {
  height: 20vh;
  padding: 1rem 0;
  width: 82%;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  background-color: white;

  @include for-phone-only {
    width: 90%;
  }
}
button {
  border-radius: 10px;
  border: none;
  width: 40%;
  height: 2.5rem;
  margin: 1rem 0;
  background-color: $primary-button-background-colour;
  color: $primary-button-text-colour;

  @include for-phone-only {
    width: 60%;
  }
}
button:hover {
  cursor: pointer;
}
svg {
  font-size: 1.5rem;
  padding: 1rem;
}

h4 {
  @include for-phone-only {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>

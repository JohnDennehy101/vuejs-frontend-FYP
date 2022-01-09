<template>
  <div id="no-items-call-to-action-container">
    <i class="fas fa-folder-open"></i>
    <h4>{{ messageForUser }}</h4>

    <button @click="$router.push({ path: `${this.link}` })">
      {{ callToActionForUser }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["display", "message", "callToAction", "routerLink"],
  data() {
    return {
      messageForUser: this.message,
      callToActionForUser: this.callToAction,
      link: this.routerLink,
      noItemsPresent: this.display,
    };
  },
};
</script>

<style scoped lang="scss">
#no-items-call-to-action-container {
  height: 20vh;
  padding: 1rem 0;
  width: 60%;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  background-color: white;
}
button {
  border-radius: 10px;
  border: none;
  width: 40%;
  height: 2.5rem;
  margin: 1rem 0;
  background-color: $primary-button-background-colour;
  color: $primary-button-text-colour;
}
button:hover {
  cursor: pointer;
}
svg {
  font-size: 1.5rem;
  padding: 1rem;
}
</style>

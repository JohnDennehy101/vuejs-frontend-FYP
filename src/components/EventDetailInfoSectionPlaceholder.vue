<template>
  <h2>{{ sectionTitle }}</h2>
  <div id="event-detail-info-placeholder-container">
    <i :class="iconPath"></i>

    <button v-on:click="$emit('showScrapedInfo', sectionTitle)">
      Show {{ sectionTitle }} Options
    </button>
  </div>
</template>

<script>
export default {
  props: ["title", "icon"],
  data() {
    return {
      sectionTitle: this.title,
      iconPath: this.icon,
    };
  },
};
</script>

<style scoped lang="scss">
h2 {
  margin: 1rem 0;
  text-align: left;
  width: 80%;
}
#event-detail-info-placeholder-container {
  width: 80%;

  min-height: 15vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;

  @include for-phone-only {
    width: 90%;
    min-height: 20vh;
  }
}
svg {
  padding-bottom: 1rem;
  font-size: 1.5rem;
  color: #373f68;
}
button {
  border-radius: 1rem;
  border: none;
  width: 20%;
  background-color: #3a4374;
  height: 2.5rem;

  color: $primary-button-text-colour;

  @include for-phone-only {
    width: 60%;
    height: 2rem;
  }
}
button:hover {
  cursor: pointer;
}
</style>

<template>
  <button
    className="hide-event-detail-category-button"
    v-on:click="toggleTableDisplay"
  >
    Hide
  </button>
</template>

<script>
export default {
  props: {
    infoType: String,
  },
  data() {
    return {
      type: this.infoType,
    };
  },
  methods: {
    toggleTableDisplay() {
      this.$emit("toggleEventDetailInfo", this.type);
    },
  },
};
</script>

<style scoped lang="scss">
.hide-event-detail-category-button {
  background-color: #d73737;
  color: #ffffff;
  border-radius: 10px;
  border: none;
  width: 10%;
  height: 2.5rem;
  margin: 1rem auto;

  @include for-phone-only {
    width: 40%;
    height: 2rem;
  }
}
button:hover {
  cursor: pointer;
}
</style>

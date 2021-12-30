<template>
  <div class="form-control" v-show="toggle" id="error-sign-up-notice">
    <i class="fas fa-exclamation-triangle"></i>
    <p>{{ errorMessage }}</p>

    <span @click="hideErrorMessage">
      <i class="fas fa-times-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
    },
    errorMessage: {
      type: String,
    },
  },
  data() {
    return {
      display: this.toggle,
    };
  },

  methods: {
    hideErrorMessage() {
      this.$emit("hideErrorMessage", true);
    },
  },
};
</script>

<style scoped lang="scss">
#error-sign-up-notice {
  border-radius: 5px;
  background-color: #e57373;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  i {
    pointer-events: all;
  }
  .form-control {
    width: 80%;
    margin: 0.5rem auto;
  }
}
</style>

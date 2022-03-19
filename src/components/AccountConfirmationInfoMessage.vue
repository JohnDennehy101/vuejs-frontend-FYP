<template>
  <div class="banner-message-container">
    <i data-testid="icon" class="fas fa-check-circle"></i>
    <p data-testid="infoMessage">
      {{ infoMessage }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  data() {
    return {
      infoMessage: this.message,
    };
  },
};
</script>

<style scoped lang="scss">
.banner-message-container {
  display: flex;
  align-items: center;
  padding: 1rem;
}

p {
  margin: 0 0.5rem;
  color: #647196;
  font-size: 1rem;
}
svg {
  color: #647196;
  font-size: 1rem;
}
</style>

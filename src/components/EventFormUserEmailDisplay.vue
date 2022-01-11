<template>
  <li>{{ userEmail }}</li>
  <span v-on:click="$emit('removeUserEmail', userEmail)"
    ><i class="fas fa-times-circle"></i
  ></span>
</template>

<script>
export default {
  props: ["email"],
  data() {
    return {
      userEmail: this.email,
    };
  },
};
</script>

<style scoped lang="scss">
li {
  margin: 0.5rem 0;
  list-style-type: none;
}
span {
  margin: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
svg:hover {
  cursor: pointer;
}
</style>

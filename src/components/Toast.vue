<template>
  <div class="toast-parent">
    <div class="toast">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  data() {
    return {
      content: this.message,
    };
  },
};
</script>

<style>
.toast-parent {
  position: fixed;
  width: 100%;
  top: 20px;
}
.toast {
  padding: 20px;
  color: #fff;
  background: #0288d1;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
}
</style>

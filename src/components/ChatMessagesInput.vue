<template>
  <div id="add-chat-message-container">
    <div id="new-chat-message-components">
      <h4>Add Comment</h4>
      <textarea
        id="message"
        name="message"
        type="text"
        placeholder="Type your comment here"
        v-model="message"
      />

      <button
        className="hide-event-detail-category-button"
        v-on:click="addComment"
      >
        Post Comment
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    addComment(event) {
      event.preventDefault();

      this.$emit("addComment", this.message);
      this.message = "";
    },
  },
};
</script>

<style scoped lang="scss">
#add-chat-message-container {
  width: 80%;

  margin: 1rem auto;
  border-radius: 5px;
  background-color: #ffffff;

  @include for-phone-only {
    width: 90%;
  }
}
#new-chat-message-components {
  padding: 1.5rem;

  @include for-phone-only {
    padding: 1.5rem 1rem;
  }
}
textarea {
  display: block;
  width: 98%;
  height: 15vh;
  border: none;
  background-color: #f7f8fd;
  margin: 1rem auto;
  padding-left: 1rem;
  padding-top: 1rem;
  font-family: "Open Sans", sans-serif;
  resize: none;

  @include for-phone-only {
    width: 90%;
  }
}
h4 {
  margin-left: 0.5rem;
}

button {
  background-color: #3a4374;
  color: #ffffff;
  border-radius: 10px;
  border: none;
  width: 20%;
  height: 2.5rem;
  margin-left: 5px;

  @include for-phone-only {
    width: 40%;
    height: 2rem;
  }
}
button:hover {
  cursor: pointer;
}
</style>

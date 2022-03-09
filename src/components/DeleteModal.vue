<template>
  <!-- template for the modal component -->
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h2>Delete {{ itemType }}</h2>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <p>Are you sure you want to delete - {{ title }}?</p>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button
              class="modal-button"
              id="modal-delete-button"
              @click="deleteEvent"
            >
              DELETE
            </button>
            <button
              class="modal-button"
              id="modal-cancel-button"
              @click="$emit('close')"
            >
              CANCEL
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventService from "../services/EventService";
export default {
  props: {
    eventService: {
      default: eventService,
    },
    title: String,
    eventId: String,
    modalHeading: String,
    pollId: String,
  },
  data() {
    return {
      itemType: this.modalHeading,
      itemTitle: this.title,
      eventUuid: this.eventId,
      pollUuid: this.pollId,
    };
  },
  methods: {
    async deleteEvent() {
      if (this.itemType === "Event") {
        const response = await this.eventService.default.deleteEvent(
          this.eventUuid
        );
        if (!("error" in response)) {
          this.$router.go(0);
        }
      } else {
        const response = await this.eventService.default.deleteEventPoll(
          this.eventUuid,
          this.pollUuid
        );
        if (!("error" in response)) {
          this.$router.go(0);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-button {
  display: inline-block;
  margin: 1rem 1rem 0 0;
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  border-radius: 10px;
  font-weight: bold;
}
.modal-button:hover {
  cursor: pointer;
}

#modal-delete-button {
  background-color: #d73737;
}

#modal-cancel-button {
  background-color: #4661e6;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

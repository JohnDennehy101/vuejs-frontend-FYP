<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter title"
        v-model="title"
      />
    </div>
    <div class="form-control">
      <label for="startDate">Start Date</label>
      <datepicker
        v-model="startDate"
        v-bind:style="datePickerStyleObject"
        :lower-limit="restrictDatePicker"
      />
    </div>
    <div class="form-control">
      <label for="endDate">End Date</label>
      <datepicker
        v-model="endDate"
        v-bind:style="datePickerStyleObject"
        :lower-limit="startDate"
      />
    </div>
    <div class="form-control">
      <button
        @click="addPollOption"
        data-testid="button"
        id="add-option-button"
      >
        Add Option
      </button>
    </div>
    <div v-if="options.length > 0" class="form-control">
      <label for="options">Poll Options</label>
      <ul v-for="option in options" :key="option.id">
        <PollOption
          v-on:removePollOption="removeIndividualPollOption"
          :startDate="option.startDate"
          :endDate="option.endDate"
          :optionId="option.id"
        />
      </ul>
    </div>
    <div class="form-control">
      <button>Submit</button>
    </div>
  </form>
</template>

<script>
import Datepicker from "vue3-datepicker";
import PollOption from "./PollOption";
import eventService from "../services/EventService";
import StringUtils from "../utils/stringUtils";
export default {
  props: {
    poll: Object,
    editPoll: Boolean,
    eventService: {
      default: eventService,
    },
  },
  data() {
    return {
      title: "",
      pollInfo: this.poll,
      editPollAction: this.editPoll,
      startDate: new Date(),
      restrictDatePicker: new Date(),
      endDate: null,
      options: [],
      id: "",
      optionId: 0,
      datePickerStyleObject: {
        height: "2.5rem",
        width: "98%",
        borderRadius: "12px",
        border: "1px solid grey",
        paddingLeft: "10px",
      },
    };
  },

  watch: {
    startDate: function (val) {
      if (val > this.endDate) {
        this.endDate = null;
      }
    },
  },

  methods: {
    async extractIdFromUrl() {
      this.id = window.location.pathname.split("/")[3];
    },
    removeIndividualPollOption(id) {
      const index = this.options.findIndex((option) => option.id === id);
      this.options.splice(index, 1);
    },
    async submitForm() {
      if (this.editPollAction) {
        const userId = localStorage.getItem("id");

        if (this.title.length > 0 && this.options.length > 0) {
          const payload = {
            title: this.title,
            options: this.options,
          };

          const response = await this.eventService.editEventPoll(
            this.id,
            this.pollInfo,
            payload
          );

          if (!("error" in response)) {
            this.$router.push({ path: `/dashboard/${userId}` });
          } else {
            this.invalidLogin = true;
          }
        }
      } else {
        const userId = localStorage.getItem("id");

        if (this.title.length > 0 && this.options.length > 0) {
          const payload = {
            title: this.title,
            options: this.options,
          };

          const response = await this.eventService.createEventPoll(
            this.id,
            payload
          );

          if (!("error" in response)) {
            this.$router.push({ path: `/dashboard/${userId}` });
          } else {
            this.invalidLogin = true;
          }
        }
      }
    },
    async populateFormInfo() {
      if (this.editPollAction) {
        const pollInformation = JSON.parse(this.pollInfo);

        const response = await this.eventService.getIndividualPoll(
          this.id,
          pollInformation.id
        );

        this.title = response.data.title;
        this.options = response.data.pollOptions;
      }
    },
    addPollOption(event) {
      event.preventDefault();
      if (this.startDate !== null && this.endDate !== null) {
        this.options.push({
          id: StringUtils.generateUUID(),
          startDate: this.startDate,
          endDate: this.endDate,
          votes: [],
        });

        this.optionId++;

        this.startDate = null;
        this.endDate = null;
      }
    },
  },

  async created() {
    await this.extractIdFromUrl();
    await this.populateFormInfo();
  },
  components: {
    Datepicker,
    PollOption,
  },
};
</script>

<style scoped lang="scss">
.v3dp__datepicker {
  --vdp-bg-color: #ffffff;
  --vdp-text-color: #000000;
  --vdp-box-shadow: 0 4px 10px 0 rgba(128, 144, 160, 0.1),
    0 0 1px 0 rgba(128, 144, 160, 0.81);
  --vdp-border-radius: 24px;
  --vdp-heading-size: 2.5em;
  --vdp-heading-weight: bold;
  --vdp-heading-hover-color: #eeeeee;
  --vdp-arrow-color: #eeeeee;
  --vdp-elem-color: #eeeeee;
  --vdp-disabled-color: #d5d9e0;
  --vdp-hover-color: #ffffff;
  --vdp-hover-bg-color: #0384ff;
  --vdp-selected-color: #ffffff;
  --vdp-selected-bg-color: #0384ff;
  --vdp-elem-font-size: 1rem;
  --vdp-elem-border-radius: 0.5rem;
  --vdp-divider-color: #d5d9e0;
}
form {
  width: 60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  margin: 1rem auto;
  border-radius: 10px;
  border: 1px solid #eeeeee;

  @include for-phone-only {
    width: 90%;
    min-height: 90vh;
  }

  .form-control {
    width: 80%;
    margin: 0.5rem auto;

    @include for-phone-only {
      width: 88%;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }
    input {
      height: 2.5rem;
      width: 98%;
      border-radius: 12px;
      border: 1px solid grey;
      padding-left: 10px;
    }
    input[type="radio"] {
      height: 1rem;
      width: 2%;
      margin-right: 0.5rem;
      text-align: left;
      padding-left: 0;
      display: inline-block;
    }
    .radio-parent-container {
      margin: 0.5rem auto;
      display: flex;
      align-items: center;
    }
    .radio-label {
      display: inline-block;
      margin-bottom: 0;
    }
    h3 {
      font-size: 1rem;
    }
  }

  button {
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 2.5rem;
    margin: 1rem auto;
    background-color: $primary-button-background-colour;
    color: $primary-button-text-colour;
  }
  button:hover {
    cursor: pointer;
  }
  #add-option-button {
    width: 20%;
    background-color: #3a4374;

    @include for-phone-only {
      width: 50%;
    }
  }
  ul {
    display: flex;
  }
  .button-container {
    text-align: center;
  }
}
</style>

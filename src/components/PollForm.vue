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
      {{ pollInfo }}
      <button>Submit</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import Datepicker from "vue3-datepicker";
export default {
  props: ["poll", "editPoll"],
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
    async submitForm() {
      const userId = localStorage.getItem("id");
      const payload = {
        title: this.title,
        options: [
          {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        ],
      };

      const response = await axios
        .post(`http://localhost:3000/events/${this.id}/poll`, payload, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .catch((error) => {
          return { error };
        });

      if (!("error" in response)) {
        this.$router.push({ path: `/dashboard/${userId}` });
      } else {
        this.invalidLogin = true;
      }
    },
    populateFormInfo() {
      if (this.editPollAction) {
        const pollInformation = JSON.parse(this.pollInfo);
        this.title = pollInformation.title;
        this.options = pollInformation.options;
      }
    },
  },
  async created() {
    this.populateFormInfo();
    await this.extractIdFromUrl();
  },
  components: {
    Datepicker,
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

  .form-control {
    width: 80%;
    margin: 0.5rem auto;

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
  .button-container {
    text-align: center;
  }
}
</style>

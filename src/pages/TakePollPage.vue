<template>
  <form @submit.prevent="submitForm" v-if="pollInformation">
    <div class="form-control">
      <h3>Suitable Dates Poll For - {{ pollInformation.title }}</h3>

      <div
        v-for="option in pollOptions"
        v-bind:key="option.id"
        class="checkbox-parent-container"
      >
        <input
          :id="option.id"
          type="checkbox"
          :value="option.id"
          v-model="checkedOptions"
        />

        <TakePollLabel
          :optionId="option.id"
          :optionStartDate="option.startDate"
          :optionEndDate="option.endDate"
        />
      </div>
    </div>
    <div class="form-control button-container">
      <button>Submit Poll</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import TakePollLabel from "../components/TakePollLabel";
export default {
  data() {
    return {
      eventId: null,
      pollId: null,
      checkedOptions: [],
      pollInformation: null,
      pollOptions: null,
    };
  },
  methods: {
    async extractIdsFromUrl() {
      this.eventId = window.location.pathname.split("/")[3];
      this.pollId = window.location.pathname.split("/")[5];
    },
    async populateFormInfo() {
      const userId = localStorage.getItem("id");
      for (let option in this.pollOptions) {
        if (this.pollOptions[option].votes.indexOf(userId) !== -1) {
          this.checkedOptions.push(this.pollOptions[option].id);
        }
      }
    },
    async getEventPollInfo() {
      const jwtToken = localStorage.getItem("token");
      const response = await axios
        .get(
          `http://localhost:3000/events/${this.eventId}/poll/${this.pollId}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .catch((error) => {
          return { error };
        });

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.pollInformation = response.data;
        this.pollOptions = response.data[0].pollOptions;
      }
    },
    async submitForm() {
      const userId = localStorage.getItem("id");
      for (let option in this.pollOptions) {
        if (
          this.checkedOptions.includes(this.pollOptions[option].id) &&
          this.pollOptions[option].votes.indexOf(userId) === -1
        ) {
          this.pollOptions[option].votes.push(userId);
        }
      }

      if (this.checkedOptions.length > 0) {
        const payload = {
          options: this.pollOptions,
        };

        console.log(payload);

        const response = await axios
          .patch(
            `http://localhost:3000/events/${this.eventId}/poll/${this.pollId}`,
            payload,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .catch((error) => {
            return { error };
          });

        if (!("error" in response)) {
          this.$router.push({ path: `/dashboard/${userId}` });
        } else {
          this.invalidLogin = true;
        }
      }
    },
  },
  async created() {
    await this.extractIdsFromUrl();
    await this.getEventPollInfo();
    await this.populateFormInfo();
  },
  components: {
    TakePollLabel,
  },
};
</script>

<style scope lang="scss">
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
    input[type="checkbox"] {
      height: 1rem;
      width: 2%;
      margin-right: 0.5rem;
      text-align: left;
      padding-left: 0;
      display: inline-block;
    }
    .checkbox-parent-container {
      margin: 0.5rem auto;
      display: flex;
      align-items: center;
    }
    .checkbox-label {
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
  }
  ul {
    display: flex;
  }
  .button-container {
    text-align: center;
  }
}
</style>

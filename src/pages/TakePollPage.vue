<template>
  <form @submit.prevent="submitForm" v-if="pollInformation">
    <div class="form-control">
      <h3>Suitable Dates Poll For - {{ pollInformation.title }}</h3>

      <PollBarChart
        v-if="loaded"
        :key="chartKey"
        :chartKey="chartKey"
        :chartData="chartdata"
      />

      <div
        v-for="option in pollOptions"
        v-bind:key="option.id"
        class="checkbox-parent-container"
      >
        <input
          :id="option.id"
          type="checkbox"
          v-on:change="triggerChartRefresh"
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
import TakePollLabel from "../components/TakePollLabel";
import PollBarChart from "../components/PollBarChart";
import EventService from "../services/EventService";
const eventService = new EventService();
export default {
  data() {
    return {
      eventId: null,
      pollId: null,
      checkedOptions: [],
      pollInformation: null,
      pollOptions: null,
      pollVotes: null,
      loaded: false,
      chartdata: null,
      chartKey: 0,
    };
  },
  methods: {
    async extractIdsFromUrl() {
      this.eventId = window.location.pathname.split("/")[3];
      this.pollId = window.location.pathname.split("/")[5];
    },
    async populateFormInfo() {
      const userId = localStorage.getItem("id");
      for (let option in this.pollVotes) {
        if (this.pollVotes[option].userId === userId) {
          this.checkedOptions.push(this.pollVotes[option].pollOptionId);
        }
      }
    },
    async getEventPollInfo() {
      const response = await eventService.getEventPolls(
        this.eventId,
        this.pollId
      );

      console.log(response);

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.pollInformation = response.data;
        this.pollOptions = response.data.pollOptions;
        this.pollVotes = response.data.pollVote;
        this.chartdata = response.data.pollOptions;
        this.loaded = true;
      }
    },
    triggerChartRefresh(event) {
      const individualOption = this.chartdata.find(
        (item) => item.id === event.target.value
      );

      if (event.target.checked) {
        for (let option in this.chartdata) {
          if (this.chartdata[option].id === individualOption.id) {
            this.chartdata[option].votes++;
          }
        }
      } else {
        for (let option in this.chartdata) {
          if (this.chartdata[option].id === individualOption.id) {
            this.chartdata[option].votes--;
          }
        }
      }

      this.chartKey++;
    },
    async submitForm() {
      const userId = localStorage.getItem("id");

      let checkedOptions = this.pollOptions.filter((option) =>
        this.checkedOptions.includes(option.id)
      );

      if (this.checkedOptions.length > 0) {
        const payload = {
          options: checkedOptions,
        };

        const response = await eventService.voteEventPoll(
          userId,
          this.eventId,
          this.pollId,
          payload
        );

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
    PollBarChart,
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
      justify-content: center;
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
      text-align: center;
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

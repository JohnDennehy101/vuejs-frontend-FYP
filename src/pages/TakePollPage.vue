<template>
  <div class="vld-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="true"
      :loader="loaderType"
      :color="loaderColour"
    />
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
        <ResponseErrorMessage
          :toggle="showErrorMessage"
          :errorMessage="pollVoteErrorMessage"
          v-on:hideErrorMessage="hideErrorMessage"
        />
      </div>
    </form>
  </div>
</template>

<script>
import TakePollLabel from "../components/TakePollLabel";
import PollBarChart from "../components/PollBarChart";
import eventService from "../services/EventService";
import { mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ResponseErrorMessage from "../components/ResponseErrorMessage";
export default {
  props: {
    eventService: {
      default: eventService,
    },
  },
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
      isLoading: false,
      fullPage: false,
      loaderType: "dots",
      loaderColour: "#0384ff",
      showErrorMessage: false,
      pollVoteErrorMessage: "",
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
    }),
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
      const response = await this.eventService.getEventPolls(
        this.eventId,
        this.pollId
      );
      if ("error" in response) {
        this.loaded = true;
        this.pollVoteErrorMessage =
          "Error adding poll votes. Please try again.";
        this.showErrorMessage = true;
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
      let checkedOptions = this.pollOptions.filter((option) =>
        this.checkedOptions.includes(option.id)
      );

      if (this.checkedOptions.length > 0) {
        const payload = {
          options: checkedOptions,
        };

        this.isLoading = true;
        const response = await this.eventService.voteEventPoll(
          this.userId,
          this.eventId,
          this.pollId,
          payload
        );

        if (!("error" in response)) {
          this.isLoading = false;
          this.$router.push({ path: `/dashboard/${this.userId}` });
        } else {
          this.isLoading = false;
          this.invalidLogin = true;
        }
      } else {
        this.showErrorMessage = true;
        this.pollVoteErrorMessage =
          "Please select a poll option to submit your vote.";
      }
    },
    hideErrorMessage() {
      this.showErrorMessage = false;
    },
  },
  async created() {
    await this.extractIdsFromUrl();
    await this.getEventPollInfo();
    await this.populateFormInfo();
  },
  components: {
    Loading,
    TakePollLabel,
    PollBarChart,
    ResponseErrorMessage,
  },
};
</script>

<style scope lang="scss">
.vld-parent {
  width: 100vw;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
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
  }

  .form-control {
    width: 80%;
    margin: 0.5rem auto;

    @include for-phone-only {
      width: 90%;
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
    input[type="checkbox"] {
      height: 1rem;
      width: 2%;
      margin-right: 0.5rem;
      text-align: left;
      padding-left: 0;
      display: inline-block;

      @include for-phone-only {
        width: 5%;
      }
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

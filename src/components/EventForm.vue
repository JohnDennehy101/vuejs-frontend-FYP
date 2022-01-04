<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <h2>{{ formTitle }}</h2>
    </div>

    <div class="form-control">
      <label for="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter event title"
        v-model="title"
        required
      />
    </div>
    <div class="form-control">
      <h3>Event Type</h3>

      <div class="radio-parent-container">
        <input
          id="DOMESTIC_DAY"
          name="eventType"
          type="radio"
          value="DOMESTIC_DAY"
          v-model="eventType"
          required="required"
        />
        <label class="radio-label" for="DOMESTIC_DAY">Domestic Day Trip</label>
      </div>
      <div class="radio-parent-container">
        <input
          id="DOMESTIC_OVERNIGHT"
          name="eventType"
          type="radio"
          value="DOMESTIC_OVERNIGHT"
          v-model="eventType"
          required="required"
        />
        <label class="radio-label" for="DOMESTIC_OVERNIGHT"
          >Domestic Overnight Trip</label
        >
      </div>
      <div class="radio-parent-container">
        <input
          id="FOREIGN_OVERNIGHT"
          name="eventType"
          type="radio"
          value="FOREIGN_OVERNIGHT"
          v-model="eventType"
          required="required"
        />
        <label class="radio-label" for="FOREIGN_OVERNIGHT"
          >Foreign Overnight Trip</label
        >
      </div>
    </div>
    <div class="form-control button-container">
      <button>Add Event</button>
    </div>

    <AccountErrorMessage
      :toggle="this.invalidEventCreation"
      :errorMessage="this.errorMessage"
      v-on:hideErrorMessage="hideErrorMessage"
    />
  </form>
</template>

<script>
import axios from "axios";
import AccountErrorMessage from "../components/AccountErrorMessage";
export default {
  props: ["edit", "individualEvent"],
  data() {
    return {
      title: "",
      invalidEventCreation: false,
      errorMessage:
        "There was an error adding this event, not successfully created.",
      formTitle: "",
      eventType: null,
      editEventAction: this.edit,
      editEventInfo: this.individualEvent,
    };
  },
  methods: {
    async submitForm() {
      if (this.editEventAction) {
        const jwtToken = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        const payload = {
          title: this.title,
          type: this.eventType,
        };
        const response = await axios
          .patch(
            `http://localhost:3000/events/${JSON.parse(this.editEventInfo).id}`,
            payload,
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

        if (!("error" in response)) {
          this.$router.push({ path: `/dashboard/${userId}` });
        } else {
          this.invalidEventCreation = true;
        }
      } else {
        if (this.title.length > 0 && this.eventType !== null) {
          const jwtToken = localStorage.getItem("token");
          const userId = localStorage.getItem("id");
          const payload = {
            title: this.title,
            type: this.eventType,
          };
          const response = await axios
            .post(`http://localhost:3000/events/${userId}`, payload, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .catch((error) => {
              return { error };
            });

          if (!("error" in response)) {
            this.$router.push({ path: `/dashboard/${userId}` });
          } else {
            this.invalidEventCreation = true;
          }
        }
      }
    },
    hideErrorMessage() {
      this.invalidEventCreation = false;
    },
    populateFormInfo() {
      if (this.editEventAction) {
        this.formTitle = "Edit Event";
        const eventInfo = JSON.parse(this.editEventInfo);

        this.title = eventInfo.title;
        this.eventType = eventInfo.type;
      } else {
        this.formTitle = "Create Event";
      }
    },
  },
  created() {
    this.populateFormInfo();
  },
  components: {
    AccountErrorMessage,
  },
};
</script>

<style scoped lang="scss">
.login-form-container {
  width: 50%;
  height: 80vh;
  display: flex;
  align-items: center;
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

  img {
    width: 1.5rem;
  }
}
</style>

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
      <datepicker v-model="startDate" :lower-limit="startDate" />
    </div>
    <div class="form-control">
      <label for="endDate">End Date</label>
      <datepicker v-model="endDate" :lower-limit="endDate" />
    </div>
    <div class="form-control">
      <button>Submit</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import Datepicker from "vue3-datepicker";
export default {
  data() {
    return {
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      options: [],
      id: "",
    };
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
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate),
          },
          {
            startDate: "A",
            endDate: "B",
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
  },
  async created() {
    await this.extractIdFromUrl();
  },
  components: {
    Datepicker,
  },
};
</script>

<style scoped lang="scss">
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

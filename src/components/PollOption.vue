<template>
  <li>{{ formattedStartDate }} - {{ formattedEndDate }}</li>
  <span v-on:click="$emit('removePollOption', id)"
    ><i class="fas fa-times-circle"></i
  ></span>
</template>

<script>
export default {
  props: ["startDate", "endDate", "optionId"],
  data() {
    return {
      start: this.startDate,
      end: this.endDate,
      id: this.optionId,
    };
  },
  computed: {
    formattedStartDate: function () {
      let month = this.start.getMonth();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let formattedDate =
        ("0" + this.start.getDate()).slice(-2) +
        "-" +
        (months[month] + "-" + this.start.getFullYear() + " ");

      return formattedDate;
    },
    formattedEndDate: function () {
      let month = this.end.getMonth();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let formattedDate =
        ("0" + this.end.getDate()).slice(-2) +
        "-" +
        (months[month] + "-" + this.end.getFullYear() + " ");

      return formattedDate;
    },
  },
};
</script>

<style scoped lang="scss">
li {
  margin: 0.5rem 0;
  list-style-type: none;
}
span {
  margin: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
svg:hover {
  cursor: pointer;
}
</style>

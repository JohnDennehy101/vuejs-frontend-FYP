<template>
  <label class="checkbox-label" :for="id"
    >{{ formattedStartDate }} - {{ formattedEndDate }}</label
  >
</template>

<script>
export default {
  props: ["optionId", "optionStartDate", "optionEndDate"],
  data() {
    return {
      start: this.optionStartDate,
      end: this.optionEndDate,
      id: this.optionId,
    };
  },
  computed: {
    formattedStartDate: function () {
      let date = new Date(this.start);

      let month = date.getMonth();
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
        ("0" + date.getDate()).slice(-2) +
        "-" +
        (months[month] + "-" + date.getFullYear() + " ");

      return formattedDate;
    },
    formattedEndDate: function () {
      let date = new Date(this.end);
      let month = date.getMonth();
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
        ("0" + date.getDate()).slice(-2) +
        "-" +
        (months[month] + "-" + date.getFullYear() + " ");

      return formattedDate;
    },
  },
};
</script>

<style scoped lang="scss">
.checkbox-label {
  display: inline-block;
  margin-bottom: 0;
}
</style>

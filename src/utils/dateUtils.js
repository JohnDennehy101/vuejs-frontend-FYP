export default {
    returnFormattedDate(unformattedDate) {
        let date = new Date(unformattedDate);
        date.setHours(date.getHours() + 1);
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
    returnFormattedDateWithTime(currentDate) {
    let month = currentDate.getMonth();
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
    let hour = ("0" + (currentDate.getHours() + 1)).slice(-2);
    hour--;
    let formattedDate =
      ("0" + currentDate.getDate()).slice(-2) +
      "-" +
      (months[month] +
        "-" +
        currentDate.getFullYear() +
        " " +
        hour +
        ":" +
        ("0" + currentDate.getMinutes()).slice(-2) +
        ":" +
        ("0" + currentDate.getSeconds()).slice(-2));

    return formattedDate;
  },
    returnFormattedChartLabelDate(unformattedDate) {

         let date = new Date(unformattedDate);
        let month = date.getMonth();

      let formattedDate =
        ("0" + date.getDate()).slice(-2) +
        "-" +
        (month + 1 + "-" + date.getFullYear() + " ");

      return formattedDate;
    }
}
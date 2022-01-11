export default {
    returnFormattedDate(unformattedDate) {
        let date = new Date(unformattedDate);
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
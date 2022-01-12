<template>
  <div id="wrapper">
    <BarChart
      ref="barchartRef"
      :chartData="chartInfo"
      :options="options"
      :styles="myStyles"
      :key="key"
    />
  </div>
</template>

<script>
import { BarChart } from "vue-chart-3";
import { computed, ref } from "vue";
import DateUtils from "../utils/dateUtils";
export default {
  props: ["chartData", "chartKey"],
  data: () => ({
    key: 0,
  }),
  setup(props) {
    let chartPollVotes = [];
    let chartLabels = [];
    for (let option in props.chartData) {
      chartPollVotes.push(props.chartData[option].votes);
      chartLabels.push(
        `${DateUtils.returnFormattedChartLabelDate(
          props.chartData[option].startDate
        )} - ${DateUtils.returnFormattedChartLabelDate(
          props.chartData[option].endDate
        )}`
      );
    }

    const data = ref(chartPollVotes);
    const labels = ref(chartLabels);
    const barchartRef = ref();

    const options = ref({
      responsive: true,
      legend: false,
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 70,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },
          },
        ],
      },
    });

    const chartInfo = computed(() => ({
      labels: labels.value,
      datasets: [
        {
          data: data.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));

    return { chartInfo, barchartRef, options };
  },

  computed: {
    myStyles() {
      return {
        height: `30%`,
        position: "relative",
      };
    },
  },

  components: {
    BarChart,
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  max-width: 430px;
  margin: 1rem auto;
}
</style>

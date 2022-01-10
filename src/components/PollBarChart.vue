<template>
  <BarChart ref="barchartRef" :chartData="chartInfo" :options="options" />
</template>

<script>
import { BarChart } from "vue-chart-3";
import { computed, ref } from "vue";
export default {
  props: ["chartData"],
  data: () => ({}),
  setup(props) {
    let chartPollVotes = [];
    let chartLabels = [];
    for (let option in props.chartData) {
      chartPollVotes.push(props.chartData[option].votes.length);
      chartLabels.push(
        `${props.chartData[option].startDate} - ${props.chartData[option].endDate}`
      );
    }

    const data = ref(chartPollVotes);
    const labels = ref(chartLabels);
    const barchartRef = ref();

    const options = ref({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
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

  components: {
    BarChart,
  },
};
</script>

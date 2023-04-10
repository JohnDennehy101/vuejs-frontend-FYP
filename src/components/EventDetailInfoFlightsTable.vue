<template>
  <table
    id="flight-information-table"
    class="web-scraped-info-parent-container"
    v-for="value in flightInfo"
    v-bind:key="value"
    @change="checkedFlightChange($event, value)"
  >
    <thead>
      <tr>
        <th></th>
        <th>Airport</th>
        <th>Flight Date</th>

        <th>Departure Time</th>
        <th>Arrival Time</th>
        <th>Duration</th>
        <th>Carrier</th>
        <th>Return Price Per Person</th>
        <th>Total Return Price</th>
        <th>Link</th>
      </tr>
    </thead>

    <tbody>
      <tr
        id="mobile-flight-overview-row"
        v-for="(item, key) of value"
        :key="key"
      >
        <td v-if="key === 0 && mobileDevice" rowspan="2">
          <input
            data-testid="mobileFlightCheckbox"
            type="checkbox"
            v-model="item.checked"
            :value="item"
          />
        </td>
        <td
          data-testid="mobilePricePerPerson"
          v-if="key === 0 && mobileDevice"
          rowspan="2"
        >
          {{ item.pricePerPerson }}
        </td>
        <td
          data-testid="mobilePriceTotal"
          v-if="key === 0 && mobileDevice"
          rowspan="2"
        >
          {{ item.priceTotal }}
        </td>
        <td v-if="key === 0 && mobileDevice" rowspan="2">
          <a
            data-testid="mobileFlightUrl"
            :href="item.flightUrl"
            target="_blank"
          >
            <i class="fas fa-external-link-square-alt"></i>
          </a>
        </td>
      </tr>
      <tr v-for="(item, key) of value" :key="key">
        <td v-if="key === 0 && !mobileDevice" rowspan="2">
          <input
            type="checkbox"
            v-model="item.checked"
            data-testid="desktopFlightCheckbox"
            :value="item"
          />
        </td>

        <td data-testid="airport">{{ item.airport }}</td>
        <td data-testid="startDate" v-if="key === 0">
          {{ item.startDate }}
        </td>
        <td data-testid="endDate" v-else>
          {{ item.endDate }}
        </td>
        <td data-testid="departureTime">{{ item.departureTime }}</td>
        <td data-testid="arrivalTime">{{ item.arrivalTime }}</td>
        <td data-testid="duration">{{ item.duration }}</td>
        <td data-testid="carrier">{{ item.carrier }}</td>
        <td
          data-testid="desktopPricePerPerson"
          v-if="key === 0 && !mobileDevice"
          rowspan="2"
        >
          {{ item.pricePerPerson }}
        </td>

        <td
          data-testid="desktopPriceTotal"
          v-if="key === 0 && !mobileDevice"
          rowspan="2"
        >
          {{ item.priceTotal }}
        </td>

        <td
          data-testid="desktopFlightUrl"
          v-if="key === 0 && !mobileDevice"
          rowspan="2"
        >
          <a :href="item.flightUrl" target="_blank">
            <i class="fas fa-external-link-square-alt"></i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    flights: Array,
    mobile: Function,
    checkedFlight: Array,
  },
  data() {
    return {
      flightInfo: this.flights,
      mobileDevice: this.mobile,
    };
  },
  methods: {
    checkedFlightChange(event, item) {
      this.$emit("checkedFlightChange", {
        event: event,
        item: item,
      });
    },
    classifyFlights() {
      if (this.checkedFlight) {
        if (this.checkedFlight.length > 0) {
          for (const key in this.flights) {
            if (this.flights[key][0] && this.flights[key][1]) {
              if (
                this.checkedFlight[0].find(
                  (a) =>
                    a.airport === this.flights[key][0].airport &&
                    a.arrivalTime === this.flights[key][0].arrivalTime &&
                    a.departureTime === this.flights[key][0].departureTime &&
                    a.duration === this.flights[key][0].duration &&
                    a.carrier === this.flights[key][0].carrier
                ) &&
                this.checkedFlight[0].find(
                  (a) =>
                    a.airport === this.flights[key][1].airport &&
                    a.arrivalTime === this.flights[key][1].arrivalTime &&
                    a.departureTime === this.flights[key][1].departureTime &&
                    a.duration === this.flights[key][1].duration &&
                    a.carrier === this.flights[key][1].carrier
                )
              ) {
                this.flights[key].map((item) => {
                  item.checked = true;
                });
              } else {
                this.flights[key].map((item) => {
                  item.checked = false;
                });
              }
            }
          }
        }
      }
    },
  },
  async created() {
    await this.classifyFlights();
  },
};
</script>

<style scoped lang="scss">
.web-scraped-info-parent-container {
  overflow-x: auto;
  border-collapse: collapse;
  margin: 0.8rem auto;
  width: 100%;

  font-size: 0.9em;
  font-family: sans-serif;

  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  caption {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: left;
    margin: 1rem 0;
    align-items: center;

    @include for-phone-only {
      display: block;
      font-size: 1rem;
      text-align: center;
    }
  }

  thead {
    background-color: #373f68;
    color: white;
    text-align: left;

    th {
      padding: 12px 15px;
    }
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  td {
    padding: 12px 15px;

    @include for-phone-only {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50% !important;
    }
  }

  td table {
    margin: -2px;
    width: calc(100% + 4px);
  }

  td img {
    height: 1.5rem;
  }

  @include for-phone-only {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      border: 1px solid #ccc;
    }

    td:before {
      position: absolute;
      top: 0px;
      left: 6px;
      width: 45%;
      font-weight: bold;
      padding: 12px 0px 12px 15px;
      white-space: nowrap;
    }
  }
}

#flight-information-table {
  #mobile-flight-overview-row {
    display: none;
  }
}
@include for-phone-only {
  #flight-information-table {
    #mobile-flight-overview-row {
      display: block;
      background-color: #373f68;
      color: #ffffff;

      svg {
        color: white;
      }

      td:nth-of-type(1):before {
        content: "Select";
      }
      td:nth-of-type(2):before {
        content: "Price Per Person";
      }
      td:nth-of-type(3):before {
        content: "Total Price";
      }
      td:nth-of-type(4):before {
        content: "Flight Link";
      }
    }
    td:nth-of-type(1):before {
      content: "Airport";
    }
    td:nth-of-type(2):before {
      content: "Date";
    }
    td:nth-of-type(3):before {
      content: "Departure Time";
    }
    td:nth-of-type(4):before {
      content: "Arrival Time";
    }
    td:nth-of-type(5):before {
      content: "Duration";
    }
    td:nth-of-type(6):before {
      content: "Carrier";
    }
  }
}
</style>

<template>
  <table
    id="accommodation-information-table"
    class="web-scraped-info-parent-container"
    v-for="(value, page) in accommodationInfo"
    v-bind:key="value"
  >
    <caption>
      Accommodation Results for
      {{
        accommodationDateRange
      }}
      - Page
      {{
        page
      }}
    </caption>
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Price</th>
        <th>Room Type</th>
        <th>Beds</th>
        <th>Review Category</th>
        <th>Review Score</th>
        <th>Review Quantity</th>
        <th>Location</th>

        <th>Link</th>
        <th>Map</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, key) of value" :key="key">
        <td>
          <input
            type="checkbox"
            :value="item"
            data-testid="accommodationCheckbox"
            v-model="item.checked"
            @change="checkedAccommodationChange($event, item)"
          />
        </td>
        <td data-testid="title">{{ item.title }}</td>
        <td data-testid="price">{{ item.price }}</td>
        <td data-testid="roomTypeRecommendedBooking">
          {{ item.roomTypeRecommendedBooking }}
        </td>
        <td data-testid="numberOfBedsRecommendedBooking">
          {{ item.numberOfBedsRecommendedBooking }}
        </td>
        <td data-testid="ratingScoreCategory">
          {{ item.ratingScoreCategory }}
        </td>
        <td data-testid="ratingScore">{{ item.ratingScore }}</td>
        <td data-testid="reviewQuantity">{{ item.reviewQuantity }}</td>
        <td data-testid="locationDistance">{{ item.locationDistance }}</td>
        <td>
          <a
            data-testid="bookingSiteLink"
            :href="item.bookingSiteLink"
            target="_blank"
          >
            <i class="fas fa-external-link-square-alt"></i>
          </a>
        </td>
        <td>
          <a
            data-testid="bookingSiteDisplayLocationMapLink"
            :href="item.bookingSiteDisplayLocationMapLink"
            target="_blank"
          >
            <i class="fas fa-map-marker-alt"></i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    accommodation: Array,
    dateRange: String,
    checkedAccommodation: Array,
  },
  data() {
    return {
      accommodationInfo: this.accommodation,
      accommodationDateRange: this.dateRange,
      selectedAccommodation: this.checkedAccommodation,
    };
  },
  methods: {
    checkedAccommodationChange(event, item) {
      this.$emit("checkedAccommodationChange", {
        event: event,
        item: item,
      });
    },
    classifyAccommodation() {
      if (this.selectedAccommodation.length > 0) {
        this.accommodationInfo[1].map((item) => {
          this.selectedAccommodation.find((a) => a.title === item.title)
            ? (item.checked = true)
            : (item.checked = false);
        });
      }
    },
  },
  async created() {
    await this.classifyAccommodation();
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
@include for-phone-only {
  #accommodation-information-table {
    td:nth-of-type(1):before {
      content: "Select";
    }

    td:nth-of-type(2):before {
      content: "Title";
    }
    td:nth-of-type(3):before {
      content: "Price";
    }
    td:nth-of-type(4):before {
      content: "Room Type";
    }
    td:nth-of-type(5):before {
      content: "Beds";
    }
    td:nth-of-type(6):before {
      content: "Review Category";
    }
    td:nth-of-type(7):before {
      content: "Review Score";
    }
    td:nth-of-type(8):before {
      content: "Review Quantity";
    }
    td:nth-of-type(9):before {
      content: "Location";
    }
    td:nth-of-type(10):before {
      content: "Link";
    }
    td:nth-of-type(11):before {
      content: "Map";
    }
  }
}
</style>

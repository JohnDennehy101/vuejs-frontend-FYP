<template>
  <table
    id="tourist-attractions-information-table"
    class="web-scraped-info-parent-container"
  >
    <caption>
      Tourist Attractions in
      {{
        city
      }}
    </caption>
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Address</th>
        <th>Review Score</th>
        <th>Review Quantity</th>
        <th>Map</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="value in googlePlacesInfo" v-bind:key="value">
        <td>
          <input
            type="checkbox"
            data-testid="activityCheckbox"
            :value="value"
            v-model="value.checked"
            @change="checkedThingToDoChange($event, value)"
          />
        </td>

        <td data-testid="name">{{ value.name }}</td>
        <td data-testid="vicinity">{{ value.vicinity }}</td>
        <td data-testid="rating">{{ value.rating }}</td>
        <td data-testid="ratingQuantity">{{ value.user_ratings_total }}</td>
        <td>
          <a
            v-if="value.photos"
            data-testid="mapLink"
            :href="extractLink(value.photos[0].html_attributions[0])"
          >
            <i class="fas fa-map-marker-alt"></i>
          </a>
        </td>
        <td><img data-testid="icon" :src="value.icon" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import StringUtils from "../utils/stringUtils";
export default {
  props: {
    activitiesInfo: Array,
    eventCity: String,
    checkedThingsToDo: Array,
  },
  data() {
    return {
      googlePlacesInfo: this.activitiesInfo,
      city: this.eventCity,
      selectedActivities: this.checkedThingsToDo,
    };
  },
  methods: {
    checkedThingToDoChange(event, item) {
      this.$emit("checkedActivityChange", {
        event: event,
        item: item,
      });
    },
    extractLink(link) {
      let extractedLink = StringUtils.extractGoogleMapLink(link);
      return extractedLink;
    },
    classifyActivities() {
      if (this.selectedActivities.length > 0) {
        this.googlePlacesInfo.map((item) => {
          this.selectedActivities.find((a) => a.name === item.name)
            ? (item.checked = true)
            : (item.checked = false);
        });
      }
    },
  },
  async created() {
    await this.classifyActivities();
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
  #tourist-attractions-information-table {
    td:nth-of-type(1):before {
      content: "Select";
    }

    td:nth-of-type(2):before {
      content: "Title";
    }
    td:nth-of-type(3):before {
      content: "Address";
    }
    td:nth-of-type(4):before {
      content: "Review Score";
    }
    td:nth-of-type(5):before {
      content: "Review Quantity";
    }
    td:nth-of-type(6):before {
      content: "Map";
    }
    td:nth-of-type(7):before {
      content: "Icon";
    }
  }
}
</style>

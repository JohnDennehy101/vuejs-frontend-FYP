import { mount, shallowMount } from "@vue/test-utils";
import EventItinerary from "@/components/EventItinerary.vue";
import mockSuccessfulEventService from "./mocks/eventService.mock";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";
import { nextTick } from "vue";

const mockRoute = {
  params: {
    id: 1,
  },
};

const mockFailureEventService = {
  createEventItinerary() {
    return new Promise((resolve) => {
      resolve({
        id: "1",
        completed: false,
        created_at: "2022-03-22",
        updated_at: "2022-03-22",
        eventId: "2",
        status: 500,
      });
    });
  },

  updateEventItinerary() {
    return new Promise((resolve) => {
      resolve({
        id: "1",
        completed: false,
        created_at: "2022-03-22",
        updated_at: "2022-03-22",
        eventId: "2",
        status: 500,
      });
    });
  },
  deleteEventItinerary() {
    return new Promise((resolve) => {
      resolve({
        rowsAffected: 1,
        rawAffected: [],
        status: 500,
      });
    });
  },
};

jest.mock("leaflet");

const accommodation = [
  {
    title: "Test Hotel",
    locationTitle: "Cork",
    startDate: "12/03/2022",
    endDate: "14/03/2022",
    numberOfNightsAndGuests: "2 nights, 2 guests",
    numberOfRoomsRecommendedBooking: "1 room",
    numberOfBedsRecommendedBooking: "1 double bed",
    price: "€240",
    locationDistance: "2km from centre",
    ratingScoreCategory: "Exceptional",
    ratingScore: "9/10",
    reviewQuantity: "2000 reviews",
    bookingSiteLink: "https://www.test.booking.com",
    bookingSiteDisplayLocationMapLink: "https://www.test.map.booking.com",
  },
];

const activities = [
  {
    name: "Test Activity",
    vicinity: "Cork City",
    rating: "8/10",
    user_ratings_total: 2000,
    mapLink: "https://www.testgooglemaps.ie",
  },
];

const activitiesApiResponse = [
  {
    name: "Test Activity",
    vicinity: "Cork City",
    rating: "8/10",
    user_ratings_total: 2000,
    photos: [
      {
        html_attributions: ["https://testimage.ie"],
      },
    ],
  },
];

const flights = [
  {
    departureCity: "Cork",
    arrivalCity: "London",
    departureTime: "10:20",
    arrivalTime: "11:40",
    carrier: "Ryanair",
    duration: "1h 20mins",
    airport: "COR Cork",
    pricePerPerson: "€350",
    priceTotal: "€700",
    flightUrl: "https://www.mockkayak.ie",
  },
  {
    departureCity: "London",
    arrivalCity: "Cork",
    departureTime: "06:35",
    arrivalTime: "07:50",
    carrier: "Aer Lingus",
    duration: "1h 15mins",
    airport: "LHW Heathrow",
    pricePerPerson: "€350",
    priceTotal: "€700",
    flightUrl: "https://www.mockkayak.ie",
  },
];

describe("EventItinerary.vue", () => {
  const mockMethodTwo = jest
    .spyOn(EventItinerary.methods, "createMap")
    .mockReturnValue(true);
  it("should render correctly", () => {
    const wrapper = shallowMount(EventItinerary, {
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: { go: jest.fn() },
        },
      },
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("if accommodation passed as prop, should render delete accommodation icon", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(
      wrapper.find('[data-testid="removeAccommodationIcon"]').exists()
    ).toBe(true);
  });

  it("if accommodation passed as prop, should render delete accommodation icon", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(
      wrapper.find('[data-testid="removeAccommodationIcon"]').exists()
    ).toBe(true);
  });

  it("if accommodation not passed as prop, should not render delete accommodation icon", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: [],
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(
      wrapper.find('[data-testid="removeAccommodationIcon"]').exists()
    ).toBe(false);
  });

  it("if accommodation x icon clicked, delete accommodation event should be emitted", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    const deleteAccommodationIcon = wrapper.find(
      '[data-testid="removeAccommodationIcon"]'
    );

    await deleteAccommodationIcon.trigger("click");

    expect(wrapper.emitted()).toHaveProperty(
      "removeItineraryAccommodationClick"
    );
  });

  it("if accommodation passed as prop, should render accommodation title", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="accommodationTitle"]').text()).toBe(
      accommodation[0].title
    );
  });

  it("if accommodation passed as prop, should render accommodation city", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="accommodationCity"]').text()).toBe(
      accommodation[0].locationTitle
    );
  });

  it("if accommodation passed as prop, should render start date", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="startDate"]').text()).toBe(
      accommodation[0].startDate
    );
  });

  it("if accommodation passed as prop, should render end date", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="endDate"]').text()).toBe(
      accommodation[0].endDate
    );
  });

  it("if accommodation passed as prop, should render number of nights and guests", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="numberOfNightsAndGuests"]').text()).toBe(
      accommodation[0].numberOfNightsAndGuests
    );
  });

  it("if accommodation passed as prop, should render number of rooms recommended booking", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(
      wrapper.find('[data-testid="numberOfRoomsRecommendedBooking"]').text()
    ).toBe(accommodation[0].numberOfRoomsRecommendedBooking);
  });

  it("if accommodation passed as prop, should render number of beds recommended booking", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(
      wrapper.find('[data-testid="numberOfBedsRecommendedBooking"]').text()
    ).toBe(accommodation[0].numberOfBedsRecommendedBooking);
  });

  it("if accommodation passed as prop, should render price of accommodation", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="price"]').text()).toBe(
      accommodation[0].price
    );
  });

  it("if accommodation passed as prop, should render distance from city centre", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="locationDistance"]').text()).toBe(
      accommodation[0].locationDistance
    );
  });

  it("if accommodation passed as prop, should render accommodation review category", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="ratingScoreCategory"]').text()).toBe(
      accommodation[0].ratingScoreCategory
    );
  });

  it("if accommodation passed as prop, should render accommodation rating score", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="ratingScore"]').text()).toBe(
      accommodation[0].ratingScore
    );
  });

  it("if accommodation passed as prop, should render accommodation review quantity", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(wrapper.find('[data-testid="reviewQuantity"]').text()).toBe(
      accommodation[0].reviewQuantity
    );
  });

  it("if accommodation passed as prop, should render booking site link to external site", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(
      wrapper.find('[data-testid="bookingSiteLink"]').attributes().href
    ).toEqual(accommodation[0].bookingSiteLink);
  });

  it("if accommodation passed as prop, should render booking site map link to external site", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [[]],
        eventService: mockSuccessfulEventService,
        activities: [],
      },
    });

    expect(
      wrapper
        .find('[data-testid="bookingSiteDisplayLocationMapLink"]')
        .attributes().href
    ).toEqual(accommodation[0].bookingSiteDisplayLocationMapLink);
  });

  it("if flights passed as prop, should render x icon for removing itinerary flights", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(
      wrapper.find('[data-testid="removeItineraryFlightsIcon"]').exists()
    ).toBe(true);
  });

  it("if x icon clicked to remove itinerary flight, should emit event", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    const removeFlightIcon = await wrapper.find(
      '[data-testid="removeItineraryFlightsIcon"]'
    );

    await removeFlightIcon.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("removeItineraryFlightsClick");
  });

  it("if flights passed as prop, should render flights price per person", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="pricePerPerson"]').text()).toBe(
      flights[0].pricePerPerson
    );
  });

  it("if flights passed as prop, should render flights total price", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="priceTotal"]').text()).toBe(
      flights[0].priceTotal
    );
  });

  it("if flights passed as prop, should render icon with link to external site with more info on flights", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="flightUrl"]').attributes().href).toEqual(
      flights[0].flightUrl
    );
  });

  it("if flights passed as prop, should render flights departure city", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="departureCity"]').text()).toEqual(
      flights[0].departureCity
    );
  });

  it("if flights passed as prop, should render flights arrival city", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="arrivalCity"]').text()).toEqual(
      flights[1].arrivalCity
    );
  });

  it("if flights passed as prop, should render flights departure time", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="departureTime"]').text()).toEqual(
      flights[0].departureTime
    );
  });

  it("if flights passed as prop, should render flights arrival time", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="arrivalTime"]').text()).toEqual(
      flights[0].arrivalTime
    );
  });

  it("if flights passed as prop, should render flight carrier info", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="carrier"]').text()).toEqual(
      flights[0].carrier
    );
  });

  it("if flights passed as prop, should render flight duration info", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="duration"]').text()).toEqual(
      flights[0].duration
    );
  });

  it("if flights passed as prop, should render flight airport info", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="airport"]').text()).toEqual(
      flights[0].airport
    );
  });

  it("if no activities passed as prop, should render no activities message", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: [],
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="noActivities"]').text()).toEqual(
      "No Activities Selected"
    );
  });

  it("if activities passed as prop, should render delete activities icon", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    const deleteActivityIcon = await wrapper.find(
      '[data-testid="deleteActivityIcon"]'
    );
    await deleteActivityIcon.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("removeItineraryActivityClick");
  });

  it("if activities passed as prop, should render activity title", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="activityName"]').text()).toBe(
      activities[0].name
    );
  });

  it("if activities passed as prop, should render activity vicinity", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="activityVicinity"]').text()).toBe(
      activities[0].vicinity
    );
  });

  it("if activities passed as prop, should render activity rating", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="activityRating"]').text()).toBe(
      activities[0].rating
    );
  });

  it("if activities passed as prop, should render activity rating quantity", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="activityRatingQuantity"]').text()).toBe(
      activities[0].user_ratings_total.toString()
    );
  });

  it("if activities passed as prop, should render activity map link", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(
      wrapper.find('[data-testid="activityMapLink"]').attributes().href
    ).toEqual(activities[0].mapLink);
  });

  it("if activities retrieved from API call, mapLink property will not be available. Map Link should be extracted from url in Google Places API response.", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activitiesApiResponse,
        itemType: "FOREIGN_OVERNIGHT",
      },
    });

    expect(wrapper.find('[data-testid="activityApiResponse"]').exists()).toBe(
      true
    );
  });

  it("if editItinerary prop is false, edit itinerary button should not be rendered", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        editItinerary: false,
      },
    });

    expect(wrapper.find('[data-testid="editItineraryButton"]').exists()).toBe(
      false
    );
  });

  it("if editItinerary prop is true, edit itinerary button should be rendered", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        editItinerary: true,
      },
      data() {
        return {
          editAction: true,
        };
      },
    });

    await nextTick();

    expect(wrapper.find('[data-testid="editItineraryButton"]').exists()).toBe(
      true
    );
  });

  it("if editItineraryButton is clicked, event is emitted ", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        editItinerary: true,
      },
      data() {
        return {
          editAction: true,
        };
      },
    });

    const editItineraryButton = await wrapper.find(
      '[data-testid="editItineraryButton"]'
    );
    editItineraryButton.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("editItineraryClick");
  });

  it("if event creator viewing the page, displayFinaliseCheckbox prop is true and accommodation or flight present in itinerary, finalise itinerary checkbox rendered", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        editItinerary: true,
        displayFinaliseCheckbox: true,
      },
      data() {
        return {
          editAction: true,
        };
      },
    });

    expect(
      wrapper.find('[data-testid="finaliseItineraryCheckBox"]').exists()
    ).toBe(true);
  });

  it("if accommodation or flights checked, submit itinerary button is rendered", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        editItinerary: true,
        displayFinaliseCheckbox: true,
      },
      data() {
        return {
          editAction: false,
        };
      },
    });

    expect(wrapper.find('[data-testid="submitButton"]').exists()).toBe(true);
  });

  it("if user is editing existing itinerary, delete itinerary button should be rendered as an option", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        editItinerary: true,
        displayFinaliseCheckbox: true,
        editItineraryClick: true,
      },
      data() {
        return {
          editAction: false,
        };
      },
    });

    expect(wrapper.find("#delete-itinerary-button").exists()).toBe(true);
  });

  it("if event itinerary doesn't exist and user clicks submit, event itinerary create method is called", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        editItinerary: false,
        displayFinaliseCheckbox: true,
        editItineraryClick: false,
      },
      data() {
        return {
          editAction: false,
        };
      },
    });

    const createEventItineraryMock = jest.spyOn(
      wrapper.vm.eventService,
      "createEventItinerary"
    );

    const submitItineraryButton = wrapper.find('[data-testid="submitButton"]');
    await submitItineraryButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("itineraryRequest");
    expect(wrapper.emitted()).toHaveProperty("showToast");
    expect(createEventItineraryMock).toHaveBeenCalled();
  });

  it("if event itinerary already exists and user clicks submit, event itinerary update method is called", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        displayFinaliseCheckbox: true,
        editItinerary: true,
      },
      data() {
        return {
          editAction: true,
          editClick: true,
        };
      },
    });

    const updateEventItineraryMock = jest.spyOn(
      wrapper.vm.eventService,
      "updateEventItinerary"
    );

    const submitItineraryButton = wrapper.find('[data-testid="submitButton"]');
    await submitItineraryButton.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("itineraryRequest");
    expect(wrapper.emitted()).toHaveProperty("showToast");
    expect(updateEventItineraryMock).toHaveBeenCalled();
  });

  it("if event itinerary already exists and user clicks delete button, delete event itinerary method called", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockSuccessfulEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        displayFinaliseCheckbox: true,
        editItinerary: true,
      },
      data() {
        return {
          editAction: true,
          editClick: true,
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    const deleteEventItineraryMock = jest.spyOn(
      wrapper.vm.eventService,
      "deleteEventItinerary"
    );

    const deleteItineraryButton = wrapper.find("#delete-itinerary-button");
    await deleteItineraryButton.trigger("click");

    expect(deleteEventItineraryMock).toHaveBeenCalled();
    expect(wrapper.emitted()).toHaveProperty("itineraryRequest");
    expect(wrapper.emitted()).toHaveProperty("showToast");
    expect(mockRouter.go).toHaveBeenCalled();
  });

  it("if event itinerary already exists and user clicks delete button and failed response, error message shown to user", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockFailureEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        displayFinaliseCheckbox: true,
        editItinerary: true,
      },
      data() {
        return {
          editAction: true,
          editClick: true,
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    const deleteEventItineraryMock = jest.spyOn(
      wrapper.vm.eventService,
      "deleteEventItinerary"
    );

    const deleteItineraryButton = wrapper.find("#delete-itinerary-button");
    await deleteItineraryButton.trigger("click");

    expect(wrapper.vm.showErrorMessage).toBe(true);
    expect(wrapper.vm.errorMessage).toBe("Error deleting itinerary.");
  });

  it("if event itinerary does not exist and user clicks submit button and failed response, error message shown to user", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockFailureEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        displayFinaliseCheckbox: true,
        editItinerary: false,
        emptyItineraryCheck: false,
      },
      data() {
        return {
          editAction: true,
          editClick: true,
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    const submitItineraryButton = wrapper.find('[data-testid="submitButton"]');
    await submitItineraryButton.trigger("click");

    expect(wrapper.vm.showErrorMessage).toBe(true);
    expect(wrapper.vm.errorMessage).toBe("Error creating itinerary.");
  });

  it("if event itinerary exits and user clicks submit button to update itinerary and failed response, error message shown to user", async () => {
    const wrapper = mount(EventItinerary, {
      props: {
        accommodation: accommodation,
        flight: [flights],
        eventService: mockFailureEventService,
        activities: activities,
        itemType: "FOREIGN_OVERNIGHT",
        displayFinaliseCheckbox: true,
        editItinerary: true,
        emptyItineraryCheck: false,
      },
      data() {
        return {
          editAction: true,
          editClick: true,
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    const submitItineraryButton = wrapper.find('[data-testid="submitButton"]');
    await submitItineraryButton.trigger("click");

    expect(wrapper.vm.showErrorMessage).toBe(true);
    expect(wrapper.vm.errorMessage).toBe("Error updating itinerary.");
  });
});

import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import EventItinerary from "@/components/EventItinerary.vue";
import AccountErrorMessage from "@/components/AccountErrorMessage";
import mockSuccessfulEventService from "./mocks/eventService.mock";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";

const mockRoute = {
  params: {
    id: 1,
  },
};

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

const flights = [
  {
    departureCity: "Cork",
    arrivalCity: "London",
    departureTime: "10:20",
    arrivalTime: "11:40",
    carrier: "Ryanair",
    duration: "1h 20mins",
    airport: "COR Cork",
  },
  {
    departureCity: "London",
    arrivalCity: "Cork",
    departureTime: "06:35",
    arrivalTime: "07:50",
    carrier: "Aer Lingus",
    duration: "1h 15mins",
    airport: "LHW Heathrow",
  },
];

const mockEvent = {
  title: "Test Event",
  type: "DOMESTIC_OVERNIGHT",
  location: "Cork",
};

const mockForeignEvent = {
  title: "Test Event",
  type: "FOREIGN_OVERNIGHT",
  location: "London",
  departureCity: "Cork",
};

describe("EventItinerary.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(EventItinerary, {
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
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
});

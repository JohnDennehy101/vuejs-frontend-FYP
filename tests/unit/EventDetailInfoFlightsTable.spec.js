import { mount, shallowMount } from "@vue/test-utils";
import EventDetailInfoFlightsTable from "@/components/EventDetailInfoFlightsTable.vue";

const mockFlights = [
  [
    {
      airport: "ORK\nCork",
      arrivalCity: "London",
      arrivalTime: "21:45",
      carrier: "British Airways",
      departureCity: "Cork",
      departureTime: "20:30",
      directFlight: "direct",
      duration: "1h 15m",
      endDate: "2022-04-15",
      flightUrl:
        "https://www.kayak.ie/flights/ORK-LON/2022-04-08/2022-04-15/2adults?sort=bestflight_a",
      index: "0",
      pricePerPerson: "€826",
      priceTotal: "€1,652 total",
      startDate: "2022-04-08",
    },
    {
      airport: "LHR\nHeathrow",
      arrivalCity: "London",
      arrivalTime: "15:10",
      carrier: "British Airways",
      departureCity: "Cork",
      departureTime: "13:50",
      directFlight: "direct",
      duration: "1h 20m",
      endDate: "2022-04-15",
      flightUrl:
        "https://www.kayak.ie/flights/ORK-LON/2022-04-08/2022-04-15/2adults?sort=bestflight_a",
      index: "0",
      pricePerPerson: "€826",
      priceTotal: "€1,652 total",
      startDate: "2022-04-08",
    },
  ],
];

describe("EventDetailInfoFlightsTable.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that checkbox for desktop view is rendered if not mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="desktopFlightCheckbox"]').exists()).toBe(
      true
    );
  });

  it("checks that checkbox for mobile view is rendered if mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: true,
      },
    });

    expect(wrapper.find('[data-testid="mobileFlightCheckbox"]').exists()).toBe(
      true
    );
  });

  it("checks that price per person element for desktop devices is rendered if not mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="desktopPricePerPerson"]').exists()).toBe(
      true
    );
  });

  it("checks that price per person element for mobile devices is rendered if mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: true,
      },
    });

    expect(wrapper.find('[data-testid="mobilePricePerPerson"]').exists()).toBe(
      true
    );
  });

  it("checks that total price element for desktop devices is rendered if not mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="desktopPriceTotal"]').exists()).toBe(
      true
    );
  });

  it("checks that total price element for mobile devices is rendered if mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: true,
      },
    });

    expect(wrapper.find('[data-testid="mobilePriceTotal"]').exists()).toBe(
      true
    );
  });

  it("checks that external flights site link for desktop devices is rendered if not mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="desktopFlightUrl"]').exists()).toBe(
      true
    );
  });

  it("checks that external flights site link for mobile devices is rendered if mobile device", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: true,
      },
    });

    expect(wrapper.find('[data-testid="mobileFlightUrl"]').exists()).toBe(true);
  });

  it("flight airport should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="airport"]').text()).toBe(
      mockFlights[0][0].airport
    );
  });

  it("flight start date should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="startDate"]').text()).toBe(
      mockFlights[0][0].startDate
    );
  });

  it("flight end date should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="endDate"]').text()).toBe(
      mockFlights[0][0].endDate
    );
  });

  it("flight departure time should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="departureTime"]').text()).toBe(
      mockFlights[0][0].departureTime
    );
  });

  it("flight arrival time should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="arrivalTime"]').text()).toBe(
      mockFlights[0][0].arrivalTime
    );
  });

  it("flight duration should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="duration"]').text()).toBe(
      mockFlights[0][0].duration
    );
  });

  it("flight carrier should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="carrier"]').text()).toBe(
      mockFlights[0][0].carrier
    );
  });

  it("flight carrier should be rendered on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.find('[data-testid="carrier"]').text()).toBe(
      mockFlights[0][0].carrier
    );
  });

  it("on checkbox click, event should be emitted on the view", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        mobile: false,
      },
    });

    let checkboxElement = wrapper.find('[data-testid="desktopFlightCheckbox"]');

    checkboxElement.element.checked = true;

    checkboxElement.trigger("change");

    expect(wrapper.emitted()).toHaveProperty("checkedFlightChange");
  });

  it("if user has already added flights to itinerary, should be pre-checked on future renders", async () => {
    const wrapper = mount(EventDetailInfoFlightsTable, {
      props: {
        flights: mockFlights,
        checkedFlight: mockFlights,
        mobile: false,
      },
    });

    expect(wrapper.vm.checkedFlight[0][0].checked).toBe(true);
  });
});

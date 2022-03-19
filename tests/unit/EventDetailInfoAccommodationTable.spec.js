import { mount, shallowMount } from "@vue/test-utils";
import EventDetailInfoAccommodationTable from "@/components/EventDetailInfoAccommodationTable.vue";

const mockAccommodation = {
  1: [
    {
      title: "Mock Accommodation",
      price: "€200",
      roomTypeRecommendedBooking: "1 Double Room",
      numberOfBedsRecommendedBooking: "1 Double Bed",
      ratingScoreCategory: "Exceptional",
      reviewQuantity: "2000",
      ratingScore: "8.7",
      locationDistance: "3km from centre",
      bookingSiteLink: "https://www.mockbooking.com",
      bookingSiteDisplayLocationMapLink: "https://www.mockbooking.com",
    },
  ],
};

describe("EventDetailInfoAccommodationTable.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that component caption heading is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find("caption").text()).toContain(
      "15th March 2022 - 17th March 2022"
    );
  });

  it("checks that accommodation checkbox is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="accommodationCheckbox"]').exists()).toBe(
      true
    );
  });

  it("checks that accommodation title is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="title"]').text()).toBe(
      mockAccommodation["1"][0].title
    );
  });

  it("checks that accommodation price is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="price"]').text()).toBe(
      mockAccommodation["1"][0].price
    );
  });

  it("checks that accommodation price is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="price"]').text()).toBe(
      mockAccommodation["1"][0].price
    );
  });

  it("checks that accommodation recommended room type is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(
      wrapper.find('[data-testid="roomTypeRecommendedBooking"]').text()
    ).toBe(mockAccommodation["1"][0].roomTypeRecommendedBooking);
  });

  it("checks that accommodation number of beds is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(
      wrapper.find('[data-testid="numberOfBedsRecommendedBooking"]').text()
    ).toBe(mockAccommodation["1"][0].numberOfBedsRecommendedBooking);
  });

  it("checks that accommodation rating score category is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="ratingScoreCategory"]').text()).toBe(
      mockAccommodation["1"][0].ratingScoreCategory
    );
  });

  it("checks that accommodation rating score is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="ratingScore"]').text()).toBe(
      mockAccommodation["1"][0].ratingScore
    );
  });

  it("checks that accommodation review quantity is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="reviewQuantity"]').text()).toBe(
      mockAccommodation["1"][0].reviewQuantity
    );
  });

  it("checks that accommodation location distance from city centre is rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(wrapper.find('[data-testid="locationDistance"]').text()).toBe(
      mockAccommodation["1"][0].locationDistance
    );
  });

  it("checks that external link to booking.com site rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(
      wrapper.find('[data-testid="bookingSiteLink"]').attributes().href
    ).toEqual(mockAccommodation["1"][0].bookingSiteLink);
  });

  it("checks that external link to booking.com site rendered", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    expect(
      wrapper.find('[data-testid="bookingSiteLink"]').attributes().href
    ).toEqual(mockAccommodation["1"][0].bookingSiteLink);
  });

  it("checks that click of checkbox triggers custom event", async () => {
    const wrapper = mount(EventDetailInfoAccommodationTable, {
      props: {
        accommodation: mockAccommodation,
        dateRange: "15th March 2022 - 17th March 2022",
      },
    });

    const checkboxElement = wrapper.find(
      '[data-testid="accommodationCheckbox"]'
    );

    checkboxElement.element.checked = true;

    checkboxElement.trigger("change");

    expect(wrapper.emitted()).toHaveProperty("checkedAccommodationChange");
  });
});

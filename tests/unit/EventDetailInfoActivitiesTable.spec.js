import { mount, shallowMount } from "@vue/test-utils";
import EventDetailInfoActivitiesTable from "@/components/EventDetailInfoActivitiesTable.vue";

const mockActivity = [
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 51.9013174,
        lng: -8.467591,
      },
      viewport: {},
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    icon_background_color: "#909CE1",
    icon_mask_base_uri:
      "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
    name: "The Metropole Hotel",
    opening_hours: { open_now: true },
    photos: [
      {
        height: 1367,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115516656997182409995">The Metropole Hotel Cork</a>',
        ],
        photo_reference:
          "Aap_uECgaS8iNf86Q4YQp_HxR99qNFyYO1hjP6ThARQIHOdLUc1WG7lXbpMVJ3i5tt9KgAIeU5AW12z_kio3tX4CxXLkxy9ZwpJDftezBXNST9UvYhsltApXWrP7qnk8hrtknOAw8npr_JECtUu3BlHzuxNwuDYXpUh6aZy2LZXVqRrFdhj0",
        width: 2048,
      },
    ],
    place_id: "ChIJr3MSiw6QREgRiqJTGHGWMkM",
    plus_code: {
      compound_code: "WG2J+GX Cork, County Cork, Ireland",
      global_code: "9C3HWG2J+GX",
    },
    rating: 4.3,
    reference: "ChIJr3MSiw6QREgRiqJTGHGWMkM",
    scope: "GOOGLE",
    types: (4)[
      ("tourist_attraction", "lodging", "point_of_interest", "establishment")
    ],
    user_ratings_total: 1634,
    vicinity: "MacCurtain Street, Cork",
  },
];

describe("EventDetailInfoActivitiesTable.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that component caption heading is rendered", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.find("caption").text()).toContain(
      "Tourist Attractions in London"
    );
  });

  it("checks that activity checkbox is rendered", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.find('[data-testid="activityCheckbox"]').exists()).toBe(
      true
    );
  });

  it("checks that activity title is rendered", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.find('[data-testid="name"]').text()).toBe(
      mockActivity[0].name
    );
  });

  it("checks that activity location is rendered", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.find('[data-testid="vicinity"]').text()).toBe(
      mockActivity[0].vicinity
    );
  });

  it("checks that activity rating is rendered", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.find('[data-testid="rating"]').text()).toBe(
      mockActivity[0].rating.toString()
    );
  });

  it("checks that link to activity on map is rendered", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.find('[data-testid="mapLink"]').attributes().href).toEqual(
      "https://maps.google.com/maps/contrib/115516656997182409995"
    );
  });

  it("checks that activity icon is rendered", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true);
  });

  it("checks that event is emitted on click of checkbox", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        checkedThingsToDo: [],
        eventCity: "London",
      },
    });

    const checkboxElement = wrapper.find('[data-testid="activityCheckbox"]');

    checkboxElement.element.checked = true;

    checkboxElement.trigger("change");

    expect(wrapper.emitted()).toHaveProperty("checkedActivityChange");
  });

  it("if user has already saved an activity to itinerary, should be checked on subsequent renders", async () => {
    const wrapper = mount(EventDetailInfoActivitiesTable, {
      props: {
        activitiesInfo: mockActivity,
        checkedThingsToDo: mockActivity,
        eventCity: "London",
      },
    });

    expect(wrapper.vm.googlePlacesInfo[0].checked).toBe(true);
  });
});

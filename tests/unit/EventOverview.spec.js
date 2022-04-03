import { mount, shallowMount } from "@vue/test-utils";
import EventOverview from "@/components/EventOverview.vue";
import { nextTick } from "vue";

const mockEvent = {
  title: "Test Event",
  type: "DOMESTIC_OVERNIGHT",
  city: "Cork",
  polls: []
};
describe("EventOverview.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("if event creator, edit icon should be shown", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
      },
    });

    expect(wrapper.find(".event-user-actions-parent-container").exists()).toBe(
      true
    );
  });

  it("event title should be rendered on view", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
      },
    });

    expect(wrapper.find('[data-testid="title"]').text()).toBe(mockEvent.title);
  });

  it("event type should be rendered on view", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
      },
    });

    expect(wrapper.find('[data-testid="domesticDayEvent"]').exists()).toBe(
      false
    );
    expect(wrapper.find('[data-testid="foreignOvernightEvent"]').exists()).toBe(
      false
    );
    expect(wrapper.find('[data-testid="domesticOvernightEvent"]').text()).toBe(
      "Domestic Overnight Event"
    );
  });

  it("event destination city should be rendered on view", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
      },
    });

    await nextTick();
    expect(wrapper.find('[data-testid="destinationCity"]').text()).toBe(
      mockEvent.city
    );
  });

  it("if event invited user, edit icon should not be shown", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: true,
      },
    });
    expect(wrapper.find(".event-user-actions-parent-container").exists()).toBe(
      false
    );
  });

  it("checks event is emitted on click of button to show scraped info", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
      },
    });
    await wrapper.find("#editEventIcon").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("editActionClick");
  });
});

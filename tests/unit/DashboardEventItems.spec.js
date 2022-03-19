import { mount, shallowMount } from "@vue/test-utils";
import DashboardEventItems from "@/components/DashboardEventItems.vue";

const mockEvent = {
  title: "Test Event",
  type: "DOMESTIC_OVERNIGHT",
  location: "Cork",
};
describe("DashboardEventItems.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("link to event detail page should be present", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });

    const eventDetailLink = wrapper.find('[data-testid="eventDetailLink"]');
    expect(eventDetailLink.exists()).toBe(true);
  });

  it("if event is domestic day type, domestic day styling should be applied", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [
          {
            title: "Test Event",
            type: "DOMESTIC_DAY",
            location: "Cork",
          },
        ],
      },
    });

    const domesticDayWatermarkElement = wrapper.find(
      '[data-testid="domesticDay"]'
    );
    expect(domesticDayWatermarkElement.exists()).toBe(true);
  });

  it("if event is domestic overnight type, domestic overnight styling should be applied", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });

    const domesticOvernightWatermarkElement = wrapper.find(
      '[data-testid="domesticOvernight"]'
    );
    expect(domesticOvernightWatermarkElement.exists()).toBe(true);
  });

  it("if event is foreign overnight type, foreign overnight styling should be applied", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [
          {
            title: "Test Event",
            type: "FOREIGN_OVERNIGHT",
            location: "Cork",
          },
        ],
      },
    });

    const foreignOvernightWatermarkElement = wrapper.find(
      '[data-testid="foreignOvernight"]'
    );
    expect(foreignOvernightWatermarkElement.exists()).toBe(true);
  });

  it("event title should be rendered", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });

    const eventTitleElement = wrapper.find('[data-testid="eventTitle"]');
    expect(eventTitleElement.text()).toEqual(mockEvent.title);
  });

  it("event type should be rendered", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });

    const eventTypeElement = wrapper.find('[data-testid="eventType"]');
    expect(eventTypeElement.text()).toEqual(mockEvent.type);
  });

  it("if created event, link to edit event should be rendered", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });

    const editEventLinkElement = wrapper.find('[data-testid="editEventLink"]');
    expect(editEventLinkElement.exists()).toBe(true);
  });

  it("if invited event, link to edit event should not be rendered", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: false,
        events: [mockEvent],
      },
    });

    const editEventLinkElement = wrapper.find('[data-testid="editEventLink"]');
    expect(editEventLinkElement.exists()).toBe(false);
  });

  it("if created event, delete event icon should be rendered", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });

    const deleteEventLinkElement = wrapper.find('[data-testid="deleteEvent"]');
    expect(deleteEventLinkElement.exists()).toBe(true);
  });

  it("clicking on delete icon triggers event emission", async () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: true,
        events: [mockEvent],
      },
    });

    const deleteEventLinkElement = wrapper.find('[data-testid="deleteEvent"]');

    await deleteEventLinkElement.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("showDeleteModal");
  });

  it("if invited event, delete event icon should not be rendered", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: false,
        events: [mockEvent],
      },
    });

    const deleteEventLinkElement = wrapper.find('[data-testid="deleteEvent"]');
    expect(deleteEventLinkElement.exists()).toBe(false);
  });

  it("if invited event, icon that links to event detail page should be rendered", () => {
    const wrapper = mount(DashboardEventItems, {
      props: {
        userUuid: "1",
        createdEvents: false,
        events: [mockEvent],
      },
    });

    const invitedEventLinkToEventElement = wrapper.find(
      '[data-testid="invitedEventLinkToEvent"]'
    );
    expect(invitedEventLinkToEventElement.exists()).toBe(true);
  });
});

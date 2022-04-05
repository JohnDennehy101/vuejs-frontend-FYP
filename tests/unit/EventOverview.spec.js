import { mount, shallowMount } from "@vue/test-utils";
import EventOverview from "@/components/EventOverview.vue";
import { nextTick } from "vue";

const mockEvent = {
  title: "Test Event",
  type: "DOMESTIC_OVERNIGHT",
  city: "Cork",
  polls: [],
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

  it("event created milestone should be rendered on view", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
      },
    });

    expect(
      wrapper.find('[data-testid="eventCreatedMilestone"]').html()
    ).toContain("1. Event Created");
  });

  it("Tick icon next to Poll Creation milestone should be rendered on view if polls array on event has a length of greater than 0", async () => {
    const mockEventWithPoll = {
      title: "Test Event",
      type: "DOMESTIC_OVERNIGHT",
      city: "Cork",
      polls: [
        {
          title: "Test Poll",
        },
      ],
    };
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEventWithPoll,
        invitedUser: false,
      },
    });

    expect(
      wrapper.find('[data-testid="pollCreatedMilestone"]').html()
    ).toContain('<i class="fas fa-check"></i>');
  });

  it("X icon next to Poll Creation milestone should be rendered on view if polls array on event has a length of 0", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: false,
        pollAlreadyCreated: false,
      },
    });

    console.log(wrapper.find('[data-testid="pollCreatedMilestone"]').html());

    expect(
      wrapper.find('[data-testid="pollCreatedMilestone"]').html()
    ).toContain('<i class="fas fa-times-circle"></i>');
  });

  it("Tick icon next to Poll Completion Stage milestone should be rendered on view if pollCompleted prop defined", async () => {
    const mockEventWithPoll = {
      title: "Test Event",
      type: "DOMESTIC_OVERNIGHT",
      city: "Cork",
      polls: [
        {
          title: "Test Poll",
        },
      ],
    };
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEventWithPoll,
        invitedUser: false,
        pollCompleted: true,
      },
    });

    await nextTick();

    expect(
      wrapper.find('[data-testid="pollCompletedMilestone"]').html()
    ).toContain('<i class="fas fa-check"></i>');
  });

  it("X icon next to poll completion milestone should be rendered on view if pollCompleted prop undefined", async () => {
    const mockEventWithPoll = {
      title: "Test Event",
      type: "DOMESTIC_OVERNIGHT",
      city: "Cork",
      polls: [
        {
          title: "Test Poll",
        },
      ],
    };
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEventWithPoll,
        invitedUser: false,
        pollCompleted: undefined,
      },
    });

    await nextTick();

    expect(
      wrapper.find('[data-testid="pollCompletedMilestone"]').html()
    ).toContain('<i class="fas fa-times-circle"></i>');
  });

  it("Tick icon next to Itinerary Creation Stage milestone should be rendered on view if itineraryCreated prop defined", async () => {
    const mockEventWithPoll = {
      title: "Test Event",
      type: "DOMESTIC_OVERNIGHT",
      city: "Cork",
      polls: [
        {
          title: "Test Poll",
        },
      ],
    };
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEventWithPoll,
        invitedUser: false,
        pollCompleted: true,
        itineraryCreated: true,
      },
    });

    await nextTick();

    expect(
      wrapper.find('[data-testid="itineraryCreatedMilestone"]').html()
    ).toContain('<i class="fas fa-check"></i>');
  });

  it("X icon next to Itinerary Created milestone should be rendered on view if itineraryCreated prop undefined", async () => {
    const mockEventWithPoll = {
      title: "Test Event",
      type: "DOMESTIC_OVERNIGHT",
      city: "Cork",
      polls: [
        {
          title: "Test Poll",
        },
      ],
    };
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEventWithPoll,
        invitedUser: false,
        pollCompleted: undefined,
        itineraryCreated: undefined,
      },
    });

    await nextTick();

    expect(
      wrapper.find('[data-testid="itineraryCreatedMilestone"]').html()
    ).toContain('<i class="fas fa-times-circle"></i>');
  });

  it("Tick icon next to Itinerary Finalised Stage milestone should be rendered on view if itineraryCompleted prop defined", async () => {
    const mockEventWithPoll = {
      title: "Test Event",
      type: "DOMESTIC_OVERNIGHT",
      city: "Cork",
      polls: [
        {
          title: "Test Poll",
        },
      ],
    };
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEventWithPoll,
        invitedUser: false,
        pollCompleted: true,
        itineraryCreated: true,
        itineraryCompleted: true,
      },
    });

    await nextTick();

    expect(
      wrapper.find('[data-testid="itineraryFinalisedMilestone"]').html()
    ).toContain('<i class="fas fa-check"></i>');
  });

  it("X icon next to Itinerary Completed milestone should be rendered on view if itineraryCompleted prop set to false", async () => {
    const mockEventWithPoll = {
      title: "Test Event",
      type: "DOMESTIC_OVERNIGHT",
      city: "Cork",
      polls: [
        {
          title: "Test Poll",
        },
      ],
    };
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEventWithPoll,
        invitedUser: false,
        pollCompleted: undefined,
        itineraryCreated: undefined,
        itineraryCompleted: false,
      },
    });

    await nextTick();

    expect(
      wrapper.find('[data-testid="itineraryFinalisedMilestone"]').html()
    ).toContain('<i class="fas fa-times-circle"></i>');
  });
});

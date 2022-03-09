import { mount, shallowMount } from "@vue/test-utils";
import EventOverview from "@/components/EventOverview.vue";

const mockEvent = {
  title: "Test Event",
  type: "DOMESTIC_OVERNIGHT",
  location: "Cork",
};
describe("EventOverview.vue", () => {
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

    expect(wrapper.find("h3").text()).toEqual(mockEvent.title);
    expect(wrapper.find(".event-user-actions-parent-container").exists()).toBe(
      true
    );
  });

  it("if event invited user, edit icon should not be shown", async () => {
    const wrapper = mount(EventOverview, {
      props: {
        individualEvent: mockEvent,
        invitedUser: true,
      },
    });

    expect(wrapper.find("h3").text()).toEqual(mockEvent.title);
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

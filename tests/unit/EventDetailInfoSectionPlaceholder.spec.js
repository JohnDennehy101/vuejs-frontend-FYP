import { mount, shallowMount } from "@vue/test-utils";
import EventDetailInfoSectionPlaceholder from "@/components/EventDetailInfoSectionPlaceholder.vue";

describe("EventDetailInfoSectionPlaceholder.vue", () => {
  it("should render correctly", () => {
    const wrapper = shallowMount(EventDetailInfoSectionPlaceholder);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that component title passed as prop is rendered correctly", async () => {
    const wrapper = mount(EventDetailInfoSectionPlaceholder, {
      props: {
        title: "Accommodation",
        icon: "iconClass",
      },
    });

    expect(wrapper.find("h2").text()).toEqual("Accommodation");
  });

  it("checks event is emitted on click of button to show scraped info", async () => {
    const wrapper = mount(EventDetailInfoSectionPlaceholder, {
      props: {
        title: "Accommodation",
        icon: "iconClass",
      },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("showScrapedInfo");
  });
});

import { mount, shallowMount } from "@vue/test-utils";
import EventDetailInfoToggleTableDisplay from "@/components/EventDetailInfoToggleTableDisplay.vue";

describe("EventDetailInfoToggleTableDisplay.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(EventDetailInfoToggleTableDisplay, {
      props: {
        infoType:
          "Accommodation",
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("hide toggle button should be rendered", async () => {
    const wrapper = mount(EventDetailInfoToggleTableDisplay, {
      props: {
         infoType:
          "Accommodation",
      },
    });

    const buttonElement = wrapper.find('button');
    expect(buttonElement.text()).toBe(
      "Hide"
    );
  });

  it("event is emitted on click of hide button", async () => {
    const wrapper = mount(EventDetailInfoToggleTableDisplay, {
      props: {
         infoType:
          "Accommodation",
      },
    });

    const buttonElement = wrapper.find('button');

    await buttonElement.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("toggleEventDetailInfo");
  });
});

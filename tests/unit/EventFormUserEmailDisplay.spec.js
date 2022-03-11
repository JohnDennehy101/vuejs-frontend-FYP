import { mount, shallowMount } from "@vue/test-utils";
import EventFormUserEmailDisplay from "@/components/EventFormUserEmailDisplay.vue";

describe("EventFormUserEmailDisplay.vue", () => {
  afterEach(() => {
        jest.resetAllMocks();
    });
  it("should render correctly", () => {
    const wrapper = shallowMount(EventFormUserEmailDisplay);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks email passed is rendered on the view", async () => {
    const wrapper = mount(EventFormUserEmailDisplay, {
      data() {
        return {
          userEmail: "test@gmail.com",
        };
      },
    });

    expect(wrapper.find("li").text()).toEqual("test@gmail.com");
  });

  it("checks event is emitted on click of x icon to remove user email", async () => {
    const wrapper = mount(EventFormUserEmailDisplay, {
      data() {
        return {
          userEmail: "test@gmail.com",
        };
      },
    });
    await wrapper.find("span").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("removeUserEmail");
  });
});

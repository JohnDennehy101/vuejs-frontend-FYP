import { mount, shallowMount } from "@vue/test-utils";
import PollOption from "@/components/PollOption.vue";

describe("PollOption.vue", () => {
  afterEach(() => {
        jest.resetAllMocks();
    });
  it("should render correctly", () => {
    const wrapper = shallowMount(PollOption);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that poll option dates are rendered correctly", async () => {
    const wrapper = mount(PollOption, {
      props: {
        startDate: new Date(),
        endDate: new Date(),
        id: "1"
      },
    });

    expect(wrapper.find("li")).toBeDefined();
  });

  it("checks event is emitted on click of x icon to remove poll option", async () => {
    const wrapper = mount(PollOption, {
       props: {
        startDate: new Date(),
        endDate: new Date(),
        id: "1"
      },
    });
    await wrapper.find("span").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("removePollOption");
  });
});

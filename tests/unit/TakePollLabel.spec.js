import { mount, shallowMount } from "@vue/test-utils";
import TakePollLabel from "@/components/TakePollLabel.vue";

describe("TakePollLabel.vue", () => {
  afterEach(() => {
        jest.resetAllMocks();
    });
  it("should render correctly", () => {
    const wrapper = shallowMount(TakePollLabel);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that poll option dates are rendered correctly", async () => {
    const wrapper = mount(TakePollLabel, {
      props: {
        start: new Date(),
        end: new Date(),
        id: "1"
      },
    });

    expect(wrapper.find("label")).toBeDefined();
  });

  it("checks computed properties are defined", async () => {
    mount(TakePollLabel, {
       props: {
        startDate: new Date(),
        endDate: new Date(),
        id: "1"
      },
    });
    expect(TakePollLabel.computed.formattedStartDate()).toBeDefined();
    expect(TakePollLabel.computed.formattedEndDate()).toBeDefined();
  });
});

import { mount, shallowMount } from "@vue/test-utils";
import ResponseErrorMessage from "@/components/ResponseErrorMessage.vue";

describe("ResponseErrorMessage.vue", () => {
  afterEach(() => {
        jest.resetAllMocks();
    });
  it("should render correctly", () => {
    const wrapper = shallowMount(ResponseErrorMessage);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks errorMessage prop is rendered correctly", async () => {
    const wrapper = mount(ResponseErrorMessage, {
      props: {
        errorMessage: "Error Message",
      },
    });

    expect(wrapper.find("p").text()).toEqual("Error Message");
  });

  it("checks event is emitted on click of x icon to hide error message", async () => {
    const wrapper = mount(ResponseErrorMessage, {
      data() {
        return {
          userEmail: "test@gmail.com",
        };
      },
    });
    await wrapper.find("span").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("hideErrorMessage");
  });
});

import { mount, shallowMount } from "@vue/test-utils";
import AccountErrorMessage from "@/components/AccountErrorMessage.vue";

describe("AccountErrorMessage.vue", () => {
  it("should render correctly", () => {
    const wrapper = shallowMount(AccountErrorMessage);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks errorMessage prop is rendered correctly", async () => {
    const wrapper = mount(AccountErrorMessage, {
      props: {
        errorMessage: "Error Message",
      },
    });

    expect(wrapper.find("p").text()).toEqual("Error Message");
  });

  it("checks event is emitted on click of x icon to hide error message", async () => {
    const wrapper = mount(AccountErrorMessage, {
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

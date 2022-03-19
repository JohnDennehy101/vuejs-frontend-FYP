import { mount, shallowMount } from "@vue/test-utils";
import AccountConfirmationInfoMessage from "@/components/AccountConfirmationInfoMessage.vue";

describe("AccountConfirmationInfoMessage.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(AccountConfirmationInfoMessage, {
      props: {
        message:
          "Thanks for confirming your email. You will now be redirected to the home page",
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that message is rendered correctly when passed as prop", async () => {
    const wrapper = mount(AccountConfirmationInfoMessage, {
      props: {
        message:
          "Thanks for confirming your email. You will now be redirected to the home page",
      },
    });

    const messageTextElement = wrapper.find('[data-testid="infoMessage"]');
    expect(messageTextElement.text()).toBe(
      "Thanks for confirming your email. You will now be redirected to the home page"
    );
  });

  it("checks that icon is rendered correctly", async () => {
    const wrapper = mount(AccountConfirmationInfoMessage, {
      props: {
        message:
          "Thanks for confirming your email. You will now be redirected to the home page",
      },
    });

    const iconElement = wrapper.find('[data-testid="icon"]');
    expect(iconElement.exists()).toBe(true);
  });
});

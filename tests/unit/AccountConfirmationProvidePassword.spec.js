import { mount, shallowMount } from "@vue/test-utils";
import AccountConfirmationProvidePassword from "@/components/AccountConfirmationProvidePassword.vue";

describe("AccountConfirmationProvidePassword.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(AccountConfirmationProvidePassword);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that event is emitted on click of submit button", async () => {
    const wrapper = mount(AccountConfirmationProvidePassword);

    const buttonElement = wrapper.find('button');
    await buttonElement.trigger("click");
    expect(wrapper.emitted()).toHaveProperty(
      "updateUserPassword"
    );
  });

  it("checks that input field updates on user input", async () => {
    const wrapper = mount(AccountConfirmationProvidePassword);

    const inputElement = wrapper.find("#password");
    await inputElement.setValue("ReallyHardPassword")
    expect(wrapper.vm.password).toBe("ReallyHardPassword");
  });
});

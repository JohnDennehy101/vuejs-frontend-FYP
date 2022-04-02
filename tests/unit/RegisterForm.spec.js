import { mount, shallowMount } from "@vue/test-utils";
import RegisterForm from "@/components/RegisterForm.vue";
import AccountErrorMessage from "@/components/AccountErrorMessage";
import mockSuccessfulUserService from "./mocks/userService.mock";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";
import { nextTick } from "vue";

const mockRoute = {
  params: {
    id: 1,
  },
};

describe("RegisterForm.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(RegisterForm);
    expect(wrapper).toMatchSnapshot();
  });
  it("sets value of email and password when user inputs values", async () => {
    const wrapper = mount(RegisterForm);

    await wrapper.find("input[type=text]").setValue("name@mail.com");
    await wrapper
      .find("input[type=password]")
      .setValue("ReallyHardPassword112234%");

    expect(wrapper.find("input[type=text]").element.value).toEqual(
      "name@mail.com"
    );
    expect(wrapper.find("input[type=password]").element.value).toEqual(
      "ReallyHardPassword112234%"
    );
  });

  it("successfully registers a user if valid password and email", async () => {
    const wrapper = mount(RegisterForm, {
      props: {
        userService: mockSuccessfulUserService,
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("name@mail.com");
    await wrapper
      .find("input[type=password]")
      .setValue("ReallyHardPassword112234%");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted()).toHaveProperty("showToast");
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
  });

  it("shows error message if invalid registration", async () => {
    const wrapper = mount(RegisterForm, {
      data() {
        return {
          invalidRegistration: true,
        };
      },
    });
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(true);
  });

  it("error registering a user if external API call fails", async () => {
    const mockFailureUserService = {
      registerUser() {
        return new Promise((resolve) => {
          resolve(undefined);
        });
      },
    };
    const wrapper = mount(RegisterForm, {
      props: {
        userService: mockFailureUserService,
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("name@mail.com");
    await wrapper
      .find("input[type=password]")
      .setValue("ReallyHardPassword112234%");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

    await nextTick();
    expect(wrapper.vm.invalidRegistration).toBe(true);
  });

  it("error messages not shown if valid inputs provided for email and password", async () => {
    const wrapper = mount(RegisterForm, {
      props: {
        userService: mockSuccessfulUserService,
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("input[type=text]").setValue("name@mail.com");
    await wrapper
      .find("input[type=password]")
      .setValue("ReallyHardPassword112234%");

    expect(wrapper.find(".error-message").exists()).toBe(false);
  });

  it("error message shown in email field if invalid input value is not an email", async () => {
    const wrapper = mount(RegisterForm, {
      data() {
        return {
          email: "notEmail",
        };
      },
    });
    expect(wrapper.find(".error-message").text()).toBe(
      "Please provide a valid email"
    );
  });

  it("error message shown in password field if password criteria not satisfied", async () => {
    const wrapper = mount(RegisterForm, {
      data() {
        return {
          password: "notValid",
        };
      },
    });
    expect(wrapper.find(".error-message").text()).toBe(
      "Password must have mininum length of 7, contain uppercase, lowercase, special characters."
    );
  });

  it("hides error message if user clicks to remove message", async () => {
    const wrapper = mount(RegisterForm, {
      data() {
        return {
          invalidRegistration: true,
        };
      },
    });
    await wrapper.vm.hideErrorMessage();
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
  });
});

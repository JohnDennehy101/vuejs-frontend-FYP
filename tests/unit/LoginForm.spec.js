import { mount, shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm.vue";
import AccountErrorMessage from "@/components/AccountErrorMessage";
import mockSuccessfulUserService from "./mocks/userService.mock";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";

const mockRoute = {
  params: {
    id: 1,
  },
};

describe("LoginForm.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(LoginForm);
    expect(wrapper).toMatchSnapshot();
  });
  it("sets value of email and password when user inputs values", async () => {
    const wrapper = mount(LoginForm);

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

  it("error messages not shown if valid inputs provided for email and password", async () => {
    const wrapper = mount(LoginForm, {
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

  it("error message shown in email field if no value provided", async () => {
    const wrapper = mount(LoginForm, {
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
    await wrapper
      .find("input[type=password]")
      .setValue("ReallyHardPassword112234%");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".error-message").text()).toBe(
      "Please provide an email"
    );
  });

  it("error message shown in password field if no value provided for password", async () => {
    const wrapper = mount(LoginForm, {
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

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.find(".error-message").text()).toBe(
      "Please provide a password"
    );
  });

  it("successfully logs in a user if valid password and email", async () => {
    const wrapper = mount(LoginForm, {
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

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(3);
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
  });

  it("shows error message if invalid login", async () => {
    const wrapper = mount(LoginForm, {
      data() {
        return {
          invalidLogin: true,
        };
      },
    });
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(true);
  });

  it("hides error message if user clicks to remove message", async () => {
    const wrapper = mount(LoginForm, {
      data() {
        return {
          invalidLogin: true,
        };
      },
    });
    await wrapper.vm.hideErrorMessage();
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
  });
});

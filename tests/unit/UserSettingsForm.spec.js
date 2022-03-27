import { mount, shallowMount } from "@vue/test-utils";
import UserSettingsForm from "@/components/UserSettingsForm.vue";
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

describe("UserSettingsForm.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(UserSettingsForm, {
      props: {
        userService: mockSuccessfulUserService,
        user: {
          profileImageUrl: "https://www.cloudinary-image.com",
          email: "test@gmail.com",
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("user email rendered when user object passed as prop", async () => {
    const wrapper = mount(UserSettingsForm, {
      props: {
        userService: mockSuccessfulUserService,
        user: {
          profileImageUrl: "https://www.cloudinary-image.com",
          email: "test@gmail.com",
        },
      },
    });

    await nextTick();

    expect(wrapper.vm.email).toBe("test@gmail.com");
  });

  it("successfully updates user if email and password provided", async () => {
    const wrapper = mount(UserSettingsForm, {
      props: {
        userService: mockSuccessfulUserService,
        user: {
          profileImageUrl: "https://www.cloudinary-image.com",
          email: "test@gmail.com",
        },
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("#password").setValue("NewPassword123£");
    await wrapper.find("#reEnterPassword").setValue("NewPassword123£");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.emitted()).toHaveProperty("updateUserForm");
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
  });

  it("does not update user if passwords do not match", async () => {
    const wrapper = mount(UserSettingsForm, {
      props: {
        userService: mockSuccessfulUserService,
        user: {
          profileImageUrl: "https://www.cloudinary-image.com",
          email: "test@gmail.com",
        },
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("#password").setValue("NewPassword123£");
    await wrapper.find("#reEnterPassword").setValue("NewPassword123");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.find(".error-message").text()).toBe(
      "Passwords not matching"
    );

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(true);
  });

  it("error message shown if password not strong enough and user clicks submit", async () => {
    const wrapper = mount(UserSettingsForm, {
      props: {
        userService: mockSuccessfulUserService,
        user: {
          profileImageUrl: "https://www.cloudinary-image.com",
          email: "test@gmail.com",
        },
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("#password").setValue("NewPassword");
    await wrapper.find("#reEnterPassword").setValue("NewPassword");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

    await nextTick();

    expect(wrapper.find(".error-message").text()).toBe(
      "Please provide a password with a minimum length of 7 and a mix of lowercase, uppercase, numbers and special characters"
    );

    expect(wrapper.vm.passwordNotProvided).toBe(true);

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(true);
  });

  it("error message shown if email not provided and user clicks submit", async () => {
    const wrapper = mount(UserSettingsForm, {
      props: {
        userService: mockSuccessfulUserService,
        user: {
          profileImageUrl: "https://www.cloudinary-image.com",
          email: "test@gmail.com",
        },
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("#email").setValue("");
    await wrapper.find("#password").setValue("NewPassword123£");
    await wrapper.find("#reEnterPassword").setValue("NewPassword123£");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

    await nextTick();

    expect(wrapper.find(".error-message").text()).toBe(
      "Please provide an email"
    );

    expect(wrapper.vm.emailNotProvided).toBe(true);

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(true);
  });

  it("if hideErrorMessageCalled, error message no longer displayed", async () => {
    const wrapper = mount(UserSettingsForm, {
      props: {
        userService: mockSuccessfulUserService,
        user: {
          profileImageUrl: "https://www.cloudinary-image.com",
          email: "test@gmail.com",
        },
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.vm.hideErrorMessage();
    expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
  });
});

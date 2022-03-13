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

    await wrapper.find("#password").setValue("NewPassword123");
    await wrapper.find("#reEnterPassword").setValue("NewPassword123");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
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

    await wrapper.find("#password").setValue("NewPassword12");
    await wrapper.find("#reEnterPassword").setValue("NewPassword123");

    const button = await wrapper.find("button");
    expect(button.exists()).toBe(true);

    await wrapper.find("form").trigger("submit.prevent");

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

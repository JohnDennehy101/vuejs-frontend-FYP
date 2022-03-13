import { mount, shallowMount } from "@vue/test-utils";
import UserSettingsProfileImage from "@/components/UserSettingsProfileImage.vue";
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

const mockFailureUserService = {
  uploadUserProfileImage() {
    return new Promise((resolve, reject) => {
      resolve({
        error: {
          message: "Error adding",
        },
      });
    });
  },
};

describe("UserSettingsProfileImage.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(UserSettingsProfileImage, {
      props: {
        userService: mockSuccessfulUserService,
        id: "1",
        image: "https://www.cloudinaryimage.com",
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("user image rendered if passed as prop in component", async () => {
    const wrapper = mount(UserSettingsProfileImage, {
      props: {
        userService: mockSuccessfulUserService,
        id: "1",
        image: "https://www.cloudinary.com",
      },
    });

    const profileImage = await wrapper.find('[data-testid="userImage"]');

    console.log(profileImage);

    await nextTick();

    expect(profileImage.isVisible()).toBe(true);
    expect(wrapper.find("defaultImage").exists()).toBe(false);
  });

  it("default image rendered if user image not passed as prop in component", async () => {
    const wrapper = mount(UserSettingsProfileImage, {
      props: {
        userService: mockSuccessfulUserService,
        id: "1",
        image: null,
      },
    });

    const profileImage = await wrapper.find('[data-testid="userImage"]');

    console.log(profileImage);

    await nextTick();

    expect(profileImage.exists()).toBe(false);
    expect(wrapper.find('[data-testid="defaultImage"]').exists()).toBe(true);
  });

  it("successfully updates user if file provided", async () => {
    const wrapper = mount(UserSettingsProfileImage, {
      props: {
        userService: mockSuccessfulUserService,
        userId: "1",
        image: null,
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    let imageInputElement = await wrapper.find("#image-upload");
    imageInputElement.trigger("change");

    expect(wrapper.emitted()).toHaveProperty("updateUserImage");
  });

  it("does not updates user if error received in response", async () => {
    const wrapper = mount(UserSettingsProfileImage, {
      props: {
        userService: mockFailureUserService,
        userId: "1",
        image: null,
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    let imageInputElement = await wrapper.find("#image-upload");
    await imageInputElement.trigger("change");

    expect(wrapper.vm.invalidImageUpload).toBe(true);

    expect(wrapper.emitted()).toHaveProperty("updateUserImage");
  });
});

import { mount, shallowMount } from "@vue/test-utils";
import UserInfoDisplay from "@/components/UserInfoDisplay.vue";

describe("UserInfoDisplay.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 1,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("checks that user email is rendered correctly", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 1,
      },
    });

    const userEmailTextElement = wrapper.find('[data-testid="userEmail"]');
    expect(userEmailTextElement.text()).toBe("test@gmail.com");
  });

  it("checks that number of created events is rendered", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 1,
      },
    });

    const createdEventsQuantityTextElement = wrapper.find(
      '[data-testid="numberOfCreatedEvents"]'
    );
    expect(createdEventsQuantityTextElement.text()).toContain(1);
  });

  it("checks that number of invited events is rendered", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 1,
      },
    });

    const invitedEventsQuantityTextElement = wrapper.find(
      '[data-testid="numberOfInvitedEvents"]'
    );
    expect(invitedEventsQuantityTextElement.text()).toContain(2);
  });

  it("checks that user image is rendered if passed as a prop", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: {
          email: "test@gmail.com",
          profileImageUrl: "https://cloudinary.test.com",
        },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 1,
      },
    });
    expect(wrapper.find('[data-testid="userImageProvided"]').isVisible()).toBe(
      true
    );
    expect(wrapper.find('[data-testid="userImageNotProvided"]').exists()).toBe(
      false
    );
  });

  it("checks that default image is rendered if user profileImageUrl is null", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 1,
      },
    });
    expect(wrapper.find('[data-testid="userImageProvided"]').exists()).toBe(
      false
    );
    expect(wrapper.find('[data-testid="userImageNotProvided"]').exists()).toBe(
      true
    );
  });
});

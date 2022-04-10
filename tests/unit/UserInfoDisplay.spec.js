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
      '[data-testid="numberOfCreatedEventsSingular"]'
    );
    expect(createdEventsQuantityTextElement.text()).toContain(1);
  });

  it("checks that for multiple created events, plural of event is rendered (events)", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 2,
      },
    });

    const createdEventsQuantityTextElement = wrapper.find(
      '[data-testid="numberOfCreatedEventsPlural"]'
    );
    expect(createdEventsQuantityTextElement.text()).toBe("2 events created");
  });

  it("checks that singular invited event, singulr of event is rendered (event)", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 1,
        createdEventsQuantity: 1,
      },
    });

    const invitedEventsQuantityTextElement = wrapper.find(
      '[data-testid="numberOfInvitedEventsSingular"]'
    );
    expect(invitedEventsQuantityTextElement.text()).toBe("1 event invite");
  });


  it("checks that for multiple invited events, plural of event is rendered (events)", async () => {
    const wrapper = mount(UserInfoDisplay, {
      props: {
        user: { email: "test@gmail.com", profileImageUrl: null },
        invitedEventsQuantity: 2,
        createdEventsQuantity: 2,
      },
    });

    const createdEventsQuantityTextElement = wrapper.find(
      '[data-testid="numberOfInvitedEventsPlural"]'
    );
    expect(createdEventsQuantityTextElement.text()).toBe("2 event invites");
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

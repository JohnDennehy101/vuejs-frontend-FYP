import { mount, shallowMount } from "@vue/test-utils";
import ChatOnlineUsers from "@/components/ChatOnlineUsers.vue";

describe("ChatOnlineUsers.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(ChatOnlineUsers, {
      props: {
        onlineUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: "https://www.cloudinary.com",
          },
        ],
        eventUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: "https://www.cloudinary.com",
          },
        ],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("online user info rendered if they are an invited event user", async () => {
    const wrapper = mount(ChatOnlineUsers, {
      props: {
        onlineUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: "https://www.cloudinary.com",
          },
        ],
        eventUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: "https://www.cloudinary.com",
          },
        ],
      },
    });

    expect(wrapper.find("#user-image-container").exists()).toBe(true);
  });

  it("online user image rendered if user has updated image", async () => {
    const wrapper = mount(ChatOnlineUsers, {
      props: {
        onlineUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: "https://www.cloudinary.com",
          },
        ],
        eventUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: "https://www.cloudinary.com",
          },
        ],
      },
    });

    expect(wrapper.find('[data-testid="userImage"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="defaultImage"]').exists()).toBe(false);
  });

  it("default image rendered if user has not updated image", async () => {
    const wrapper = mount(ChatOnlineUsers, {
      props: {
        onlineUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: null,
          },
        ],
        eventUsers: [
          {
            id: "1",
            email: "test@gmail.com",
            profileImageUrl: null,
          },
        ],
      },
    });

    expect(wrapper.find('[data-testid="defaultImage"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="userImage"]').exists()).toBe(false);
  });
});

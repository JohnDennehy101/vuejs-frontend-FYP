import { mount } from "@vue/test-utils";
import ChatMessagesDisplay from "@/components/ChatMessagesDisplay.vue";

describe("ChatMessagesDisplay.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("messages passed as prop rendered correctly, user image also rendered", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test@gmail.com",
          },
        ],
      },
    });

    const userEmailElement = await wrapper.find('[data-testid="userEmail"]');

    expect(wrapper.find('[data-testid="userEmail"]').exists()).toBe(true);

    expect(userEmailElement.text()).toBe("test@gmail.com");
  });

  it("if message is by logged in user, green icon should be displayed next to their profile", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test@gmail.com",
          },
        ],
      },
    });

    const userOnlineIconElement = await wrapper.find(
      '[data-testid="greenIconOnlineUser"]'
    );
    const userOfflineIconElement = await wrapper.find(
      '[data-testid="redIconOfflineUser"]'
    );

    expect(userOnlineIconElement.exists()).toBe(true);
    expect(userOfflineIconElement.exists()).toBe(false);
  });

  it("if message is by non-logged in user, red icon should be displayed next to their profile", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test2@gmail.com",
          },
        ],
      },
    });

    const userOfflineIconElement = await wrapper.find(
      '[data-testid="redIconOfflineUser"]'
    );
    const userOnlineIconElement = await wrapper.find(
      '[data-testid="greenIconOnlineUser"]'
    );

    expect(userOfflineIconElement.exists()).toBe(true);
    expect(userOnlineIconElement.exists()).toBe(false);
  });

  it("if one message passed, title should be 1 comment", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test2@gmail.com",
          },
        ],
      },
    });

    const singleMessageHeadingElement = await wrapper.find(
      '[data-testid="oneMessage"]'
    );

    expect(singleMessageHeadingElement.text()).toBe("1 Comment");
  });

  it("if more than one message passed, title should be {{numberOfMessages}} comments", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
          {
            id: "3",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test2@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message 2",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test2@gmail.com",
          },
        ],
      },
    });

    const multipleMessagseHeadingElement = await wrapper.find(
      '[data-testid="multipleMessages"]'
    );

    expect(multipleMessagseHeadingElement.text()).toBe("2 Comments");
  });

  it("Timestamp should be in place for a message", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test2@gmail.com",
          },
        ],
      },
    });

    const messageTimestampElement = await wrapper.find(
      '[data-testid="messageTimestamp"]'
    );

    expect(messageTimestampElement.text()).toContain(new Date().getFullYear());
  });

  it("Message content should be rendered", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test2@gmail.com",
          },
        ],
      },
    });

    const messageContentElement = await wrapper.find(
      '[data-testid="messageContent"]'
    );

    expect(messageContentElement.text()).toBe("Test Message");
  });

  it("If logged in user created message, delete icon should be rendered next to message", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              id: "1",
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test@gmail.com",
          },
        ],
      },
    });

    const messageDeleteIconElement = await wrapper.find(
      '[data-testid="deleteMessageIcon"]'
    );

    expect(messageDeleteIconElement.exists()).toBe(true);
  });

  it("If logged in user did not create message, delete icon should not be rendered next to message", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test2@gmail.com",
          },
        ],
      },
    });

    const messageDeleteIconElement = await wrapper.find(
      '[data-testid="deleteMessageIcon"]'
    );

    expect(messageDeleteIconElement.exists()).toBe(false);
  });

  it("Clicking on delete message icon should emit event", async () => {
    const wrapper = mount(ChatMessagesDisplay, {
      props: {
        chatMessages: [
          {
            id: "2",
            author: {
              id: "1",
              profileImageUrl: "https://www.cloudinary.com",
              email: "test@gmail.com",
            },
            created_at: new Date(),
            content: "Test Message",
          },
        ],
        userId: "1",
        onlineUsers: [
          {
            profileImageUrl: "https://www.cloudinary.com",
            email: "test2@gmail.com",
          },
        ],
      },
    });

    await wrapper.find('[data-testid="deleteMessageIcon"]').trigger("click");

    expect(wrapper.emitted()).toHaveProperty("deleteComment");
  });
});

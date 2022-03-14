import { mount, shallowMount } from "@vue/test-utils";
import ChatMessagesInput from "@/components/ChatMessagesInput.vue";

describe("ChatMessagesInput.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(ChatMessagesInput);
    expect(wrapper).toMatchSnapshot();
  });
  it("message added on click of Post comment button", async () => {
    const wrapper = mount(ChatMessagesInput);

    wrapper.find("#message").setValue("Test Message");

    await wrapper.find(".hide-event-detail-category-button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("addComment");
  });
});

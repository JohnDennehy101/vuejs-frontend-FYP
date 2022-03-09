import { mount, shallowMount } from "@vue/test-utils";
import NoCreatedItems from "@/components/NoCreatedItems.vue";
import mockRouter from "./mocks/mockRouter.mock";

const mockRoute = {
  params: {
    id: 1,
  },
};

describe("NoCreatedItems.vue", () => {
  it("should render correctly", () => {
    const wrapper = shallowMount(NoCreatedItems);
    expect(wrapper).toMatchSnapshot();
  });

  it("Call To Action Not shown for event invited users", async () => {
    const wrapper = mount(NoCreatedItems, {
      props: {
        invitedUser: true,
      },
    });

    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("Call To Action shown for event creator", async () => {
    const wrapper = mount(NoCreatedItems, {
      props: {
        invitedUser: false,
      },
    });

    expect(wrapper.find("button").isVisible()).toBe(true);
  });

  it("message prop successfully renders to user", async () => {
    const wrapper = mount(NoCreatedItems, {
      props: {
        message: "No Created Items",
      },
    });

    expect(wrapper.find("h4").text()).toBe("No Created Items");
  });

  it("clicking button on component triggers router push", async () => {
    const wrapper = mount(NoCreatedItems, {
      props: {
        message: "No Created Items",
        invitedUser: false,
      },
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("button").trigger("click");

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
  });
});

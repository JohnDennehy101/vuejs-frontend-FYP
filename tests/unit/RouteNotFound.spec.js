import { mount, shallowMount } from "@vue/test-utils";
import RouteNotFound from "@/components/RouteNotFound.vue";

describe("RouteNotFound.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(RouteNotFound);
    expect(wrapper).toMatchSnapshot();
  });

  it("checks message heading is rendered on page to user", async () => {
    const wrapper = mount(RouteNotFound);

    expect(wrapper.find("h1").text()).toBe("404 not found");
  });

  it("checks message info is rendered on page to user ", async () => {
    const wrapper = mount(RouteNotFound);

    expect(wrapper.find("p").text()).toContain(
      "No site route found with this URL structure."
    );
  });
});

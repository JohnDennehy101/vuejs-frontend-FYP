import { mount, shallowMount } from "@vue/test-utils";
import LoginImage from "@/components/LoginImage.vue";

describe("LoginImage.vue", () => {

  afterEach(() => {
        jest.resetAllMocks();
    });

    it("should render correctly", () => {
   const wrapper = shallowMount(LoginImage);
   expect(wrapper).toMatchSnapshot();
  });

  it("checks that image is rendered", async () => {
    const wrapper = mount(LoginImage);

    expect(wrapper.find('img').isVisible()).toBe(true);
  });

 
});

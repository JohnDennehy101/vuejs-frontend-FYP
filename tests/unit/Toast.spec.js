import { mount, shallowMount } from "@vue/test-utils";
import Toast from "@/components/Toast.vue";

describe("Toast.vue", () => {

  afterEach(() => {
        jest.resetAllMocks();
    });

    it("should render correctly", () => {
   const wrapper = shallowMount(Toast, {
       props: {
           message: "Test Message"
       }
   });
   expect(wrapper).toMatchSnapshot();
  });

  it("checks that value passed in prop is rendered", async () => {
    const wrapper = mount(Toast, {
        props: {
            message: "Test Message"
        }
    });

    expect(wrapper.find('.toast').text()).toBe("Test Message");
  });

 
});

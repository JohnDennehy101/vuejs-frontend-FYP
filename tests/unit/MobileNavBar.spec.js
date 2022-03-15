import { mount, shallowMount } from "@vue/test-utils";
import MobileNavBar from "@/components/MobileNavBar.vue";

describe("MobileNavBar.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = shallowMount(MobileNavBar, {
      props: {
        navLinks: [
          {
            name: "Register",
            link: "/register",
          },
          { name: "Login", link: "/login" },
        ],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("menu opens on click of hamburger icon", async () => {
    const navElement = document.createElement("ul.nav-links");
    if (document.body) {
      document.body.appendChild(navElement);
    }
    const wrapper = mount(MobileNavBar, {
      props: {
        navLinks: [
          {
            name: "Register",
            link: "/register",
          },
          { name: "Login", link: "/login" },
        ],
      },
      attachTo: navElement,
    });

    const openMobileMenuMock = jest.spyOn(wrapper.vm, "openMobileMenu");

    await wrapper.find('[data-testid="hamburgerIcon"]').trigger("click");

    expect(openMobileMenuMock).toHaveBeenCalled();
  });
});

import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import Header from "@/components/Header.vue";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";
import { nextTick } from "vue";

const mockRoute = {
  params: {
    id: 1,
  },
};

const nonLoggedInStore = {
  state: {
    userId: null,
    jwtToken: "token",
  },
  getters: {
    userId: () => {
      return null;
    },
    isAuthenticated: () => {
      return false;
    },
  },
  dispatch: jest.fn(),
};

describe("Header.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(Header, {
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
  it("if logged in user, login and register options not rendered", async () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(wrapper.find('[data-testid="loginLink"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="registerLink"]').exists()).toBe(false);
  });

  it("if logged in user, create event, dashboard, user settings and logout links are rendered", async () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(wrapper.find('[data-testid="createEventLink"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="userSettingsLink"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-testid="dashboardLink"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="logoutLink"]').exists()).toBe(true);
  });

  it("logo is rendered in header", async () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("title is rendered in header", async () => {
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    expect(wrapper.find('[data-testid="title"]').text()).toBe(
      "Group Activity Planner"
    );
  });

  it("if route is /login, loginPage variable set to true", async () => {
    let $route = {
      name: "Login",
      path: "/login",
    };
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $store: nonLoggedInStore,
          $route: $route,
          $router: mockRouter,
        },
      },
    });

    await wrapper.vm.$options.watch.$route.call(wrapper.vm, "/login");

    await nextTick();

    expect(wrapper.vm.loginPage).toBe(true);
  });

  it("if route is /register, registerPage variable set to true", async () => {
    let $route = {
      name: "Register",
      path: "/register",
    };
    const wrapper = mount(Header, {
      global: {
        mocks: {
          $store: nonLoggedInStore,
          $route: $route,
          $router: mockRouter,
        },
      },
    });

    await wrapper.vm.$options.watch.$route.call(wrapper.vm, "/register");

    await nextTick();

    expect(wrapper.vm.registerPage).toBe(true);
  });
});

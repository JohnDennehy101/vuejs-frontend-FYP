import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import PollForm from "@/components/PollForm.vue";
import AccountErrorMessage from "@/components/AccountErrorMessage";
import mockSuccessfulEventService from "./mocks/eventService.mock";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";
import { nextTick } from "vue";

const mockRoute = {
  params: {
    id: 1,
  },
};

const mockEvent = {
  title: "Test Event",
  type: "DOMESTIC_OVERNIGHT",
  location: "Cork",
};

const mockForeignEvent = {
  title: "Test Event",
  type: "FOREIGN_OVERNIGHT",
  location: "London",
  departureCity: "Cork",
};

describe("PollForm.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(PollForm, {
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
  it("if values provided, poll form should be subb", async () => {
    const wrapper = mount(PollForm, {
      props: {
        editPoll: false,
        eventService: {
          default: mockSuccessfulEventService,
        },
      },
      data() {
        return {
          id: "1",
          options: [],
          startDate: new Date(),
          endDate: new Date(),
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    await wrapper.find("#title").setValue("Test Poll Title");

    await wrapper.vm.$nextTick();

    await wrapper.find("#add-option-button").trigger("click");

    expect(wrapper.vm.options).toHaveLength(1);
  });
});

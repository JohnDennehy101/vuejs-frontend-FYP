import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import DeleteModal from "@/components/DeleteModal.vue";
import AccountErrorMessage from "@/components/AccountErrorMessage";
import mockSuccessfulEventService from "./mocks/eventService.mock";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";
import eventService from "../../src/services/EventService";

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

describe("DeleteModal.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(DeleteModal, {
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
  it("Expect value passed in modalHeading prop to be rendered to user in h2", async () => {
    const wrapper = mount(DeleteModal, {
      props: {
        modalHeading: "Event",
        eventId: "1",
        pollId: "2",
        eventService: mockSuccessfulEventService,
    
      },
      data() {
        return {
          editEventAction: false,
          editEventInfo: mockEvent,
        };
      },
    });

    expect(wrapper.find("h2").text()).toBe("Delete Event");
  });

  it("Expect value passed in title prop to be rendered to user in slot", async () => {
    const wrapper = mount(DeleteModal, {
      props: {
        modalHeading: "Event",
        eventId: "1",
        pollId: "2",
        title: "Test title",
        eventService: mockSuccessfulEventService,
      
      },
      data() {
        return {
          editEventAction: false,
          editEventInfo: mockEvent,
        };
      },
    });

    expect(wrapper.find("p").text()).toContain("Test title");
  });

  it("Expect event to be deleted on click", async () => {
    const wrapper = mount(DeleteModal, {
      props: {
        modalHeading: "Event",
        eventId: "1",
        pollId: "2",
        title: "Test title",
        eventService: mockSuccessfulEventService,
      },
      data() {
        return {
          editEventAction: false,
          editEventInfo: mockEvent,
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

    await wrapper.find("#modal-delete-button").trigger("click");

    expect(mockRouter.go).toHaveBeenCalledTimes(1);
  });

  it("Expect Poll to be deleted on click", async () => {
    const wrapper = mount(DeleteModal, {
      props: {
        modalHeading: "Poll",
        eventId: "1",
        pollId: "2",
        title: "Test title",
        eventService: mockSuccessfulEventService,
      
      },
      data() {
        return {
          editEventAction: false,
          editEventInfo: mockEvent,
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

    await wrapper.find("#modal-delete-button").trigger("click");

    expect(mockRouter.go).toHaveBeenCalledTimes(1);
  });

  it("Expect close event to be emitted on click of x icon", async () => {
    const wrapper = mount(DeleteModal);

    await wrapper.find("#modal-cancel-button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("close");
  });
});

import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import PollForm from "@/components/PollForm.vue";
import PollOption from "@/components/PollOption";
import mockSuccessfulEventService from "./mocks/eventService.mock";
import mockStore from "./mocks/mockStore.mock";
import mockRouter from "./mocks/mockRouter.mock";
import { nextTick } from "vue";
import Datepicker from "vue3-datepicker";

const mockRoute = {
  params: {
    id: 1,
  },
};

describe("PollForm.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("if values provided for start date and end date, poll option should be added in form", async () => {
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
          startDate: new Date(1747175775571),
          endDate: new Date(1747175775571),
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

  it("for new poll, if title and poll option present, poll should be successfully added", async () => {
    const wrapper = shallowMount(PollForm, {
      props: {
        editPoll: false,
        eventService: mockSuccessfulEventService,
      },
      data() {
        return {
          id: "1",
          options: [
            {
              endDate: "2022-03-13T12:12:08.892Z",
              id: "73bd7213-b4d3-4fda-b0f5-83dbc3ec34e1",
              startDate: "2022-03-13T12:12:08.892Z",
              votes: [],
            },
          ],
          startDate: new Date(1747175775571),
          endDate: new Date(1747175775571),
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      components: {
        PollOption,
        Datepicker,
      },
      emits: ["removePollOption"],
    });

    await wrapper.find("#title").setValue("Test Poll Title");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.options).toHaveLength(1);

    await wrapper.find("form").trigger("submit.prevent");

    console.log(wrapper.vm);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.options).toHaveLength(1);

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
  });

  it("for new poll, if title and poll option not present, poll should not be added", async () => {
    const wrapper = shallowMount(PollForm, {
      props: {
        editPoll: false,
        eventService: mockSuccessfulEventService,
      },
      data() {
        return {
          id: "1",
          options: [],
          startDate: new Date(1747175775571),
          endDate: new Date(1747175775571),
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      components: {
        PollOption,
        Datepicker,
      },
      emits: ["removePollOption"],
    });

    await wrapper.find("#title").setValue("Test Poll Title");

    await wrapper.vm.$nextTick();

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  it("for existing poll, if title and poll option present, poll should be successfully updated", async () => {
    const wrapper = shallowMount(PollForm, {
      props: {
        editPoll: true,
        eventService: mockSuccessfulEventService,
      },
      data() {
        return {
          id: "1",
          options: [
            {
              endDate: "2022-03-13T12:12:08.892Z",
              id: "73bd7213-b4d3-4fda-b0f5-83dbc3ec34e1",
              startDate: "2022-03-13T12:12:08.892Z",
              votes: [],
            },
          ],
          startDate: new Date(1747175775571),
          endDate: new Date(1747175775571),
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      components: {
        PollOption,
        Datepicker,
      },
      emits: ["removePollOption"],
    });

    await wrapper.find("#title").setValue("Test Poll Title");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.options).toHaveLength(1);

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
  });

  it("for existing poll, if title and poll option not present, poll should not be updated", async () => {
    const wrapper = shallowMount(PollForm, {
      props: {
        editPoll: true,
        eventService: mockSuccessfulEventService,
      },
      data() {
        return {
          id: "1",
          options: [],
          startDate: new Date(1747175775571),
          endDate: new Date(1747175775571),
        };
      },
      global: {
        mocks: {
          $store: mockStore,
          $route: mockRoute,
          $router: mockRouter,
        },
      },
      components: {
        PollOption,
        Datepicker,
      },
      emits: ["removePollOption"],
    });

    await wrapper.find("#title").setValue("Test Poll Title");

    await wrapper.vm.$nextTick();

    await wrapper.find("form").trigger("submit.prevent");

    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });
});

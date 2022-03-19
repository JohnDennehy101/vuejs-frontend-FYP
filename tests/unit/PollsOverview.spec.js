import { mount, shallowMount } from "@vue/test-utils";
import PollsOverview from "@/components/PollsOverview.vue";
import { nextTick } from "vue";

const mockPoll = {
  id: "1",
  title: "Mock Poll",
  created_at: "2022-02-04 15:54:50.937834",
  updated_at: "2022-02-04 15:54:50.937834",
  completed: false,
  startDate: "2022-02-04 15:54:50.937834",
  endDate: "2022-02-04 15:54:50.937834",
  votes: [1, 2],
};
describe("PollsOverview.vue", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const wrapper = shallowMount(PollsOverview, {
      props: {
        pollItems: mockPoll,
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("if poll passed as prop, title should be rendered", async () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [mockPoll],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollTitleElement = wrapper.find('[data-testid="title"]');

    await nextTick();
    expect(pollTitleElement.text()).toBe(mockPoll.title);
  });

  it("if poll passed as prop, created date should be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [mockPoll],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollCreationDateElement = wrapper.find('[data-testid="createdAt"]');
    expect(pollCreationDateElement.text()).toContain(
      "04-February-2022 15:54:50"
    );
  });

  it("if poll passed as prop, updated date should be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [mockPoll],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollUpdatedDateElement = wrapper.find('[data-testid="updatedAt"]');
    expect(pollUpdatedDateElement.text()).toContain(
      "04-February-2022 15:54:50"
    );
  });

  it("if poll is not complete, not completed icon should be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [mockPoll],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollNotCompletedElement = wrapper.find(
      '[data-testid="pollNotCompletedIcon"]'
    );
    expect(pollNotCompletedElement.exists()).toBe(true);
  });

  it("if poll is completed, completed icon should be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [
          {
            id: "1",
            title: "Mock Poll",
            created_at: "2022-04-30",
            updated_at: "2022-04-30",
            completed: true,
          },
        ],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollCompletedElement = wrapper.find(
      '[data-testid="pollCompletedIcon"]'
    );
    expect(pollCompletedElement.exists()).toBe(true);
  });

  it("if user is poll creator, edit icon should be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [
          {
            id: "1",
            title: "Mock Poll",
            created_at: "2022-04-30",
            updated_at: "2022-04-30",
            completed: true,
          },
        ],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollEditIcon = wrapper.find('[data-testid="editFunctionality"]');
    expect(pollEditIcon.exists()).toBe(true);
  });

  it("if user is poll creator, on click of edit icon, event should be emitted", async () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [
          {
            id: "1",
            title: "Mock Poll",
            created_at: "2022-04-30",
            updated_at: "2022-04-30",
            completed: true,
          },
        ],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollEditIcon = wrapper.find('[data-testid="editFunctionality"]');

    await pollEditIcon.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("editActionClick");
  });

  it("if user is not poll creator, edit icon should not be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [
          {
            id: "1",
            title: "Mock Poll",
            created_at: "2022-04-30",
            updated_at: "2022-04-30",
            completed: true,
          },
        ],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: true,
      },
    });

    const pollEditIcon = wrapper.find('[data-testid="editFunctionality"]');
    expect(pollEditIcon.exists()).toBe(false);
  });

  it("if user is poll creator, delete icon should be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [
          {
            id: "1",
            title: "Mock Poll",
            created_at: "2022-04-30",
            updated_at: "2022-04-30",
            completed: true,
          },
        ],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollDeleteIcon = wrapper.find('[data-testid="deleteFunctionality"]');
    expect(pollDeleteIcon.exists()).toBe(true);
  });

  it("if user is poll creator, on click of delete icon, event should be emitted", async () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [
          {
            id: "1",
            title: "Mock Poll",
            created_at: "2022-04-30",
            updated_at: "2022-04-30",
            completed: true,
          },
        ],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const pollDeleteIcon = wrapper.find('[data-testid="deleteFunctionality"]');

    await pollDeleteIcon.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("showDeleteModal");
  });

  it("if user is not poll creator, delete icon should not be rendered", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [
          {
            id: "1",
            title: "Mock Poll",
            created_at: "2022-04-30",
            updated_at: "2022-04-30",
            completed: true,
          },
        ],
        userUuid: "2",
        topVotedOption: null,
        individualEventId: "3",
        guestUser: true,
      },
    });

    const pollDeleteIcon = wrapper.find('[data-testid="deleteFunctionality"]');
    expect(pollDeleteIcon.exists()).toBe(false);
  });

  it("if poll most voted option is passed as prop, created at date should be rendered on the view", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [mockPoll],
        userUuid: "2",
        topVotedOption: mockPoll,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const mostVotedPollOptionStartDateElement = wrapper.find(
      '[data-testid="mostVotedOptionStartDate"]'
    );
    expect(mostVotedPollOptionStartDateElement.text()).toContain(
      "04-February-2022"
    );
  });

  it("if poll most voted option is passed as prop, updated at date should be rendered on the view", () => {
    const wrapper = mount(PollsOverview, {
      props: {
        pollItems: [mockPoll],
        userUuid: "2",
        topVotedOption: mockPoll,
        individualEventId: "3",
        guestUser: false,
      },
    });

    const mostVotedPollOptionEndDateElement = wrapper.find(
      '[data-testid="mostVotedEndDate"]'
    );
    expect(mostVotedPollOptionEndDateElement.text()).toContain(
      "04-February-2022"
    );
  });
});

import { mount, shallowMount, flushPromises } from "@vue/test-utils";
import EventForm from "@/components/EventForm.vue";
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
    departureCity: "Cork"
};

describe("EventForm.vue", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("should render correctly", () => {
        const wrapper = shallowMount(EventForm, {
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
    it("if not edit action, hide form icon not rendered", async () => {
        const wrapper = mount(EventForm, {
            props: {
                edit: false,
            },
            data() {
                return {
                    editEventAction: false,
                    editEventInfo: mockEvent,
                };
            },
        });

        expect(wrapper.find("#hide-form-icon-container").exists()).toBe(false);
    });

    it("if not edit action, form title should be create event", async () => {
        const wrapper = mount(EventForm, {
            props: {
                editEventAction: false,
            },
        });

        await flushPromises();

        expect(wrapper.find("h2").text()).toEqual("Create Event");
    });

    it("if edit action, hide form icon rendered", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: true,
                    editEventInfo: mockEvent,
                };
            },
        });
        await flushPromises();

        expect(wrapper.find("#hide-form-icon-container").exists()).toBe(true);
    });

    it("if edit action, form title should be edit event", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: true,
                    editEventInfo: mockEvent,
                };
            },
        });

        await flushPromises();

        expect(wrapper.find("h2").text()).toEqual("Edit Event");
    });

    it("clicking on exit form icon during edit of form should emit hideEditEventActionClick event", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: true,
                    editEventInfo: mockEvent,
                };
            },
        });

        wrapper.find("span").trigger("click");

        expect(wrapper.emitted()).toHaveProperty("hideEditEventActionClick");
    });

    it("for new event, if user provides input for required fields successful request should be made", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: false,
                    editEventInfo: mockEvent,
                };
            },
            props: {
                eventService: mockSuccessfulEventService,
                
            },
            global: {
                mocks: {
                    $store: mockStore,
                    $route: mockRoute,
                    $router: mockRouter,
                },
            },
        });

        await wrapper.find("#title").setValue("Test Event");
        const radio = wrapper.find("#DOMESTIC_DAY");
        radio.element.selected = true;
        radio.trigger("change");

        const button = await wrapper.find("button");
        expect(button.exists()).toBe(true);

        await wrapper.find("form").trigger("submit.prevent");
        expect(mockRouter.push).toHaveBeenCalledTimes(1);
        expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
    });

    it("for editing event, if user provides input for required fields successful request should be made", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: true,
                    editEventInfo: mockEvent,
                    title: "Updated title",
                    type: "DOMESTIC_DAY",
                    userEmails: ["test@gmail.com"],
                    city: "Limerick",
                    departureCity: "N/A",
                };
            },
            props: {
                eventService: mockSuccessfulEventService,
                
            },
            global: {
                mocks: {
                    $store: mockStore,
                    $route: mockRoute,
                    $router: mockRouter,
                },
            },
        });

        const button = await wrapper.find("button");
        expect(button.exists()).toBe(true);

        await wrapper.find("form").trigger("submit.prevent");
        expect(mockRouter.push).toHaveBeenCalledTimes(1);
        expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(false);
    });

    it("if unsuccessful response, error message rendered to user", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: false,
                    editEventInfo: mockEvent,
                    invalidEventCreation: true,
                };
            },
            props: {
                eventService: mockSuccessfulEventService,
                
            },
            global: {
                mocks: {
                    $store: mockStore,
                    $route: mockRoute,
                    $router: mockRouter,
                },
            },
        });
        expect(wrapper.findComponent(AccountErrorMessage).isVisible()).toBe(true);
    });

    it("if user changes event type to FOREIGN_OVERNIGHT, foreignTrip variable set to true", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: false,
                    editEventInfo: mockEvent,
                };
            },
        });

        const radio = wrapper.find("#FOREIGN_OVERNIGHT");
        radio.element.selected = true;
        await radio.trigger("change");

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.foreignTrip).toBe(true);
    });

    it("if user changes event type to anything other than FOREIGN_OVERNIGHT, foreignTrip variable set to false", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: false,
                    editEventInfo: mockEvent,
                };
            },
        });

        const radio = wrapper.find("#DOMESTIC_OVERNIGHT");
        radio.element.selected = true;
        await radio.trigger("change");

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.foreignTrip).toBe(false);
        expect(wrapper.vm.departureCity).toEqual("N/A");
    });

    it("if edited event is of type FOREIGN_OVERNIGHT, set foreignTrip to true and departure city to value", async () => {
        const wrapper = mount(EventForm, {
            data() {
                return {
                    editEventAction: true,
                    editEventInfo: mockForeignEvent,
                };
            },
        });

        await wrapper.vm.$nextTick()

        expect(wrapper.vm.foreignTrip).toBe(true);
        expect(wrapper.vm.departureCity).toEqual(mockForeignEvent.departureCity);
    });

    it("if user has provided value for email and clicks Add Email button, email added to list", async () => {
        const wrapper = mount(EventForm);

        await wrapper.find("#useremail").setValue("test@gmail.com")

        await wrapper.find("#add-option-button").trigger('click');

        expect(wrapper.vm.userEmails).toHaveLength(1)
    });

    it("if user has not provided value for email and clicks Add Email button, nothing added to list", async () => {
        const wrapper = mount(EventForm);

        await wrapper.find("#add-option-button").trigger('click');

        expect(wrapper.vm.userEmails).toHaveLength(0)
    });

    it("if user has not provided value for email and clicks Add Email button, nothing added to list", async () => {
        const wrapper = mount(EventForm);


        await wrapper.find("#useremail").setValue("test@gmail.com")

        await wrapper.find("#add-option-button").trigger('click');

        expect(wrapper.vm.userEmails).toHaveLength(1)

        await wrapper.vm.removeIndividualUserEmail("test@gmail.com")

        expect(wrapper.vm.userEmails).toHaveLength(0)
    });

});

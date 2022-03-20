export default {
  namespaced: true,
  state() {
    return {
      createdEvents: [],
      individualEvent: {},
      invitedEvents: [],
      noEventsCreatedMessage: "You haven't created any events",
      noEventsInvitedMessage: "You haven't been invited to any events",
      noCreatedEventsCallToAction: "Create Event",
      noCreatedEventsCallToActionLink: "createEvent",
      deleteEventModalHeading: "Event",
      deleteEventTitle: "",
      deleteEventId: "",
    };
  },
  mutations: {
    populateDeleteModal(state, payload) {
      (state.deleteEventTitle = payload.deleteEventTitle),
        (state.deleteEventId = payload.deleteEventId);
    },
    populateUserCreatedEvents(state, payload) {
      state.createdEvents = payload;
    },
    populateUserInvitedEvents(state, payload) {
      state.invitedEvents = payload;
    },
    setIndividualEvent(state, payload) {
      console.log(payload);
      state.individualEvent = payload;
      console.log(state.individualEvent);
    },
  },
  actions: {
    populateDeleteModal(context, payload) {
      context.commit("populateDeleteModal", payload);
    },
    populateUserCreatedEvents(context, payload) {
      context.commit("populateUserCreatedEvents", payload);
    },
    populateUserInvitedEvents(context, payload) {
      context.commit("populateUserInvitedEvents", payload);
    },
    setIndividualEvent(context, payload) {
      context.commit("setIndividualEvent", payload);
    },
  },
  getters: {
    noCreatedEventsMessage(state) {
      return state.noEventsCreatedMessage;
    },
    noInvitedEventsMessage(state) {
      return state.noEventsInvitedMessage;
    },
    noCreatedEventsCallToAction(state) {
      return state.noCreatedEventsCallToAction;
    },
    noCreatedEventsCallToActionLink(state) {
      return state.noCreatedEventsCallToActionLink;
    },
    deleteEventModalHeading(state) {
      return state.deleteEventModalHeading;
    },
    deleteEventTitle(state) {
      return state.deleteEventTitle;
    },
    deleteEventId(state) {
      return state.deleteEventId;
    },
    createdEvents(state) {
      return state.createdEvents;
    },
    invitedEvents(state) {
      return state.invitedEvents;
    },
    individualEvent(state) {
      return state.individualEvent;
    },
  },
};

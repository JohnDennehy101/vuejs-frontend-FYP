export default {
    namespaced: true,
    state() {
        return {
            createdEvents: [],
            invitedEvents: [],
            noEventsCreatedMessage: "You haven't created any events",
            noCreatedEventsCallToAction: "Create Event",
            noCreatedEventsCallToActionLink: "createEvent",
            deleteEventModalHeading: "Event",
            deleteEventTitle: "",
            deleteEventId: "",
        }
    },
    mutations: {
        populateDeleteModal(state, payload) {
           
            state.deleteEventTitle = payload.deleteEventTitle,
            state.deleteEventId = payload.deleteEventId
        },
        populateUserCreatedEvents(state, payload) {
           
            state.createdEvents = payload;
            
        },
        populateUserInvitedEvents(state, payload) {
           
            state.invitedEvents = payload;
            
        }
    },
    actions: {
         populateDeleteModal(context, payload) {
             context.commit('populateDeleteModal', payload);
         },
         populateUserCreatedEvents(context, payload) {
             context.commit('populateUserCreatedEvents', payload);
         },
         populateUserInvitedEvents(context, payload) {
             context.commit('populateUserInvitedEvents', payload);
         }
    },
    getters: {
        noCreatedEventsMessage(state) {
            return state.noEventsCreatedMessage;
        },
        noCreatedEventsCallToAction(state) {
            return state.noCreatedEventsCallToAction;
        },
        noCreatedEventsCallToActionLink(state) {
            return state.noCreatedEventsCallToActionLink
        },
        deleteEventModalHeading(state) {
            return state.deleteEventModalHeading
        },
        deleteEventTitle(state) {
            console.log(state.deleteEventTitle)
            return state.deleteEventTitle
        },
        deleteEventId(state) {
            return state.deleteEventId
        },
        createdEvents(state) {
            return state.createdEvents
        },
        invitedEvents(state) {
            return state.invitedEvents;
        }
    }

}
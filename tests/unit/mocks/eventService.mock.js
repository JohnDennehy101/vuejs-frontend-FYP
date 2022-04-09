const mockSuccessfulEventService = {
  createEvent() {
    return new Promise((resolve) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },

  updateEvent() {
    return new Promise((resolve) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },

  deleteEvent() {
    return new Promise((resolve) => {
      resolve({
        rawAffected: [],
        rowsImpacted: 1,
      });
    });
  },

  createEventPoll() {
    return new Promise((resolve) => {
      resolve({
        data: {
          title: "Test Poll",
          pollOptions: [
            {
              endDate: "2022-03-13T12:12:08.892Z",
              id: "73bd7213-b4d3-4fda-b0f5-83dbc3ec34e1",
              startDate: "2022-03-13T12:12:08.892Z",
              votes: [],
            },
          ],
        },
      });
    });
  },

  editEventPoll() {
    return new Promise((resolve) => {
      resolve({
        title: "Test Poll",
        pollOptions: [
          {
            endDate: "2022-03-13T12:12:08.892Z",
            id: "73bd7213-b4d3-4fda-b0f5-83dbc3ec34e1",
            startDate: "2022-03-13T12:12:08.892Z",
            votes: [],
          },
        ],
      });
    });
  },

  deleteEventPoll() {
    return new Promise((resolve) => {
      resolve({
        rawAffected: [],
        rowsImpacted: 1,
      });
    });
  },

  getindividualPoll() {
    return new Promise((resolve) => {
      resolve({
        data: {
          title: "Test Poll",
          pollOptions: [
            {
              endDate: "2022-03-13T12:12:08.892Z",
              id: "73bd7213-b4d3-4fda-b0f5-83dbc3ec34e1",
              startDate: "2022-03-13T12:12:08.892Z",
              votes: [],
            },
          ],
        },
      });
    });
  },

  createEventItinerary() {
    return new Promise((resolve) => {
      resolve({
        id: "1",
        completed: false,
        created_at: "2022-03-22",
        updated_at: "2022-03-22",
        eventId: "2",
        status: 201
      });
    });
  },

  updateEventItinerary() {
    return new Promise((resolve) => {
      resolve({
        id: "1",
        completed: false,
        created_at: "2022-03-22",
        updated_at: "2022-03-22",
        eventId: "2",
        status: 200
      });
    });
  },
  deleteEventItinerary() {
    return new Promise((resolve) => {
      resolve({
        rowsAffected: 1,
        rawAffected: [],
        status: 200,
      });
    });
  },
};

export default mockSuccessfulEventService;

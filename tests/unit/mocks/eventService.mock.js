const mockSuccessfulEventService = {
  createEvent() {
    return new Promise((resolve, reject) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },

  updateEvent() {
    return new Promise((resolve, reject) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },

  deleteEvent() {
    return new Promise((resolve, reject) => {
      resolve({
        rawAffected: [],
        rowsImpacted: 1,
      });
    });
  },

  createEventPoll() {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
      resolve({
        rawAffected: [],
        rowsImpacted: 1,
      });
    });
  },

  getindividualPoll() {
    return new Promise((resolve, reject) => {
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
};

export default mockSuccessfulEventService;

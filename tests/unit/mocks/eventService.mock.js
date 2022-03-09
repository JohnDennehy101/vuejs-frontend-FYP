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

  deleteEventPoll() {
    return new Promise((resolve, reject) => {
      resolve({
        rawAffected: [],
        rowsImpacted: 1,
      });
    });
  },
};

export default mockSuccessfulEventService;

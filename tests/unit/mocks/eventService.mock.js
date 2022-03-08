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
};

export default mockSuccessfulEventService;

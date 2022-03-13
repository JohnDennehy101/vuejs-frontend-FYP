const mockSuccessfulUserService = {
  loginUser() {
    return new Promise((resolve, reject) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },
  registerUser() {
    return new Promise((resolve, reject) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },
  updateUser() {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          jwtToken: "token",
          id: "1",
        },
      });
    });
  },
};

export default mockSuccessfulUserService;

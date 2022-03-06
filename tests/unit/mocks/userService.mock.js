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
};

export default mockSuccessfulUserService;

const mockSuccessfulUserService = {
  loginUser() {
    return new Promise((resolve) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },
  registerUser() {
    return new Promise((resolve) => {
      resolve({
        jwtToken: "token",
        userId: "userId",
        userEmail: "name@mail.com",
      });
    });
  },
  updateUser() {
    return new Promise((resolve) => {
      resolve({
        data: {
          jwtToken: "token",
          id: "1",
        },
      });
    });
  },
  uploadUserProfileImage() {
    return new Promise((resolve) => {
      resolve({
        data: {
          secure_url: "https://www.cloudinary-new.com",
        },
      });
    });
  }
};

export default mockSuccessfulUserService;

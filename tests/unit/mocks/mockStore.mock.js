const mockStore = {
  state: {
    userId: 1,
    jwtToken: "token"
  },
  getters: {
    userId: () => {
      return 1;
    },
  },
  dispatch: jest.fn(),
};

export default mockStore;

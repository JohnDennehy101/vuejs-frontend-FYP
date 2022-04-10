const mockStore = {
  state: {
    userId: 1,
    jwtToken: "token"
  },
  getters: {
    userId: () => {
      return 1;
    },
    jwt: () => {
      return '1abc'
    },
    isAuthenticated: () => {
      return true;
    }
  },
  dispatch: jest.fn(),
};

export default mockStore;

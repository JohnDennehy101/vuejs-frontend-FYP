import axios from "axios";

class UserService {
  constructor() {
    this.baseUrl = "http://localhost:3000";
    if (localStorage.token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.token;
    }
  }

  async registerUser(email, password) {
    const payload = { email: email, password: password };
    try {
      const response = await axios
        .post(this.baseUrl + "/users", payload, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .catch((error) => {
          return { error };
        });

      if (!("error" in response)) {
        localStorage.setItem("token", response.data.jwtToken);
        localStorage.setItem("id", response.data.userId);
        return response.data.userId;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async loginUser(email, password) {
    const payload = { email: email, password: password };

    const response = await axios
      .post(this.baseUrl + "/users/login", payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .catch((error) => {
        return { error };
      });

    if (!("error" in response)) {
      localStorage.setItem("id", response.data.userId);
      return response.data.userId;
    } else {
      return false;
    }
  }
  logoutUser() {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("eventId");
  }
}

export default UserService;

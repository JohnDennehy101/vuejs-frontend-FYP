import axios from "axios";
//this.baseUrl = http://localhost:3000/api/v1 for local

class UserService {
  constructor() {
    this.baseUrl = process.env.VUE_APP_BACK_END_API_URL;
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
      await localStorage.setItem("token", response.data.jwtToken);
      return response.data;
    } else if (response.error.response.data.statusCode === 403) {
      return "Please confirm account via email received before logging in.";
    } else if (response.error.response.data.statusCode === 400) {
      return "No account found with those credentials.";
    }
  }
  logoutUser() {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("eventId");
  }
  async confirmUserEmail(token) {
    const payload = { token: token };

    const response = await axios
      .post(this.baseUrl + "/users/confirm-email", payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }
  async updateUser(id, payload, token) {
    let headers;
    if (token) {
      headers = {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + token,
      };
    } else {
      headers = { "Access-Control-Allow-Origin": "*" };
    }
    const response = await axios
      .patch(`${this.baseUrl}/users/${id}`, payload, {
        headers: headers,
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }
  async getUser(id, jwt) {
    const response = await axios
      .get(`${this.baseUrl}/users/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + jwt,
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async uploadUserProfileImage(id, image, token) {
    let payload = new FormData();
    payload.append("file", image);
    const response = await axios
      .post(`${this.baseUrl}/users/${id}/image`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }
}

const userService = new UserService();

export default userService;

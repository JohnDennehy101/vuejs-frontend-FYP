import axios from "axios";
//this.baseUrl = http://localhost:3000 for local
//this.baseUrl = https://group-activity-planning-nest.herokuapp.com for live

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
      //await localStorage.setItem("id", response.data.userId);
      await localStorage.setItem("token", response.data.jwtToken);
      console.log(response.data);
      return response.data;
    } else {
      return false;
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
          "Authorization": `Bearer ${token}`
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }
  async updateUser(id, payload) {
    const response = await axios
      .patch(`${this.baseUrl}/users/${id}`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }
  async getUser(id) {
    const response = await axios
      .get(`${this.baseUrl}/users/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async uploadUserProfileImage(id, image) {
    let payload = new FormData();
    payload.append("file", image);
    const response = await axios
      .post(`${this.baseUrl}/users/${id}/image`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type":'multipart/form-data'
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
    
  }

  
}

export default UserService;

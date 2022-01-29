import axios from "axios";
//this.baseUrl = http://localhost:3000 for local

class EventService {
  constructor() {
    this.baseUrl = "https://group-activity-planning-nest.herokuapp.com";
    if (localStorage.token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.token;
    }
  }

  async createEvent(userId, payload) {
    const response = await axios
      .post(`${this.baseUrl}/events/${userId}`, payload)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async updateEvent(eventId, payload) {
    const response = await axios
      .patch(`${this.baseUrl}/events/${eventId}`, payload)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async deleteEvent(eventId) {
    const response = await axios
      .delete(`${this.baseUrl}/events/${eventId}`)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async getUserEvents(userId) {
    const response = await axios
      .get(this.baseUrl + "/events/user/" + userId)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async createEventPoll(id, payload) {
    const response = await axios
      .post(`${this.baseUrl}/events/${id}/poll`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async getEventPolls(eventId, pollId) {
    const response = await axios
      .get(`${this.baseUrl}/events/${eventId}/poll/${pollId}`)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async getIndividualPoll(eventId, pollId) {
    const response = await axios
      .get(`${this.baseUrl}/events/${eventId}/poll/${pollId}`)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async editEventPoll(id, pollInfo, payload) {
    const response = await axios
      .patch(
        `${this.baseUrl}/events/${id}/poll/${JSON.parse(pollInfo).id}`,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async deleteEventPoll(eventId, pollId) {
    const response = await axios
      .delete(`${this.baseUrl}/events/${eventId}/poll/${pollId}`)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async voteEventPoll(userId, eventId, pollId, payload) {
    const response = await axios
      .patch(
        `${this.baseUrl}/events/${userId}/${eventId}/poll/${pollId}/vote`,
        payload
      )
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async createEventItinerary(eventId, payload) {
    const response = await axios
      .post(`${this.baseUrl}/events/${eventId}/itinerary`, payload)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async updateEventItinerary(eventId, payload) {
    const response = await axios
      .patch(`${this.baseUrl}/events/${eventId}/itinerary`, payload)
      .catch((error) => {
        return { error };
      });

    return response;
  }

  async deleteEventItinerary(eventId) {
    const response = await axios
      .delete(`${this.baseUrl}/events/${eventId}/itinerary`)
      .catch((error) => {
        return { error };
      });

    return response;
  }
}

export default EventService;

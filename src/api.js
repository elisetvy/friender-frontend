const BASE_API_URL = "http://localhost:3001";

class FrienderApi{
  static token = null;

  /** Formats requests. */

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_API_URL}/${endpoint}`);
    const headers = {
      "content-type": "application/json",
    };

    url.search = method === "GET" ? new URLSearchParams(data).toString() : "";

    // Set to undefined since the body property cannot exist on a GET method
    const body = method !== "GET" ? JSON.stringify(data) : undefined;

    const resp = await fetch(url, { method, body, headers });

    // Fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  /** Register a new user. */
  static async register(formData){
    const formSubmission = new FormData();

    for (let key in formData){
      if (key !== "photo"){
        formSubmission.append(key, formData[key]);
      } else {
        formSubmission.append("file", formData[key]);
      }
    }

    const response = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      body: formSubmission,
    });

    if (!response.ok) {
      console.error("API Error:", response.statusText, response.status);
      const { error } = await response.json();
      throw Array.isArray(error) ? error : [error];
    }

    const data = await response.json();

    return data.token;
  }

  static async login(formData){
    const response = await this.request('auth/login', formData, "POST" );

    return response.token;
  }

  /** Get all users. */
  static async getUsers() {
    const response = await this.request('users'); // array of objects

    return response;
  }

  /** Get a user. */
  static async getUser(username) {
    const response = await this.request(`users/${username}`); // array of objects

    return response.user;
  }

  /** Send a message. */
  static async sendMessage(formData) {
    const response = await this.request(`messages`, formData, "POST");

    return response.message;
  }

  /** Get messages between users. */
  static async getMessages(u1, u2) {
    const response = await this.request(`messages/${u1}/${u2}`);

    return response.messages;
  }

  /** Get a user's messages. */
  static async getUserMessages(username) {
    const response = await this.request(`messages/${username}`);

    return response.messages;
  }

  /** Update a user. */
  static async updateUser(username, data) {
    const response = await this.request(`users/${username}`, data, "PATCH");

    return response.user;
  }
}

export default FrienderApi;
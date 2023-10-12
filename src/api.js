const BASE_API_URL = "http://localhost:3001";

class FrienderApi{

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

  /** Register a new cat. */
  static async addCat(formData){
    const formSubmission = new FormData();

    formSubmission.append("username", formData.username);
    formSubmission.append("password", formData.password);
    formSubmission.append("firstName", formData.firstName);
    formSubmission.append("lastName", formData.lastName);
    formSubmission.append("email", formData.email);
    formSubmission.append("zipcode", formData.zipcode);
    formSubmission.append("friendRadius", Number(formData.friendRadius));
    formSubmission.append("hobbies", formData.hobbies);
    formSubmission.append("interests", formData.interests);
    formSubmission.append("file", formData.photoProfile);

    const response = await fetch(`${BASE_API_URL}/register`, {
      method: "POST",
      body: formSubmission,
    });

    const data = await response.json();

    return data;
  }

  /** Get all users. */
  static async getCats() {
    const response = await this.request('allcats');

    return response;
  }
}

export default FrienderApi;
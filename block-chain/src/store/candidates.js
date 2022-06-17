import { reactive } from "vue";
import { loadingValue } from ".";
import { user } from "./user";

class Candidates {
  debug = true;
  baseUrl = import.meta.env.VITE_BACKEND_URL + "/candidates";
  state = reactive({
    candidates: [
      //   {
      //     _id: "62acac9c1e13e5d75a25046d",
      //     userId: {
      //       _id: "62acac9c1e13e5d75a25046b",
      //       name: "sagar",
      //     },
      //     partyName: "bjp",
      //     area: "delhi",
      //     image: "dummy",
      //   },
    ],
  });
  constructor() {}
  async getCandidates() {
    try {
      loadingValue.value = "getting candidates";
      const response = await fetch(this.baseUrl + "/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.state.token,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("get candidates error");
        this.log(result.message);
        loadingValue.value = result.message;
      }
      this.state.candidates = result;
      loadingValue.value = null;
    } catch (error) {
      loadingValue.value = error;
    }
  }

  async create(form) {
    try {
      loadingValue.value = "creating candidate";
      const response = await fetch(this.baseUrl + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.state.token,
        },
        body: JSON.stringify({ ...form }),
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("create candidate error");
        this.log(result.message);
        loadingValue.value = result.message;
        return;
      }
      loadingValue.value = "candidate created";
    } catch (error) {
      loadingValue.value = error;
    }
  }
  async delete(candidateId) {
    try {
      loadingValue.value = "deleting candidate";
      const response = await fetch(this.baseUrl + "/" + candidateId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.state.token,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("delete candidate error");
        this.log(result.message);
        loadingValue.value = result.message;
        return;
      }
      loadingValue.value = "candidate deleted";
      this.getCandidates();
    } catch (error) {
      loadingValue.value = error;
    }
  }

  log(...data) {
    if (this.debug) {
      console.log("debug log from candidates store");
      console.log(...data);
    }
  }
}

const candidates = new Candidates();

export { candidates };

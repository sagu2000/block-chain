import { reactive } from "vue";
import { loadingValue } from ".";
import { user } from "./user";

class Votes {
  debug = true;
  baseUrl = import.meta.env.VITE_BACKEND_URL + "/votes";

  state = reactive({
    counts: {},
  });
  constructor() {}
  create() {}
  async getCounts() {
    try {
      if (user.state.role != "Admin") return;
      loadingValue.value = "getting votes";
      const response = await fetch(this.baseUrl + "/counts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.state.token,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("get vote count error");
        this.log(result.message);
        loadingValue.value = result.message;
      }

      result.forEach((element) => {
        this.state.counts[element._id] = element.count;
      });

      loadingValue.value = null;
    } catch (error) {
      loadingValue.value = error;
    }
  }

  async create(candidateId) {
    try {
      loadingValue.value = "creating vote";
      const response = await fetch(this.baseUrl + "/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.state.token,
        },
        body: JSON.stringify({ candidateId }),
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("create vote error");
        this.log(result.message);
        loadingValue.value = result.message;
        return;
      }
      loadingValue.value = "voted";
    } catch (error) {
      loadingValue.value = error;
    }
  }

  log(...data) {
    if (this.debug) {
      console.log("debug log from votes store");
      console.log(...data);
    }
  }
}

const votes = new Votes();
export { votes };

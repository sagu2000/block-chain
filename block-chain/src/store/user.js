import { reactive } from "vue";
import { loadingValue } from "./index";
class User {
  debug = true;
  baseUrl = import.meta.env.VITE_BACKEND_URL + "/users";

  state = reactive({
    mobileNumber: "",
    name: "",
    role: "",
    token: "",
    _id: "",
    age: "",
    aadharNumber: "",
    dob: "",
  });
  constructor() {
    const token = localStorage.getItem("user_token");
    this.log("token", token);
    if (token && token != "undefined") {
      this.state.token = token;
      this.getUser();
    }
  }
  setUser(user) {
    this.state.mobileNumber = user.mobileNumber;
    this.state.name = user.name;
    this.state.token = user.token;
    this.state._id = user._id;
    this.state.role = user.role;
    this.state.age = user.age;
    this.state.dob = new Date(user.dob).toLocaleDateString();
    this.state.aadharNumber = user.aadharNumber;
    localStorage.setItem("user_token", user.token);
    this.log("set user done with value", user);
  }

  signOut() {
    this.state.mobileNumber = "";
    this.state.name = "";
    this.state.token = "";
    this.state._id = "";
    this.state.role = "";
    this.state.age = "";
    this.state.dob = "";
    this.state.aadharNumber = "";
    localStorage.removeItem("user_token");
    this.log("user cleared");
  }

  async signIn(form) {
    try {
      loadingValue.value = "signin";
      const response = await fetch(this.baseUrl + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form }),
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("signin error");
        this.log(result.message);
        loadingValue.value = result.message;
        return;
      }
      this.setUser(result);
      loadingValue.value = null;
    } catch (error) {
      loadingValue.value = error;
    }
  }
  async signUp(form) {
    try {
      loadingValue.value = "signup";
      const response = await fetch(this.baseUrl + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form }),
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("signup error");
        this.log(result.message);
        loadingValue.value = result.message;
        return;
      }
      this.setUser(result);
      loadingValue.value = null;
    } catch (error) {
      loadingValue.value = error;
    }
  }
  async update(form) {
    try {
      loadingValue.value = "update user";
      const response = await fetch(this.baseUrl + "/update", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + this.state.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form }),
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("user update error");
        this.log(result.message);
        loadingValue.value = result.message;
        return;
      }
      this.setUser(result);
    } catch (error) {
      loadingValue.value = error;
    }
  }
  async getUser() {
    try {
      loadingValue.value = "getting user";
      const response = await fetch(this.baseUrl + "/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        this.log("user update error");
        this.log(result.message);
        loadingValue.value = result.message;
      }
      this.setUser(result);
      loadingValue.value = null;
    } catch (error) {
      loadingValue.value = error;
    }
  }

  log(...data) {
    if (this.debug) {
      console.log("debug log from user store");
      console.log(...data);
    }
  }
}
const user = new User();
export { user };

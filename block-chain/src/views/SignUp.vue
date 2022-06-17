<template>
  <v-modal class="z-30" @click.self="$router.replace('/')">
    <form
      @submit.prevent="signup()"
      class="w-xs shadow space-y-2 bg-indigo-300 rounded overflow-y-auto max-h-sm"
    >
      <div class="px-2 text-2xl">
        <fa-icon @click="$router.replace('/')" icon="arrow-left" class="icon" />
      </div>
      <!-- name  -->
      <div class="flex flex-col mx-3">
        <label for="name" class="text-lg">Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          placeholder="user name"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- mobileNumber  -->
      <div class="flex flex-col mx-3">
        <label for="mobileNumber" class="text-lg">mobileNumber</label>
        <input
          v-model="form.mobileNumber"
          id="mobileNumber"
          placeholder="enter mobileNumber"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- password  -->
      <div class="flex flex-col mx-3">
        <label for="pass" class="text-lg">password</label>
        <input
          v-model="form.password"
          type="text"
          id="pass"
          placeholder="password"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- Age  -->
      <div class="flex flex-col mx-3">
        <label for="age" class="text-lg">Age</label>
        <input
          v-model="form.age"
          type="text"
          id="age"
          placeholder="age"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- Aadhar Number  -->
      <div class="flex flex-col mx-3">
        <label for="aadhar" class="text-lg">Aadhar Number</label>
        <input
          v-model="form.aadharNumber"
          type="text"
          id="aadhar"
          placeholder="Aadhar Number"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- Date Of Birth  -->
      <div class="flex flex-col mx-3">
        <label for="dob" class="text-lg">Date Of Birth</label>
        <input
          v-model="form.dob"
          type="date"
          id="dob"
          placeholder="Date Of Birth"
          class="border rounded p-3 text-gray-700"
        />
      </div>
      <!-- submit  -->
      <div class="text-center p-4">
        <button type="submit" class="btn btn-pink">Register</button>
      </div>
      <!-- handle error  -->
      <div class="text-center">
        <p class="text-red-500 text-sm">{{ postError }}</p>
      </div>
      <!-- go to signin  -->
      <div class="text-center p-4">
        <router-link
          :to="{ name: 'SignIn', params: { nextUrl: $route.params.nextUrl } }"
          replace
          class="text-blue-500"
          >go to signin</router-link
        >
      </div>
    </form>
  </v-modal>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { user } from "../store/user.js";

const router = useRouter();

const form = reactive({
  name: "",
  mobileNumber: "",
  password: "",
  age: "",
  dob: "",
  aadharNumber: "",
});
const postError = ref(null);

const goBack = () => {
  // if (route.params.nextUrl != null) {
  //   router.replace(route.params.nextUrl);
  // } else {
  //   router.replace("/");
  // }
  router.replace("/");
};

async function signup() {
  try {
    await user.signUp({ ...form });
    if (user.state.role == "Admin") return router.replace("/admin");
    if (user.state.role == "User") return router.replace("/user");
    router.replace("/");
  } catch (error) {
    postError.value = error;
  }
}
</script>

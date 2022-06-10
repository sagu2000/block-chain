<template>
  <div v-if="user.state.token" class="flex justify-center items-center">
    <div class="bg-gray-400 p-4 space-y-2">
      <div class="text-center m-2 text-blue-600 bg-pink-400">User Details</div>
      <div>Name: {{ user.state.name }}</div>
      <div>Age: {{ user.state.age }}</div>
      <div>MobileNumber: {{ user.state.mobileNumber }}</div>
      <div>AadharNumber: {{ user.state.aadharNumber }}</div>
      <div>DOB: {{ user.state.dob }}</div>
      <div class="text-center p-4">
        <button @click="logout" class="btn btn-red">logout</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { user } from "../store/user";
const router = useRouter();

async function logout() {
  await user.signOut();
  router.replace("/");
}
</script>

<template>
  <div v-if="user.state.token" class="flex justify-center items-center">
    <div class="bg-blue-200 p-4 font-bold space-y-2 rounded">
      <div class="text-center p-4 m-2 text-blue-800 bg-white rounded-full">
        User Details
      </div>
      <div class="font-semibold font-mono italic">
        Name : {{ user.state.name }}
      </div>
      <div class="font-semibold font-mono italic">
        Age : {{ user.state.age }}
      </div>
      <div class="font-semibold font-mono italic">
        Number : {{ user.state.mobileNumber }}
      </div>
      <div class="font-semibold font-mono italic">
        Aadhar Number: {{ user.state.aadharNumber }}
      </div>
      <div class="font-semibold font-mono italic">
        DOB : {{ user.state.dob }}
      </div>
      <div class="flex justify-around items-center">
        <div class="text-center">
          <button @click="$router.push('/vote')" class="btn btn-pink">
            vote
          </button>
        </div>
        <div class="text-center p-4">
          <button @click="logout" class="btn btn-red">logout</button>
        </div>
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

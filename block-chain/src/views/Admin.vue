<template>
  <div class="fixed right-10 bottom-10">
    <fa-icon
      icon="plus"
      class="btn btn-green"
      @click="isAddCandidate = !isAddCandidate"
    />
  </div>
  <div v-if="isAddCandidate">
    <v-modal class="z-30" @click.self="isAddCandidate = false">
      <form
        @submit.prevent="createCandidate()"
        class="w-xs shadow space-y-2 bg-indigo-300 rounded overflow-y-auto max-h-sm"
      >
        <!-- name  -->
        <div class="flex flex-col mx-3">
          <label for="name" class="text-lg">Name</label>
          <input
            v-model="form.user.name"
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
            v-model="form.user.mobileNumber"
            id="mobileNumber"
            placeholder="enter mobileNumber"
            class="border rounded p-3 text-gray-700"
          />
        </div>
        <!-- password  -->
        <div class="flex flex-col mx-3">
          <label for="pass" class="text-lg">password</label>
          <input
            v-model="form.user.password"
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
            v-model="form.user.age"
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
            v-model="form.user.aadharNumber"
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
            v-model="form.user.dob"
            type="date"
            id="dob"
            placeholder="Date Of Birth"
            class="border rounded p-3 text-gray-700"
          />
        </div>
        <!-- Party Name-->
        <div class="flex flex-col mx-3">
          <label for="partyName" class="text-lg">Party Name</label>
          <input
            v-model="form.partyName"
            type="text"
            id="partyName"
            placeholder="Party Name"
            class="border rounded p-3 text-gray-700"
          />
        </div>
        <!-- Area  -->
        <div class="flex flex-col mx-3">
          <label for="area" class="text-lg">Area</label>
          <input
            v-model="form.area"
            type="text"
            id="area"
            placeholder="Area"
            class="border rounded p-3 text-gray-700"
          />
        </div>
        <!-- Image  -->
        <div class="flex flex-col mx-3">
          <label for="img" class="text-lg">Symbol</label>
          <input
            v-model="form.image"
            type="text"
            id="img"
            placeholder="Symbol"
            class="border rounded p-3 text-gray-700"
          />
        </div>
        <!-- submit  -->
        <div class="text-center p-4">
          <button type="submit" class="btn btn-pink">create</button>
        </div>
        <!-- handle error  -->
        <div class="text-center">
          <p class="text-red-500 text-sm">{{ postError }}</p>
        </div>
      </form>
    </v-modal>
  </div>

  <div class="max-w-md mx-auto">
    <div
      class="text-center text-white text-2xl font-semibold bg-indigo-600 p-2"
    >
      Candidates
    </div>
    <div
      v-for="c in candidates.state.candidates"
      :key="c._id"
      class="flex justify-between items-center p-4"
    >
      <candidate-vue
        :candidate="c"
        :voteCount="votes.state.counts[c._id]"
      ></candidate-vue>

      <button @click="candidates.delete(c._id)" class="btn btn-red">
        delete
      </button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import CandidateVue from "../components/Candidate.vue";
import { candidates } from "../store/candidates";
import { votes } from "../store/votes";

const isAddCandidate = ref(false);

const form = reactive({
  user: {
    name: "",
    mobileNumber: "",
    password: "",
    age: "",
    dob: "",
    aadharNumber: "",
  },
  partyName: "",
  area: "",
  image: "",
});
const postError = ref(null);

async function createCandidate() {
  try {
    await candidates.create({ ...form });
    await candidates.getCandidates();
    isAddCandidate.value = false;
  } catch (error) {
    postError.value = error;
  }
}

onMounted(() => {
  votes.getCounts();
  candidates.getCandidates();
});
</script>

<template>
  <div class="max-w-md mx-auto">
    <div
      class="text-center text-white text-2xl font-semibold bg-indigo-400 p-2"
    >
      Candidates
    </div>
    <div
      v-for="c in candidates.state.candidates"
      :key="c._id"
      class="p-4 flex justify-between items-center"
    >
      <candidate-vue :candidate="c"></candidate-vue>
      <div>
        <button @click="votes.create(c._id)" class="btn btn-green">vote</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import CandidateVue from "../components/Candidate.vue";
import { candidates } from "../store/candidates";
import { votes } from "../store/votes";

onMounted(() => {
  candidates.getCandidates();
});
</script>

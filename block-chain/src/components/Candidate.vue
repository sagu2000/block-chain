<template>
  <div class="flex justify-between items-center space-x-3">
    <div class="bg-black w-30 h-30">
      <img :src="candidate.image" alt="symbol" class="w-full h-full" />
    </div>
    <div class="text-xl">
      <div>
        <span class="font-bold">name: </span> {{ candidate.userId.name }}
      </div>
      <div>
        <span class="font-bold">party: </span> {{ candidate.partyName }}
      </div>
      <div><span class="font-bold">Area : </span> {{ candidate.area }}</div>
      <div v-if="voteCount">
        <span class="font-bold">Votes: </span> {{ voteCount }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRefs } from "vue";

const props = defineProps({
  candidate: {
    _id: String,
    userId: {
      _id: String,
      name: String,
    },
    partyName: String,
    area: String,
    image: String,
  },
  voteCount: Number,
});
const { candidate, voteCount } = toRefs(props);
</script>

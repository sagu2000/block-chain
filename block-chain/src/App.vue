<template>
  <v-modal v-if="loadingValue" class="z-50">
    <div class="bg-white">
      <div @click="loadingValue = false" class="flex justify-end">
        <fa-icon icon="times" class="bg-red-500 text-white p-2" />
      </div>
      <div class="text-xl font-semibold p-10 pt-0">
        {{ loadingValue }}
      </div>
    </div>
  </v-modal>
  <RouterView></RouterView>
</template>

<script setup>
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import { loadingValue } from "./store";
provide("loadingValue", loadingValue); //optional
</script>

<style></style>

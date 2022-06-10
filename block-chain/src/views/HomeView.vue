<script setup>
import { RouterLink } from "vue-router";
import { user } from "../store/user";
</script>

<template>
  <div class="relative container mx-auto m-4 bg-blue-900">
    <img
      class="w-full opacity-50"
      src="https://images.edexlive.com/uploads/user/imagelibrary/2019/5/22/w600X390/msrit-campus.jpg"
      alt=""
    />
    <div class="absolute top-0 flex justify-center items-center w-full h-full">
      <div class="space-y-25">
        <div class="text-center text-white font-bold">
          <p class="text-2xl text-white font-extrabold">
            E-Voting With Block-Chain
          </p>
          <p>Project On " Block-Chain Based E-Voting System ".</p>
          <p>Guided by DR. Rajendra Prasad P</p>
          <p>This is Created by MSRIT Students</p>
        </div>

        <div class="flex justify-center space-x-2">
          <div class="text-center">
            <RouterLink to="/about" class="btn btn-blue">about</RouterLink>
          </div>
          <div v-if="user.state.token" class="text-center">
            <RouterLink to="/vote" class="btn btn-green">vote</RouterLink>
          </div>
          <div v-else class="text-center">
            <RouterLink to="/signin" class="btn btn-green">signin</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

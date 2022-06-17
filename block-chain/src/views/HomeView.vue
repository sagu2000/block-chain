<script setup>
import { RouterLink } from "vue-router";
import { user } from "../store/user";
</script>

<template>
  <div class="fixed md:inset-x-15 inset-x-2 inset-y-5 bg-blue-900">
    <img
      class="w-full h-full opacity-50"
      src="https://images.edexlive.com/uploads/user/imagelibrary/2019/5/22/w600X390/msrit-campus.jpg"
      alt=""
    />

    <div class="absolute top-0 flex justify-center items-center w-full h-full">
      <div class="flex flex-col justify-around h-full">
        <div class="text-center text-white font-bold space-y-4 p-4">
          <p class="text-white font-extrabold">E-Voting With Block-Chain</p>
          <p>Project On " Block-Chain Based E-Voting System ".</p>
          <p>Guided by DR. Rajendra Prasad P</p>
          <p>This is Created by MSRIT Students</p>
        </div>
        <div class="flex justify-center space-x-2">
          <div class="text-center">
            <RouterLink to="/about" class="btn btn-blue">about</RouterLink>
          </div>
          <div class="text-center">
            <RouterLink to="/user" class="btn btn-green">user</RouterLink>
          </div>
          <div v-if="user.state.role == 'Admin'" class="text-center">
            <RouterLink to="/admin" class="btn btn-pink">Admin</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

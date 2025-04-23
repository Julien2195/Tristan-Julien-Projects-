<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-black">
    <header class="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm fixed top-0 w-full z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-game-purple to-game-pink flex items-center justify-center">
              <span class="font-bold text-white text-xl">G</span>
            </div>
            <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-game-purple to-game-pink">GameMate</h1>
          </NuxtLink>
        </div>
        <nav class="hidden md:flex gap-6">
          <NuxtLink to="/" class="text-gray-300 hover:text-white transition" :class="{ 'text-white': route.path === '/' }">Accueil</NuxtLink>
          <NuxtLink to="/profil" class="text-gray-300 hover:text-white transition" :class="{ 'text-white': route.path === '/profil' }">Profil</NuxtLink>
          <NuxtLink to="/decouverte" class="text-gray-300 hover:text-white transition" :class="{ 'text-white': route.path === '/decouverte' }">Découvrir</NuxtLink>
          <div class="relative">
            <NuxtLink to="/matches" class="text-gray-300 hover:text-white transition" :class="{ 'text-white': route.path === '/matches' }">Matches</NuxtLink>
            <div v-if="matchCount > 0" class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-game-purple text-white text-xs flex items-center justify-center">
              {{ matchCount }}
            </div>
          </div>
          <div class="relative">
            <NuxtLink to="/messages" class="text-gray-300 hover:text-white transition" :class="{ 'text-white': route.path.startsWith('/messages') }">Messages</NuxtLink>
            <div v-if="notificationCount > 0" class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {{ notificationCount }}
            </div>
          </div>
        </nav>
        <div class="flex items-center gap-3">
          <div class="relative">
            <button class="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>
            <div v-if="notificationCount > 0" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500"></div>
          </div>
          <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span class="text-sm">JP</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation (bottom bar) -->
    <div class="md:hidden fixed bottom-0 inset-x-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 z-50">
      <div class="flex justify-around">
        <NuxtLink to="/" class="p-3 text-center flex flex-col items-center gap-1" :class="route.path === '/' ? 'text-game-purple' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span class="text-xs">Accueil</span>
        </NuxtLink>
        
        <NuxtLink to="/decouverte" class="p-3 text-center flex flex-col items-center gap-1" :class="route.path === '/decouverte' ? 'text-game-purple' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span class="text-xs">Découvrir</span>
        </NuxtLink>
        
        <div class="relative">
          <NuxtLink to="/matches" class="p-3 text-center flex flex-col items-center gap-1" :class="route.path === '/matches' ? 'text-game-purple' : 'text-gray-400'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span class="text-xs">Matches</span>
          </NuxtLink>
          <div v-if="matchCount > 0" class="absolute top-2 right-2 w-5 h-5 rounded-full bg-game-purple text-white text-xs flex items-center justify-center">
            {{ matchCount }}
          </div>
        </div>
        
        <div class="relative">
          <NuxtLink to="/messages" class="p-3 text-center flex flex-col items-center gap-1" :class="route.path.startsWith('/messages') ? 'text-game-purple' : 'text-gray-400'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <span class="text-xs">Messages</span>
          </NuxtLink>
          <div v-if="notificationCount > 0" class="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {{ notificationCount }}
          </div>
        </div>
        
        <NuxtLink to="/profil" class="p-3 text-center flex flex-col items-center gap-1" :class="route.path === '/profil' ? 'text-game-purple' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span class="text-xs">Profil</span>
        </NuxtLink>
      </div>
    </div>

    <main class="container mx-auto px-4 pt-20 pb-24 md:pb-10">
      <slot />
    </main>

    <footer class="bg-gray-900/80 border-t border-gray-800 py-6 hidden md:block">
      <div class="container mx-auto px-4 text-center text-gray-400 text-sm">
        &copy; {{ new Date().getFullYear() }} GameMate - Pour les gamers qui cherchent leur Player 2
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUsersStore } from '~/store/users';

const route = useRoute();
const usersStore = useUsersStore();

const matchCount = computed(() => {
  return usersStore.currentUser.matches.length;
});

const notificationCount = computed(() => {
  return usersStore.notificationCount;
});
</script>

<style scoped>
/* Styles spécifiques au layout */
</style> 

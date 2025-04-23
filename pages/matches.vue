<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Mes matches</h1>
      <p class="text-gray-400">Voici les personnes avec qui vous avez matché</p>
    </div>

    <div v-if="matchedUsers.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div 
        v-for="user in matchedUsers" 
        :key="user.id" 
        class="card p-0 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
        @click="navigateToMessages(user.id)"
      >
        <div class="h-48 bg-gray-700 relative overflow-hidden">
          <img 
            v-if="user.photos && user.photos.length > 0" 
            :src="user.photos[0]" 
            :alt="`Photo de ${user.name}`" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div 
            v-else 
            class="w-full h-full flex items-center justify-center"
          >
            <span class="text-gray-500">Aucune photo</span>
          </div>
          
          <div class="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <h3 class="text-lg font-bold text-white">{{ user.name }}, {{ user.age }}</h3>
            <div class="flex items-center gap-1 text-sm text-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span>{{ user.location }}</span>
            </div>
          </div>
          
          <div class="absolute top-2 right-2">
            <div 
              v-if="hasUnreadMessages(user.id)" 
              class="w-3 h-3 rounded-full bg-red-500 animate-pulse"
            ></div>
          </div>
        </div>
        
        <div class="p-4">
          <div class="mb-3">
            <h4 class="text-sm font-medium text-gray-400 mb-1">Jeux en commun</h4>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="game in user.games.slice(0, 2)" 
                :key="game.id" 
                class="flex items-center gap-1 bg-gray-700 rounded-md p-1 pr-2 text-xs"
              >
                <img :src="game.imageUrl" :alt="game.name" class="w-5 h-5 rounded object-cover" />
                <span>{{ game.name }}</span>
              </div>
              <div v-if="user.games.length > 2" class="text-xs text-gray-400 flex items-center">
                +{{ user.games.length - 2 }} autres
              </div>
            </div>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="text-xs text-gray-400">
              Disponible {{ user.availableDays.length }} jours/semaine
            </div>
            <NuxtLink 
              :to="`/messages/${user.id}`" 
              class="flex items-center gap-1 text-game-purple hover:text-game-purple-dark transition-colors"
            >
              <span class="text-sm">Message</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="card max-w-lg mx-auto p-8 text-center">
      <div class="w-16 h-16 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Aucun match pour le moment</h3>
      <p class="text-gray-400 mb-6">Vous n'avez pas encore de matches. Commencez à explorer des profils pour trouver d'autres gamers !</p>
      <NuxtLink to="/decouverte" class="btn btn-primary">Explorer des profils</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUsersStore } from '~/store/users';
import { useRouter } from 'vue-router';

const usersStore = useUsersStore();
const router = useRouter();

const matchedUsers = computed(() => {
  return usersStore.matchedUsers;
});

const hasUnreadMessages = (userId) => {
  const messages = usersStore.getConversation(userId);
  return messages.some(message => message.senderId === userId && !message.read);
};

const navigateToMessages = (userId) => {
  router.push(`/messages/${userId}`);
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style> 

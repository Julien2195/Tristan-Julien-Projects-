<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Découvrir</h1>
      <p class="text-gray-400">Trouvez d'autres gamers qui partagent vos passions</p>
    </div>

    <div v-if="currentUser" class="max-w-2xl mx-auto">
      <div class="card p-0 overflow-hidden">
        <!-- Photos Carousel -->
        <div class="relative">
          <div class="h-96 bg-gray-700 overflow-hidden">
            <img 
              v-if="currentPhotoIndex < currentUser.photos.length" 
              :src="currentUser.photos[currentPhotoIndex]" 
              :alt="`Photo de ${currentUser.name}`" 
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
              <span class="text-gray-400">Aucune photo</span>
            </div>
          </div>
          
          <!-- Photo Controls -->
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
            <button 
              v-if="currentUser.photos.length > 1 && currentPhotoIndex > 0" 
              @click="prevPhoto" 
              class="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              v-if="currentUser.photos.length > 1 && currentPhotoIndex < currentUser.photos.length - 1" 
              @click="nextPhoto" 
              class="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
          
          <div class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div class="flex items-end justify-between">
              <div>
                <h3 class="text-2xl font-bold text-white">{{ currentUser.name }}, {{ currentUser.age }}</h3>
                <div class="flex items-center gap-2 mt-1 text-white/80">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>{{ currentUser.location }} ({{ currentUser.distance }} km)</span>
                </div>
              </div>
              
              <div class="flex gap-3">
                <button 
                  @click="dislikeCurrentUser" 
                  class="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                <button 
                  @click="likeCurrentUser" 
                  class="p-3 rounded-full bg-game-purple text-white hover:bg-game-purple-dark transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Profile Info -->
        <div class="p-6">
          <h4 class="text-lg font-semibold mb-3">À propos</h4>
          <p class="text-gray-300 mb-6">{{ currentUser.bio }}</p>
          
          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3">Jeux préférés</h4>
            <div class="flex flex-wrap gap-3">
              <div 
                v-for="game in currentUser.games" 
                :key="game.id" 
                class="flex items-center gap-2 bg-gray-700 rounded-lg p-2 pr-3"
              >
                <img :src="game.imageUrl" :alt="game.name" class="w-8 h-8 rounded object-cover" />
                <span class="text-sm">{{ game.name }}</span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h4 class="text-sm font-medium text-gray-400 mb-2">Style de jeu</h4>
              <div class="bg-gray-700 rounded-lg p-2 text-center">
                {{ getPlayStyleLabel(currentUser.playStyle) }}
              </div>
            </div>
            <div>
              <h4 class="text-sm font-medium text-gray-400 mb-2">Micro</h4>
              <div class="bg-gray-700 rounded-lg p-2 text-center">
                {{ currentUser.useMicrophone ? 'Oui' : 'Non' }}
              </div>
            </div>
          </div>
          
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-400 mb-2">Disponibilités</h4>
            <div class="flex gap-2 flex-wrap">
              <div 
                v-for="day in ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']" 
                :key="day"
                :class="[
                  'rounded-lg p-2 text-center text-sm w-12', 
                  currentUser.availableDays.includes(day) ? 'bg-game-purple/20 text-game-purple border border-game-purple/30' : 'bg-gray-800 text-gray-500'
                ]"
              >
                {{ day }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="isMatchModalVisible" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div class="card max-w-md w-full py-10 px-6 text-center animate-bounce-in">
          <div class="mb-6">
            <div class="w-28 h-28 rounded-full bg-gradient-to-r from-game-purple to-game-pink mx-auto flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold mb-2">C'est un match !</h2>
          <p class="text-gray-400 mb-6">Vous et {{ matchedUser?.name }} vous êtes mutuellement appréciés</p>
          
          <div class="flex gap-3 justify-center">
            <button @click="closeMatchModal" class="btn btn-secondary">Continuer</button>
            <NuxtLink :to="`/messages/${matchedUser?.id}`" class="btn btn-primary">
              Envoyer un message
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="card max-w-2xl mx-auto p-8 text-center">
      <div class="w-16 h-16 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Plus personne à proximité</h3>
      <p class="text-gray-400 mb-6">Nous n'avons plus de profils à vous montrer pour le moment. Revenez plus tard !</p>
      <NuxtLink to="/" class="btn btn-primary">Retour à l'accueil</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUsersStore } from '~/store/users';

const usersStore = useUsersStore();
const currentPhotoIndex = ref(0);
const isMatchModalVisible = ref(false);
const matchedUser = ref(null);

const currentUser = computed(() => {
  return usersStore.currentDiscoveryUser;
});

watch(currentUser, () => {
  // Réinitialiser l'index des photos à chaque changement d'utilisateur
  currentPhotoIndex.value = 0;
});

const nextPhoto = () => {
  if (currentPhotoIndex.value < currentUser.value.photos.length - 1) {
    currentPhotoIndex.value++;
  }
};

const prevPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--;
  }
};

const likeCurrentUser = () => {
  if (currentUser.value) {
    const userId = currentUser.value.id;
    const matchesBefore = [...usersStore.currentUser.matches];
    
    usersStore.likeUser(userId);
    
    // Vérifier si un nouveau match a été créé
    if (usersStore.currentUser.matches.length > matchesBefore.length) {
      matchedUser.value = usersStore.users.find(u => u.id === userId);
      isMatchModalVisible.value = true;
    }
  }
};

const dislikeCurrentUser = () => {
  if (currentUser.value) {
    usersStore.dislikeUser(currentUser.value.id);
  }
};

const closeMatchModal = () => {
  isMatchModalVisible.value = false;
};

const getPlayStyleLabel = (style) => {
  const styles = {
    'casual': 'Casual',
    'competitive': 'Compétitif',
    'story': 'Histoire',
    'social': 'Social',
    'collector': 'Collectionneur'
  };
  return styles[style] || style;
};
</script>

<style scoped>
.animate-bounce-in {
  animation: bounceIn 0.5s;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style> 

<template>
  <div class="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center">
    <div class="mb-8">
      <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-game-purple to-game-pink flex items-center justify-center mx-auto mb-6">
        <span class="font-bold text-white text-5xl">G</span>
      </div>
      <h1 class="text-4xl md:text-6xl font-bold mb-4">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-game-purple to-game-pink">Game</span>Mate
      </h1>
      <p class="text-xl text-gray-300 max-w-2xl mx-auto">Trouvez d'autres joueurs qui partagent votre passion pour les jeux vidéo</p>
    </div>
    
    <div class="grid gap-4 md:grid-cols-3 max-w-3xl w-full mb-12">
      <div class="card flex flex-col items-center p-6 text-center">
        <div class="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-purple-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Matchmaking intelligent</h3>
        <p class="text-gray-400 text-sm mb-4">Trouvez des joueurs compatibles avec vos jeux et horaires préférés</p>
        <NuxtLink to="/decouverte" class="btn btn-primary mt-auto">Découvrir</NuxtLink>
      </div>
      
      <div class="card flex flex-col items-center p-6 text-center">
        <div class="w-12 h-12 rounded-lg bg-pink-600/20 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-pink-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Messagerie intégrée</h3>
        <p class="text-gray-400 text-sm mb-4">Discutez et organisez vos sessions de jeu directement dans l'application</p>
        <NuxtLink to="/messages" class="btn btn-primary mt-auto">Messages</NuxtLink>
      </div>
      
      <div class="card flex flex-col items-center p-6 text-center">
        <div class="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 4.384-.308 1.53 1.53 0 0 0 1.3-1.298c.09-.802.151-1.61.19-2.422 0-.187.13-.312.318-.312.327 0 .606.215.682.531.136.565.252 1.135.345 1.709a.42.42 0 0 1-.432.556 32.834 32.834 0 0 1-3.466.211 2.472 2.472 0 0 0-2.312 1.908c-.126.563-.26 1.121-.4 1.674-1.477.183-2.979.26-4.498.22-1.518-.04-3-.177-4.452-.413-.155-.987-.221-1.827-.221-2.221 0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959 0 .393-.065 1.234-.22 2.221-1.452.236-2.933.374-4.452.413-1.52.04-3.021-.037-4.498-.22-.14-.553-.274-1.111-.4-1.674a2.472 2.472 0 0 0-2.312-1.908 32.834 32.834 0 0 1-3.466-.21.42.42 0 0 1-.433-.557c.094-.574.21-1.144.345-1.709.076-.316.355-.531.683-.531.187 0 .318.125.318.312.038.812.099 1.62.189 2.422a1.53 1.53 0 0 0 1.3 1.298c1.45.195 2.918.294 4.385.308.33.019.608-.247.608-.58v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .356.269.642.612.661 1.52.045 3.025.12 4.483.304a.64.64 0 0 0 .686-.569 48.227 48.227 0 0 0 .376-5.121.657.657 0 0 1 .66-.668v0c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.035 0 1.875-1.007 1.875-2.25s-.84-2.25-1.875-2.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401v0a.64.64 0 0 1-.657-.643c.021-1.657.128-3.294.314-4.907-1.38.153-2.779.243-4.163.3-.361.024-.657-.267-.657-.643Z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold mb-2">Profil de gamer</h3>
        <p class="text-gray-400 text-sm mb-4">Mettez en avant vos jeux préférés et votre style de jeu pour attirer les bons partenaires</p>
        <NuxtLink to="/profil" class="btn btn-primary mt-auto">Mon profil</NuxtLink>
      </div>
    </div>
    
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Commencez maintenant</h2>
      <p class="text-gray-400 mb-6">Rejoignez notre communauté et trouvez d'autres gamers comme vous</p>
      
      <div class="flex flex-wrap gap-4 justify-center">
        <NuxtLink to="/profil" class="btn btn-primary px-8 py-3 text-lg">Créer mon profil</NuxtLink>
        <NuxtLink to="/decouverte" class="btn btn-secondary px-8 py-3 text-lg">Explorer</NuxtLink>
      </div>
    </div>

    <div v-if="hasMatches" class="w-full max-w-3xl mt-8">
      <div class="card p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-full bg-game-purple/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-game-purple">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <div class="text-left">
            <h3 class="font-medium">Vous avez {{ matchCount }} nouveaux matches</h3>
            <p class="text-sm text-gray-400">Consultez vos nouveaux matches et commencez à discuter</p>
          </div>
        </div>
        <NuxtLink to="/matches" class="btn btn-primary">Voir les matches</NuxtLink>
      </div>
    </div>
    
    <div v-if="hasNotifications" class="w-full max-w-3xl mt-4">
      <div class="card p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-full bg-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <div class="text-left">
            <h3 class="font-medium">{{ notificationCount }} nouveaux messages</h3>
            <p class="text-sm text-gray-400">Vous avez des messages non lus</p>
          </div>
        </div>
        <NuxtLink to="/messages" class="btn btn-primary">Voir les messages</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUsersStore } from '~/store/users';

const usersStore = useUsersStore();

const matchCount = computed(() => {
  return usersStore.currentUser.matches.length;
});

const notificationCount = computed(() => {
  return usersStore.notificationCount;
});

const hasMatches = computed(() => {
  return matchCount.value > 0;
});

const hasNotifications = computed(() => {
  return notificationCount.value > 0;
});
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style> 

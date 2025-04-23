<template>
  <div>
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <NuxtLink 
          to="/messages" 
          class="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </NuxtLink>
        
        <div v-if="user" class="flex items-center gap-3">
          <div class="relative">
            <img 
              v-if="user.photos && user.photos.length > 0" 
              :src="user.photos[0]" 
              :alt="`Photo de ${user.name}`" 
              class="w-10 h-10 rounded-full object-cover"
            />
            <div 
              v-else 
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center"
            >
              <span class="font-medium text-gray-400">{{ user.name[0] }}</span>
            </div>
          </div>
          
          <div>
            <h2 class="font-semibold">{{ user.name }}</h2>
            <div class="flex items-center gap-2 text-xs text-gray-400">
              <span>{{ user.age }} ans</span>
              <span>•</span>
              <span>{{ user.location }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Messages -->
      <div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-4">
        <div ref="messagesContainer" class="p-4 h-[calc(100vh-300px)] overflow-y-auto space-y-4">
          <div v-if="conversation.length === 0" class="h-full flex flex-col items-center justify-center text-center text-gray-400">
            <div class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <p class="mb-2">Pas encore de messages</p>
            <p class="text-sm">Envoyez le premier message pour commencer la conversation !</p>
          </div>

          <template v-else>
            <div 
              v-for="message in conversation" 
              :key="message.id" 
              :class="[
                'max-w-[80%] rounded-xl p-3 break-words',
                message.senderId === 0 
                  ? 'bg-game-purple text-white ml-auto' 
                  : 'bg-gray-700 text-white'
              ]"
            >
              <p>{{ message.text }}</p>
              <p 
                :class="[
                  'text-xs mt-1 flex items-center gap-1',
                  message.senderId === 0 ? 'text-purple-200' : 'text-gray-400'
                ]"
              >
                {{ formatMessageTime(message.timestamp) }}
                <span v-if="message.senderId === 0" class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 ml-1" v-if="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                  </svg>
                </span>
              </p>
            </div>
          </template>
        </div>
        
        <!-- Input -->
        <div class="p-4 border-t border-gray-700">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input 
              v-model="messageText" 
              type="text" 
              class="input flex-1" 
              placeholder="Écrivez votre message..." 
              :disabled="!user"
            />
            <button 
              type="submit" 
              class="btn btn-primary" 
              :disabled="!messageText.trim() || !user"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      <!-- Game Suggestions -->
      <div v-if="user && user.games.length > 0" class="rounded-xl border border-gray-700 p-4 bg-gray-800">
        <h3 class="text-sm font-medium text-gray-300 mb-3">Suggérer un jeu</h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="game in user.games" 
            :key="game.id" 
            class="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg p-2"
            @click="suggestGame(game)"
          >
            <img :src="game.imageUrl" :alt="game.name" class="w-6 h-6 rounded object-cover" />
            <span class="text-sm">{{ game.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useUsersStore } from '~/store/users';
import { useRoute } from 'vue-router';

const usersStore = useUsersStore();
const route = useRoute();
const messageText = ref('');
const messagesContainer = ref(null);

const userId = computed(() => {
  return parseInt(route.params.id);
});

const user = computed(() => {
  if (!userId.value) return null;
  return usersStore.users.find(u => u.id === userId.value);
});

const conversation = computed(() => {
  if (!userId.value) return [];
  return usersStore.getConversation(userId.value);
});

// Marquer les messages comme lus quand on entre dans la conversation
onMounted(() => {
  if (userId.value) {
    usersStore.markConversationAsRead(userId.value);
    scrollToBottom();
  }
});

// Surveiller les nouveaux messages pour scroller automatiquement
watch(conversation, () => {
  nextTick(() => {
    scrollToBottom();
  });
});

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = () => {
  if (messageText.value.trim() && userId.value) {
    usersStore.sendMessage(userId.value, messageText.value.trim());
    messageText.value = '';
  }
};

const suggestGame = (game) => {
  messageText.value = `Ça te dit de jouer à ${game.name} ensemble ?`;
};

const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style> 

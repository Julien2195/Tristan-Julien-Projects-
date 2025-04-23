<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Messages</h1>
      <p class="text-gray-400">Vos conversations avec d'autres gamers</p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div v-if="matchedUsers.length > 0" class="rounded-xl overflow-hidden border border-gray-700 bg-gray-800 divide-y divide-gray-700">
        <div 
          v-for="user in matchedUsersWithMessages" 
          :key="user.id" 
          class="flex items-center gap-4 p-4 hover:bg-gray-700 cursor-pointer transition-colors"
          @click="navigateToChat(user.id)"
        >
          <div class="relative">
            <img 
              v-if="user.photos && user.photos.length > 0" 
              :src="user.photos[0]" 
              :alt="`Photo de ${user.name}`" 
              class="w-14 h-14 rounded-full object-cover"
            />
            <div 
              v-else 
              class="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center"
            >
              <span class="text-lg font-medium text-gray-400">{{ user.name[0] }}</span>
            </div>
            
            <div 
              v-if="hasUnreadMessages(user.id)" 
              class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-gray-800"
            ></div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center mb-1">
              <h3 class="font-medium">{{ user.name }}</h3>
              <span class="text-xs text-gray-400">{{ formatTime(getLastMessageTime(user.id)) }}</span>
            </div>
            <p class="text-sm text-gray-400 truncate">
              {{ getLastMessage(user.id) }}
            </p>
          </div>
        </div>
      </div>
      
      <div v-else-if="matchedUsers.length > 0" class="card p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-gray-700 mx-auto flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Aucune conversation</h3>
        <p class="text-gray-400 mb-6">Vous avez des matches, mais vous n'avez pas encore commencé de conversation.</p>
        <NuxtLink to="/matches" class="btn btn-primary">Voir mes matches</NuxtLink>
      </div>
      
      <div v-else class="card p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-gray-700 mx-auto flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Pas encore de messages</h3>
        <p class="text-gray-400 mb-6">Pour envoyer des messages, vous devez d'abord matcher avec d'autres gamers.</p>
        <NuxtLink to="/decouverte" class="btn btn-primary">Explorer des profils</NuxtLink>
      </div>
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

const matchedUsersWithMessages = computed(() => {
  // Trier les utilisateurs par date du dernier message
  return [...matchedUsers.value].sort((a, b) => {
    const lastMessageA = getLastMessageTime(a.id);
    const lastMessageB = getLastMessageTime(b.id);
    return lastMessageB - lastMessageA;
  });
});

const hasUnreadMessages = (userId) => {
  const messages = usersStore.getConversation(userId);
  return messages.some(message => message.senderId === userId && !message.read);
};

const getLastMessage = (userId) => {
  const messages = usersStore.getConversation(userId);
  if (messages.length === 0) return "Aucun message";
  
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.senderId === 0) {
    return `Vous: ${lastMessage.text}`;
  }
  return lastMessage.text;
};

const getLastMessageTime = (userId) => {
  const messages = usersStore.getConversation(userId);
  if (messages.length === 0) return new Date(0); // Date très ancienne pour le tri
  
  const lastMessage = messages[messages.length - 1];
  return new Date(lastMessage.timestamp);
};

const formatTime = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays > 7) {
    return date.toLocaleDateString();
  } else if (diffDays > 0) {
    return `${diffDays}j`;
  } else {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
};

const navigateToChat = (userId) => {
  router.push(`/messages/${userId}`);
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style> 

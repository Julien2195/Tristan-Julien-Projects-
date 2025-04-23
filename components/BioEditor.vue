<template>
  <div class="card">
    <h3 class="text-xl font-semibold mb-4">À propos de moi</h3>
    <p class="text-gray-400 mb-4">Parlez un peu de vous, de votre style de jeu et de ce que vous recherchez</p>
    
    <div class="mb-4">
      <textarea 
        v-model="bio"
        class="input w-full resize-none h-32" 
        placeholder="Ex: Gamer casual qui aime les jeux FPS et RPG. Je cherche des personnes pour jouer régulièrement sans prise de tête..."
      ></textarea>
      <p class="text-sm text-gray-500 mt-1">{{ charCount }}/300 caractères</p>
    </div>

    <div class="mb-6">
      <label for="playstyle" class="block text-sm font-medium text-gray-300 mb-2">Style de jeu</label>
      <select id="playstyle" class="input w-full bg-gray-800 text-white" v-model="playStyle">
        <option value="">Sélectionnez votre style...</option>
        <option value="casual">Casual - Je joue pour le plaisir</option>
        <option value="competitive">Compétitif - J'aime la compétition</option>
        <option value="story">Histoire - Je joue pour l'immersion</option>
        <option value="social">Social - Je joue pour rencontrer des gens</option>
        <option value="collector">Collectionneur - J'aime débloquer des succès</option>
      </select>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-300 mb-2">Quand je joue</label>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div 
          v-for="(day, index) in availableDays" 
          :key="index"
          :class="['rounded-lg border p-2 text-center cursor-pointer transition-all', 
            day.selected ? 'border-game-purple bg-game-purple/10' : 'border-gray-700 hover:border-gray-600']"
          @click="toggleDay(index)"
        >
          {{ day.name }}
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-300 mb-2">J'utilise un micro</label>
      <div class="flex gap-3">
        <div 
          :class="['rounded-lg border p-2 flex-1 text-center cursor-pointer transition-all', 
            useMicrophone ? 'border-game-purple bg-game-purple/10' : 'border-gray-700 hover:border-gray-600']"
          @click="useMicrophone = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto mb-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
          Oui
        </div>
        <div 
          :class="['rounded-lg border p-2 flex-1 text-center cursor-pointer transition-all', 
            !useMicrophone ? 'border-game-purple bg-game-purple/10' : 'border-gray-700 hover:border-gray-600']"
          @click="useMicrophone = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-auto mb-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Non
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button class="btn btn-primary">Enregistrer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const bio = ref('');
const playStyle = ref('');
const useMicrophone = ref(true);

const availableDays = ref([
  { name: 'Lun', selected: false },
  { name: 'Mar', selected: false },
  { name: 'Mer', selected: false },
  { name: 'Jeu', selected: false },
  { name: 'Ven', selected: false },
  { name: 'Sam', selected: true },
  { name: 'Dim', selected: true }
]);

const charCount = computed(() => bio.value.length);

const toggleDay = (index) => {
  availableDays.value[index].selected = !availableDays.value[index].selected;
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style> 

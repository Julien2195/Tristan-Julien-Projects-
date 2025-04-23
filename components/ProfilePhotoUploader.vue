<template>
  <div class="card">
    <h3 class="text-xl font-semibold mb-4">Mes photos</h3>
    <p class="text-gray-400 mb-4">Ajoutez jusqu'à 6 photos qui montrent votre personnalité (et peut-être votre setup gaming !)</p>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div 
        v-for="(photo, index) in photos" 
        :key="index" 
        class="aspect-square rounded-lg overflow-hidden relative group"
      >
        <img 
          v-if="photo.url" 
          :src="photo.url" 
          alt="Photo de profil" 
          class="w-full h-full object-cover"
        />
        <div 
          v-else
          class="w-full h-full bg-gray-800 border border-gray-700 border-dashed flex items-center justify-center"
        >
          <span class="text-gray-500">Vide</span>
        </div>
        
        <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="flex flex-col gap-2">
            <button 
              v-if="!photo.url" 
              class="p-2 bg-game-purple rounded-full hover:bg-game-purple-dark transition-colors"
              @click="triggerFileInput(index)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              <input 
                type="file" 
                :ref="'fileInput' + index" 
                class="hidden" 
                accept="image/*" 
                @change="handleFileUpload($event, index)"
              />
            </button>
            <div v-else class="flex gap-2">
              <button 
                class="p-2 bg-game-purple rounded-full hover:bg-game-purple-dark transition-colors"
                @click="triggerFileInput(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <input 
                  type="file" 
                  :ref="'fileInput' + index" 
                  class="hidden" 
                  accept="image/*" 
                  @change="handleFileUpload($event, index)"
                />
              </button>
              <button 
                class="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                @click="removePhoto(index)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div 
          v-if="index === 0 && photo.url" 
          class="absolute top-2 left-2 bg-game-purple text-white text-xs px-2 py-1 rounded"
        >
          Principale
        </div>
      </div>
    </div>
    
    <div class="flex justify-end mt-6">
      <button class="btn btn-primary">Enregistrer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const photos = ref([
  { url: null },
  { url: null },
  { url: null },
  { url: null },
  { url: null },
  { url: null }
]);

// Référence pour les inputs file
const fileInputRefs = ref([]);

onMounted(() => {
  // Initialisation des références pour les inputs file
  for (let i = 0; i < 6; i++) {
    fileInputRefs.value[i] = null;
  }
});

const triggerFileInput = (index) => {
  // Permettre aux composants enfants d'être référencés dynamiquement
  const inputElement = document.querySelector(`#fileInput${index}`);
  if (inputElement) {
    inputElement.click();
  }
};

const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file && file.type.match('image.*')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photos.value[index].url = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = (index) => {
  photos.value[index].url = null;
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style> 

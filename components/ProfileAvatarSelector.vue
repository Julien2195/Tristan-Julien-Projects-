<template>
  <div class="card">
    <h3 class="text-xl font-semibold mb-4">Mon Bitmoji</h3>
    <p class="text-gray-400 mb-4">Choisissez un bitmoji qui vous représente dans la communauté gaming</p>
    
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      <div 
        v-for="(avatar, index) in avatars" 
        :key="index" 
        class="aspect-square rounded-lg overflow-hidden relative cursor-pointer bg-gray-800"
        :class="{ 'ring-2 ring-game-purple': selectedAvatar === index }"
        @click="selectAvatar(index)"
      >
        <img 
          :src="avatar.url" 
          :alt="`Bitmoji ${index + 1}`" 
          class="w-full h-full object-contain p-2"
        />
        
        <div 
          v-if="selectedAvatar === index" 
          class="absolute top-2 right-2 bg-game-purple text-white p-1 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end mt-6">
      <button class="btn btn-primary" @click="saveAvatar">Enregistrer</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// defineEmits est une macro de compilation et n'a pas besoin d'être importée
const emit = defineEmits(['avatarSelected']);

// Liste prédéfinie d'avatars bitmoji 
const avatars = ref([
  { url: 'https://sdk.bitmoji.com/render/panel/10219152-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/10219158-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/20047495-99937272610_1-s5-v1.png?transparent=1', gender: 'female', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/20048833-99937272610_1-s5-v1.png?transparent=1', gender: 'female', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/10220775-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/10221558-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/10230625-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/20043886-99937272610_1-s5-v1.png?transparent=1', gender: 'female', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/20047496-99937272610_1-s5-v1.png?transparent=1', gender: 'female', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/20035381-99937272610_1-s5-v1.png?transparent=1', gender: 'female', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/10219178-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/10219183-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/20047497-99937272610_1-s5-v1.png?transparent=1', gender: 'female', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/20035122-99937272610_1-s5-v1.png?transparent=1', gender: 'female', style: 'bitmoji' },
  { url: 'https://sdk.bitmoji.com/render/panel/10220806-99937272610_1-s5-v1.png?transparent=1', gender: 'male', style: 'bitmoji' }
]);

const selectedAvatar = ref(0);

const selectAvatar = (index) => {
  selectedAvatar.value = index;
};

const saveAvatar = () => {
  if (avatars.value.length === 0) return;
  
  const selectedAvatarData = avatars.value[selectedAvatar.value];
  emit('avatarSelected', {
    url: selectedAvatarData.url,
    index: selectedAvatar.value,
    gender: selectedAvatarData.gender,
    style: selectedAvatarData.style
  });
};
</script>

<style scoped>
/* Pour s'assurer que les bitmojis sont bien centrés et visibles */
img {
  object-fit: contain;
  height: 100%;
  width: 100%;
}
</style> 

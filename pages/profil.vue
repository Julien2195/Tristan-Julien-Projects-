<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Créez votre profil</h1>
      <p class="text-gray-400">Complétez votre profil pour commencer à rencontrer d'autres gamers</p>
    </div>

    <div class="grid gap-8 md:grid-cols-2">
      <div class="space-y-8">
        <ProfileAvatarSelector @avatarSelected="handleAvatarSelected" />
        <GameSelector />
      </div>
      <div class="space-y-8">
        <BioEditor />
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Préférences de matching</h3>
          <p class="text-gray-400 mb-4">Définissez qui vous souhaitez rencontrer</p>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-2">Je cherche à rencontrer</label>
            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="option in genderOptions" 
                :key="option.value"
                :class="['rounded-lg border p-3 text-center cursor-pointer transition-all', 
                  matchingPreferences.gender === option.value ? 'border-game-purple bg-game-purple/10' : 'border-gray-700 hover:border-gray-600']"
                @click="matchingPreferences.gender = option.value"
              >
                {{ option.label }}
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-2">Tranche d'âge</label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-gray-400">Min</label>
                <select v-model="matchingPreferences.ageMin" class="input w-full mt-1">
                  <option v-for="age in ageRange" :key="age" :value="age">{{ age }}</option>
                </select>
              </div>
              <div>
                <label class="text-xs text-gray-400">Max</label>
                <select v-model="matchingPreferences.ageMax" class="input w-full mt-1">
                  <option v-for="age in ageRange" :key="age" :value="age">{{ age }}</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-300 mb-2">Langues parlées</label>
            <div class="space-y-3">
              <div 
                v-for="(language, index) in selectedLanguages" 
                :key="index"
                class="flex items-center justify-between bg-gray-800 rounded-lg p-3"
              >
                <span>{{ language }}</span>
                <button @click="removeLanguage(index)" class="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div class="flex items-center space-x-2">
                <select v-model="newLanguage" class="input flex-grow">
                  <option value="" disabled>Sélectionnez une langue</option>
                  <option v-for="lang in availableLanguages" :key="lang" :value="lang">{{ lang }}</option>
                </select>
                <button 
                  @click="addLanguage"
                  :disabled="!newLanguage"
                  class="btn btn-primary p-2"
                  :class="{'opacity-50 cursor-not-allowed': !newLanguage}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button class="btn btn-primary" @click="saveMatchingPreferences">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-12 flex justify-center">
      <button class="btn btn-primary px-8 py-3" @click="saveFullProfile">Terminer mon profil</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import GameSelector from '~/components/GameSelector.vue';
import BioEditor from '~/components/BioEditor.vue';
import ProfileAvatarSelector from '~/components/ProfileAvatarSelector.vue';

const userProfile = ref({
  avatarUrl: '',
  avatarIndex: 0,
  bio: '',
  games: []
});

const handleAvatarSelected = (avatarData) => {
  userProfile.value.avatarUrl = avatarData.url;
  userProfile.value.avatarIndex = avatarData.index;
  // Ici vous pourriez ajouter du code pour enregistrer l'avatar dans la base de données
  console.log('Avatar sélectionné:', avatarData);
};

const genderOptions = [
  { value: 'male', label: 'Hommes' },
  { value: 'female', label: 'Femmes' },
  { value: 'both', label: 'Les deux' },
  { value: 'other', label: 'Autre' }
];

const matchingPreferences = ref({
  gender: 'both',
  ageMin: 18,
  ageMax: 35,
  languages: []
});

const ageRange = computed(() => {
  const range = [];
  for (let i = 18; i <= 99; i++) {
    range.push(i);
  }
  return range;
});

const availableLanguages = [
  'Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 
  'Portugais', 'Russe', 'Chinois', 'Japonais', 'Coréen', 'Arabe'
];

const selectedLanguages = ref(['Français']);
const newLanguage = ref('');

const addLanguage = () => {
  if (newLanguage.value && !selectedLanguages.value.includes(newLanguage.value)) {
    selectedLanguages.value.push(newLanguage.value);
    matchingPreferences.value.languages = [...selectedLanguages.value];
    newLanguage.value = '';
  }
};

const removeLanguage = (index) => {
  selectedLanguages.value.splice(index, 1);
  matchingPreferences.value.languages = [...selectedLanguages.value];
};

// Fonction pour sauvegarder uniquement les préférences de matching
const saveMatchingPreferences = () => {
  // Mettez à jour les langues dans les préférences de matching
  matchingPreferences.value.languages = [...selectedLanguages.value];
  console.log('Préférences de matching enregistrées:', matchingPreferences.value);
  // Ici vous ajouteriez le code pour envoyer les données au serveur
};

// Fonction pour sauvegarder l'ensemble du profil
const saveFullProfile = () => {
  // Combine toutes les données du profil
  const fullProfile = {
    ...userProfile.value,
    matchingPreferences: matchingPreferences.value
  };
  
  // Ici vous ajouteriez le code pour envoyer les données au serveur
  console.log('Profil complet à enregistrer:', fullProfile);
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style> 

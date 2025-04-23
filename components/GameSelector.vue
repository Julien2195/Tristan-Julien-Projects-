<template>
  <div class="card">
    <h3 class="text-xl font-semibold mb-4">Mes jeux préférés</h3>
    <p class="text-gray-400 mb-4">Sélectionnez jusqu'à 5 jeux que vous aimez jouer</p>
    
    <div class="relative mb-4">
      <input 
        type="text" 
        class="input w-full pl-10" 
        placeholder="Rechercher un jeu..." 
        v-model="searchQuery"
        @input="searchGames" 
      />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 absolute left-3 top-2.5 text-gray-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </div>

    <div v-if="searchResults.length > 0 && searchQuery" class="mb-6 bg-gray-900 rounded-lg border border-gray-700 max-h-60 overflow-y-auto">
      <ul>
        <li 
          v-for="game in searchResults" 
          :key="game.id" 
          class="flex items-center gap-3 p-3 border-b border-gray-700 last:border-0 hover:bg-gray-800 cursor-pointer"
          @click="selectGame(game)"
        >
          <img :src="game.imageUrl" :alt="game.name" class="w-10 h-10 rounded object-cover" />
          <span>{{ game.name }}</span>
        </li>
      </ul>
    </div>

    <div class="space-y-4">
      <div v-if="selectedGames.length === 0" class="text-center py-6 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mx-auto mb-2 opacity-50">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.72 9.72 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 8.002-4.248Z" />
        </svg>
        <p>Aucun jeu sélectionné</p>
      </div>

      <div v-for="game in selectedGames" :key="game.id" class="flex items-center gap-3 p-3 bg-gray-800 rounded-lg relative group">
        <img :src="game.imageUrl" :alt="game.name" class="w-12 h-12 rounded object-cover" />
        <div class="flex-1">
          <p class="font-medium">{{ game.name }}</p>
          <div class="flex gap-2 mt-1">
            <span v-for="platform in game.platforms.slice(0, 3)" :key="platform" class="px-2 py-0.5 bg-gray-700 rounded text-xs">{{ platform }}</span>
            <span v-if="game.platforms.length > 3" class="px-2 py-0.5 bg-gray-700 rounded text-xs">+{{ game.platforms.length - 3 }}</span>
          </div>
        </div>
        <button 
          @click="removeGame(game)"
          class="opacity-0 group-hover:opacity-100 p-1.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition absolute top-2 right-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Liste des jeux populaires (à remplacer par une API)
const games = ref([
  { 
    id: 1, 
    name: 'Fortnite', 
    imageUrl: 'https://cdn2.unrealengine.com/24br-s19-egs-launcher-productimage-1920x1080-1920x1080-465aadbf0c33.jpg',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
  },
  { 
    id: 2, 
    name: 'Call of Duty: Warzone', 
    imageUrl: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/WZ-Season-Three-Announce-TOUT.jpg',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  { 
    id: 3, 
    name: 'League of Legends', 
    imageUrl: 'https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg',
    platforms: ['PC']
  },
  { 
    id: 4, 
    name: 'Minecraft', 
    imageUrl: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_2023Updates_XL.png',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
  },
  { 
    id: 5, 
    name: 'Valorant', 
    imageUrl: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/63096d7be4a8c30e088e7720/Valorant_2022_E5A2_PlayVALORANT_ContentStackThumbnail_1200x625_MB01.png',
    platforms: ['PC']
  },
  { 
    id: 6, 
    name: 'Apex Legends', 
    imageUrl: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
  },
  { 
    id: 7, 
    name: 'Grand Theft Auto V', 
    imageUrl: 'https://image.api.playstation.com/vulcan/img/rnd/202009/2923/XkIxXHfZSXdUNbxgzIrGr1q9.jpg',
    platforms: ['PC', 'PlayStation', 'Xbox']
  },
  { 
    id: 8, 
    name: 'Genshin Impact', 
    imageUrl: 'https://genshin.hoyoverse.com/en/img/share.jpg',
    platforms: ['PC', 'PlayStation', 'Mobile']
  },
  { 
    id: 9, 
    name: 'Among Us', 
    imageUrl: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
  },
  { 
    id: 10, 
    name: 'Rocket League', 
    imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/capsule_616x353.jpg',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch']
  }
]);

const selectedGames = ref([]);
const searchQuery = ref('');
const searchResults = ref([]);

const searchGames = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  
  const query = searchQuery.value.toLowerCase();
  searchResults.value = games.value.filter(game => 
    game.name.toLowerCase().includes(query) && 
    !selectedGames.value.some(selectedGame => selectedGame.id === game.id)
  );
};

const selectGame = (game) => {
  if (selectedGames.value.length < 5) {
    selectedGames.value.push(game);
    searchQuery.value = '';
    searchResults.value = [];
  }
};

const removeGame = (game) => {
  selectedGames.value = selectedGames.value.filter(g => g.id !== game.id);
};
</script>

<style scoped>
/* Scrollbar styling pour la liste de recherche */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.8);
}
</style> 

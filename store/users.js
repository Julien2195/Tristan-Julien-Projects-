import { defineStore } from 'pinia';

// Génère une liste d'utilisateurs aléatoires pour simuler l'application
const generateUsers = () => {
  const users = [
    {
      id: 1,
      name: 'Sophie',
      age: 24,
      location: 'Paris',
      distance: 3,
      bio: 'Gameuse passionnée depuis toujours. J\'adore les jeux d\'aventure et les RPG.',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      games: [
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
          id: 8, 
          name: 'Genshin Impact', 
          imageUrl: 'https://genshin.hoyoverse.com/en/img/share.jpg',
          platforms: ['PC', 'PlayStation', 'Mobile']
        }
      ],
      playStyle: 'story',
      useMicrophone: true,
      availableDays: ['Lun', 'Mer', 'Ven', 'Sam']
    },
    {
      id: 2,
      name: 'Lucas',
      age: 27,
      location: 'Lyon',
      distance: 8,
      bio: 'Fan de FPS et de jeux compétitifs. Toujours à la recherche de nouveaux défis et de coéquipiers solides.',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      games: [
        { 
          id: 2, 
          name: 'Call of Duty: Warzone', 
          imageUrl: 'https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/WZ-Season-Three-Announce-TOUT.jpg',
          platforms: ['PC', 'PlayStation', 'Xbox']
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
        }
      ],
      playStyle: 'competitive',
      useMicrophone: true,
      availableDays: ['Mar', 'Jeu', 'Sam', 'Dim']
    },
    {
      id: 3,
      name: 'Emma',
      age: 23,
      location: 'Marseille',
      distance: 12,
      bio: 'Joueuse de MMO à la recherche d\'une guilde active. Je joue principalement le soir et les weekends.',
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1664575599736-c5197c684172?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      games: [
        { 
          id: 8, 
          name: 'Genshin Impact', 
          imageUrl: 'https://genshin.hoyoverse.com/en/img/share.jpg',
          platforms: ['PC', 'PlayStation', 'Mobile']
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
        }
      ],
      playStyle: 'social',
      useMicrophone: true,
      availableDays: ['Mer', 'Ven', 'Sam', 'Dim']
    },
    {
      id: 4,
      name: 'Thomas',
      age: 30,
      location: 'Toulouse',
      distance: 5,
      bio: 'Passionné de jeux indé et d\'expériences narratives fortes. Je préfère la qualité à la quantité.',
      photos: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1563240619-44ec5ff37c66?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      games: [
        { 
          id: 4, 
          name: 'Minecraft', 
          imageUrl: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_2023Updates_XL.png',
          platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
        },
        { 
          id: 7, 
          name: 'Grand Theft Auto V', 
          imageUrl: 'https://image.api.playstation.com/vulcan/img/rnd/202009/2923/XkIxXHfZSXdUNbxgzIrGr1q9.jpg',
          platforms: ['PC', 'PlayStation', 'Xbox']
        },
        { 
          id: 10, 
          name: 'Rocket League', 
          imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/capsule_616x353.jpg',
          platforms: ['PC', 'PlayStation', 'Xbox', 'Switch']
        }
      ],
      playStyle: 'story',
      useMicrophone: false,
      availableDays: ['Lun', 'Mar', 'Sam', 'Dim']
    },
    {
      id: 5,
      name: 'Camille',
      age: 25,
      location: 'Bordeaux',
      distance: 7,
      bio: 'Streameuse occasionnelle, j\'aime partager mes sessions de jeu et rencontrer de nouveaux joueurs.',
      photos: [
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3'
      ],
      games: [
        { 
          id: 1, 
          name: 'Fortnite', 
          imageUrl: 'https://cdn2.unrealengine.com/24br-s19-egs-launcher-productimage-1920x1080-1920x1080-465aadbf0c33.jpg',
          platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
        },
        { 
          id: 9, 
          name: 'Among Us', 
          imageUrl: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec',
          platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
        },
        { 
          id: 6, 
          name: 'Apex Legends', 
          imageUrl: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop16x9.1023w.jpg',
          platforms: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile']
        }
      ],
      playStyle: 'social',
      useMicrophone: true,
      availableDays: ['Mar', 'Mer', 'Jeu', 'Ven']
    }
  ];
  
  return users;
};

export const useUsersStore = defineStore('users', {
  state: () => ({
    currentUser: {
      id: 0,
      name: 'Vous',
      games: [],
      likes: [],
      matches: [],
      currentMatchIndex: 0
    },
    users: generateUsers(),
    messages: {},
    notificationCount: 2
  }),
  
  getters: {
    // Liste des utilisateurs que l'on peut consulter (qui ne sont pas déjà liké)
    availableUsers(state) {
      return state.users.filter(user => !state.currentUser.likes.includes(user.id));
    },
    
    // Utilisateur actuel à afficher dans la découverte
    currentDiscoveryUser(state) {
      if (this.availableUsers.length > 0) {
        return this.availableUsers[state.currentUser.currentMatchIndex % this.availableUsers.length];
      }
      return null;
    },
    
    // Liste des utilisateurs avec qui on a matché
    matchedUsers(state) {
      // Un match existe si l'utilisateur a liké l'autre personne
      // Dans une vraie app, il faudrait que les deux personnes se soient likées mutuellement
      return state.users.filter(user => state.currentUser.matches.includes(user.id));
    },
    
    // Récupérer la conversation avec un utilisateur spécifique
    getConversation: (state) => (userId) => {
      if (!state.messages[userId]) {
        state.messages[userId] = [];
      }
      return state.messages[userId];
    }
  },
  
  actions: {
    likeUser(userId) {
      if (!this.currentUser.likes.includes(userId)) {
        this.currentUser.likes.push(userId);
        
        // Simuler un match aléatoire (50% de chance)
        if (Math.random() > 0.5) {
          this.createMatch(userId);
        }
        
        // Passer à l'utilisateur suivant
        this.currentUser.currentMatchIndex++;
      }
    },
    
    dislikeUser(userId) {
      // Passer à l'utilisateur suivant
      this.currentUser.currentMatchIndex++;
    },
    
    createMatch(userId) {
      if (!this.currentUser.matches.includes(userId)) {
        this.currentUser.matches.push(userId);
        this.notificationCount++;
        
        // Ajouter un message automatique
        const user = this.users.find(u => u.id === userId);
        if (user) {
          const randomMessages = [
            `Salut ! J'ai vu que tu aimais ${user.games[0].name} aussi, on pourrait faire une partie ensemble ?`,
            `Hey ! Content de matcher avec toi. Tu joues principalement sur quelle plateforme ?`,
            `Bonjour ! On a plein de jeux en commun, ça te dit de discuter ?`
          ];
          
          const message = {
            id: Date.now(),
            senderId: userId,
            receiverId: 0,
            text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
            timestamp: new Date().toISOString(),
            read: false
          };
          
          if (!this.messages[userId]) {
            this.messages[userId] = [];
          }
          
          this.messages[userId].push(message);
        }
      }
    },
    
    sendMessage(userId, text) {
      if (!this.messages[userId]) {
        this.messages[userId] = [];
      }
      
      const message = {
        id: Date.now(),
        senderId: 0,
        receiverId: userId,
        text,
        timestamp: new Date().toISOString(),
        read: true
      };
      
      this.messages[userId].push(message);
      
      // Simuler une réponse automatique après 1 à 3 secondes
      setTimeout(() => {
        const user = this.users.find(u => u.id === userId);
        if (user) {
          const randomResponses = [
            `Super ! Je suis dispo ce weekend si tu veux jouer.`,
            `J'adorerais ! Tu préfères jouer à quel jeu ?`,
            `Parfait, je t'envoie mon pseudo en jeu !`,
            `Je suis régulièrement en ligne le soir. Et toi ?`,
            `Ça marche, on pourrait créer un serveur Discord aussi ?`
          ];
          
          const response = {
            id: Date.now() + 1,
            senderId: userId,
            receiverId: 0,
            text: randomResponses[Math.floor(Math.random() * randomResponses.length)],
            timestamp: new Date().toISOString(),
            read: false
          };
          
          this.messages[userId].push(response);
          this.notificationCount++;
        }
      }, 1000 + Math.random() * 2000);
    },
    
    markConversationAsRead(userId) {
      if (this.messages[userId]) {
        this.messages[userId].forEach(message => {
          if (message.senderId === userId) {
            message.read = true;
          }
        });
        this.notificationCount = Math.max(0, this.notificationCount - 1);
      }
    }
  }
}); 

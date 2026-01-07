export const rewardTiers = [
  {
    id: 1,
    name: "Bronce",
    minAmount: 0,
    maxAmount: 500,
    color: "bronze",
    icon: "🥉",
    bgColor: "bg-amber-700",
    textColor: "text-amber-700",
    borderColor: "border-amber-700"
  },
  {
    id: 2,
    name: "Plata",
    minAmount: 501,
    maxAmount: 1000,
    color: "silver",
    icon: "🥈",
    bgColor: "bg-gray-400",
    textColor: "text-gray-600",
    borderColor: "border-gray-400"
  },
  {
    id: 3,
    name: "Oro",
    minAmount: 1001,
    maxAmount: 5000,
    color: "gold",
    icon: "🥇",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-500"
  },
  {
    id: 4,
    name: "Platino",
    minAmount: 5001,
    maxAmount: Infinity,
    color: "platinum",
    icon: "💎",
    bgColor: "bg-purple-600",
    textColor: "text-purple-600",
    borderColor: "border-purple-600"
  }
];

export const rewardHistory = [
  {
    id: 1,
    petId: 4,
    petName: "Bella",
    finderName: "Carlos Méndez",
    rewardAmount: 750,
    dateClaimed: "2025-12-15",
    location: "Ciudad de México",
    status: "pagado"
  },
  {
    id: 2,
    petId: 8,
    petName: "Nala",
    finderName: "Ana García",
    rewardAmount: 900,
    dateClaimed: "2025-12-14",
    location: "Ciudad de México",
    status: "pagado"
  },
  {
    id: 3,
    petId: 10,
    petName: "Simba",
    finderName: "Juan Torres",
    rewardAmount: 700,
    dateClaimed: "2025-12-13",
    location: "Toluca",
    status: "pagado"
  },
  {
    id: 4,
    petId: 1,
    petName: "Max",
    finderName: "Pendiente",
    rewardAmount: 500,
    dateClaimed: null,
    location: "Ciudad de México",
    status: "pendiente"
  },
  {
    id: 5,
    petId: 3,
    petName: "Rocky",
    finderName: "Pendiente",
    rewardAmount: 1000,
    dateClaimed: null,
    location: "Monterrey",
    status: "pendiente"
  }
];

export const topFinders = [
  {
    id: 1,
    name: "Ana García",
    petsFound: 5,
    totalRewards: 3500,
    city: "Ciudad de México",
    avatar: "AG"
  },
  {
    id: 2,
    name: "Carlos Méndez",
    petsFound: 4,
    totalRewards: 2800,
    city: "Guadalajara",
    avatar: "CM"
  },
  {
    id: 3,
    name: "Juan Torres",
    petsFound: 3,
    totalRewards: 2100,
    city: "Monterrey",
    avatar: "JT"
  },
  {
    id: 4,
    name: "María López",
    petsFound: 3,
    totalRewards: 1900,
    city: "Puebla",
    avatar: "ML"
  },
  {
    id: 5,
    name: "Pedro Ramírez",
    petsFound: 2,
    totalRewards: 1500,
    city: "Ciudad de México",
    avatar: "PR"
  }
];

export const getRewardTier = (amount) => {
  return rewardTiers.find(tier => 
    amount >= tier.minAmount && amount <= tier.maxAmount
  ) || rewardTiers[0];
};

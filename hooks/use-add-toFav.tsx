import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price?: number;
  capacity?: number;
  availableSpots?: number;
  speakers?: string[];
}

export default function useFave() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const saved = await AsyncStorage.getItem("favorites");
      if (saved) setFavorites(JSON.parse(saved));
    };
    loadFavorites();
  }, []);

  const toggleFave = async (event?: Event) => {
    if (!event) return;

    const updated = favorites.includes(event.id)
      ? favorites.filter((id) => id !== event.id)
      : [...favorites, event.id];

      setFavorites(updated);
      console.log(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  return { favorites, toggleFave };
}

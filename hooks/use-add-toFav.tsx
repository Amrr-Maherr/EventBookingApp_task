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
  const [favorites, setFavorites] = useState<Event[]>([]);
   const loadFavorites = async () => {
     try {
       const saved = await AsyncStorage.getItem("favorites");
       if (saved) {
         const parsed: Event[] = JSON.parse(saved);
         setFavorites(Array.isArray(parsed) ? parsed : [parsed]);
       }
     } catch (err) {
       console.error("Failed to load favorites:", err);
     }
  };
  const clearFavorites = () => {
    AsyncStorage.clear()
    setFavorites([])
  }
  useEffect(() => {
    loadFavorites();
  }, [favorites]);

  const toggleFave = async (event?: Event) => {
    if (!event) return;

    const exists = favorites.find((fav) => fav.id === event.id);

    const updated = exists
      ? favorites.filter((fav) => fav.id !== event.id)
      : [...favorites, event];

    setFavorites(updated);

    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save favorites:", err);
    }
  };

  return { favorites, toggleFave, loadFavorites, clearFavorites };
}

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Event {
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

interface FavoritesState {
  favorites: Event[];
  loading: boolean;
  error: string | null;
}

export const loadFavorites = createAsyncThunk(
  "favorites/loadFavorites",
  async () => {
    const saved = await AsyncStorage.getItem("favorites");
    if (saved) {
      const parsed: Event[] = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [parsed];
    }
    return [];
  }
);

const saveFavorites = async (favorites: Event[]) => {
  await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
};

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFave(state, action: PayloadAction<Event>) {
      const exists = state.favorites.find(
        (fav) => fav.id === action.payload.id
      );
      if (exists) {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
      saveFavorites(state.favorites);
    },
    clearFavorites(state) {
      state.favorites = [];
      AsyncStorage.removeItem("favorites");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadFavorites.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.favorites = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load favorites";
      });
  },
});

export const { toggleFave, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

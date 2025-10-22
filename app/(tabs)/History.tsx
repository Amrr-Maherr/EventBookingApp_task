import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFavorites,
  toggleFave,
  clearFavorites,
  Event,
} from "@/Store/FavSlice";
import { RootState } from "@/Store/Store";

export default function History() {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.favorites.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleClearAll = () => {
    Alert.alert("Confirm", "Are you sure you want to remove all favorites?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => dispatch(clearFavorites()) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Events</Text>
      {events.length > 0 && (
        <Pressable style={styles.clearButton} onPress={handleClearAll}>
          <Text style={styles.clearButtonText}>Remove All Favorites</Text>
        </Pressable>
      )}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/120" }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>
                {item.date
                  ? new Date(item.date).toLocaleDateString()
                  : "No Date"}
              </Text>
              <Text style={styles.location}>{item.location}</Text>
              <Text style={styles.speakers}>
                Speakers: {item.speakers?.join(", ") || "TBA"}
              </Text>
              <Text style={styles.price}>Price: ${item.price ?? "Free"}</Text>
              <Text style={styles.spots}>
                Available Spots: {item.availableSpots ?? "N/A"}
              </Text>
              <Pressable
                style={styles.removeButton}
                onPress={() => dispatch(toggleFave(item))}
              >
                <Text style={styles.removeButtonText}>
                  Remove from Favorites
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1f2937",
  },
  clearButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  clearButtonText: { color: "#fff", fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: { width: "100%", height: 180 },
  info: { padding: 15 },
  title: { fontSize: 20, fontWeight: "700", color: "#111827", marginBottom: 5 },
  date: { fontSize: 14, color: "#6b7280", marginBottom: 3 },
  location: { fontSize: 14, color: "#6b7280", marginBottom: 5 },
  speakers: { fontSize: 14, color: "#6b7280", marginBottom: 3 },
  price: { fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 3 },
  spots: { fontSize: 14, color: "#6b7280", marginBottom: 10 },
  removeButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  removeButtonText: { color: "#fff", fontWeight: "600" },
});

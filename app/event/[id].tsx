import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchEventDetails } from "@/Store/eventDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/Store/Store";
import { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ToastManager, { Toast } from "toastify-react-native";
import { toggleFave, Event } from "@/Store/FavSlice";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [res, setRes] = useState<boolean>(false);

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchEventDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading event details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No event details found.</Text>
      </View>
    );
  }

  const book = (event: Event) => {
    dispatch(toggleFave(event));
    setRes(true);
    Toast.success(`The event has been successfully booked ${event.title}`);
    const timer = setTimeout(() => setRes(false), 1000);
    return () => clearTimeout(timer);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={18} color="#6B7280" />
            <Text style={styles.meta}>
              {new Date(event.date).toLocaleDateString("en-US")}
            </Text>

            <Ionicons
              name="location-outline"
              size={18}
              color="#6B7280"
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.meta}>{event.location}</Text>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Speakers</Text>
            {event.speakers?.length ? (
              event.speakers.map((speaker: string, index: number) => (
                <View key={index} style={styles.iconRow}>
                  <MaterialCommunityIcons
                    name="account-voice"
                    size={18}
                    color="#4B5563"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.speaker}>{speaker}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.speaker}>No speakers listed.</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Info</Text>

            <View style={styles.iconRow}>
              <Ionicons
                name="cash-outline"
                size={18}
                color="#4B5563"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.info}>Price: ${event.price}</Text>
            </View>

            <View style={styles.iconRow}>
              <Ionicons
                name="people-outline"
                size={18}
                color="#4B5563"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.info}>Capacity: {event.capacity}</Text>
            </View>

            <View style={styles.iconRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color="#4B5563"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.info}>
                Available Spots: {event.availableSpots}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.bookButton,
            pressed && { opacity: 0.8 },
            res && { backgroundColor: "#10B981" },
          ]}
          onPress={() => book(event)}
        >
          {res ? (
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginRight: 8 }}
            />
          ) : (
            <Ionicons
              name="ticket-outline"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={styles.buttonText}>{res ? "Booked!" : "Book Now"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F9FAFB", paddingBottom: 100, flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: { marginTop: 10, color: "#6B7280" },
  errorText: { color: "red", fontSize: 16 },
  emptyText: { color: "#6B7280", fontSize: 16 },
  image: {
    width: "100%",
    height: 240,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "#111827", marginBottom: 8 },
  metaRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  meta: { fontSize: 14, color: "#6B7280", marginLeft: 4 },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#374151",
    marginBottom: 20,
  },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 5,
  },
  iconRow: { flexDirection: "row", alignItems: "center", marginVertical: 3 },
  speaker: { fontSize: 15, color: "#4B5563" },
  info: { fontSize: 15, color: "#4B5563" },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  bookButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

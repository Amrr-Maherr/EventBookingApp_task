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
import { useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import EventLocationInfo from "./EventLocationInfo";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: event.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>

          <EventLocationInfo date={event.date} location={event.location} />

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
          ]}
          onPress={() => alert("Booking confirmed! 🎟️")}
        >
          <Ionicons
            name="ticket-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>Book Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    paddingBottom: 100,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    marginTop: 10,
    color: "#6B7280",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#374151",
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  speaker: {
    fontSize: 15,
    color: "#4B5563",
  },
  info: {
    fontSize: 15,
    color: "#4B5563",
  },
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
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

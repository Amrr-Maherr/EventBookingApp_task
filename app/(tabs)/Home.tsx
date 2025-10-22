import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/Store/Store";
import { useEffect } from "react";
import { fetchEvents } from "@/Store/EventsSlice";
import EventCard from "@/components/EventCard";
import CardLoader from "@/components/CardLoder";
export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.events.events);
    const loading = useSelector((state: RootState) => state.events.loading);
    const error = useSelector((state: RootState) => state.events.error);
     useEffect(() => {
       dispatch(fetchEvents());
     }, [dispatch]);
  if (error) {
    return (
      <>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id || item.title}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) =>
          // event card
          loading ? <CardLoader /> : <EventCard event={item} />
        }
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1f2937",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#dc2626",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
});

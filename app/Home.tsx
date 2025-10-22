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
const dummyEvents = [
  {
    id: "1",
    title: "React Native Workshop",
    date: "2025-11-01",
    location: "Cairo, Egypt",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Expo Router Meetup",
    date: "2025-11-05",
    location: "Alexandria, Egypt",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    title: "JavaScript Conference",
    date: "2025-11-10",
    location: "Giza, Egypt",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "1",
    title: "React Native Workshop",
    date: "2025-11-01",
    location: "Cairo, Egypt",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Expo Router Meetup",
    date: "2025-11-05",
    location: "Alexandria, Egypt",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    title: "JavaScript Conference",
    date: "2025-11-10",
    location: "Giza, Egypt",
    image: "https://via.placeholder.com/150",
  },
];

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.events.events);
    const loading = useSelector((state: RootState) => state.events.loading);
    const error = useSelector((state: RootState) => state.events.error);
     useEffect(() => {
       dispatch(fetchEvents());
     }, [dispatch]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id || item.title}
        contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
            // event card
          <EventCard event={item} />
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1f2937",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  info: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 3,
  },
  location: {
    fontSize: 14,
    color: "#6b7280",
  },
});

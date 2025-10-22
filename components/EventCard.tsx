import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from "react-native";

interface Event {
  id?:string
  title: string;
  date: string;
  location: string;
  image: string;
  price?: number;
  availableSpots?: number;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  console.log(event);
  return (
    <Pressable onPress={() => router.push(`/event/${event.id}`)}>
      <View style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>
            {" "}
            {event.title.length > 18
              ? `${event.title.slice(0, 18)}...`
              : event.title}
          </Text>
          <Text style={styles.date}>
            {new Date(event.date).toLocaleDateString()}
          </Text>
          <Text style={styles.location}>{event.location}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    width:"100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems:"center"
  },
  image: {
    width: 120,
    height: 120,
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

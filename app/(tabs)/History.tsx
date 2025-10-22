import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const events = [
  {
    id: "1",
    title: "React Native Workshop",
    date: "2025-11-01",
    location: "Cairo, Egypt",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    id: "2",
    title: "Expo Router Meetup",
    date: "2025-11-05",
    location: "Alexandria, Egypt",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  },
  {
    id: "3",
    title: "JavaScript Conference",
    date: "2025-11-10",
    location: "Giza, Egypt",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6",
  },
];

export default function History() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.location}>{item.location}</Text>
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
    marginBottom: 20,
    color: "#1f2937",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: 100,
    height: 100,
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

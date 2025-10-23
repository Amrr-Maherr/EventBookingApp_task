import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Profile() {
  const auth = getAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been signed out successfully.");
      router.replace("/Login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Amr Maher</Text>
      <Text style={styles.role}>Front-End Developer</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Email:</Text>
        <Text style={styles.infoText}>amrr.maherr24@gmail.com</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Location:</Text>
        <Text style={styles.infoText}>Cairo, Egypt</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "#F9FAFB",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  role: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30,
  },
  infoContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoTitle: {
    fontWeight: "600",
    color: "#374151",
  },
  infoText: {
    color: "#6B7280",
  },
  logoutButton: {
    marginTop: 15,
    backgroundColor: "#DC2626",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

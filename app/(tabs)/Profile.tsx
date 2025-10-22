import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
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
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
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
  editButton: {
    marginTop: 30,
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

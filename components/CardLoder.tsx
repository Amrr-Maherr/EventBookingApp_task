import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
export default function CardLoader() {
  return (
    <View style={styles.container}>
      <ShimmerPlaceHolder
        visible={false}
        style={styles.shimmerCard}
      />
      <ShimmerPlaceHolder
        visible={false}
        style={styles.shimmerCard}
      />
      <ShimmerPlaceHolder
        visible={false}
        style={styles.shimmerCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  shimmerCard: {
    height: 120,
    borderRadius: 15,
    marginBottom: 15,
    width: "100%",
  },
});

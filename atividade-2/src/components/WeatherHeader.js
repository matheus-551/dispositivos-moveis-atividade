import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WeatherHeader({ cityName, onPressCity, theme }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.locationRow} onPress={onPressCity}>
        <Ionicons name="location-sharp" size={18} color={theme.textPrimary} />
        <Text style={[styles.cityText, { color: theme.textPrimary }]}>
          {cityName}
        </Text>
        <Ionicons name="chevron-down" size={16} color={theme.textPrimary} />
      </TouchableOpacity>

      <View style={styles.bellWrapper}>
        <Ionicons name="notifications-outline" size={20} color={theme.textPrimary} />
        <View style={styles.bellDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 4,
  },
  bellWrapper: {
    position: "relative",
  },
  bellDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5A5A",
  },
});

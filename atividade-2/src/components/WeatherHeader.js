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
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function StatsRow({ current, theme }) {
  const cloudiness = Math.round(current.cloudiness ?? 0);
  const humidity = Math.round(current.humidity ?? 0);
  const wind = current.wind_speedy ?? "-- km/h";

  return (
    <View style={[styles.pill, { backgroundColor: theme.pill }]}>
      <View style={styles.item}>
        <MaterialCommunityIcons name="snowflake" size={16} color={theme.textPrimary} />
        <Text style={[styles.text, { color: theme.textPrimary }]}>{cloudiness}%</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.divider }]} />

      <View style={styles.item}>
        <Ionicons name="arrow-down" size={16} color={theme.textPrimary} />
        <Text style={[styles.text, { color: theme.textPrimary }]}>{humidity}%</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.divider }]} />

      <View style={styles.item}>
        <MaterialCommunityIcons name="weather-windy" size={16} color={theme.textPrimary} />
        <Text style={[styles.text, { color: theme.textPrimary }]}>{wind}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    width: 1,
    height: 18,
  },
});

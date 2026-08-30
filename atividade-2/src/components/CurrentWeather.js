import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { iconForCondition } from "../utils/weatherIcons";

export default function CurrentWeather({ current, theme }) {
  const icon = iconForCondition(current.condition_slug);
  const todayForecast = current.forecast?.[0];

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon.name} size={96} color={icon.color} />
      <Text style={[styles.temp, { color: theme.textPrimary }]}>
        {Math.round(current.temp)}°
      </Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        Precipitations
      </Text>
      <Text style={[styles.minMax, { color: theme.textSecondary }]}>
        Max.: {todayForecast?.max ?? "--"}°  Min.: {todayForecast?.min ?? "--"}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 12,
  },
  temp: {
    fontSize: 48,
    fontWeight: "700",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  minMax: {
    fontSize: 13,
    marginTop: 2,
  },
});

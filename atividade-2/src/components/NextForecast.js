import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { iconForCondition } from "../utils/weatherIcons";

export default function NextForecast({ forecast, theme }) {
  const nextDays = (forecast || []).slice(1, 4);

  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Next Forecast
        </Text>
        <Ionicons name="calendar-outline" size={18} color={theme.textPrimary} />
      </View>

      {nextDays.map((day, idx) => {
        const icon = iconForCondition(day.condition);
        return (
          <View key={idx} style={styles.dayRow}>
            <Text style={[styles.dayLabel, { color: theme.textPrimary }]}>
              {day.weekday}
            </Text>
            <View style={styles.rightGroup}>
              <MaterialCommunityIcons name={icon.name} size={20} color={icon.color} />
              <Text style={[styles.dayTemp, { color: theme.textPrimary }]}>
                {day.max}°
              </Text>
              <Text style={[styles.dayTempMin, { color: theme.textSecondary }]}>
                {day.min}°
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dayTemp: {
    fontSize: 14,
    fontWeight: "600",
  },
  dayTempMin: {
    fontSize: 13,
  },
});

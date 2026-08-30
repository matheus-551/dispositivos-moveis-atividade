import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { iconForWMOCode } from "../utils/weatherIcons";

function formatTodayDate() {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getDate()}`;
}

export default function HourlyForecast({ hourly, theme }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Today</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {formatTodayDate()}
        </Text>
      </View>

      <View style={styles.hoursRow}>
        {hourly.length === 0 ? (
          <Text style={[styles.empty, { color: theme.textSecondary }]}>
            Previsão horária indisponível
          </Text>
        ) : (
          hourly.map((h, idx) => {
            const icon = iconForWMOCode(h.weathercode);
            return (
              <View key={idx} style={styles.hourItem}>
                <Text style={[styles.hourTemp, { color: theme.textPrimary }]}>
                  {h.temp}°C
                </Text>
                <MaterialCommunityIcons name={icon.name} size={26} color={icon.color} />
                <Text style={[styles.hourLabel, { color: theme.textSecondary }]}>
                  {h.hourLabel}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
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
  date: {
    fontSize: 13,
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  hourItem: {
    alignItems: "center",
    gap: 6,
  },
  hourTemp: {
    fontSize: 13,
    fontWeight: "600",
  },
  hourLabel: {
    fontSize: 12,
  },
  empty: {
    fontSize: 13,
    fontStyle: "italic",
  },
});

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { fetchWeatherBundle } from "../api/weatherApi";
import { pickTheme } from "../theme/colors";

import WeatherHeader from "../components/WeatherHeader";
import CurrentWeather from "../components/CurrentWeather";
import StatsRow from "../components/StatsRow";
import HourlyForecast from "../components/HourlyForecast";
import NextForecast from "../components/NextForecast";

const CITIES = ["Recife,PE", "Fortaleza,CE", "São Paulo,SP", "Rio de Janeiro,RJ"];

export default function HomeScreen() {
  const [cityName, setCityName] = useState("Recife,PE");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [cityPickerVisible, setCityPickerVisible] = useState(false);

  const loadWeather = useCallback(async (city) => {
    try {
      setError(null);
      const bundle = await fetchWeatherBundle(city);
      setData(bundle);
    } catch (e) {
      setError(e.message || "Erro ao buscar o clima.");
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    loadWeather(cityName).finally(() => setLoading(false));
  }, [cityName, loadWeather]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWeather(cityName);
    setRefreshing(false);
  }, [cityName, loadWeather]);

  const theme = pickTheme(data?.current?.condition_slug);

  if (loading) {
    return (
      <LinearGradient colors={theme.gradient} style={styles.centered}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={theme.gradient} style={styles.centered}>
        <StatusBar style="light" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => loadWeather(cityName)} style={styles.retryButton}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  const { current, hourly } = data;

  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      >
        <WeatherHeader
          cityName={current.city_name || cityName}
          onPressCity={() => setCityPickerVisible(true)}
          theme={theme}
        />
        <CurrentWeather current={current} theme={theme} />
        <StatsRow current={current} theme={theme} />
        <HourlyForecast hourly={hourly} theme={theme} />
        <NextForecast forecast={current.forecast} theme={theme} />
      </ScrollView>

      <Modal
        visible={cityPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCityPickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCityPickerVisible(false)}
        >
          <View style={styles.modalCard}>
            <FlatList
              data={CITIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setCityName(item);
                    setCityPickerVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 8,
  },
  modalItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  modalItemText: {
    fontSize: 15,
    color: "#1E293B",
  },
});

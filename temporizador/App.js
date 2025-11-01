import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import Temporizador from "./componentes/temporizador";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Temporizador de Estudo</Text>
      <Temporizador />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    marginTop: 40,
    fontWeight: "600",
  },
});

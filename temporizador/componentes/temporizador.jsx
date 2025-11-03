import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Vibration,
} from "react-native";

export default function Temporizador() {
  const [initialMinutes, setInitialMinutes] = useState("25");
  const [segundosRestantes, setSegundosRestantes] = useState(25 * 60);
  const [ativo, setAtivo] = useState(false);
  const [sessoesCompletas, setSessoesCompletas] = useState(0);
  const [segundosTotaisEstudados, setSegundosTotaisEstudados] = useState(0);

  const intervalRef = useRef(null);
  const inicialEmSegundosRef = useRef(25 * 60);

  useEffect(() => {
    const minutos = Number(initialMinutes) || 0;
    inicialEmSegundosRef.current = minutos * 60;
    if (!ativo) {
      setSegundosRestantes(minutos * 60);
    }
  }, [initialMinutes, ativo]);

  useEffect(() => {
    if (ativo) {
      intervalRef.current = setInterval(() => {
        setSegundosRestantes((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [ativo]);

  useEffect(() => {
    if (segundosRestantes <= 0) {
      if (ativo) {
        setAtivo(false);
        clearInterval(intervalRef.current);
        setSessoesCompletas((prev) => prev + 1);
        setSegundosTotaisEstudados(
          (prev) => prev + inicialEmSegundosRef.current
        );

        if (Platform.OS !== "web") Vibration.vibrate(800);
        Alert.alert("Sessão concluída!", "Parabéns — você terminou a sessão!");
      }
      setSegundosRestantes(0);
    }
  }, [segundosRestantes, ativo]);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleStart = () => {
    const minutos = Number(initialMinutes);
    if (!minutos || minutos <= 0) {
      Alert.alert("Atenção", "Defina um número de minutos maior que 0.");
      return;
    }
    if (segundosRestantes <= 0) {
      setSegundosRestantes(minutos * 60);
    }
    setAtivo(true);
    Keyboard.dismiss();
  };

  const handlePause = () => setAtivo(false);
  const handleReset = () => {
    setAtivo(false);
    setSegundosRestantes((Number(initialMinutes) || 0) * 60);
  };

  const handleMinutesChange = (text) => {
    setInitialMinutes(text.replace(/[^0-9]/g, ""));
  };

  const isUrgent = segundosRestantes > 0 && segundosRestantes < 60;

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        value={initialMinutes}
        onChangeText={handleMinutesChange}
        placeholder="Minutos (ex.: 25)"
        keyboardType="numeric"
      />
      <View
        style={[styles.displayContainer, isUrgent && styles.displayContainerUrgent]}
      >
        <Text style={[styles.timerText, isUrgent && styles.timerTextUrgent]}>
          {formatTime(segundosRestantes)}
        </Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePause}>
          <Text style={styles.buttonText}>Pausar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Resetar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsText}>Sessões completas: {sessoesCompletas}</Text>
        <Text style={styles.statsText}>
          Tempo total estudado: {formatTime(segundosTotaisEstudados)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", width: "100%", marginTop: 20 },
  displayContainer: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    borderRadius: 12,
    backgroundColor: "#222",
    alignItems: "center",
  },
  displayContainerUrgent: { backgroundColor: "#8b0000" },
  timerText: { fontSize: 48, color: "#fff", fontWeight: "700" },
  timerTextUrgent: { color: "#fff" },
  controlsRow: { flexDirection: "row", marginTop: 20 },
  button: {
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#0a84ff",
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  input: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "60%",
    textAlign: "center",
  },
  statsBox: {
    marginTop: 20,
    width: "80%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  statsText: { fontSize: 16, marginVertical: 4 },
});

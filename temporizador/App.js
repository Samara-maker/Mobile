
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native';

export default function App() {
  const [initialMinutes, setInitialMinutes] = useState('25'); // string for TextInput
  const [segundosRestantes, setSegundosRestantes] = useState(() => parseInt('25', 10) * 60);
  const [ativo, setAtivo] = useState(false);
  const [sessoesCompletas, setSessoesCompletas] = useState(0);
  const [segundosTotaisEstudados, setSegundosTotaisEstudados] = useState(0);

  const intervalRef = useRef(null);
  const inicialEmSegundosRef = useRef(parseInt('25', 10) * 60);

  // Atualiza segundosRestantes quando o initialMinutes mudar e o timer não estiver ativo
  useEffect(() => {
    const minutos = Number(initialMinutes) || 0;
    inicialEmSegundosRef.current = minutos * 60;
    if (!ativo) {
      setSegundosRestantes(minutos * 60);
    }
  }, [initialMinutes, ativo]);

  // Hook para controlar o setInterval quando `ativo` for true
  useEffect(() => {
    if (ativo) {
      // limpa qualquer intervalo anterior por segurança
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setSegundosRestantes(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [ativo]);

  // Detecta quando segundosRestantes chega a 0
  useEffect(() => {
    if (segundosRestantes <= 0) {
      if (ativo) {
        // parar o timer
        setAtivo(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        // incrementar sessoesCompletas
        setSessoesCompletas(prev => prev + 1);

        // atualizar estatísticas: contabiliza o tempo estudado desta sessão (inicialEmSegundosRef)
        setSegundosTotaisEstudados(prev => prev + inicialEmSegundosRef.current);

        // Vibrar opcionalmente (somente em dispositivos que suportam)
        try {
          if (Platform.OS !== 'web') {
            Vibration.vibrate && Vibration.vibrate(800);
          }
        } catch (e) {
          // ignore
        }

        // Alert visual
        Alert.alert('Sessão concluída', 'Parabéns — você terminou a sessão!');
      }

      // garantir que o contador não fique negativo
      setSegundosRestantes(0);
    }
  }, [segundosRestantes, ativo]);

  // Formatar MM:SS
  const formatTime = (secs) => {
    const s = Math.max(0, Math.floor(secs));
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleStart = () => {
    // se não há tempo definido, não iniciar
    const minutos = Number(initialMinutes);
    if (!minutos || minutos <= 0) {
      Alert.alert('Atenção', 'Defina um número de minutos maior que 0.');
      return;
    }

    // se segundosRestantes for 0, resetar para o tempo inicial antes de iniciar
    if (segundosRestantes <= 0) {
      setSegundosRestantes(minutos * 60);
    }

    setAtivo(true);
    Keyboard.dismiss();
  };

  const handlePause = () => {
    setAtivo(false);
  };

  const handleReset = () => {
    setAtivo(false);
    const minutos = Number(initialMinutes) || 0;
    const segundos = minutos * 60;
    setSegundosRestantes(segundos);
    // Não zera estatísticas — estatísticas acumulam
  };

  const handleMinutesChange = (text) => {
    // permitir apenas números
    const onlyDigits = text.replace(/[^0-9]/g, '');
    setInitialMinutes(onlyDigits);
  };

  // Estética: cor do display quando faltar < 60s
  const isUrgent = segundosRestantes > 0 && segundosRestantes < 60;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Temporizador de Estudo</Text>

      <View style={[styles.displayContainer, isUrgent && styles.displayContainerUrgent]}>
        <Text style={[styles.timerText, isUrgent && styles.timerTextUrgent]}>{formatTime(segundosRestantes)}</Text>
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

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={initialMinutes}
          onChangeText={handleMinutesChange}
          placeholder="Minutos (ex.: 25)"
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsText}>Sessões completas: {sessoesCompletas}</Text>
        <Text style={styles.statsText}>Tempo total estudado: {formatTime(segundosTotaisEstudados)}</Text>
      </View>

      <View style={{ height: 36 }} />

      <Text style={styles.note}>Dica: defina os minutos e pressione Iniciar. O display fica vermelho quando faltar menos de 60 segundos.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 16,
    fontWeight: '600',
  },
  displayContainer: {
    width: '80%',
    paddingVertical: 24,
    borderRadius: 12,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayContainerUrgent: {
    backgroundColor: '#8b0000',
  },
  timerText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '700',
  },
  timerTextUrgent: {
    color: '#fff',
  },
  controlsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#0a84ff',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputRow: {
    marginTop: 18,
    width: '80%',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statsBox: {
    marginTop: 20,
    width: '80%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  statsText: {
    fontSize: 16,
    marginVertical: 4,
  },
  note: {
    marginTop: 12,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
});

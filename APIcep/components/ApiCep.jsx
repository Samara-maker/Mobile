// components/ApiCep.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { styles } from '../styles/globalStyles';

const ApiCep = () => {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const consultarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      setErro('Por favor, insira um CEP válido com 8 dígitos.');
      setDados(null);
      return;
    }

    setCarregando(true);
    setErro('');
    setDados(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error('CEP não encontrado.');
      }

      setDados(data);
    } catch (err) {
      setErro(err.message || 'Erro ao buscar CEP.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Consultar CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP (somente números)"
          keyboardType="numeric"
          value={cep}
          onChangeText={setCep}
          maxLength={9}
        />
        <Button title="Consultar" onPress={consultarCep} color="#28a745" />

        {carregando && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        {dados && (
          <View style={styles.result}>
            <Text>Logradouro: {dados.logradouro || 'Não disponível'}</Text>
            <Text>Bairro: {dados.bairro || 'Não disponível'}</Text>
            <Text>Cidade: {dados.localidade}</Text>
            <Text>Estado: {dados.uf}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ApiCep;

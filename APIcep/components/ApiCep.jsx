import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ApiCep() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarCep = async () => {
    if (!cep || cep.length !== 8) {
      setErro('Digite um CEP válido com 8 dígitos.');
      setDados(null);
      return;
    }

    setLoading(true);
    setErro('');
    setDados(null);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro('CEP não encontrado.');
      } else {
        setDados(response.data);
      }
    } catch (error) {
      setErro('Erro ao buscar o CEP. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consulta de CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP (somente números)"
        keyboardType="numeric"
        maxLength={8}
        value={cep}
        onChangeText={setCep}
      />

      <Button title="Buscar" onPress={buscarCep} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      {dados && (
        <View style={styles.resultado}>
          <Text>Logradouro: {dados.logradouro}</Text>
          <Text>Bairro: {dados.bairro}</Text>
          <Text>Cidade: {dados.localidade}</Text>
          <Text>Estado: {dados.uf}</Text>
          <Text>DDD: {dados.ddd}</Text>
        </View>
      )}
    </View>
  );
}

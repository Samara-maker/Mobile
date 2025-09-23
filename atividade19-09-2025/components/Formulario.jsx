//ESSA PARTE SÃO AS IMPORTAÇÕES
//servem para criar o componente e guardar informações que o usuário digita.

import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from '../styles/globalStyles';
import { ScrollView } from 'react-native';


export default function Formulario() {
  //CADA USESTATE GUARDA O QUE O USUARIO DIGITA

  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [isMenorDeIdade, setIsMenorDeIdade] = useState(false);

  const [nomeError, setNomeError] = useState('');
  const [dataError, setDataError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [telefoneFixoError, setTelefoneFixoError] = useState('');
  const [celularError, setCelularError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmarSenhaError, setConfirmarSenhaError] = useState('');

  // Função para validar CPF CODIGO DISPONIBILIZADO PELO PROFESSOR

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g,'');
    if (cpf === '') return false;
    if (cpf.length !== 11 ||
      cpf === "00000000000",
      cpf === "11111111111",
      cpf === "22222222222", 
      cpf === "33333333333",
      cpf === "44444444444", 
      cpf === "55555555555",
      cpf === "66666666666",
      cpf === "77777777777",
      cpf === "88888888888",
      cpf === "99999999999") return false;

    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const validateForm = () => {
    let isValid = true;

    // Nome completo
    if (!nome.trim() || nome.split(' ').length < 2) {
      setNomeError("Nome completo é obrigatório e deve conter pelo menos dois nomes.");
      isValid = false;
    } else setNomeError('');

    // Data de nascimento
    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataRegex.test(data)) {
      setDataError("Data de nascimento inválida. Use o formato DD/MM/AAAA.");
      isValid = false;
    } else {
      setDataError('');
      const idade = new Date().getFullYear() - new Date(data.split('/').reverse().join('-')).getFullYear();
      if (idade < 18) setIsMenorDeIdade(true);
      else setIsMenorDeIdade(false);
    }

    // CPF
    if (!validarCPF(cpf)) {
      setCpfError("CPF inválido.");
      isValid = false;
    } else setCpfError('');

    // Telefone Fixo
    const telefoneFixoRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
    if (!telefoneFixoRegex.test(telefoneFixo)) {
      setTelefoneFixoError("Telefone fixo inválido. Use o formato (XX) XXXX-XXXX.");
      isValid = false;
    } else setTelefoneFixoError('');

    // Celular
    const celularRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    if (!celularRegex.test(celular)) {
      setCelularError("Celular inválido. Use o formato (XX) 9XXXX-XXXX.");
      isValid = false;
    } else setCelularError('');

    // Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email inválido.");
      isValid = false;
    } else setEmailError('');

    // Senha
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
      setSenhaError("Senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
      isValid = false;
    } else setSenhaError('');

    // Confirmar senha
    if (senha !== confirmarSenha) {
      setConfirmarSenhaError("As senhas não coincidem.");
      isValid = false;
    } else setConfirmarSenhaError('');

    // Campos para menores de idade
    if (isMenorDeIdade && (!nomePai.trim() || !nomeMae.trim())) {
      Alert.alert("Erro", "É necessário preencher o nome do pai e da mãe.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const dados = { nome, data, cpf, telefoneFixo, celular, email, senha };
      console.log("Dados válidos:", dados);
      Alert.alert("Sucesso!", "Formulário enviado com sucesso.");

      // Resetar campos
      setNome(''); setData(''); setCpf(''); setTelefoneFixo('');
      setCelular(''); setEmail(''); setSenha(''); setConfirmarSenha('');
      setNomePai(''); setNomeMae(''); setIsMenorDeIdade(false);
    } else {
      Alert.alert("Erro", "Verifique os campos e tente novamente.");
    }
  };

  return (
    <ScrollView style={globalStyles.scrollContent} keyboardShouldPersistTaps="handled">{

    
    <View style={globalStyles.container}>
      <View style={globalStyles.scrollContent}>
        <Text style={globalStyles.title}>FORMULÁRIO</Text>

        {/* Nome */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, nomeError && globalStyles.inputError]}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
          />
          {nomeError ? <Text style={globalStyles.errorText}>{nomeError}</Text> : null}
        </View>

        {/* Data de Nascimento */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, dataError && globalStyles.inputError]}
            placeholder="Data de Nascimento"
            value={data}
            onChangeText={setData}
          />
          {dataError ? <Text style={globalStyles.errorText}>{dataError}</Text> : null}
        </View>

        {/* CPF */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, cpfError && globalStyles.inputError]}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />
          {cpfError ? <Text style={globalStyles.errorText}>{cpfError}</Text> : null}
        </View>

        {/* Telefone Fixo */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, telefoneFixoError && globalStyles.inputError]}
            placeholder="Telefone Fixo"
            value={telefoneFixo}
            onChangeText={setTelefoneFixo}
          />
          {telefoneFixoError ? <Text style={globalStyles.errorText}>{telefoneFixoError}</Text> : null}
        </View>

        {/* Celular */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, celularError && globalStyles.inputError]}
            placeholder="Celular"
            value={celular}
            onChangeText={setCelular}
          />
          {celularError ? <Text style={globalStyles.errorText}>{celularError}</Text> : null}
        </View>

        {/* Email */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, emailError && globalStyles.inputError]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={globalStyles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Senha */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, senhaError && globalStyles.inputError]}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          {senhaError ? <Text style={globalStyles.errorText}>{senhaError}</Text> : null}
        </View>

        {/* Confirmar Senha */}
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={[globalStyles.input, confirmarSenhaError && globalStyles.inputError]}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          {confirmarSenhaError ? <Text style={globalStyles.errorText}>{confirmarSenhaError}</Text> : null}
        </View>

        {/* Campos para menores de idade */}
        {isMenorDeIdade && (
          <>
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.input}
                placeholder="Nome do Pai"
                value={nomePai}
                onChangeText={setNomePai}
              />
            </View>
            <View style={globalStyles.inputContainer}>
              <TextInput
                style={globalStyles.input}
                placeholder="Nome da Mãe"
                value={nomeMae}
                onChangeText={setNomeMae}
              />
            </View>
          </>
        )}

        {/* Botão de envio */}
        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
    }</ScrollView>
  );
}

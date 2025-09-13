import React, { useState } from "react";
import {Text, View, TextInput, TouchableOpacity, Alert} from "react-native"
import {globalStyles} from'../styles/globalStyles'

export default function Formulario(){
    const[nome, setNome] = useState('');

    const [nomeError, setNomeError] = useState('');

    const[email, setEmail] = useState('')

    const validateForm = () =>{
        let isValid = true;

        if(!nome.trim()){
            setNomeError("Nome é obrigatório")
            isValid = false;
        }else{
            setNomeError("");
        }

        return isValid;
    };

    const validateEmail = () =>{
        let isValid = true
    }

    const handleSubmit = () =>{
        if(validateForm()){
            const dados ={nome};
            console.log("Dados do formulário validos", dados)// aparece no console do inspecionar
            Alert.alert("Sucesso!!!","Formulario enviado com sucesso");
            alert("Sucesso!");
            
            //reseta o formulario
            setNome("")
        }else{
            Alert.alert("Error","Error");
            alert("Error");
        }

    };

    const handleSubmitEmail = () =>{
        
    }

    return(
        <View style={globalStyles.container}>
            <View style={globalStyles.scrollContent}>
                <Text style={globalStyles.title}>FORMULÁRIO</Text>

                <View style={globalStyles.inputContainer}>
                    <TextInput 
                        style={[globalStyles.input, nomeError && globalStyles.inputError]}
                        placeholder="Nome completo"
                        value={nome}    

                        onChangeText={setNome}

                    ></TextInput>
                    {
                        nomeError? <Text style={globalStyles.errorText}>{nomeError}</Text> : null
                    }
                </View>

                <View style={globalStyles.inputContainer}>
                    <TextInput 
                        style={[globalStyles.input, nomeError && globalStyles.inputError]}
                        placeholder="Digite se email"
                        value={email}    

                        onChangeText={setNome}

                    ></TextInput>
                    {
                        nomeError? <Text style={globalStyles.errorText}>{nomeError}</Text> : null
                    }
                </View>
                

                <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                    <Text style={globalStyles.buttonText}>Enviar</Text>
                </TouchableOpacity>

            </View>

        </View>
    )


}


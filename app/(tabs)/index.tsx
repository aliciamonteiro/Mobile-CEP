import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import Api from '../../src/services/api';

export default function App() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUF] = useState("");
  const [loading, setLoading] = useState(false); // Indicador de carregamento

  async function buscarCEP() {
    if (cep === "" || cep.length !== 8) {
      Alert.alert("CEP inválido! Certifique-se de que o CEP tem 8 dígitos.");
      return;
    }

    setLoading(true); // Iniciar o indicador de carregamento

    try {
      const response = await Api.get(`${cep}/json/`);
      console.log(response.data); // Log para verificar a estrutura da resposta

      if (response.data.erro) {
        Alert.alert("CEP não encontrado! Verifique o CEP e tente novamente.");
        limparCampos(); // Limpar os campos se o CEP não for encontrado
      } else {
        setLogradouro(response.data.logradouro || "Não disponível");
        setBairro(response.data.bairro || "Não disponível");
        setLocalidade(response.data.localidade || "");
        setUF(response.data.uf || "");
      }
    } catch (error) {
      Alert.alert("Erro ao buscar CEP! Verifique a conexão e tente novamente.");
    }

    setLoading(false); 
  }

  function limparCampos() {
    setCep("");
    setLogradouro("");
    setBairro("");
    setLocalidade("");
    setUF("");
  }

  return (
    <SafeAreaView style={styles.containerMain}>
      <View style={styles.topBar}>
        <Ionicons name="location" size={32} color="white" />
        <Text style={styles.title}>Buscar CEP</Text>
      </View>

      <View style={styles.containerCEP}>
        <TextInput
          style={styles.input}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Digite o CEP"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCEP}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#00C853" style={styles.loading} />
      )}

      <View style={styles.resultadoContainer}>
        <TextInput
          style={styles.resultadoCEP}
          value={logradouro}
          onChangeText={(texto) => setLogradouro(texto)}
          placeholder="Logradouro"
          placeholderTextColor="#888"
          editable={false}
        />

        <TextInput
          style={styles.resultadoCEP}
          value={bairro}
          onChangeText={(texto) => setBairro(texto)}
          placeholder="Bairro"
          placeholderTextColor="#888"
          editable={false}
        />

        <TextInput
          style={styles.resultadoCEP}
          value={localidade}
          onChangeText={(texto) => setLocalidade(texto)}
          placeholder="Cidade"
          placeholderTextColor="#888"
          editable={false}
        />

        <TextInput
          style={styles.resultadoCEP}
          value={uf}
          onChangeText={(texto) => setUF(texto)}
          placeholder="UF"
          placeholderTextColor="#888"
          editable={false}
        />
      </View>

      <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
        <Text style={styles.botaoLimparText}>Limpar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#00C853", 
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  containerCEP: {
    flexDirection: "row",
    height: 70,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10, 
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#F0F0F0",
  },
  input: {
    height: 50,
    borderColor: "#00C853", 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    width: "70%",
    marginRight: 10,
  },
  botaoBuscar: {
    backgroundColor: "#00C853", 
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 40,
  },
  botaoLimpar: {
    backgroundColor: "#00C853", 
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  botaoLimparText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultadoContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  resultadoCEP: {
    height: 50,
    borderColor: "#00C853", 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF", 
    marginBottom: 10,
    color: '#000', 
  },
  loading: {
    marginTop: 20,
  },
});

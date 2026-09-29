import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    Alert.alert("Sucesso", `Login efetuado para: ${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <View style={styles.topo}>
          <Image
            source={require("../../assets/girocoinlogo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.header}>
          <Image
            source={require("../../assets/girocoinhome.png")}
            style={styles.home}
          />
          <Text style={styles.text1}>
            Seu jogo.
            <Text style={styles.text2}>Seu proximo level.</Text>
          </Text>
          <Text style={styles.subtext}>
            Encontre o que faltava para sua jornada.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#777"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#8E8E93"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  topo: {
    flex: 1,
    justifyContent: "Top",
    alignItems: "center",
  },
  logo: {
    width: 93,
    height: 93,
    alignItems: "center",
  },
  header: {
    flex: 1,
    alignItems: "center",
    marginBottom: 32,
    marginTop: -300, // ajuste de posição para cima
  },
  home: {
    // dimensão da imagem principal
    width: 320,
    height: 182,
  },
  text1: {
    fontSize: 16,
    color: "#050505",
    fontWeight: "bold",
  },
  text2: {
    color: "#A91BFF",
  },
  subtext: {
    fontSize: 16,
    color: "#8E8E93",
  },
  form: {
    width: "100%",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#D9D9D9",
    color: "#fffbfb",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333333",
  },
  button: {
    backgroundColor: "#A91BFF",
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
});

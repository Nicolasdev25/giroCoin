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
import { Ionicons } from "@expo/vector-icons";
import * as Iconsax from "iconsax-react-nativejs";

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
          <Text style={styles.label}></Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#777"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}></Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#8E8E93"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.forgPass}>
            <Text style={styles.fPass}>Esqueci minha senha</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar </Text>
            <View style={styles.iconArrow}>
              <Iconsax.ArrowRight size={28} color="#f9f9f9" variant="Linear" />
            </View>
          </TouchableOpacity>
          {/* Linha1*/}
          <View style={styles.containerDivisoria}>
            {/* Linha da esquerda */}
            <View style={styles.linha} />

            {/* Texto central */}
            <Text style={styles.textoOu}>Ou</Text>

            {/* Linha da direita */}
            <View style={styles.linha} />
          </View>
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
    fontFamily: "Poppins",
  },
  text2: {
    color: "#4B338B",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  subtext: {
    fontSize: 16,
    color: "#8E8E93",
    fontFamily: "Poppins",
  },
  form: {
    width: "100%",
    height: "50%",
    marginTop: -200,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: -20,
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  input: {
    backgroundColor: "rgba(217, 217, 217, 0.3)",
    color: "#fffbfb",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.8)",
    fontFamily: "Poppins",
  },

  fPass: {
    color: "#4B338B",
    textAlign: "right",
    fontSize: 13,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#4B338B",
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    padding: 15,
  },
  buttonText: {
    color: "#FBFBFB",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconArrow: {
    flexDirection: "row",
  },
  linha: {
    flex: 1, // Faz as duas linhas esticarem igualmente para preencher o espaço
    height: 1, // Espessura da linha
    backgroundColor: "#D1D5DB", // Cor da linha (cinza claro)
  },
  textoOu: {
    marginHorizontal: 16, // Afasta o texto das pontas das linhas
    color: "#6B7280", // Cor do texto
    fontSize: 14,
    fontWeight: "500",
  },
});

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
  ScrollView,
} from "react-native";
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
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logomarca */}
          <View style={styles.topo}>
            <Image
              source={require("../../assets/girocoinlogo.png")}
              style={styles.logo}
            />
          </View>
          {/* Section Home */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/girocoinhome.png")}
              style={styles.home}
            />
            <Text style={styles.text1}>
              Seu jogo.
              <Text style={styles.text2}> Seu proximo level.</Text>
            </Text>
            <Text style={styles.subtext}>
              Encontre o que faltava para sua jornada.
            </Text>
          </View>
          {/* Section Login */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#777"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#8E8E93"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {/* Login Button */}
            <View style={styles.forgPass}>
              <Text style={styles.fPass}>Esqueci minha senha</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar </Text>
              <Iconsax.ArrowRight size={28} color="#f9f9f9" variant="Linear" />
            </TouchableOpacity>
            {/* Line Divider */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Ou</Text>
              <View style={styles.line} />
            </View>
            {/* Section Social */}
            <View style={styles.containerSocial}>
              <Image
                source={require("../../assets/googleIcon.png")}
                style={styles.iconG}
              ></Image>
              <Image
                source={require("../../assets/appleIcon.png")}
                style={styles.iconA}
              ></Image>
              <Image
                source={require("../../assets/instaIcon.png")}
                style={styles.iconI}
              ></Image>
            </View>
            {/* Section Footer */}
            <View style={styles.containerFooter}>
              <Text style={styles.textAccount}>Não tem uma conta?</Text>
              <Text style={styles.textCreate}> Criar conta</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  topo: {
    alignItems: "center",
    marginTop: 16,
  },
  logo: { width: 93, height: 93 },
  header: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  home: { width: 320, height: 182 },
  text1: {
    fontSize: 16,
    color: "#050505",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  text2: { color: "#4B338B", fontWeight: "bold", fontFamily: "Poppins" },
  subtext: { fontSize: 16, color: "#8E8E93", fontFamily: "Poppins" },
  form: { width: "100%" },
  input: {
    backgroundColor: "rgba(217, 217, 217, 0.3)",
    color: "#050505",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.8)",
    fontFamily: "Poppins",
  },
  forgPass: { alignItems: "flex-end" },
  fPass: {
    color: "#4B338B",
    fontSize: 13,
    fontFamily: "Poppins",
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B338B",
    borderRadius: 30,
    marginTop: 10,
    padding: 15,
  },
  buttonText: { color: "#FBFBFB", fontSize: 16, fontWeight: "bold" },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#050505",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#8e8e93",
    fontSize: 14,
    fontFamily: "Poppins",
  },
  containerSocial: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
  },
  iconG: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  iconA: {
    width: 56,
    height: 56,
    resizeMode: "contain",
  },
  iconI: {
    width: 56,
    height: 56,
    resizeMode: "contain",
  },
  containerFooter: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
  },
  textAccount: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },
  textCreate: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#4B338B",
  },
});

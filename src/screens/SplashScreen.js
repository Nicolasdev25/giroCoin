import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PURPLE = "#4B338B";
const GRAY = "#8E8E93";
const BACKGROUND = "#fff"; // mesma base das outras telas
const SPLASH_DURATION = 2500; // tempo na splash (ms)
const NEXT_SCREEN = "Login"; // nome da tela de login no navigator

export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo aparece com fade + um leve "pulo" de escala, depois entra o texto
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Depois do tempo da splash, vai para o login.
    // replace: a splash sai da pilha e o botão voltar não retorna a ela.
    const timer = setTimeout(() => {
      navigation.replace(NEXT_SCREEN);
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [navigation, logoOpacity, logoScale, textOpacity]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Animated.View
          style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}
        >
          <Image
            source={require("../../assets/girocoinlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.textWrap, { opacity: textOpacity }]}>
          <Text style={styles.tagline}>
            Seu jogo.
            <Text style={styles.taglineAccent}> Seu próximo level.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Encontre o que faltava para sua jornada.
          </Text>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="small" color={PURPLE} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 180,
  },
  textWrap: {
    alignItems: "center",
    marginTop: 24,
  },
  tagline: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#050505",
    fontFamily: "Poppins",
  },
  taglineAccent: {
    color: PURPLE,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: GRAY,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 40,
  },
});

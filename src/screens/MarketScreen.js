import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ActionBar from "../components/ActionBar";

const PADDING = 20; // margem lateral única para toda a tela

export default function NewScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo + notificação */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/girocoinlogo.png")}
            style={styles.logo}
          />
          <Image
            source={require("../../assets/notification_Icon.png")}
            style={styles.notIcon}
          />
        </View>

        {/* Título e subtítulo */}
        <View style={styles.section}>
          <Text style={styles.textTitle}>Seu Jogo. Seu próximo level</Text>
          <Text style={styles.textSubTitle}>
            Encontre o que falta para sua jornada
          </Text>
        </View>

        {/* Busca */}
        <View style={[styles.section, styles.searchWrap]}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.iconSearch}
            />
            <TextInput
              style={styles.input}
              placeholder="Buscar coins, itens ou services"
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* Banner com o texto dentro da imagem */}
        <View style={[styles.section, styles.bannerWrap]}>
          <ImageBackground
            source={require("../../assets/marketImage.png")}
            style={styles.homeImage}
            imageStyle={styles.homeImageInner}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.lojasTxt}>Lojas</Text>
              <Text style={styles.cadastradasTxt}>Cadastradas</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Fundo cinza > caixa amarela baixa > imagem maior que a caixa */}
        <TouchableOpacity>
          <View style={styles.grayArea}>
            <View style={styles.yellowBox}>
              <Image
                source={require("../../assets/DragonLordStore.png")}
                style={styles.boxImage}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.grayArea}>
            <View style={styles.yellowBox}>
              <Image
                source={require("../../assets/GiroCoinStore.png")}
                style={styles.boxImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Action Bar fixa no rodapé */}
      <View style={styles.actionBarWrap}>
        <ActionBar />
      </View>
    </SafeAreaView>
  );
}

const BOX_HEIGHT = 80; // altura da caixa amarela
const IMAGE_HEIGHT = 130; // altura da imagem (maior que a caixa = efeito de "saltar")
const OVERFLOW = (IMAGE_HEIGHT - BOX_HEIGHT) / 2; // quanto a imagem passa em cima e embaixo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Todas as seções usam a mesma margem lateral
  section: {
    paddingHorizontal: PADDING,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: PADDING,
    paddingTop: 16,
  },
  logo: {
    width: 93,
    height: 93,
    resizeMode: "contain",
  },
  notIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  // Título
  textTitle: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
  textSubTitle: {
    color: "#8E8E93",
    fontSize: 10,
    marginTop: 2,
  },

  // Busca
  searchWrap: {
    marginTop: 22,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    height: 48,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
  },
  iconSearch: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#000",
  },

  // Banner
  bannerWrap: {
    marginTop: 25,
  },
  homeImage: {
    width: "100%",
    height: 150,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
  },
  homeImageInner: {
    borderRadius: 30,
    resizeMode: "cover",
  },
  bannerContent: {
    paddingHorizontal: 20,
  },
  lojasTxt: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "bold",
    color: "#000",
  },
  cadastradasTxt: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "bold",
    color: "#FAD978",
  },

  // Área cinza: afastada das bordas da tela
  grayArea: {
    marginHorizontal: 12,
    marginTop: 25,
    // espaço extra em cima/embaixo para a imagem que passa da caixa amarela
    paddingVertical: OVERFLOW + 15,
    backgroundColor: "#DCDCDC",
    borderRadius: 20,
  },
  // Caixa amarela baixa: a imagem é maior e passa por cima dela
  yellowBox: {
    height: BOX_HEIGHT,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(226, 193, 94, 1)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  boxImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
    resizeMode: "contain",
  },

  // Action bar
  actionBarWrap: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
});

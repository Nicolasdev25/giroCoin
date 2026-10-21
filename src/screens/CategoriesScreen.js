import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ActionBar from "../components/ActionBar";

// Dados dos cards: evita repetir o mesmo bloco 3 vezes
const CARDS = [
  {
    id: "coins",
    image: require("../../assets/bau-basico.png"),
    title: "250 Giro Coins",
    store: "GiroCoin Store",
    status: "Verificado",
    verified: true,
    buttonLabel: "Ver oferta",
  },
  {
    id: "itens-bis",
    image: require("../../assets/item1.png"),
    title: "Itens Bis",
    store: "DragonLord Store",
    status: "Não verificado",
    verified: false,
    buttonLabel: "10% OFF",
  },
  {
    id: "spectre",
    image: require("../../assets/item2.png"),
    title: "Moonsilver Spectre",
    store: "GiroCoin Store",
    status: "Verificado",
    verified: true,
    buttonLabel: "Promoção",
  },
];

const PADDING = 20; // margem lateral única para toda a tela
const GAP = 10;

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const contentWidth = width - PADDING * 2;
  const shortcutWidth = Math.floor((contentWidth - GAP) / 2);
  const cardWidth = Math.floor((contentWidth - GAP * 2) / 3);

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
          <TouchableOpacity onPress={() => navigation.navigate("NotScreen")}>
            <Image
              source={require("../../assets/notification_Icon.png")}
              style={styles.notIcon}
            />
          </TouchableOpacity>
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

        {/* Banner */}
        <View style={[styles.section, styles.bannerWrap]}>
          <Image
            source={require("../../assets/homeImage.png")}
            style={styles.homeImage}
          />
        </View>

        {/* O que você procura? */}
        <View style={[styles.section, styles.sectionTitleWrap]}>
          <Text style={styles.sectionTitle}>O que você procura?</Text>
        </View>

        {/* Atalhos: GiroCoin / Categorias */}
        <View style={[styles.section, styles.shortcutRow]}>
          <TouchableOpacity
            style={[styles.shortcut, { width: shortcutWidth }]}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/iconCoin.png")}
              style={styles.shortcutIcon}
            />
            <Text style={styles.label}>GiroCoin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.shortcut, { width: shortcutWidth }]}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/iconCategorias.png")}
              style={styles.shortcutIcon}
            />
            <Text style={styles.label}>Categorias</Text>
          </TouchableOpacity>
        </View>

        {/* Escolha sua próxima jogada */}
        <View style={[styles.section, styles.sectionTitleWrap]}>
          <Text style={styles.sectionTitle}>Escolha sua próxima jogada</Text>
        </View>

        <View style={[styles.section, styles.cardsRow]}>
          {CARDS.map((card) => (
            <View key={card.id} style={[styles.card, { width: cardWidth }]}>
              <View style={styles.cardImageBg}>
                <Image source={card.image} style={styles.cardImage} />
              </View>

              <Text style={styles.cardText} numberOfLines={1}>
                {card.title}
              </Text>
              <Text style={styles.cardSubTxt} numberOfLines={1}>
                {card.store}
              </Text>
              <View style={styles.statusRow}>
                <Ionicons
                  name={card.verified ? "checkmark-circle" : "close-circle"}
                  size={12}
                  color={card.verified ? "#2E9E4F" : "#D93025"}
                />
                <Text style={styles.statusText} numberOfLines={1}>
                  {card.status}
                </Text>
              </View>

              <TouchableOpacity style={styles.buttonBuy} activeOpacity={0.8}>
                <Text
                  style={styles.btnTxt}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {card.buttonLabel}
                </Text>
                <Image
                  source={require("../../assets/arrow-right.png")}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Bar fixa no rodapé */}
      <View style={styles.actionBarWrap}>
        <ActionBar />
      </View>
    </SafeAreaView>
  );
}

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
    resizeMode: "cover",
  },

  // Títulos de seção
  sectionTitleWrap: {
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Atalhos
  shortcutRow: {
    flexDirection: "row",
    gap: GAP,
  },
  shortcut: {
    height: 80,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  label: {
    color: "#000",
    fontWeight: "bold",
    marginTop: 4,
  },

  // Cards
  cardsRow: {
    flexDirection: "row",
    gap: GAP,
  },
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    alignItems: "center",
    padding: 8,
  },
  cardImageBg: {
    width: "100%",
    height: 90,
    backgroundColor: "rgba(226, 193, 94, 0.4)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  cardText: {
    marginTop: 10,
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  cardSubTxt: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },

  // Status (ícone + texto, centralizados)
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    gap: 4,
  },
  statusText: {
    flexShrink: 1,
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },

  // Botão do card (texto à esquerda, seta à direita)
  buttonBuy: {
    width: "100%",
    height: 35,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 4,
    backgroundColor: "rgba(83, 50, 166, 0.3)",
    borderRadius: 20,
  },
  btnTxt: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B338B",
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  // Action bar
  actionBarWrap: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
});

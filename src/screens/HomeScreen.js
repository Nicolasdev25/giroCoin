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
// screen = nome da tela (no navigator) para onde o botão "Comprar" leva.
// Os cards sem screen ainda não navegam para lugar nenhum.
const CARDS = [
  {
    id: "coins-250",
    image: require("../../assets/bau-basico.png"),
    title: "250 Giro Coins",
    description: "Créditos virtuais na sua Store in game",
    screen: "Cart",
  },
  {
    id: "coins-500",
    image: require("../../assets/bau-pequeno.png"),
    title: "500 Giro Coins",
    description: "Créditos virtuais na sua Store in game",
  },
  {
    id: "coins-750",
    image: require("../../assets/bau-medio.png"),
    title: "750 Giro Coins",
    description: "Créditos virtuais na sua Store in game",
  },
];

const PADDING = 20; // margem lateral única para toda a tela
const GAP = 10; // espaço entre atalhos e entre cards

export default function HomeScreen({ navigation }) {
  // Larguras calculadas a partir da tela: nada passa da margem
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

              {/* Corpo do card: ocupa o espaço livre e empurra o botão para baixo,
                  assim os 3 botões ficam sempre na mesma linha */}
              <View style={styles.cardBody}>
                <Text style={styles.cardText} numberOfLines={2}>
                  {card.title}
                </Text>
                <Text style={styles.cardSubTxt} numberOfLines={3}>
                  {card.description}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.buttonBuy}
                activeOpacity={0.8}
                onPress={() => {
                  if (card.screen) navigation.navigate(card.screen);
                }}
              >
                <Text style={styles.btnTxt}>Comprar</Text>
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

  // Cards (mesma altura: o row estica todos para o mais alto)
  cardsRow: {
    flexDirection: "row",
    gap: GAP,
  },
  card: {
    minHeight: 230,
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
  cardBody: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 10,
  },
  cardText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  cardSubTxt: {
    marginTop: 4,
    fontSize: 10,
    color: "#000",
    textAlign: "center",
  },

  // Botão comprar (texto à esquerda, seta à direita)
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
    fontSize: 12,
    fontWeight: "bold",
    color: "#4B338B",
  },
  arrowIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },

  // Action bar
  actionBarWrap: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
});

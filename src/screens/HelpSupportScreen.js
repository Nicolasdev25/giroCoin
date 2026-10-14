import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function HelpSupportScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Componente reutilizável para os botões de assuntos frequentes
  const TopicButton = ({ icon, title, onPress }) => (
    <TouchableOpacity
      style={styles.topicCard}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.topicIconWrapper}>
        <MaterialCommunityIcons name={icon} size={32} color="#6C56A6" />
      </View>
      <Text style={styles.topicTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerSmallTitle}>Ajuda e Suporte</Text>
          <Text style={styles.headerMainTitle}>Como podemos ajudar?</Text>
        </View>

        {/* Ilustração Principal com círculo de fundo */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Image
              source={require("../../assets/Ajudaimg.png")}
              style={styles.headsetImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify-plus-outline"
            size={28}
            color="#CFCFCF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Busque sua dúvida"
            placeholderTextColor="#C4C4C4"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Seção: Assuntos frequentes */}
        <Text style={styles.sectionTitle}>Assuntos frequentes</Text>

        <View style={styles.topicsList}>
          <TopicButton icon="shopping" title="Compras e entregas" />
          <TopicButton icon="storefront" title="Minha loja" />
          <TopicButton icon="alert-decagram" title="Suporte via chat" />
        </View>

        {/* Botão Voltar para perfil */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>Voltar para perfil</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de Navegação Inferior (Bottom Bar) */}
      <View style={styles.bottomBarWrapper}>
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Feather name="home" size={24} color="#FFD54F" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              size={26}
              color="#FFD54F"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="storefront-outline"
              size={26}
              color="#FFD54F"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="shopping-cart" size={24} color="#FFD54F" />
          </TouchableOpacity>

          {/* Aba Ativa: Perfil */}
          <TouchableOpacity style={styles.activeTabPill}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={22}
              color="#3F2780"
            />
            <Text style={styles.activeTabText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 110,
  },

  header: { alignItems: "center", marginBottom: 16 },
  headerSmallTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    marginBottom: 6,
  },
  headerMainTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
  },

  illustrationContainer: { alignItems: "center", marginVertical: 14 },
  illustrationCircle: {
    width: 155,
    height: 155,
    borderRadius: 77.5,
    backgroundColor: "#E5E2EE",
    alignItems: "center",
    justifyContent: "center",
  },
  headsetImage: { width: 140, height: 140 },

  // Barra de Pesquisa
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    marginTop: 10,
    marginBottom: 24,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: "#333" },

  // Assuntos Frequentes
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#000",
    marginBottom: 14,
  },
  topicsList: { marginBottom: 28 },
  topicCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E2EE",
    borderRadius: 18,
    height: 58,
    paddingHorizontal: 22,
    marginBottom: 14,
  },
  topicIconWrapper: { width: 40, alignItems: "center", marginRight: 18 },
  topicTitle: { fontSize: 18, fontWeight: "800", color: "#000" },

  // Botão Principal
  primaryButton: {
    backgroundColor: "#5C469C",
    borderRadius: 28,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: { color: "#FFF", fontSize: 15, fontWeight: "bold" },

  // Barra de Navegação Inferior
  bottomBarWrapper: { position: "absolute", bottom: 16, left: 16, right: 16 },
  bottomBar: {
    backgroundColor: "#432C85",
    borderRadius: 35,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  activeTabPill: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 24,
  },
  activeTabText: {
    color: "#3F2780",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },
});

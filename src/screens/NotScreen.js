import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";

import ActionBar from "../components/ActionBar";

export default function NotificationScreen({ navigation }) {
  const handleInicioPress = () => {
    console.log("Botão Início pressionado!");

    Alert.alert("Início", "A redirecionar para a página inicial...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título Principal */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Notificações do dia</Text>
          <View style={styles.headerUnderline} />
        </View>

        {/* Seção: Hoje */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hoje</Text>
          <Text style={styles.badgeText}>3 novas</Text>
        </View>

        {/* Card 1 - Pagamento Aprovado */}
        <View style={styles.cardFilled}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/imagemCoinG.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Pagamento aprovado</Text>
            <Text style={styles.cardDescription}>
              Seu pedido #GC012312 de 250GC está aguardando entrega
            </Text>
            <Text style={styles.cardTime}>Há 2 min</Text>
          </View>
        </View>

        {/* Card 2 - Nova Mensagem */}
        <View style={styles.cardFilled}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/minhaloja.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Nova mensagem da loja</Text>
            <Text style={styles.cardDescription}>
              GiroCoin Store: Estamos conferindo os dados do seu pedido.
            </Text>
            <Text style={styles.cardTime}>Há 21 min</Text>
          </View>
        </View>

        {/* Card 3 - Anúncio Aprovado */}
        <View style={styles.cardFilled}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/SanguineClw.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Seu anúncio foi aprovado!</Text>
            <Text style={styles.cardDescription}>
              Seu item já está disponível na sua loja
            </Text>
            <Text style={styles.cardTime}>Há 10 min</Text>
          </View>
        </View>

        {/* Seção: Ontem */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Ontem</Text>
        </View>

        {/* Card 4 - Avaliação */}
        <View style={styles.cardOutlined}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/StarIcon.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Você recebeu uma avaliação</Text>
            <Text style={styles.cardDescription}>
              Um cliente avaliou sua compra.
            </Text>
            <Text style={styles.cardTime}>Ontem, 15:59</Text>
          </View>
        </View>

        {/* Botão de Ação "Inicio" com a função onPress */}
        <TouchableOpacity
          style={styles.mainButton}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Text style={styles.mainButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de Ação Customizada (ActionBar) fixada na parte inferior */}
      <View style={styles.bottomBarContainer}>
        <ActionBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110, // Espaço extra para o ScrollView não ficar coberto pela ActionBar
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0D0D0D",
  },
  headerUnderline: {
    width: 220,
    height: 3,
    backgroundColor: "#00A3FF",
    marginTop: 2,
    borderRadius: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },
  badgeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5C38B8",
  },
  cardFilled: {
    flexDirection: "row",
    backgroundColor: "#EAE6F5",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
  },
  cardOutlined: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#7A52B3",
    padding: 14,
    marginBottom: 24,
    alignItems: "center",
  },
  iconContainer: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0D0D0D",
    marginBottom: 3,
  },
  cardDescription: {
    fontSize: 13,
    color: "#2D2D2D",
    fontWeight: "400",
    lineHeight: 18,
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D2D2D",
  },
  mainButton: {
    backgroundColor: "#6247AA",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  bottomBarContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

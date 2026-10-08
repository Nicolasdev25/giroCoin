import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Section Logo */}

      <View style={styles.containerLogo}>
        <Image
          source={require("../../assets/girocoinlogo.png")}
          style={styles.logo}
        />

        <Image
          source={require("../../assets/notification_Icon.png")}
          style={styles.notIcon}
        />
      </View>

      {/* Section SubTitle*/}

      <View style={styles.subTitle}>
        <Text style={styles.textTitle}>Seu Jogo.Seu próximo level</Text>
        <Text style={styles.textSubTitle}>
          Encontre o que falta para sua jornada
        </Text>
      </View>

      {/*Section Search*/}

      <View style={styles.Barsearch}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          styles={styles.iconSearch}
        />

        <TextInput
          style={styles.input}
          placeholder="Buscar coins, itens ou services"
          placeholderTextColor="#888"
        />
      </View>

      {/* Section image Home */}

      <View style={styles.contHome}>
        <Image
          source={require("../../assets/homeImage.png")}
          style={styles.homeImage}
        ></Image>
      </View>

      {/* Section Text what are you looking for? */}
      <View style={styles.conttSearch}>
        <Text style={styles.textSearch}>O que você procura?</Text>
      </View>

      {/* Section container giro / categories */}

      <View style={styles.containerGc}>
        <TouchableOpacity>
          <View style={styles.giroCoin}>
            <Image
              source={require("../../assets/iconCoin.png")}
              style={styles.icon}
            ></Image>
            <Text style={styles.label}>GiroCoin</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.containerCat}>
            <View style={styles.categories}>
              <Image
                source={require("../../assets/iconCategorias.png")}
                style={styles.iconCat}
              ></Image>
              <Text style={styles.label}>Categorias</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* section text wts */}
      <View style={styles.containerTxt}>
        <Text style={styles.chooseTxt}>Escolha sua próxima jogada</Text>
      </View>
      {/* Section Choose your next move */}
      <View style={styles.containerChoose}>
        <View style={styles.card1}>
          <View style={styles.bg1}>
            <Image
              source={require("../../assets/bau-basico.png")}
              style={styles.trunkBasic}
            ></Image>
            <Text style={styles.cardText}>250 Giro Coins</Text>
            <Text style={styles.cardSubTxt}>
              Créditos virtuais na sua Store in game
            </Text>
            <View style={styles.containerButton}>
              <TouchableOpacity style={styles.buttonBuy}>
                <Text style={styles.btnTxt}>Comprar</Text>
                <Image
                  source={require("..//../assets/arrow-right.png")}
                  style={styles.arrowIcon}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card2}>
          <View style={styles.bg2}>
            <Image
              source={require("../../assets/bau-pequeno.png")}
              style={styles.trunkSmall}
            ></Image>
            <Text style={styles.cardText}>500 Giro Coins</Text>
            <Text style={styles.cardSubTxt}>
              Créditos virtuais na sua Store in game
            </Text>
            <View style={styles.containerButton}>
              <TouchableOpacity style={styles.buttonBuy}>
                <Text style={styles.btnTxt}>Comprar</Text>
                <Image
                  source={require("..//../assets/arrow-right.png")}
                  style={styles.arrowIcon}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card3}>
          <View style={styles.bg3}>
            <Image
              source={require("../../assets/bau-medio.png")}
              style={styles.trunkAverage}
            ></Image>
            <Text style={styles.cardText}>750 Giro Coins</Text>
            <Text style={styles.cardSubTxt}>
              Créditos virtuais na sua Store in game
            </Text>
            <View style={styles.containerButton}>
              <TouchableOpacity style={styles.buttonBuy}>
                <Text style={styles.btnTxt}>Comprar</Text>
                <Image
                  source={require("..//../assets/arrow-right.png")}
                  style={styles.arrowIcon}
                ></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  icon: {
    width: 50,
    height: 50,
  },
  label: {
    textAlign: "justify",
    color: "#000",
    fontWeight: "bold",
    paddingTop: 5,
  },
  containerLogo: {
    flexDirection: "row",
    margin: 16,
    justifyContent: "space-between",
  },
  logo: {
    alignSelf: "flex-start",
    marginTop: 24,
    marginBottom: 3,
    width: 93,
    height: 93,
  },
  notIcon: {
    width: 50,
    height: 50,
    marginTop: 40,
  },
  subTitle: {
    paddingLeft: 20,
  },
  textTitle: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  textSubTitle: {
    color: "#8E8E93",
    fontSize: 10,
    fontFamily: "Inter",
  },
  Barsearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    height: 48,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 16,
    marginTop: 22,
    paddingHorizontal: 8,
  },
  iconSearch: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#8E8E93",
  },
  contHome: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  homeImage: {
    width: 400,
    height: 150,
    borderRadius: 30,
    resizeMode: "cover",
  },
  conttSearch: {
    padding: 20,
  },
  textSearch: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  containerGc: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  giroCoin: {
    width: 200,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
  },
  containerCat: {
    width: 200,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCat: {
    width: 50,
    height: 50,
    marginLeft: 13,
  },
  chooseTxt: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    paddingLeft: 20,
  },
  containerChoose: {
    flexDirection: "row",
    paddingTop: 20,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  card1: {
    width: 130,
    height: 210,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
  },
  card2: {
    width: 130,
    height: 210,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
  },
  card3: {
    width: 130,
    height: 210,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
  },

  bg1: {
    width: 110,
    height: 90,
    backgroundColor: "# rgba(226, 193, 94, 0.4)",
    borderRadius: 12,
  },
  trunkBasic: {
    width: 100,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  bg2: {
    width: 110,
    height: 90,
    backgroundColor: "# rgba(226, 193, 94, 0.4)",
    borderRadius: 12,
  },
  trunkSmall: {
    width: 100,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  bg3: {
    width: 110,
    height: 90,
    backgroundColor: "# rgba(226, 193, 94, 0.4)",
    borderRadius: 12,
  },
  trunkAverage: {
    width: 100,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    paddingTop: 5,
    fontWeight: "bold",
    color: "#000",
  },
  cardSubTxt: {
    color: "#000",
    paddingTop: 5,
    fontSize: 12,
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  buttonBuy: {
    flexDirection: "row",
    width: 110,
    height: 35,
    backgroundColor: "#rgba(83, 50, 166, 0.3)",
    borderRadius: 20,
  },
  btnTxt: {
    padding: 8,
    textAlign: "flex-start",
    fontWeight: "bold",
    color: "#4B338B",
    fontFamily: "Inter",
  },
  arrowIcon: {
    paddingTop: 5,
    width: 30,
    height: 30,
  },
});

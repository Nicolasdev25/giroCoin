import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
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
        <View style={styles.giroCoin}></View>

        <View style={styles.categories}></View>
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
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  giroCoin: {
    width: 200,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
  },
  categories: {
    width: 200,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#DCDCDC",
  },
});

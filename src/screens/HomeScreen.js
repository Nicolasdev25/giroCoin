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

export default function HomeScreen({ navigation }) {
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
          {/* Section Logo */}

          <View style={styles.containerHead}>
            <Image
              source={require("../../assets/girocoinlogo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.containerFooter}>
            <Text style={styles.textAccount}>Não tem uma conta?</Text>
            <Text style={styles.textCreate}> Criar conta</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  containerHead: {
    margin: 16,
  },
  logo: {
    alignSelf: "flex-start",
    marginTop: 24,
    marginBottom: 32,
    width: 93,
    height: 93,
  },
});

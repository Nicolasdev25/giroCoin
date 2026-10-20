import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // <-- Nova importação

export default function VerifyIdentityScreen({ navigation }) {
  // Estados para controlar se o documento já foi enviado (muda a cor da bolinha)
  const [docStatus, setDocStatus] = useState("pending");
  const [selfieStatus, setSelfieStatus] = useState("pending");
  const [addressStatus, setAddressStatus] = useState("pending");

  // Função central que abre a galeria e atualiza o estado
  const handleSelectDocument = async (setStatusFunction) => {
    // Pede permissão para aceder à galeria
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à sua galeria para enviar documentos.",
      );
      return;
    }

    // Abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite recortar a imagem
      quality: 0.8, // Comprime ligeiramente a imagem
    });

    // Se o utilizador escolheu uma foto e não cancelou
    if (!result.canceled) {
      // Aqui você guardaria o result.assets[0].uri para enviar para o seu banco de dados
      // Por agora, vamos apenas mudar o status visual para verde (sucesso)
      setStatusFunction("success");
    }
  };

  // Componente reutilizável atualizado com onPress
  const DocumentOption = ({ title, subtitle, icon, status, onPress }) => (
    <TouchableOpacity style={styles.documentCard} onPress={onPress}>
      <View style={styles.documentIconContainer}>
        <Feather name={icon} size={20} color="#57419D" />
        <View
          style={[
            styles.statusDot,
            status === "success" ? styles.statusGreen : styles.statusRed,
          ]}
        />
      </View>
      <View style={styles.documentTextContainer}>
        <Text style={styles.documentTitle}>{title}</Text>
        {subtitle !== "" && (
          <Text style={styles.documentSubtitle}>{subtitle}</Text>
        )}
      </View>
      {/* Ícone indicando que é clicável */}
      <Feather name="chevron-right" size={20} color="#A0A0A0" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho com a Logo GiroCoins */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/idverificado.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Verifique sua identidade</Text>
          <Text style={styles.subTitle}>
            Isso ajuda a proteger suas compras e vendas.
          </Text>
        </View>

        <View style={styles.stepperContainer}>
          <View style={[styles.stepCircle, styles.stepCompleted]}>
            <Text style={styles.stepTextActive}>1</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepCircle, styles.stepCompleted]}>
            <Text style={styles.stepTextActive}>2</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepCircle, styles.stepActive]}>
            <Text style={styles.stepTextActive}>3</Text>
          </View>
        </View>

        {/* Lista de Documentos Interativa */}
        <View style={styles.documentsList}>
          <DocumentOption
            title="Documento com foto"
            subtitle="RG ou CNH"
            icon="upload"
            status={docStatus}
            onPress={() => handleSelectDocument(setDocStatus)}
          />
          <DocumentOption
            title="Selfie de Confirmação"
            subtitle=""
            icon="user"
            status={selfieStatus}
            onPress={() => handleSelectDocument(setSelfieStatus)}
          />
          <DocumentOption
            title="Comprovante de residência"
            subtitle="Usado somente para verificação"
            icon="home"
            status={addressStatus}
            onPress={() => handleSelectDocument(setAddressStatus)}
          />
        </View>

        {/* Botão de Ação Primária */}
        <TouchableOpacity
          style={styles.yellowButton}
          onPress={() => navigation.navigate("dataCheck")}
        >
          <Text style={styles.yellowButtonText}>Iniciar Verificação</Text>
          <Feather name="arrow-right" size={20} color="#57419D" />
        </TouchableOpacity>

        <View style={styles.securityCard}>
          <View style={styles.securityIconContainer}>
            <Feather name="lock" size={20} color="#57419D" />
          </View>
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>
              Nunca compartilhe sua senha
            </Text>
            <Text style={styles.securityDescription}>
              O GiroCoin nunca pede códigos por WhatsApp, Telefone ou redes
              sociais.
            </Text>
          </View>
        </View>

        {/* Logomarca no Rodapé usando o nome correto da imagem */}
        <View style={styles.footerLogoContainer}>
          <Image
            source={require("../../assets/girocoinlogo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },

  illustrationContainer: { alignItems: "center", marginBottom: 24 },

  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EBE8F4",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeProfile: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#57419D",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },

  titleContainer: { alignItems: "center", marginBottom: 24 },
  mainTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    marginBottom: 4,
  },
  subTitle: { fontSize: 14, color: "#888" },

  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCompleted: { backgroundColor: "#4CAF50" },
  stepActive: { backgroundColor: "#57419D" },
  stepTextActive: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  stepLine: {
    width: 40,
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },

  documentsList: { marginBottom: 32 },
  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCD6EA",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  documentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C4BAD9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#DCD6EA",
  },
  statusGreen: { backgroundColor: "#4CAF50" },
  statusRed: { backgroundColor: "#F44336" },
  documentTextContainer: { flex: 1, justifyContent: "center" },
  documentTitle: { fontSize: 16, fontWeight: "bold", color: "#000" },
  documentSubtitle: { fontSize: 12, color: "#555", marginTop: 2 },

  yellowButton: {
    backgroundColor: "#FFC107",
    borderRadius: 25,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  yellowButtonText: {
    color: "#57419D",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },

  securityCard: {
    flexDirection: "row",
    backgroundColor: "#DCD6EA",
    padding: 16,
    borderRadius: 16,
    marginBottom: 40,
  },
  securityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C4BAD9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  securityTextContainer: { flex: 1 },
  securityTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  securityDescription: { fontSize: 12, color: "#333", lineHeight: 16 },

  footerLogoContainer: { alignItems: "center" },
  logoImage: { width: 130, height: 140, marginBottom: -8, alignSelf: "center" },
});

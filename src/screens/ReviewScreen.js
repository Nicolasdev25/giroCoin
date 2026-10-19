import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ActionBar from "../components/ActionBar";

const PADDING = 20; // margem lateral única para toda a tela
const PURPLE = "#4B318B";
const CARD_STORE = "#D3CDE6"; // card grande
const CARD_INNER = "#E6E2F2"; // campo de texto
const GOLD = "#F5B301";

// Dado de exemplo: troque pelo número real do pedido
const ORDER_ID = "GC-0124";

const pad = (n) => String(n).padStart(2, "0");

// "19/10/2026 às 14:54"
const formatDateTime = (date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} às ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;

export default function ReviewScreen({ navigation }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [orderDate] = useState(() => new Date());

  // Esconde a ActionBar enquanto o teclado está aberto
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const sendReview = () => {
    Keyboard.dismiss();
    // aqui entra o envio da avaliação (rating + comment) para a sua API
    Alert.alert("Obrigado!", "Sua avaliação foi enviada.", [
      { text: "OK", onPress: () => navigation?.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* Botão voltar */}
          <View style={[styles.section, styles.backWrap]}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => navigation?.goBack()}
            >
              <Ionicons name="chevron-back" size={18} color={PURPLE} />
            </TouchableOpacity>
          </View>

          {/* Título */}
          <View style={[styles.section, styles.titleWrap]}>
            <Text style={styles.title}>Pedido concluído</Text>
          </View>

          {/* Imagem + dados do pedido */}
          <View style={[styles.section, styles.heroWrap]}>
            <Image
              source={require("../../assets/iconAvv.png")}
              style={styles.heroImage}
              resizeMode="contain"
            />

            <Text style={styles.orderId}>Pedido #{ORDER_ID}</Text>
            <Text style={styles.orderDate}>
              Realizado em {formatDateTime(orderDate)}
            </Text>
          </View>

          {/* Avaliação */}
          <View style={[styles.section, styles.cardWrap]}>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Como foi sua experiência?</Text>

              {/* Estrelas */}
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    key={value}
                    activeOpacity={0.7}
                    onPress={() => setRating(value)}
                    hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
                  >
                    <Ionicons
                      name={value <= rating ? "star" : "star-outline"}
                      size={38}
                      color={GOLD}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Comentário */}
              <TextInput
                style={styles.commentInput}
                placeholder="Conte como foi a compra (opcional)"
                placeholderTextColor="#6B6B70"
                multiline
                textAlignVertical="top"
                value={comment}
                onChangeText={setComment}
              />

              <Text style={styles.reviewHint}>
                Sua avaliação pode ser positiva ou negativa.
              </Text>

              {/* Botões */}
              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.85}
                onPress={sendReview}
              >
                <Text style={styles.sendButtonText}>Enviar avaliação</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.laterButton}
                activeOpacity={0.8}
                onPress={() => navigation?.goBack()}
              >
                <Text style={styles.laterButtonText}>Avaliar depois</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Action Bar fixa no rodapé (some com o teclado aberto) */}
      {!keyboardVisible && (
        <View style={styles.actionBarWrap}>
          <ActionBar activeKey="carrinho" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Todas as seções usam a mesma margem lateral
  section: {
    paddingHorizontal: PADDING,
  },

  // Voltar
  backWrap: {
    paddingTop: 12,
  },
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },

  // Título
  titleWrap: {
    alignItems: "center",
    marginTop: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },

  // Imagem + pedido
  heroWrap: {
    alignItems: "center",
    marginTop: 22,
  },
  heroImage: {
    width: 120,
    height: 120,
  },
  orderId: {
    marginTop: 18,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  orderDate: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },

  // Card de avaliação
  cardWrap: {
    marginTop: 26,
  },
  reviewCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: CARD_STORE,
    alignItems: "center",
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  starsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  commentInput: {
    width: "100%",
    height: 100,
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: CARD_INNER,
    fontSize: 12,
    color: "#000",
  },
  reviewHint: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  sendButton: {
    width: "75%",
    height: 34,
    marginTop: 10,
    borderRadius: 17,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
  laterButton: {
    width: "75%",
    height: 30,
    marginTop: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: CARD_INNER,
    alignItems: "center",
    justifyContent: "center",
  },
  laterButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: PURPLE,
  },

  // Action bar
  actionBarWrap: {
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
});

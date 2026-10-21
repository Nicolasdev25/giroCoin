import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ActionBar from "../components/ActionBar";

const PADDING = 20; // margem lateral única para toda a tela
const PURPLE = "#4B318B";
const CARD_STORE = "#D3CDE6"; // cards grandes
const CARD_LIGHT = "#DCD7EB"; // resumo
const CARD_INNER = "#E9E5F5"; // campos e opção selecionada
const BUTTON_PURPLE = "#6E58A8";

const PACK_SIZE = 250;
const UNIT_PRICE = 48.25;
const INSTALLMENT_OPTIONS = [1, 2, 3]; // parcelas sem juros (exemplo)

const onlyDigits = (text) => text.replace(/\D/g, "");

// "4111111111111111" -> "4111 1111 1111 1111"
const formatCardNumber = (text) =>
  onlyDigits(text)
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

// "1228" -> "12/28"
const formatExpiry = (text) => {
  const digits = onlyDigits(text).slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};

// 48.25 -> "R$ 48,25"
const formatPrice = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

// Número que aparece no cartão de prévia: dígitos digitados + "•" no resto
const previewNumber = (digits) =>
  digits
    .padEnd(16, "•")
    .replace(/(.{4})/g, "$1 ")
    .trim();

// MM/AA válido e não vencido?
const isValidExpiry = (value) => {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const month = Number(value.slice(0, 2));
  const year = 2000 + Number(value.slice(3));
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  return year > currentYear || (year === currentYear && month >= currentMonth);
};

export default function CardScreen({ navigation, route }) {
  // Vem da tela anterior: navigate("CardScreen", { quantity, total })
  const quantity = route?.params?.quantity ?? 1;
  const total = route?.params?.total ?? UNIT_PRICE * quantity;

  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installments, setInstallments] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const expiryRef = useRef(null);
  const cvvRef = useRef(null);
  const nameRef = useRef(null);
  const processingTimeout = useRef(null);

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
      clearTimeout(processingTimeout.current);
    };
  }, []);

  const digits = onlyDigits(cardNumber);

  const handlePay = () => {
    if (processing) return;
    Keyboard.dismiss();

    if (digits.length !== 16) {
      Alert.alert("Cartão inválido", "O número do cartão deve ter 16 dígitos.");
      return;
    }
    if (holderName.trim().length < 3) {
      Alert.alert("Atenção", "Digite o nome impresso no cartão.");
      return;
    }
    if (!isValidExpiry(expiry)) {
      Alert.alert("Validade inválida", "Confira o mês e o ano (MM/AA).");
      return;
    }
    if (cvv.length < 3) {
      Alert.alert("Atenção", "Digite o código de segurança (CVV).");
      return;
    }

    // Aqui entra o pagamento de verdade: envie os dados direto para o seu
    // gateway (Mercado Pago, Stripe...) e use o token que ele devolver.
    // Nunca guarde número de cartão ou CVV no app nem no seu servidor.
    setProcessing(true);
    processingTimeout.current = setTimeout(() => {
      setProcessing(false);
      navigation.navigate("ApprovedScreen", {
        quantity,
        total,
        method: "card",
      });
    }, 1200);
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
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              onPress={() =>
                navigation.canGoBack()
                  ? navigation.goBack()
                  : navigation.navigate("Home")
              }
            >
              <Ionicons name="chevron-back" size={18} color={PURPLE} />
            </TouchableOpacity>
          </View>

          {/* Título */}
          <View style={[styles.section, styles.titleWrap]}>
            <Text style={styles.title}>Pagamento com cartão</Text>
            <Text style={styles.subtitle}>
              Preencha os dados do cartão para concluir sua compra
            </Text>
          </View>

          {/* Resumo */}
          <View style={[styles.section, styles.cardWrap]}>
            <View style={[styles.card, styles.summaryCard]}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryBold}>
                  {PACK_SIZE * quantity} Giro Coins
                </Text>
                <Text style={styles.summaryBold}>{formatPrice(total)}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(total)}</Text>
              </View>
            </View>
          </View>

          {/* Prévia do cartão (atualiza enquanto digita) */}
          <View style={[styles.section, styles.cardWrap]}>
            <View style={styles.previewCard}>
              <View style={styles.previewTop}>
                <Ionicons name="card-outline" size={30} color="#FFD54F" />
                <Text style={styles.previewLabel}>Crédito</Text>
              </View>

              <Text style={styles.previewNumber}>{previewNumber(digits)}</Text>

              <View style={styles.previewBottom}>
                <View style={styles.previewHolderWrap}>
                  <Text style={styles.previewSmall}>TITULAR</Text>
                  <Text style={styles.previewValue} numberOfLines={1}>
                    {holderName.trim()
                      ? holderName.toUpperCase()
                      : "NOME DO TITULAR"}
                  </Text>
                </View>
                <View>
                  <Text style={styles.previewSmall}>VALIDADE</Text>
                  <Text style={styles.previewValue}>{expiry || "MM/AA"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Dados do cartão */}
          <View style={[styles.section, styles.cardWrap]}>
            <View style={[styles.card, styles.formCard]}>
              <Text style={styles.fieldLabel}>Número do cartão</Text>
              <TextInput
                style={styles.input}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#8C86A3"
                keyboardType="number-pad"
                maxLength={19}
                autoComplete="cc-number"
                textContentType="creditCardNumber"
                returnKeyType="next"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                onSubmitEditing={() => nameRef.current?.focus()}
              />

              <Text style={styles.fieldLabel}>Nome impresso no cartão</Text>
              <TextInput
                ref={nameRef}
                style={styles.input}
                placeholder="Como está no cartão"
                placeholderTextColor="#8C86A3"
                autoCapitalize="characters"
                autoCorrect={false}
                autoComplete="cc-name"
                returnKeyType="next"
                value={holderName}
                onChangeText={setHolderName}
                onSubmitEditing={() => expiryRef.current?.focus()}
              />

              <View style={styles.fieldRow}>
                <View style={styles.fieldHalf}>
                  <Text style={styles.fieldLabel}>Validade</Text>
                  <TextInput
                    ref={expiryRef}
                    style={styles.input}
                    placeholder="MM/AA"
                    placeholderTextColor="#8C86A3"
                    keyboardType="number-pad"
                    maxLength={5}
                    autoComplete="cc-exp"
                    returnKeyType="next"
                    value={expiry}
                    onChangeText={(text) => setExpiry(formatExpiry(text))}
                    onSubmitEditing={() => cvvRef.current?.focus()}
                  />
                </View>

                <View style={styles.fieldHalf}>
                  <Text style={styles.fieldLabel}>CVV</Text>
                  <TextInput
                    ref={cvvRef}
                    style={styles.input}
                    placeholder="123"
                    placeholderTextColor="#8C86A3"
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                    autoComplete="cc-csc"
                    returnKeyType="done"
                    value={cvv}
                    onChangeText={(text) => setCvv(onlyDigits(text))}
                    onSubmitEditing={handlePay}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Parcelas */}
          <View style={[styles.section, styles.cardWrap]}>
            <View style={[styles.card, styles.formCard]}>
              <Text style={styles.fieldLabel}>Parcelas</Text>

              <View style={styles.installmentsRow}>
                {INSTALLMENT_OPTIONS.map((n) => {
                  const selected = installments === n;

                  return (
                    <TouchableOpacity
                      key={n}
                      style={[
                        styles.installment,
                        selected
                          ? styles.installmentSelected
                          : styles.installmentIdle,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => setInstallments(n)}
                    >
                      <Text style={styles.installmentTitle}>{n}x</Text>
                      <Text style={styles.installmentValue}>
                        {formatPrice(total / n)}
                      </Text>
                      <Text style={styles.installmentNote}>sem juros</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Botão fixo no rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, processing && styles.payButtonDisabled]}
          activeOpacity={0.85}
          onPress={handlePay}
          disabled={processing}
        >
          {processing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              <Text style={styles.payButtonText}>
                Pagar {formatPrice(total)}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

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
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B6B70",
    textAlign: "center",
  },

  // Cards (base)
  cardWrap: {
    marginTop: 14,
  },
  card: {
    borderRadius: 14,
    padding: 12,
  },

  // Resumo
  summaryCard: {
    backgroundColor: CARD_LIGHT,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  summaryBold: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(75, 49, 139, 0.3)",
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: PURPLE,
  },

  // Prévia do cartão
  previewCard: {
    height: 170,
    borderRadius: 18,
    padding: 16,
    backgroundColor: PURPLE,
    justifyContent: "space-between",
  },
  previewTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFD54F",
  },
  previewNumber: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#fff",
  },
  previewBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  previewHolderWrap: {
    flex: 1,
    marginRight: 12,
  },
  previewSmall: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#CFC8E3",
  },
  previewValue: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },

  // Formulário
  formCard: {
    backgroundColor: CARD_STORE,
  },
  fieldLabel: {
    marginTop: 4,
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    height: 44,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(75, 49, 139, 0.35)",
    backgroundColor: CARD_INNER,
    fontSize: 14,
    color: "#000",
  },
  fieldRow: {
    flexDirection: "row",
    gap: 10,
  },
  fieldHalf: {
    flex: 1,
  },

  // Parcelas
  installmentsRow: {
    flexDirection: "row",
    gap: 8,
  },
  installment: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  installmentSelected: {
    backgroundColor: CARD_INNER,
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
  installmentIdle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#222",
  },
  installmentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  installmentValue: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "bold",
    color: PURPLE,
  },
  installmentNote: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#000",
  },

  // Rodapé
  footer: {
    paddingHorizontal: PADDING,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  payButton: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: BUTTON_PURPLE,
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  // Action bar
  actionBarWrap: {
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
});

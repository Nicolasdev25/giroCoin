import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ActionBar from "../components/ActionBar";

const PADDING = 20; // margem lateral única para toda a tela
const PURPLE = "#4B318B";
const CARD_STORE = "#CFC8E3"; // card da loja (mais escuro)
const CARD_LIGHT = "#DCD7EB"; // demais cards
const BUTTON_PURPLE = "#6E58A8";

const PACK_SIZE = 250;
const UNIT_PRICE = 48.25;

// Cupom de exemplo: troque/valide depois com a sua API
const VALID_COUPON = "1COMPRA10%";
const COUPON_RATE = 0.1;

// 48.25 -> "R$ 48,25"
const formatPrice = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

const PAYMENT_METHODS = [
  {
    id: "pix",
    title: "Pix",
    subtitle: "Pagamento instantâneo",
    icon: require("../../assets/pixIcon.png"),
  },
  {
    id: "card",
    title: "Cartão",
    subtitle: "Crédito ou Débito",
    icon: require("../../assets/cardIcon.png"),
  },
];

export default function PaymentScreen({ navigation, route }) {
  // Quantidade vem da tela anterior (navigate("Payment", { quantity }))
  const quantity = route?.params?.quantity ?? 1;

  const [method, setMethod] = useState("pix");
  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState(0);

  const subtotal = UNIT_PRICE * quantity;
  const couponValue = subtotal * discountRate;
  const total = Math.max(0, subtotal - couponValue);

  const applyCoupon = () => {
    Keyboard.dismiss();
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      Alert.alert("Atenção", "Digite um código de desconto.");
      return;
    }
    if (code !== VALID_COUPON) {
      setDiscountRate(0);
      Alert.alert("Cupom inválido", "Esse código não existe ou expirou.");
      return;
    }
    setDiscountRate(COUPON_RATE);
  };

  const payLabel =
    method === "pix"
      ? `Gerar Pix de ${formatPrice(total)}`
      : `Pagar ${formatPrice(total)}`;

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.title}>Revisar e pagar</Text>
          <Text style={styles.subtitle}>
            Confira os detalhes da sua compra antes de gerar o Pix.
          </Text>
        </View>

        {/* Card da loja */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.storeCard]}>
            {/* A imagem já traz o nome e "Sua loja oficial"; a nota fica por cima */}
            <View style={styles.storeImageWrap}>
              <Image
                source={require("../../assets/giroCoinStoreIcon.png")}
                style={styles.storeImage}
                resizeMode="contain"
              />

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#F5B301" />
                <Text style={styles.ratingValue}>4,9</Text>
                <Text style={styles.ratingCount}>(123 avaliações)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Resumo da compra */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.summaryCard]}>
            <Text style={styles.summaryTitle}>Resumo da compra</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryBold}>
                Subtotal ({PACK_SIZE * quantity} Giro Coins)
              </Text>
              <Text style={styles.summaryBold}>{formatPrice(subtotal)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryBold}>Cupom</Text>
              <Text style={styles.summaryBold}>
                {discountRate > 0 ? "- " : ""}
                {formatPrice(couponValue)}
              </Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </View>
        </View>

        {/* Forma de pagamento */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.methodCard]}>
            <Text style={styles.methodLabel}>Forma de pagamento</Text>

            <View style={styles.methodRow}>
              {PAYMENT_METHODS.map((item) => {
                const selected = method === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.methodOption,
                      selected
                        ? styles.methodOptionSelected
                        : styles.methodOptionIdle,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setMethod(item.id)}
                  >
                    {/* Bolinha de seleção */}
                    <View style={styles.radioOuter}>
                      {selected && <View style={styles.radioInner} />}
                    </View>

                    <Image
                      source={item.icon}
                      style={styles.methodIcon}
                      resizeMode="contain"
                    />

                    <View style={styles.methodTexts}>
                      <Text style={styles.methodTitle}>{item.title}</Text>
                      <Text style={styles.methodSubtitle} numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Código de desconto */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.couponCard]}>
            <Ionicons name="ticket-outline" size={40} color={PURPLE} />

            <View style={styles.couponContent}>
              <Text style={styles.couponLabel}>Código de Desconto</Text>

              <View style={styles.couponRow}>
                <TextInput
                  style={styles.couponInput}
                  placeholder="1compra10%"
                  placeholderTextColor="#9A93B5"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  onSubmitEditing={applyCoupon}
                />

                <TouchableOpacity
                  style={styles.applyButton}
                  activeOpacity={0.85}
                  onPress={applyCoupon}
                >
                  <Text style={styles.applyText}>Aplicar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botão fixo no rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          activeOpacity={0.85}
          onPress={() => {
            if (method === "pix") {
              navigation.navigate("PixScreen", { quantity, total });
            }
            // pagamento com cartão: entra aqui depois
          }}
        >
          <Ionicons
            name={method === "pix" ? "qr-code-outline" : "card-outline"}
            size={22}
            color="#fff"
          />
          <Text style={styles.payButtonText}>{payLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Action Bar fixa no rodapé */}
      <View style={styles.actionBarWrap}>
        <ActionBar activeKey="carrinho" />
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
    flexGrow: 1,
    paddingBottom: 24,
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

  // Loja
  storeCard: {
    backgroundColor: CARD_STORE,
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  storeImageWrap: {
    height: 95,
    aspectRatio: 540 / 200, // proporção da imagem da loja
  },
  storeImage: {
    width: "100%",
    height: "100%",
  },
  // nota posicionada logo abaixo do texto "Sua loja oficial" da imagem
  ratingRow: {
    position: "absolute",
    left: "44%",
    top: "76%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  ratingCount: {
    fontSize: 11,
    color: "#000",
  },

  // Resumo
  summaryCard: {
    backgroundColor: CARD_LIGHT,
  },
  summaryTitle: {
    fontSize: 12,
    color: "#000",
    marginBottom: 8,
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

  // Forma de pagamento
  methodCard: {
    backgroundColor: CARD_LIGHT,
  },
  methodLabel: {
    width: 80,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  methodRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  methodOption: {
    flex: 1,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  methodOptionSelected: {
    backgroundColor: "#E9E5F5",
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
  methodOptionIdle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#222",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: PURPLE,
  },
  methodIcon: {
    width: 36,
    height: 36,
    marginLeft: 6,
  },
  methodTexts: {
    flex: 1,
    marginLeft: 6,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  methodSubtitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#000",
  },

  // Cupom
  couponCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_LIGHT,
    paddingVertical: 14,
  },
  couponContent: {
    flex: 1,
    marginLeft: 18,
  },
  couponLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
  },
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 6,
  },
  couponInput: {
    flex: 1,
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#C4BCDC",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  applyButton: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },
  applyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
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

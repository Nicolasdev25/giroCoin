import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const PADDING = 20; // margem lateral única para toda a tela
const PURPLE = "#4B318B";
const CARD_STORE = "#CFC8E3"; // card da loja (mais escuro)
const CARD_LIGHT = "#DCD7EB"; // cards de quantidade e entrega

const PACK_NAME = "250 Giro Coins";
const PACK_SIZE = 250;
const UNIT_PRICE = 48.25;
const BUYER_FEE = 0;

// 48.25 -> "R$ 48,25"
const formatPrice = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

export default function CheckoutScreen({ navigation }) {
  const [quantity, setQuantity] = useState(1);

  const subtotal = UNIT_PRICE * quantity;
  const total = subtotal + BUYER_FEE;

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
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

        {/* Título, descrição e preço + imagem das moedas */}
        <View style={[styles.section, styles.productRow]}>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{PACK_NAME}</Text>
            <Text style={styles.productSubtitle}>
              Créditos virtuais no seu perfil
            </Text>
            <Text style={styles.productPrice}>{formatPrice(UNIT_PRICE)}</Text>
          </View>

          {/* IMAGEM DAS MOEDAS: troque esta View por
              <Image source={require("../../assets/SUA_IMAGEM.png")} style={styles.coinsImage} /> */}
          <View style={styles.coinsImage} />
        </View>

        {/* Card da loja */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.storeCard]}>
            {/* IMAGEM DA LOJA: troque por <Image ... style={styles.storeImage} /> */}
            <View style={styles.storeImage} />

            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>GiroCoin Store</Text>
              <Text style={styles.storeSubtitle}>Sua loja oficial</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#F5B301" />
                <Text style={styles.ratingValue}>4,9</Text>
                <Text style={styles.ratingCount}>(123 avaliações)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card de quantidade */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.quantityCard]}>
            <Text style={styles.quantityLabel}>Quantidade</Text>

            <View style={styles.stepper}>
              <TouchableOpacity
                style={styles.stepperMinus}
                onPress={decrease}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={14} color="#555" />
              </TouchableOpacity>

              <Text style={styles.stepperValue}>{quantity}</Text>

              <TouchableOpacity
                style={styles.stepperPlus}
                onPress={increase}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={14} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.packText}>
              1 pacote = {PACK_SIZE} Giro Coins
            </Text>
          </View>
        </View>

        {/* Card de entrega */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.deliveryCard]}>
            <View style={styles.deliveryTop}>
              {/* ÍCONE DE ENTREGA: troque por <Image ... style={styles.deliveryIcon} /> */}
              <View style={styles.deliveryIcon} />

              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryTitle}>Super Entrega</Text>
                <Text style={styles.deliveryText}>
                  Até 5 minutos após o pagamento aprovado.
                </Text>
              </View>
            </View>

            <View style={styles.deliveryLinks}>
              <TouchableOpacity style={styles.deliveryLink} activeOpacity={0.7}>
                <Ionicons
                  name="document-text-outline"
                  size={18}
                  color={PURPLE}
                />
                <Text style={styles.deliveryLinkText} numberOfLines={1}>
                  Regras de entrega
                </Text>
                <Ionicons
                  name="chevron-forward-circle-outline"
                  size={20}
                  color={PURPLE}
                />
              </TouchableOpacity>

              <View style={styles.linkDivider} />

              <TouchableOpacity style={styles.deliveryLink} activeOpacity={0.7}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={18}
                  color={PURPLE}
                />
                <Text style={styles.deliveryLinkText} numberOfLines={1}>
                  Conversar com a loja
                </Text>
                <Ionicons
                  name="chevron-forward-circle-outline"
                  size={20}
                  color={PURPLE}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Resumo da compra */}
        <View style={[styles.section, styles.summary]}>
          <Text style={styles.summaryTitle}>Resumo da compra</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>{PACK_NAME}</Text>
            <Text style={styles.summaryText}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Quantidade</Text>
            <Text style={styles.summaryText}>{quantity}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Taxas do comprador</Text>
            <Text style={styles.summaryText}>{formatPrice(BUYER_FEE)}</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botão fixo no rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          activeOpacity={0.85}
          onPress={() => {
            // navigation.navigate("NomeDaTelaDePagamento");
          }}
        >
          <Text style={styles.payButtonText}>Ir para pagamento</Text>
        </TouchableOpacity>
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

  // Produto
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  productInfo: {
    flex: 1,
    paddingRight: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  productSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  productPrice: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "bold",
    color: PURPLE,
  },
  coinsImage: {
    width: 150,
    height: 100,
    // some com a cor quando você colocar a imagem
    backgroundColor: "rgba(75, 49, 139, 0.08)",
    borderRadius: 12,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_STORE,
  },
  storeImage: {
    width: 100,
    height: 80,
    backgroundColor: "rgba(75, 49, 139, 0.12)",
    borderRadius: 10,
  },
  storeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: PURPLE,
  },
  storeSubtitle: {
    fontSize: 12,
    color: "#000",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
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

  // Quantidade
  quantityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_LIGHT,
    paddingVertical: 14,
  },
  quantityLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
    marginRight: 14,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
  },
  stepperMinus: {
    width: 22,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValue: {
    minWidth: 26,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  stepperPlus: {
    width: 22,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PURPLE,
  },
  packText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },

  // Entrega
  deliveryCard: {
    backgroundColor: CARD_LIGHT,
    paddingTop: 16,
  },
  deliveryTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryIcon: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(75, 49, 139, 0.12)",
    borderRadius: 10,
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 14,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: PURPLE,
  },
  deliveryText: {
    marginTop: 2,
    fontSize: 12,
    color: PURPLE,
  },
  deliveryLinks: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  deliveryLink: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deliveryLinkText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "bold",
    color: PURPLE,
  },
  linkDivider: {
    width: 1,
    height: 22,
    backgroundColor: "rgba(75, 49, 139, 0.35)",
    marginHorizontal: 10,
  },

  // Resumo
  summary: {
    marginTop: 22,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryText: {
    fontSize: 12,
    color: "#000",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#E2E2E2",
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

  // Rodapé
  footer: {
    paddingHorizontal: PADDING,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  payButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

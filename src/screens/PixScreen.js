import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard"; // npx expo install expo-clipboard
import ActionBar from "../components/ActionBar";

const PADDING = 20; // margem lateral única para toda a tela
const PURPLE = "#4B318B";
const CARD_STORE = "#D3CDE6"; // cards grandes
const CARD_INNER = "#E6E2F2"; // card interno claro
const BUTTON_PURPLE = "#6E58A8";

const PACK_SIZE = 250;
const UNIT_PRICE = 48.25;
const EXPIRES_IN_SECONDS = 15 * 60; // tempo para pagar o Pix

// Dados de exemplo: troque pelos dados reais da sua API
const GAME_USER = "João Pekeno";
const ORDER_ID = "GC-0124";
const PIX_CODE = "CODIGO-PIX-DEMONSTRATIVO-GC-0124";

const pad = (n) => String(n).padStart(2, "0");

// 48.25 -> "R$ 48,25"
const formatPrice = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

// "19/10/2026 às 14:54"
const formatDateTime = (date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} às ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;

// 635 -> "10:35"
const formatTimer = (seconds) =>
  `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;

const STEPS = [
  "Copie o código",
  "Abra o aplicativo do seu banco",
  "Confira o valor e confirme",
];

export default function PixScreen({ navigation, route }) {
  // Vem da tela anterior: navigate("PixScreen", { quantity, total })
  const quantity = route?.params?.quantity ?? 1;
  const total = route?.params?.total ?? UNIT_PRICE * quantity;

  const [createdAt] = useState(() => new Date());
  const [secondsLeft, setSecondsLeft] = useState(EXPIRES_IN_SECONDS);
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef(null);

  const expired = secondsLeft <= 0;

  // Contagem regressiva do Pix
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Limpa o aviso "copiado" ao sair da tela
  useEffect(() => () => clearTimeout(copiedTimeout.current), []);

  const copyCode = async () => {
    if (expired) return;
    await Clipboard.setStringAsync(PIX_CODE);
    setCopied(true);
    clearTimeout(copiedTimeout.current);
    copiedTimeout.current = setTimeout(() => setCopied(false), 2000);
  };

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

        {/* Título */}
        <View style={[styles.section, styles.titleWrap]}>
          <Text style={styles.title}>Aguardando pagamento</Text>
          <Text style={styles.subtitle}>
            Faça o pagamento via Pix para concluir sua compra
          </Text>
        </View>

        {/* Card da loja + item comprado */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.orderCard]}>
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

            {/* Item */}
            <View style={styles.itemCard}>
              <Image
                source={require("../../assets/bau-basico.png")}
                style={styles.itemImage}
                resizeMode="contain"
              />

              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {PACK_SIZE * quantity} Giro Coins
                </Text>
                <Text style={styles.itemRecipient}>Destinatário no jogo</Text>
                <Text style={styles.itemUser} numberOfLines={1}>
                  Usuário: {GAME_USER}
                </Text>
              </View>

              <Text style={styles.itemPrice}>{formatPrice(total)}</Text>
            </View>
          </View>
        </View>

        {/* Pedido */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.orderInfoCard]}>
            <Text style={styles.orderId}>Pedido #{ORDER_ID}</Text>
            <Text style={styles.orderDate}>
              Realizado em {formatDateTime(createdAt)}
            </Text>
          </View>
        </View>

        {/* Pix */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.pixCard]}>
            <View style={styles.qrBox}>
              <Ionicons name="qr-code-outline" size={84} color="#8B7FB8" />
              <Text style={styles.qrLabel}>QR DEMONSTRATIVO</Text>
            </View>

            <Text style={styles.expiresText}>
              {expired ? "Pix expirado" : "Expira em "}
              {!expired && (
                <Text style={styles.expiresTimer}>
                  {formatTimer(secondsLeft)}
                </Text>
              )}
            </Text>

            <TouchableOpacity
              style={[styles.copyButton, expired && styles.copyButtonDisabled]}
              activeOpacity={0.85}
              onPress={copyCode}
              disabled={expired}
            >
              <Ionicons
                name={copied ? "checkmark-circle-outline" : "copy-outline"}
                size={26}
                color="#fff"
              />
              <Text style={styles.copyButtonText}>
                {copied ? "Código copiado!" : "Copiar código Pix"}
              </Text>
            </TouchableOpacity>

            {/* Passo a passo */}
            <View style={styles.stepsCard}>
              {STEPS.map((step, index) => (
                <View key={step} style={styles.stepRow}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>

            {/* Aviso */}
            <View style={styles.noticeRow}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={PURPLE}
              />
              <Text style={styles.noticeText} numberOfLines={1}>
                Já pagou? A confirmação aparecerá automaticamente
              </Text>
            </View>
          </View>
        </View>

        {/* Consultar pagamento */}
        <View style={[styles.section, styles.checkWrap]}>
          <TouchableOpacity
            style={styles.checkButton}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("ApprovedScreen", { quantity, total });
            }}
          >
            <Text style={styles.checkButtonText}>Consultar pagamento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

  // Loja + item
  orderCard: {
    backgroundColor: CARD_STORE,
    alignItems: "center",
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

  itemCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 8,
    borderRadius: 12,
    backgroundColor: CARD_INNER,
  },
  itemImage: {
    width: 70,
    height: 70,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  itemRecipient: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
  },
  itemUser: {
    fontSize: 10,
    fontWeight: "bold",
    color: PURPLE,
  },
  itemPrice: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: PURPLE,
  },

  // Pedido
  orderInfoCard: {
    backgroundColor: CARD_STORE,
    alignItems: "center",
    paddingVertical: 8,
  },
  orderId: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  orderDate: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B6B70",
  },

  // Pix
  pixCard: {
    backgroundColor: CARD_STORE,
    alignItems: "center",
  },
  qrBox: {
    width: 150,
    height: 150,
    borderRadius: 16,
    backgroundColor: "#BDB3DA",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  qrLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: PURPLE,
  },
  expiresText: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "bold",
    color: PURPLE,
  },
  expiresTimer: {
    color: "#D93025",
  },
  copyButton: {
    width: "100%",
    height: 46,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: BUTTON_PURPLE,
  },
  copyButtonDisabled: {
    opacity: 0.5,
  },
  copyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  // Passo a passo
  stepsCard: {
    width: "100%",
    marginTop: 12,
    padding: 8,
    borderRadius: 10,
    backgroundColor: CARD_INNER,
    gap: 6,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#C9C1E3",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: PURPLE,
  },
  stepText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },

  // Aviso
  noticeRow: {
    width: "100%",
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#C4BCDC",
  },
  noticeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: PURPLE,
  },

  // Consultar pagamento
  checkWrap: {
    marginTop: 14,
    alignItems: "center",
  },
  checkButton: {
    height: 38,
    paddingHorizontal: 32,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkButtonText: {
    fontSize: 13,
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

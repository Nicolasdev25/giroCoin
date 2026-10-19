import React, { useState } from "react";
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
import ActionBar from "../components/ActionBar";

const PADDING = 20; // margem lateral única para toda a tela
const PURPLE = "#4B318B";
const CARD_STORE = "#D3CDE6"; // cards grandes
const CARD_INNER = "#E6E2F2"; // card interno claro

const PACK_SIZE = 250;
const UNIT_PRICE = 48.25;

// Dado de exemplo: troque pelo usuário real da sua API
const GAME_USER = "João Pekeno";

const pad = (n) => String(n).padStart(2, "0");

// 48.25 -> "R$ 48,25"
const formatPrice = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

// Date -> "15:05"
const formatTime = (date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}`;

const addMinutes = (date, minutes) =>
  new Date(date.getTime() + minutes * 60 * 1000);

export default function ApprovedScreen({ navigation, route }) {
  // Vem da tela anterior: navigate("ApprovedScreen", { quantity, total })
  const quantity = route?.params?.quantity ?? 1;
  const total = route?.params?.total ?? UNIT_PRICE * quantity;

  // Horário da confirmação = momento em que a tela abre (exemplo)
  const [confirmedAt] = useState(() => new Date());

  // Linha do tempo (horários de exemplo: troque pelos reais da sua API)
  const steps = [
    {
      id: "approved",
      title: "Pagamento aprovado",
      text: `Pix confirmado às ${formatTime(confirmedAt)}`,
      icon: "checkmark",
      color: "#2FB457",
      bg: "#CBEED5",
    },
    {
      id: "preparing",
      title: "Preparando entrega",
      text: "A loja já foi avisada e está preparando o seu pedido.",
      icon: "time-outline",
      color: "#E5A416",
      bg: "#FBE9B7",
    },
    {
      id: "delivered",
      title: "Pedido entregue",
      text: `Enviado ao destinatário às ${formatTime(addMinutes(confirmedAt, 6))}`,
      icon: "happy-outline",
      color: PURPLE,
      bg: "#CFC8E8",
    },
  ];

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

        {/* Título + escudo */}
        <View style={[styles.section, styles.headerRow]}>
          <View style={styles.headerTexts}>
            <Text style={styles.title}>Pagamento aprovado</Text>
            <Text style={styles.subtitle}>
              Seu pedido está em processamento
            </Text>
            <Text style={styles.subtitleBold}>
              A loja foi avisada. Entrega prevista até{" "}
              {formatTime(addMinutes(confirmedAt, 5))}
            </Text>
          </View>

          <Image
            source={require("../../assets/paymentConfIcon.png")}
            style={styles.shieldImage}
            resizeMode="contain"
          />
        </View>

        {/* Card do pedido */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.orderCard]}>
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

        {/* Linha do tempo */}
        <View style={[styles.section, styles.cardWrap]}>
          <View style={[styles.card, styles.timelineCard]}>
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;

              return (
                <View key={step.id} style={styles.stepRow}>
                  {/* Bolinha + linha que liga ao próximo passo */}
                  <View style={styles.stepLeft}>
                    <View
                      style={[
                        styles.stepCircle,
                        { borderColor: step.color, backgroundColor: step.bg },
                      ]}
                    >
                      <Ionicons name={step.icon} size={16} color={step.color} />
                    </View>
                    {!isLast && <View style={styles.stepLine} />}
                  </View>

                  <View
                    style={[styles.stepTexts, !isLast && styles.stepTextsGap]}
                  >
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepText}>{step.text}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Avaliar compra */}
        <View style={[styles.section, styles.rateWrap]}>
          <TouchableOpacity
            style={styles.rateButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ReviewScreen")}
          >
            <Text style={styles.rateButtonText}>Avalie sua compra</Text>
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

  // Título + escudo
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  headerTexts: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 11,
    color: "#000",
  },
  subtitleBold: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
  },
  shieldImage: {
    width: 100,
    height: 100,
  },

  // Cards (base)
  cardWrap: {
    marginTop: 14,
  },
  card: {
    borderRadius: 14,
    padding: 12,
  },

  // Pedido
  orderCard: {
    minHeight: 175,
    backgroundColor: CARD_STORE,
    justifyContent: "center",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
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

  // Linha do tempo
  timelineCard: {
    backgroundColor: CARD_STORE,
    padding: 16,
  },
  stepRow: {
    flexDirection: "row",
  },
  stepLeft: {
    width: 28,
    alignItems: "center",
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  // a linha ocupa todo o espaço até o próximo passo
  stepLine: {
    flex: 1,
    width: 2,
    backgroundColor: "#111",
  },
  stepTexts: {
    flex: 1,
    marginLeft: 8,
  },
  stepTextsGap: {
    paddingBottom: 24,
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  stepText: {
    fontSize: 12,
    color: "#000",
  },

  // Avaliar
  rateWrap: {
    marginTop: 40,
  },
  rateButton: {
    height: 42,
    borderRadius: 14,
    backgroundColor: CARD_STORE,
    alignItems: "center",
    justifyContent: "center",
  },
  rateButtonText: {
    fontSize: 15,
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

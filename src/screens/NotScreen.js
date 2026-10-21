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
import ActionBar from "../components/ActionBar";

const PADDING = 20; // margem lateral única para toda a tela
const PURPLE = "#4B318B";
const CARD_UNREAD = "#D3CDE6"; // notificação não lida
const CARD_READ = "#F0EDF8"; // notificação lida
const GOLD = "#E5A416";

// Filtros (chips) do topo
const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "orders", label: "Pedidos" },
  { id: "promos", label: "Promoções" },
];

// Aparência de cada tipo de notificação
const TYPE_STYLE = {
  orders: { icon: "checkmark-circle", color: "#2FB457", bg: "#CBEED5" },
  delivery: { icon: "cube", color: PURPLE, bg: "#CFC8E8" },
  promos: { icon: "pricetag", color: GOLD, bg: "#FBE9B7" },
  system: { icon: "notifications", color: PURPLE, bg: "#CFC8E8" },
};

// Notificações de exemplo: troque pelos dados reais da sua API.
// category = em qual filtro aparece | type = ícone e cor.
const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    category: "orders",
    type: "orders",
    title: "Pagamento aprovado",
    text: "Seu pedido de 250 Giro Coins foi confirmado.",
    time: "Há 5 min",
    unread: true,
  },
  {
    id: "n2",
    category: "orders",
    type: "delivery",
    title: "Pedido entregue",
    text: "Seus Giro Coins já estão na sua conta do jogo.",
    time: "Há 1 h",
    unread: true,
  },
  {
    id: "n3",
    category: "promos",
    type: "promos",
    title: "Cupom de desconto",
    text: "Use 1COMPRA10% e ganhe 10% de desconto na sua compra.",
    time: "Hoje, 09:30",
    unread: true,
  },
  {
    id: "n4",
    category: "orders",
    type: "orders",
    title: "Avalie sua compra",
    text: "Conte como foi sua experiência com a GiroCoin Store.",
    time: "Ontem",
    unread: false,
  },
  {
    id: "n5",
    category: "promos",
    type: "promos",
    title: "Giro Coins em promoção",
    text: "Pacotes de Giro Coins com preço especial por tempo limitado.",
    time: "Ontem",
    unread: false,
  },
  {
    id: "n6",
    category: "system",
    type: "system",
    title: "Bem-vindo à GiroCoin",
    text: "Seu jogo. Seu próximo level. Explore as lojas e comece a jogar.",
    time: "Esta semana",
    unread: false,
  },
];

export default function NotificationCenterScreen({ navigation }) {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const visible =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.category === filter);

  const markAsRead = (id) =>
    setNotifications((list) =>
      list.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );

  const markAllAsRead = () =>
    setNotifications((list) => list.map((n) => ({ ...n, unread: false })));

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
          <Text style={styles.title}>Notificações</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0
              ? `Você tem ${unreadCount} ${
                  unreadCount === 1 ? "nova notificação" : "novas notificações"
                }`
              : "Você está em dia com tudo"}
          </Text>
        </View>

        {/* Filtros + marcar todas */}
        <View style={[styles.section, styles.filtersRow]}>
          <View style={styles.chips}>
            {FILTERS.map((item) => {
              const selected = filter === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.chip, selected && styles.chipSelected]}
                  activeOpacity={0.8}
                  onPress={() => setFilter(item.id)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.section, styles.markAllWrap]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Text
              style={[
                styles.markAllText,
                unreadCount === 0 && styles.markAllDisabled,
              ]}
            >
              Marcar todas como lidas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista */}
        <View style={[styles.section, styles.list]}>
          {visible.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons
                name="notifications-off-outline"
                size={48}
                color="#9A93B5"
              />
              <Text style={styles.emptyTitle}>
                Nenhuma notificação por aqui
              </Text>
              <Text style={styles.emptyText}>
                Quando houver novidades, elas aparecem nesta tela.
              </Text>
            </View>
          ) : (
            visible.map((item) => {
              const look = TYPE_STYLE[item.type] ?? TYPE_STYLE.system;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.item,
                    { backgroundColor: item.unread ? CARD_UNREAD : CARD_READ },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => markAsRead(item.id)}
                >
                  <View
                    style={[
                      styles.itemIcon,
                      { backgroundColor: look.bg, borderColor: look.color },
                    ]}
                  >
                    <Ionicons name={look.icon} size={20} color={look.color} />
                  </View>

                  <View style={styles.itemBody}>
                    <View style={styles.itemTop}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {item.title}
                      </Text>
                      {item.unread && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <Text style={styles.itemTime}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Action Bar fixa no rodapé */}
      <View style={styles.actionBarWrap}>
        <ActionBar activeKey="home" />
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

  // Filtros
  filtersRow: {
    marginTop: 18,
  },
  chips: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PURPLE,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  chipSelected: {
    backgroundColor: PURPLE,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "bold",
    color: PURPLE,
  },
  chipTextSelected: {
    color: "#fff",
  },

  // Marcar todas
  markAllWrap: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  markAllText: {
    fontSize: 12,
    fontWeight: "bold",
    color: PURPLE,
  },
  markAllDisabled: {
    opacity: 0.4,
  },

  // Lista
  list: {
    marginTop: 10,
    gap: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 14,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  itemBody: {
    flex: 1,
    marginLeft: 12,
  },
  itemTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
    backgroundColor: PURPLE,
  },
  itemText: {
    marginTop: 2,
    fontSize: 12,
    color: "#000",
  },
  itemTime: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: "bold",
    color: PURPLE,
  },

  // Vazio
  empty: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
  emptyText: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B6B70",
    textAlign: "center",
  },

  // Action bar
  actionBarWrap: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import ActionBar from "../components/ActionBar";

export default function ProfileScreen({ navigation }) {
  // Componente reutilizável para os 3 cartões de estatísticas (Vendas, Compras, Rejeitadas)
  const StatCard = ({ iconSource, label, count }) => (
    <View style={styles.statCard}>
      <Image source={iconSource} style={styles.statIcon} resizeMode="contain" />
      <View style={styles.statTextContainer}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statCount}>{count}</Text>
      </View>
    </View>
  );

  // Componente reutilizável para as opções do menu de perfil
  const MenuOption = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity
      style={styles.menuCard}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={styles.menuIconWrapper}>
        <MaterialCommunityIcons name={icon} size={28} color="#7A65B5" />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Botão voltar: volta para a tela anterior; se não houver, vai para a Home */}
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
          <Feather name="chevron-left" size={18} color="#4B318B" />
        </TouchableOpacity>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Meu perfil</Text>
          <Text style={styles.subTitle}>
            Sua conta, suas conquistas, tudo em um só lugar.
          </Text>
        </View>

        {/* Seção do Usuário (Avatar + Informações) */}
        <View style={styles.profileRow}>
          <View style={styles.avatarBorder}>
            <Image
              source={require("../../assets/avataruser.png")}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>João Pekeno</Text>

            {/* Selo Perfil Verificado */}
            <View style={styles.verifiedBadge}>
              <View style={styles.verifiedDot}>
                <Feather name="check" size={10} color="#FFF" />
              </View>
              <Text style={styles.verifiedText}>Perfil Verificado</Text>
            </View>

            {/* Avaliação */}
            <View style={styles.ratingRow}>
              <Text style={styles.ratingScore}>4,0</Text>
              <FontAwesome
                name="star"
                size={18}
                color="#FFC107"
                style={styles.starIcon}
              />
            </View>
            <Text style={styles.ratingSubtitle}>
              Avaliação de outros usuários
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Cartões de Estatísticas (Vendas, Compras, Rejeitadas) */}
        <View style={styles.statsRow}>
          <StatCard
            iconSource={require("../../assets/iconvendas.png")}
            label="Vendas"
            count="05"
          />
          <StatCard
            iconSource={require("../../assets/iconcompras.png")}
            label="Compras"
            count="02"
          />
          <StatCard
            iconSource={require("../../assets/iconrejeitadas.png")}
            label="Rejeitadas"
            count="06"
          />
        </View>

        {/* Lista de Opções do Perfil conectada às telas criadas */}
        <View style={styles.menuList}>
          <MenuOption
            icon="account-circle"
            title="Dados pessoais"
            subtitle="Gerencie suas informações"
            onPress={() => navigation.navigate("personalData")}
          />
          <MenuOption
            icon="shield-check"
            title="Segurança da conta"
            subtitle="Senha, verificação e mais"
            onPress={() => navigation.navigate("verifyIden")}
          />
          <MenuOption
            icon="wallet"
            title="Pagamentos e recebimentos"
            subtitle="Suas formas de pagamento"
            onPress={() => navigation.navigate("Payment")}
          />
          <MenuOption
            icon="message-badge"
            title="Notificações"
            subtitle="Escolha o que deseja receber"
            onPress={() => navigation.navigate("NotificationsScreen")}
          />
          <MenuOption
            icon="access-point"
            title="Privacidade"
            subtitle="Controle seus dados e visibilidade"
            onPress={() => navigation.navigate("privacy")}
          />
          <MenuOption
            icon="cog"
            title="Ajuda e suporte"
            subtitle="Tire suas dúvidas conosco - Equipe GiroCoin"
            onPress={() => navigation.navigate("HelpSupportScreen")}
          />
        </View>

        {/* Banner: Minha Loja */}
        <TouchableOpacity style={styles.storeBanner} activeOpacity={0.85}>
          <Image
            source={require("../../assets/minhaloja.png")}
            style={styles.storeImage}
            resizeMode="contain"
          />
          <View style={styles.storeTextContainer}>
            <Text style={styles.storeTitle}>Minha loja</Text>
            <Text style={styles.storeSubtitle}>Gerencie anúncios e vendas</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Action Bar fixa no rodapé (a mesma das outras telas), com Perfil ativo */}
      <View style={styles.actionBarWrap}>
        <ActionBar activeKey="perfil" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
  },

  // Botão voltar (igual ao das outras telas)
  backButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#4B318B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  // Cabeçalho
  header: { marginBottom: 16 },
  mainTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000",
    marginBottom: 2,
  },
  subTitle: { fontSize: 12, fontWeight: "700", color: "#111" },

  // Perfil do Usuário
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  avatarBorder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: "#4CAF50",
    backgroundColor: "#EBE8F4",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 16,
  },
  avatarImage: { width: "100%", height: "100%" },
  userInfo: { flex: 1, justifyContent: "center" },
  userName: { fontSize: 20, fontWeight: "900", color: "#000", marginBottom: 6 },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 6,
  },
  verifiedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  verifiedText: { fontSize: 11, fontWeight: "800", color: "#000" },

  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  ratingScore: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    marginRight: 4,
  },
  starIcon: { marginTop: -2 },
  ratingSubtitle: { fontSize: 11, fontWeight: "700", color: "#222" },

  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 10 },

  // Estatísticas
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCD6EA",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 3,
  },
  statIcon: { width: 34, height: 35, marginRight: 5 },
  statTextContainer: { flex: 1 },
  statLabel: { fontSize: 11, fontWeight: "900", color: "#3F2780" },
  statCount: { fontSize: 13, fontWeight: "900", color: "#5C469C" },

  // Lista de Menus
  menuList: { marginBottom: 6 },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCD6EA",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  menuIconWrapper: {
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuTextContainer: { flex: 1 },
  menuTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#000",
    marginBottom: 1,
  },
  menuSubtitle: { fontSize: 11, fontWeight: "600", color: "#222" },

  // Banner Minha Loja
  storeBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A4BC4",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  storeImage: { width: 72, height: 64, marginRight: 14 },
  storeTextContainer: { flex: 1 },
  storeTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFD54F",
    marginBottom: 2,
  },
  storeSubtitle: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },

  // Action bar
  actionBarWrap: {
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
});

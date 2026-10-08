import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

// ====== Abas da barra ======
// icon       = ícone da aba (PNG amarelo)
// iconActive = (opcional) versão alternativa para quando a aba está ativa.
// Sem iconActive, o ícone ativo é pintado de roxo automaticamente (tintColor).
const TABS = [
  { key: "home", label: "Inicio", icon: require("../../assets/home-icon.png") },
  {
    key: "categorias",
    label: "Categorias",
    icon: require("../../assets/categories-icon.png"),
  },
  { key: "loja", label: "Loja", icon: require("../../assets/shop-icon.png") },
  {
    key: "carrinho",
    label: "Carrinho",
    icon: require("../../assets/shopping-icon.png"),
  },
  {
    key: "perfil",
    label: "Perfil",
    icon: require("../../assets/profile-icon.png"),
  },
];

// ====== Medidas e cores ======
const PURPLE = "#4B318B";
const SIDE_MARGIN = 16; // distância da barra até as bordas da tela (esq. e dir.)
const BAR_H = 72;
const PAD = 8; // espaço lateral dentro da barra
const ACTIVE_W = 140; // largura da aba ativa (a pílula)
const PILL_H = 50;
const ICON = 28;

export default function ActionBar({ onChange }) {
  const { width: screenWidth } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current; // 0..4, posição da pílula

  // A barra ocupa a tela toda, menos a margem lateral
  const barWidth = screenWidth - SIDE_MARGIN * 2;
  // As abas inativas dividem o espaço que sobra depois da pílula
  const INACTIVE_W = (barWidth - PAD * 2 - ACTIVE_W) / (TABS.length - 1);

  const handlePress = (i) => {
    setIndex(i);
    onChange?.(TABS[i].key, i);
    Animated.spring(progress, {
      toValue: i,
      friction: 8,
      tension: 70,
      useNativeDriver: false, // animamos largura/left, então não dá pra usar o driver nativo
    }).start();
  };

  // A pílula anda INACTIVE_W por aba (as abas antes dela são todas "pequenas")
  const pillLeft = progress.interpolate({
    inputRange: [0, TABS.length - 1],
    outputRange: [PAD, PAD + (TABS.length - 1) * INACTIVE_W],
  });

  return (
    <View style={[styles.bar, { width: barWidth }]}>
      {/* Pílula branca que desliza */}
      <Animated.View
        pointerEvents="none"
        style={[styles.pill, { left: pillLeft }]}
      >
        <Text style={styles.label} numberOfLines={1}>
          {TABS[index].label}
        </Text>
      </Animated.View>

      {/* Ícones por cima da pílula */}
      <View style={styles.row}>
        {TABS.map((tab, i) => {
          // A aba cresce quando fica ativa e encolhe quando sai
          const width = progress.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [INACTIVE_W, ACTIVE_W, INACTIVE_W],
            extrapolate: "clamp",
          });
          // Ícone centralizado quando inativo, à esquerda quando ativo
          const paddingLeft = progress.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [(INACTIVE_W - ICON) / 2, 14, (INACTIVE_W - ICON) / 2],
            extrapolate: "clamp",
          });
          const isActive = index === i;
          const source = isActive && tab.iconActive ? tab.iconActive : tab.icon;

          return (
            <Pressable key={tab.key} onPress={() => handlePress(i)}>
              <Animated.View style={[styles.tab, { width, paddingLeft }]}>
                <Image
                  source={source}
                  style={[
                    styles.icon,
                    isActive && !tab.iconActive && { tintColor: PURPLE },
                  ]}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: BAR_H,
    backgroundColor: PURPLE,
    borderRadius: BAR_H / 2,
    alignSelf: "center",
    justifyContent: "center",
    // sombra
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: PAD,
    alignItems: "center",
  },
  pill: {
    position: "absolute",
    top: (BAR_H - PILL_H) / 2,
    width: ACTIVE_W,
    height: PILL_H,
    borderRadius: PILL_H / 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingLeft: 14 + ICON + 8, // deixa espaço pro ícone, o texto fica ao lado
  },
  label: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: "700",
  },
  tab: {
    height: PILL_H,
    justifyContent: "center",
  },
  icon: {
    width: ICON,
    height: ICON,
  },
});

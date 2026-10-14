import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }) {
  // Estados dos interruptores (Atividades da conta começam ativadas, Novidades desativadas)
  const [sales, setSales] = useState(true);
  const [storeMessages, setStoreMessages] = useState(true);
  const [payments, setPayments] = useState(true);
  const [news, setNews] = useState(false);
  const [offers, setOffers] = useState(false);

  // Componente personalizado do interruptor (Switch fiel ao design)
  const CustomSwitch = ({ value, onValueChange }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.switchTrack, 
        value ? styles.switchTrackActive : styles.switchTrackInactive
      ]}
    >
      <View 
        style={[
          styles.switchThumb, 
          value ? styles.switchThumbActive : styles.switchThumbInactive
        ]} 
      />
    </TouchableOpacity>
  );

  // Linha de opção reutilizável
  const NotificationRow = ({ icon, label, value, onChange, isLast }) => (
    <>
      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name={icon} size={22} color="#4A328D" />
          </View>
          <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <CustomSwitch value={value} onValueChange={onChange} />
      </View>
      {!isLast && <View style={styles.divider} />}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerSmallTitle}>Notificações</Text>
          <Text style={styles.headerMainTitle}>
            Gerencie como deseja{'\n'}receber novidades
          </Text>
        </View>

        {/* Ilustração do Sino */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/Group 18402.png')} 
            style={styles.bellImage} 
            resizeMode="contain"
          />
        </View>

        {/* Cartão 1: Atividade da conta */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Atividade da conta</Text>
          
          <NotificationRow 
            icon="cart-outline" 
            label="Compras e vendas" 
            value={sales} 
            onChange={setSales} 
          />
          <NotificationRow 
            icon="forum-outline" 
            label="Mensagens das lojas" 
            value={storeMessages} 
            onChange={setStoreMessages} 
          />
          <NotificationRow 
            icon="swap-horizontal" 
            label="Pagamento e recebimentos" 
            value={payments} 
            onChange={setPayments} 
            isLast={true}
          />
        </View>

        {/* Cartão 2: Novidades */}
        <View style={styles.card}>
          <Text style={styles.cardTitleSmall}>Novidades</Text>
          
          <NotificationRow 
            icon="email-off-outline" 
            label="Novidades da GiroCoin" 
            value={news} 
            onChange={setNews} 
          />
          <NotificationRow 
            icon="tag-off-outline" 
            label="Ofertas e promoções" 
            value={offers} 
            onChange={setOffers} 
            isLast={true}
          />
        </View>

        {/* Botão Voltar para perfil */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>Voltar para perfil</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Barra de Navegação Inferior (Bottom Bar) */}
      <View style={styles.bottomBarWrapper}>
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Feather name="home" size={24} color="#FFD54F" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name="view-grid-plus-outline" size={26} color="#FFD54F" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons name="storefront-outline" size={26} color="#FFD54F" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="shopping-cart" size={24} color="#FFD54F" />
          </TouchableOpacity>

          {/* Aba Ativa: Perfil */}
          <TouchableOpacity style={styles.activeTabPill}>
            <MaterialCommunityIcons name="account-circle-outline" size={22} color="#3F2780" />
            <Text style={styles.activeTabText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 110 },
  
  header: { alignItems: 'center', marginBottom: 12 },
  headerSmallTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 6 },
  headerMainTitle: { fontSize: 24, fontWeight: '900', color: '#000', textAlign: 'center', lineHeight: 30 },
  
  illustrationContainer: { alignItems: 'center', marginVertical: 12 },
  bellImage: { width: 150, height: 150 },
  
  card: { backgroundColor: '#E5E2EE', borderRadius: 20, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#000', marginBottom: 12 },
  cardTitleSmall: { fontSize: 16, fontWeight: '800', color: '#000', marginBottom: 12 },
  
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
  iconBox: { width: 34, height: 34, borderRadius: 8, backgroundColor: '#C5BDD9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rowLabel: { fontSize: 15, color: '#111', fontWeight: '400', flexShrink: 1 },
  divider: { height: 1, backgroundColor: '#CFC9DF', marginVertical: 2 },
  
  // Estilos do Switch Personalizado
  switchTrack: { width: 56, height: 30, borderRadius: 15, padding: 3, justifyContent: 'center' },
  switchTrackActive: { backgroundColor: '#48308A', alignItems: 'flex-end' },
  switchTrackInactive: { backgroundColor: '#8E889E', alignItems: 'flex-start' },
  switchThumb: { width: 24, height: 24, borderRadius: 12 },
  switchThumbActive: { backgroundColor: '#FFFFFF' },
  switchThumbInactive: { backgroundColor: '#48308A' },

  primaryButton: { backgroundColor: '#5C469C', borderRadius: 28, height: 54, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },

  // Estilos da Barra de Navegação Inferior
  bottomBarWrapper: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  bottomBar: { backgroundColor: '#432C85', borderRadius: 35, height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  activeTabPill: { backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 24 },
  activeTabText: { color: '#3F2780', fontWeight: '700', fontSize: 14, marginLeft: 6 },
});
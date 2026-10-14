import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PrivacyScreen({ navigation }) {
  // Estados dos interruptores conforme o design original
  const [publicProfile, setPublicProfile] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  // Componente personalizado do interruptor (Switch fiel ao layout)
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerSmallTitle}>Privacidade</Text>
          <Text style={styles.headerMainTitle}>
            Controle a visibilidade{'\n'}dos seus dados
          </Text>
        </View>

        {/* Ilustração Principal com círculo de fundo */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Image 
              source={require('../../assets/Privacidade_Img.png')} 
              style={styles.shieldImage} 
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Cartão 1: Atividade da conta */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Atividade da conta</Text>
          
          {/* Opção: Perfil Público */}
          <View style={styles.activityBlock}>
            <View style={styles.activityHeaderRow}>
              <Text style={styles.activityOptionTitle}>Perfil Público</Text>
              <CustomSwitch value={publicProfile} onValueChange={setPublicProfile} />
            </View>
            <Text style={styles.activityDescription}>
              Permite que outras pessoas vejam suas informações básicas no GiroCoin.
            </Text>
          </View>

          {/* Opção: Mostrar status online */}
          <View style={[styles.activityBlock, { marginBottom: 0 }]}>
            <View style={styles.activityHeaderRow}>
              <Text style={styles.activityOptionTitle}>Mostrar status online</Text>
              <CustomSwitch value={onlineStatus} onValueChange={setOnlineStatus} />
            </View>
            <Text style={styles.activityDescription}>
              Exibe quanto você está online no GiroCoin.
            </Text>
          </View>
        </View>

        {/* Cartão 2: Seus dados de contato */}
        <View style={styles.card}>
          <Text style={styles.cardTitleSmall}>Seus dados de contato</Text>
          
          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Número de Telefone</Text>
            <CustomSwitch value={showPhone} onValueChange={setShowPhone} />
          </View>

          <View style={styles.divider} />

          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>E-mail de contato</Text>
            <CustomSwitch value={showEmail} onValueChange={setShowEmail} />
          </View>
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
  
  header: { alignItems: 'center', marginBottom: 10 },
  headerSmallTitle: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 4 },
  headerMainTitle: { fontSize: 24, fontWeight: '900', color: '#000', textAlign: 'center', lineHeight: 30 },
  
  illustrationContainer: { alignItems: 'center', marginVertical: 14 },
  illustrationCircle: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    backgroundColor: '#E5E2EE', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  shieldImage: { width: 135, height: 135 },
  
  card: { backgroundColor: '#E5E2EE', borderRadius: 20, padding: 18, marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#000', marginBottom: 14 },
  cardTitleSmall: { fontSize: 16, fontWeight: '800', color: '#000', marginBottom: 10 },
  
  // Estilos de Atividade da Conta
  activityBlock: { marginBottom: 18 },
  activityHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 6 
  },
  activityOptionTitle: { fontSize: 16, fontWeight: '800', color: '#48308A' },
  activityDescription: { fontSize: 13, color: '#333', lineHeight: 18, paddingRight: 16 },

  // Estilos de Dados de Contato
  contactRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 8 
  },
  contactLabel: { fontSize: 15, color: '#111', fontWeight: '400' },
  divider: { height: 1, backgroundColor: '#CFC9DF', marginVertical: 4 },

  // Estilos do Switch Personalizado
  switchTrack: { width: 56, height: 30, borderRadius: 15, padding: 3, justifyContent: 'center' },
  switchTrackActive: { backgroundColor: '#48308A', alignItems: 'flex-end' },
  switchTrackInactive: { backgroundColor: '#8E889E', alignItems: 'flex-start' },
  switchThumb: { width: 24, height: 24, borderRadius: 12 },
  switchThumbActive: { backgroundColor: '#FFFFFF' },
  switchThumbInactive: { backgroundColor: '#48308A' },

  primaryButton: { 
    backgroundColor: '#5C469C', 
    borderRadius: 28, 
    height: 54, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 8 
  },
  primaryButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },

  // Barra de Navegação Inferior
  bottomBarWrapper: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  bottomBar: { 
    backgroundColor: '#432C85', 
    borderRadius: 35, 
    height: 64, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20 
  },
  activeTabPill: { 
    backgroundColor: '#FFFFFF', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    borderRadius: 24 
  },
  activeTabText: { color: '#3F2780', fontWeight: '700', fontSize: 14, marginLeft: 6 },
});
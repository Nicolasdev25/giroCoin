import React from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PersonalDataScreen({ navigation }) {

  // Componente reutilizável para cada bloco de informação pessoal
  const InfoCard = ({ icon, label, value, onPress }) => (
    <TouchableOpacity 
      style={styles.infoCard} 
      activeOpacity={0.7} 
      onPress={onPress}
    >
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons name={icon} size={28} color="#48308A" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerSmallTitle}>Dados pessoais</Text>
          <Text style={styles.headerMainTitle}>
            Mantenha seu cadastro{'\n'}atualizado
          </Text>
        </View>

        {/* Ilustração Principal com círculo de fundo */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Image 
              source={require('../../assets/Identidade.png')} 
              style={styles.idImage} 
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Lista de Dados Pessoais */}
        <View style={styles.cardsList}>
          <InfoCard 
            icon="account-box" 
            label="Nome completo" 
            value="João Pekeno" 
          />
          <InfoCard 
            icon="crown" 
            label="Nome do usuário" 
            value="Pekeno João" 
          />
          <InfoCard 
            icon="cake-variant" 
            label="Data de Nascimento" 
            value="31/12/1990" 
          />
          <InfoCard 
            icon="inbox-arrow-down" 
            label="E-mail" 
            value="joao@example.com" 
          />
          {/* Nota: Mantido "Nome completo" conforme o layout original (pode alterar para "Celular" se preferir) */}
          <InfoCard 
            icon="cellphone" 
            label="Número de celular" 
            value="(21) *****-1234" 
          />
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>Voltar para Perfil</Text>
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
            <MaterialCommunityIcons name="account-circle-outline" size={2} color="#3F2780" />
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
  idImage: { width: 130, height: 130 },
  
  cardsList: { marginBottom: 12 },
  infoCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#E5E2EE', 
    borderRadius: 18, 
    paddingVertical: 14, 
    paddingHorizontal: 18, 
    marginBottom: 12 
  },
  iconWrapper: { 
    width: 42, 
    height: 42, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 14 
  },
  textContainer: { flex: 1, justifyContent: 'center' },
  infoLabel: { fontSize: 15, fontWeight: '700', color: '#000', marginBottom: 2 },
  infoValue: { fontSize: 15, fontWeight: '600', color: '#111' },

  primaryButton: { 
    backgroundColor: '#5C469C', 
    borderRadius: 28, 
    height: 52, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 4
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
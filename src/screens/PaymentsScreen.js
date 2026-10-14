import React from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PaymentsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerSmallTitle}>Pagamentos e recebimento</Text>
          <Text style={styles.headerMainTitle}>
            Gerencie suas formas de{'\n'}pagar e receber
          </Text>
        </View>

        {/* Ilustração Principal (Cartão + Pix) */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/Pagamento_CartPix.png')} 
            style={styles.mainIllustration} 
            resizeMode="contain"
          />
        </View>

        {/* Cartão 1: Cartão de crédito/débito */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cartão de crédito/débito</Text>
          
          <View style={styles.creditCardRow}>
            <Image 
              source={require('../../assets/Pagamento_Card.png')} 
              style={styles.miniCardImage} 
              resizeMode="contain"
            />
            <View style={styles.creditCardInfo}>
              <Text style={styles.creditCardType}>Crédito</Text>
              <Text style={styles.creditCardNumber}>**** 1234</Text>
            </View>
          </View>

          {/* Botão Adicionar Cartão */}
          <TouchableOpacity style={styles.outlinedButtonInsideCard}>
            <View style={styles.plusIconBox}>
              <Feather name="plus" size={18} color="#48308A" />
            </View>
            <Text style={styles.outlinedButtonText}>Adicionar cartão</Text>
          </TouchableOpacity>

          {/* Link Remover Cartão */}
          <TouchableOpacity style={styles.removeCardButton}>
            <Text style={styles.removeCardText}>Remover cartão</Text>
          </TouchableOpacity>
        </View>

        {/* Cartão 2: Recebimento via PIX */}
        <View style={styles.card}>
          <View style={styles.pixHeaderRow}>
            <Text style={styles.cardTitleSmall}>Recebimento via PIX</Text>
            <TouchableOpacity style={styles.changePixBadge}>
              <Text style={styles.changePixBadgeText}>Alterar chave pix</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pixInfoRow}>
            <Text style={styles.pixLabel}>Tipo de chave:</Text>
            <Text style={styles.pixValue}>E-mail</Text>
          </View>

          <View style={styles.pixInfoRow}>
            <Text style={styles.pixLabel}>Chave Pix:</Text>
            <Text style={styles.pixValue}>joao@example.com</Text>
          </View>

          <View style={styles.pixInfoRow}>
            <Text style={styles.pixLabel}>Titular:</Text>
            <Text style={styles.pixValue}>João Pekeno da Quebrada</Text>
          </View>
        </View>

        {/* Botão Externo: Adicionar chave Pix */}
        <TouchableOpacity style={styles.outlinedButtonOutside}>
          <View style={styles.plusIconBox}>
            <Feather name="plus" size={18} color="#48308A" />
          </View>
          <Text style={styles.outlinedButtonText}>Adicionar chave Pix</Text>
        </TouchableOpacity>

        {/* Botão Principal: Voltar para perfil */}
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
  
  header: { alignItems: 'center', marginBottom: 8 },
  headerSmallTitle: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 4 },
  headerMainTitle: { fontSize: 23, fontWeight: '900', color: '#000', textAlign: 'center', lineHeight: 28 },
  
  illustrationContainer: { alignItems: 'center', marginVertical: 10 },
  mainIllustration: { width: 155, height: 155 },
  
  card: { backgroundColor: '#E5E2EE', borderRadius: 20, padding: 16, marginBottom: 14 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 12 },
  cardTitleSmall: { fontSize: 16, fontWeight: '800', color: '#000' },
  
  // Secção do Cartão de Crédito
  creditCardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  miniCardImage: { width: 135, height: 82, marginRight: 16 },
  creditCardInfo: { justifyContent: 'center' },
  creditCardType: { fontSize: 16, color: '#48308A', fontWeight: '500', marginBottom: 4 },
  creditCardNumber: { fontSize: 16, color: '#48308A', fontWeight: '600' },
  
  outlinedButtonInsideCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#48308A', 
    borderRadius: 12, 
    height: 46, 
    marginBottom: 12 
  },
  plusIconBox: { 
    width: 26, 
    height: 26, 
    borderRadius: 6, 
    backgroundColor: '#C5BDD9', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 10 
  },
  outlinedButtonText: { fontSize: 14, fontWeight: '700', color: '#48308A' },
  
  removeCardButton: { alignItems: 'center', paddingVertical: 2 },
  removeCardText: { fontSize: 14, fontWeight: '700', color: '#48308A' },

  // Secção PIX
  pixHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  changePixBadge: { backgroundColor: '#CFC9DF', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  changePixBadgeText: { fontSize: 11, fontWeight: '700', color: '#48308A' },
  
  pixInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  pixLabel: { width: 110, fontSize: 13, color: '#222', fontWeight: '400' },
  pixValue: { flex: 1, fontSize: 13, color: '#111', fontWeight: '500' },

  // Botões Externos
  outlinedButtonOutside: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#48308A', 
    borderRadius: 12, 
    height: 46, 
    marginBottom: 16,
    backgroundColor: '#FFFFFF'
  },
  primaryButton: { 
    backgroundColor: '#5C469C', 
    borderRadius: 28, 
    height: 52, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  primaryButtonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },

  // Barra de Navegação Inferior
  bottomBarWrapper: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  bottomBar: { backgroundColor: '#432C85', borderRadius: 35, height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  activeTabPill: { backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 24 },
  activeTabText: { color: '#3F2780', fontWeight: '700', fontSize: 14, marginLeft: 6 },
});
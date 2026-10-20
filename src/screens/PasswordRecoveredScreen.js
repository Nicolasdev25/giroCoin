import React from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PasswordRecoveredScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho Alinhado à Esquerda */}
        <View style={styles.header}>
          <Text style={styles.badgeText}>CONCLUÍDO</Text>
          <Text style={styles.mainTitle}>
            Senha recuperada{'\n'}com sucesso
          </Text>
          <Text style={styles.subTitle}>
            Sua nova senha foi encaminhada para o e-mail cadastrado
          </Text>
        </View>

        {/* Ilustração Principal (Envelope + Check) */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/senharecuperada.png')} 
            style={styles.mainIllustration} 
            resizeMode="contain"
          />
        </View>

        {/* Cartão de Aviso: Caixa de Spam */}
        <View style={styles.infoCard}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="email-outline" size={24} color="#48308A" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Verifique a sua caixa de spam</Text>
            <Text style={styles.infoDescription}>
              Sua senha foi redefinida! Use a nova senha enviada ao seu e-mail para acessar a conta.
            </Text>
          </View>
        </View>

        {/* Botão Principal: Login */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
          <Feather name="arrow-right" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Logomarca no Rodapé */}
        <View style={styles.footerLogoContainer}>
          <Image 
            source={require('../../assets/girocoinlogo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { 
    flexGrow: 1, 
    paddingHorizontal: 28, 
    paddingTop: 48, 
    paddingBottom: 28,
    justifyContent: 'space-between'
  },
  
  // Cabeçalho
  header: { alignItems: 'flex-start', marginBottom: 20 },
  badgeText: { 
    fontSize: 13, 
    fontWeight: '800', 
    color: '#48308A', 
    marginBottom: 4,
    letterSpacing: 0.5 
  },
  mainTitle: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: '#000000', 
    lineHeight: 34, 
    marginBottom: 10 
  },
  subTitle: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#111111', 
    lineHeight: 19 
  },

  // Ilustração
  illustrationContainer: { alignItems: 'center', marginVertical: 18 },
  mainIllustration: { width: 200, height: 200 },

  // Cartão de Aviso (Spam)
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E2EE',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 32,
  },
  iconBox: {
    width: 40,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#B5ABC9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoTextContainer: { flex: 1 },
  infoTitle: { 
    fontSize: 14, 
    fontWeight: '900', 
    color: '#3F2780', 
    marginBottom: 4 
  },
  infoDescription: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#48308A', 
    lineHeight: 17 
  },

  // Botão Login
  primaryButton: {
    backgroundColor: '#5C469C',
    borderRadius: 28,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  primaryButtonText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: '700', 
    marginRight: 10 
  },

  // Rodapé
  footerLogoContainer: { alignItems: 'center' },
  logoImage: { width: 95, height: 95 },
});
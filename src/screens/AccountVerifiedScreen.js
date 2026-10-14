import React from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AccountVerifiedScreen({ navigation }) {
  
  // Componente reutilizável para os cartões de benefício
  const BenefitCard = ({ title, description, icon }) => (
    <View style={styles.benefitCard}>
      <View style={styles.iconContainer}>
        <Feather name={icon} size={20} color="#57419D" />
        <View style={styles.statusGreenDot} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.benefitTitle}>{title}</Text>
        <Text style={styles.benefitDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Ilustração Principal */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/usuarioverificado.png')} 
            style={styles.mainIcon} 
            resizeMode="contain"
          />
        </View>

        {/* Título e Subtítulo */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Conta verificada!</Text>
          <Text style={styles.subTitle}>
            Agora você pode comprar e vender{'\n'}com mais segurança.
          </Text>
        </View>

        {/* Stepper: Todos os passos concluídos (Verdes) */}
        <View style={styles.stepperContainer}>
          <View style={[styles.stepCircle, styles.stepCompleted]}>
            <Feather name="check" size={16} color="#FFF" />
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepCircle, styles.stepCompleted]}>
            <Feather name="check" size={16} color="#FFF" />
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepCircle, styles.stepCompleted]}>
            <Feather name="check" size={16} color="#FFF" />
          </View>
        </View>

        {/* Lista de Benefícios */}
        <View style={styles.benefitsList}>
          <BenefitCard 
            title="Perfil verificado" 
            description="Mais confiança para negociar na comunidade GiroCoin." 
            icon="user" 
          />
          <BenefitCard 
            title="Limites de transação liberadas" 
            description="Compre e venda sem restrições." 
            icon="database" 
          />
          <BenefitCard 
            title="Proteção adicional contra fraudes" 
            description="Sua conta mais segura em todas as transações" 
            icon="shield" 
          />
        </View>

        {/* Botão de Fazer Login */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')} // Encerra o fluxo e volta para a tela de Login
        >
          <Text style={styles.primaryButtonText}>Fazer Login</Text>
          <Feather name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>

        {/* Link de Verificação em Duas Etapas */}
        <TouchableOpacity style={styles.twoStepLinkContainer}>
          <Text style={styles.twoStepLinkText}>Ative a verificação de duas etapas.</Text>
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
  scrollContainer: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },
  
  illustrationContainer: { alignItems: 'center', marginBottom: 24 },
  mainIcon: { width: 120, height: 120 },
  
  titleContainer: { alignItems: 'center', marginBottom: 24 },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#000', marginBottom: 8 },
  subTitle: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 20 },
  
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  stepCompleted: { backgroundColor: '#4CAF50' },
  stepLine: { width: 40, height: 1, backgroundColor: '#E0E0E0', marginHorizontal: 8 },
  
  benefitsList: { marginBottom: 32 },
  benefitCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBE8F4', padding: 16, borderRadius: 16, marginBottom: 12 },
  iconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#C4BAD9', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  statusGreenDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#EBE8F4' },
  textContainer: { flex: 1, justifyContent: 'center' },
  benefitTitle: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  benefitDescription: { fontSize: 12, color: '#555', lineHeight: 16 },
  
  primaryButton: { backgroundColor: '#57419D', borderRadius: 25, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  
  twoStepLinkContainer: { alignItems: 'center', marginBottom: 32 },
  twoStepLinkText: { fontSize: 14, fontWeight: 'bold', color: '#57419D' },

  footerLogoContainer: { alignItems: 'center' },
  logoImage: { width: 80, height: 80 },
});
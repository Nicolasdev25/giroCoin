import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  // Estado para alternar entre 'email' e 'whatsapp'
  const [selectedMethod, setSelectedMethod] = useState('email');
  const [email, setEmail] = useState('');

  const isEmailSelected = selectedMethod === 'email';
  const isWhatsappSelected = selectedMethod === 'whatsapp';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Ilustração Principal */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/Verificarsenha.png')} 
            style={styles.mainIllustration} 
            resizeMode="contain"
          />
        </View>

        {/* Título e Subtítulo */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Esqueceu sua senha?</Text>
          <Text style={styles.subTitle}>Escolha uma forma de recuperar o acesso à sua conta.</Text>
        </View>

        {/* Opção 1: Receber link por e-mail */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => setSelectedMethod('email')}
          style={[
            styles.optionCard, 
            isEmailSelected ? styles.cardActive : styles.cardInactive
          ]}
        >
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="email-fast-outline" size={24} color="#57419D" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={[styles.optionTitle, !isEmailSelected && styles.textMuted]}>
                Receber link por e-mail
              </Text>
              <Text style={styles.optionSubtitle}>
                Enviaremos as instruções para o e-mail cadastrado.
              </Text>
            </View>
            <View style={[styles.radioCircle, isEmailSelected ? styles.radioActive : styles.radioInactive]} />
          </View>

          <Text style={styles.inputLabel}>E-mail cadastrado</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#9A94A6"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setSelectedMethod('email')}
          />

          <TouchableOpacity 
            style={isEmailSelected ? styles.primaryActionBtn : styles.disabledActionBtn}
            onPress={() => {
            setSelectedMethod('email');
            navigation.navigate('PasswordRecoveredScreen');
                }}
            >
            <Text style={isEmailSelected ? styles.primaryActionText : styles.disabledActionText}>
             Enviar link de recuperação
            </Text>
        </TouchableOpacity>
        </TouchableOpacity>

        {/* Opção 2: Receber código por WhatsApp */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => setSelectedMethod('whatsapp')}
          style={[
            styles.optionCard, 
            isWhatsappSelected ? styles.cardActive : styles.cardInactive
          ]}
        >
          <View style={[styles.cardHeaderRow, { marginBottom: 20 }]}>
            <View style={[styles.iconCircle, !isWhatsappSelected && styles.iconCircleMuted]}>
              <FontAwesome name="whatsapp" size={24} color="#7A6B9E" />
            </View>
            <View style={styles.cardHeaderText}>
              <Text style={[styles.optionTitle, !isWhatsappSelected && styles.textMuted]}>
                Receber código por WhatsApp
              </Text>
            </View>
            <View style={[styles.radioCircle, isWhatsappSelected ? styles.radioActive : styles.radioInactive]} />
          </View>

          <TouchableOpacity 
            style={isWhatsappSelected ? styles.primaryActionBtn : styles.disabledActionBtn}
            onPress={() => {
              setSelectedMethod('whatsapp');
              navigation.navigate('ConfirmDataScreen');
            }}
          >
            <Text style={isWhatsappSelected ? styles.primaryActionText : styles.disabledActionText}>
              Enviar mensagem
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Cartão de Suporte: Perdeu acesso ao seu e-mail? */}
        <View style={styles.supportCard}>
          <View style={styles.supportTopRow}>
            <View style={styles.supportIconCircle}>
              <MaterialCommunityIcons name="forum-outline" size={24} color="#48308A" />
            </View>
            <View style={styles.supportTextContainer}>
              <Text style={styles.supportTitle}>Perdeu acesso ao seu e-mail?</Text>
              <Text style={styles.supportDescription}>
                Nossa equipe pode ajudar a verificar sua identidade
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.supportLinkRow}
            onPress={() => navigation.navigate('HelpSupportScreen')}
          >
            <Text style={styles.supportLinkText}>Falar com o suporte</Text>
            <Feather name="arrow-right" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Botão Voltar para entrar */}
        <TouchableOpacity 
          style={styles.backToLoginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Feather name="arrow-left" size={16} color="#48308A" />
          <Text style={styles.backToLoginText}>Voltar para entrar</Text>
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
  scrollContainer: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 32 },
  
  illustrationContainer: { alignItems: 'center', marginBottom: 14 },
  mainIllustration: { width: 145, height: 145 },
  
  titleContainer: { alignItems: 'center', marginBottom: 20 },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#000', marginBottom: 4 },
  subTitle: { fontSize: 12, fontWeight: '700', color: '#888', textAlign: 'center' },

  // Cartões de Opção
  optionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
  },
  cardActive: {
    backgroundColor: '#E5E1EE',
    borderColor: '#48308A',
  },
  cardInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#BDB4D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleMuted: {
    backgroundColor: '#D6D0E5',
  },
  cardHeaderText: { flex: 1, marginRight: 8 },
  optionTitle: { fontSize: 15, fontWeight: '800', color: '#000', marginBottom: 2 },
  textMuted: { color: '#666' },
  optionSubtitle: { fontSize: 12, fontWeight: '700', color: '#888', lineHeight: 16 },

  // Radio Button
  radioCircle: { width: 16, height: 16, borderRadius: 8 },
  radioActive: { backgroundColor: '#FFC107', borderWidth: 1.5, borderColor: '#3F2780' },
  radioInactive: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBBBBB' },

  // Input de E-mail
  inputLabel: { fontSize: 16, fontWeight: '800', color: '#000', marginBottom: 6 },
  emailInput: {
    backgroundColor: '#DCD6EA',
    borderWidth: 1,
    borderColor: '#9E93B8',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },

  // Botões Internos dos Cartões
  primaryActionBtn: {
    backgroundColor: '#5C469C',
    borderRadius: 20,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 22,
  },
  primaryActionText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },

  disabledActionBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledActionText: { color: '#CCCCCC', fontSize: 15, fontWeight: '700' },

  // Cartão de Suporte
  supportCard: {
    backgroundColor: '#CFC6E4',
    borderRadius: 22,
    padding: 18,
    marginBottom: 22,
  },
  supportTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  supportIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#A99BC9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  supportTextContainer: { flex: 1 },
  supportTitle: { fontSize: 15, fontWeight: '900', color: '#000', marginBottom: 2 },
  supportDescription: { fontSize: 12, fontWeight: '800', color: '#48308A', lineHeight: 16 },
  supportLinkRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  supportLinkText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginRight: 6 },

  // Botão Voltar e Rodapé
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backToLoginText: { color: '#48308A', fontSize: 13, fontWeight: '700', marginLeft: 6 },

  footerLogoContainer: { alignItems: 'center' },
  logoImage: { width: 95, height: 95 },
});
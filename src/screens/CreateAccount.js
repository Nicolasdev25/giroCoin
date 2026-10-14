import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CreateAccountScreen({ navigation }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const FormInput = ({ label, icon, placeholder, secureTextEntry, isPassword }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Feather name={icon} size={20} color="#A0A0A0" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholder={placeholder} 
          placeholderTextColor="#A0A0A0"
          secureTextEntry={secureTextEntry && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#A0A0A0" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho com a Logo GiroCoins */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/girocoinlogo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
          
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Criar sua conta</Text>
          <Text style={styles.subTitle}>Seu jogo. <Text style={styles.boldText}>Seu próximo level.</Text></Text>
        </View>

        {/* Indicador de Passos */}
        <View style={styles.stepperContainer}>
          <View style={[styles.stepCircle, styles.stepActive]}><Text style={styles.stepTextActive}>1</Text></View>
          <View style={styles.stepLine} />
          <View style={styles.stepCircle}><Text style={styles.stepTextInactive}>2</Text></View>
          <View style={styles.stepLine} />
          <View style={styles.stepCircle}><Text style={styles.stepTextInactive}>3</Text></View>
        </View>

        {/* Formulário */}
        <FormInput label="Nome Completo" icon="user" placeholder="Digite seu nome completo" />
        <FormInput label="E-mail" icon="mail" placeholder="Digite seu melhor e-mail" />
        <FormInput label="Celular" icon="phone" placeholder="DDD+ Número" />
        <FormInput label="Senha" icon="lock" placeholder="Digite sua senha" secureTextEntry={true} isPassword={true} />

        <View style={styles.passwordStrength}>
          <View style={styles.strengthBars}>
            <View style={styles.strengthBar} /><View style={styles.strengthBar} /><View style={styles.strengthBar} />
          </View>
          <Text style={styles.strengthText}>Use 6 ou mais caracteres</Text>
        </View>

        {/* Termos e Privacidade */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setTermsAccepted(!termsAccepted)}>
            <View style={[styles.checkbox, termsAccepted && styles.checkboxActive]}>
              {termsAccepted && <Feather name="check" size={14} color="#FFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Li e aceito os <Text style={styles.linkText}>Termos de uso</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setPrivacyAccepted(!privacyAccepted)}>
            <View style={[styles.checkbox, privacyAccepted && styles.checkboxActive]}>
              {privacyAccepted && <Feather name="check" size={14} color="#FFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Li a <Text style={styles.linkText}>Política de privacidade</Text></Text>
          </TouchableOpacity>
        </View>

        {/* Botão Principal com navegação corrigida */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ConfirmDataScreen')}
        >
          <Text style={styles.primaryButtonText}>Continuar</Text>
          <Feather name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>

        {/* Navegação Tradicional de Volta para Home/Login */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>
            Já tem uma conta?{' '}
            <Text 
              style={styles.linkTextBold} 
              onPress={() => navigation.navigate('Home')} 
            >
              Entrar
            </Text>
          </Text>
          <View style={styles.footerLine} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },
  header: { alignItems: 'center', marginBottom: 24 },
  logoImage: { width: 140, height: 140, marginBottom: -8 },
  brandTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  brandSubtitle: { fontSize: 12, color: '#666' },
  titleContainer: { alignItems: 'center', marginBottom: 24 },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#000', marginBottom: 4 },
  subTitle: { fontSize: 12, color: '#888' },
  boldText: { fontWeight: 'bold', color: '#57419D' },
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center' },
  stepActive: { backgroundColor: '#57419D' },
  stepTextActive: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  stepTextInactive: { color: '#999', fontWeight: 'bold', fontSize: 14 },
  stepLine: { width: 40, height: 1, backgroundColor: '#E0E0E0', marginHorizontal: 8 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 8 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F5F7', borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 12, paddingHorizontal: 16, height: 50 },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 14, color: '#333' },
  passwordStrength: { marginBottom: 24, marginTop: -8 },
  strengthBars: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  strengthBar: { height: 4, flex: 1, backgroundColor: '#D9D9D9', borderRadius: 2, marginHorizontal: 2 },
  strengthText: { fontSize: 12, color: '#999' },
  checkboxContainer: { marginBottom: 32 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: '#C0C0C0', borderRadius: 6, marginRight: 10, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: '#57419D', borderColor: '#57419D' },
  checkboxLabel: { fontSize: 14, color: '#333', fontWeight: '600' },
  linkText: { color: '#57419D', textDecorationLine: 'underline' },
  primaryButton: { backgroundColor: '#57419D', borderRadius: 25, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  footerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  footerText: { marginHorizontal: 12, fontSize: 12, color: '#888' },
  linkTextBold: { color: '#57419D', fontWeight: 'bold' },
});
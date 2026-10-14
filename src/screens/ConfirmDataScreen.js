import React, { useState, useRef } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  SafeAreaView, ScrollView, Image 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ConfirmDetails({ navigation }) {
  // Estado para armazenar os 6 dígitos do código
  const [code, setCode] = useState(['', '', '', '', '', '']);
  
  // Referências para controlar o foco automático das caixas de texto
  const inputRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Salta automaticamente para o próximo quadrado se digitar um número
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    // Volta para o quadrado anterior se apagar o número
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho com a Logo GiroCoins */}
                <View style={styles.header}>
                  <Image 
                    source={require('../../assets/Verificado.png')} 
                    style={styles.logoImage} 
                    resizeMode="contain"
                  />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Confirme seus dados</Text>
          <Text style={styles.subTitle}>Enviamos um código para seu e-mail</Text>
        </View>

        {/* Stepper: Passo 1 (Verde), Passo 2 (Roxo), Passo 3 (Cinza) */}
        <View style={styles.stepperContainer}>
          <View style={[styles.stepCircle, styles.stepCompleted]}>
            <Text style={styles.stepTextActive}>1</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepCircle, styles.stepActive]}>
            <Text style={styles.stepTextActive}>2</Text>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.stepCircle}>
            <Text style={styles.stepTextInactive}>3</Text>
          </View>
        </View>

        {/* Chips de Contato */}
        <View style={styles.contactRow}>
          <View style={styles.contactChip}>
            <View style={styles.chipIcon}>
              <Feather name="mail" size={16} color="#57419D" />
            </View>
            <Text style={styles.chipText}>joao***@email.com</Text>
          </View>

          <View style={styles.contactChip}>
            <View style={styles.chipIcon}>
              <Feather name="phone" size={16} color="#57419D" />
            </View>
            <Text style={styles.chipText}>(21) *****-1234</Text>
          </View>
        </View>

        {/* Inputs do Código */}
        <Text style={styles.inputLabel}>Digite o código de 6 digitos</Text>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputRefs.current[index] = ref}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
            />
          ))}
        </View>

        {/* Temporizador */}
        <Text style={styles.timerText}>
          Reenviar código em <Text style={styles.timerHighlight}>00:55</Text>
        </Text>

        {/* Botão Principal com navegação corrigida */}
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate('VerifyIdentityScreen')}
                >
                  <Text style={styles.primaryButtonText}>Confirmar código</Text>
                  <Feather name="arrow-right" size={20} color="#FFF" />
                </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>Alterar meus dados</Text>
        </TouchableOpacity>

        {/* Aviso de Segurança */}
        <View style={styles.securityCard}>
          <View style={styles.securityIconContainer}>
            <Feather name="lock" size={20} color="#57419D" />
          </View>
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Nunca compartilhe sua senha</Text>
            <Text style={styles.securityDescription}>
              O GiroCoin nunca pede códigos por WhatsApp, Telefone ou redes sociais.
            </Text>
          </View>
        </View>

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
  shieldBackground: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#EBE8F4', alignItems: 'center', justifyContent: 'center' },
  checkBadge: { position: 'absolute', bottom: 25, right: 25, backgroundColor: '#4CAF50', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
  
  titleContainer: { alignItems: 'center', marginBottom: 24 },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#000', marginBottom: 4 },
  subTitle: { fontSize: 14, color: '#888' },
  
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center' },
  stepCompleted: { backgroundColor: '#4CAF50' }, // Verde para o passo 1
  stepActive: { backgroundColor: '#57419D' },   // Roxo para o passo 2
  stepTextActive: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  stepTextInactive: { color: '#999', fontWeight: 'bold', fontSize: 14 },
  stepLine: { width: 40, height: 1, backgroundColor: '#E0E0E0', marginHorizontal: 8 },
  
  contactRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  contactChip: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#EBE8F4', paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, marginHorizontal: 4 },
  chipIcon: { marginRight: 8 },
  chipText: { fontSize: 12, fontWeight: '600', color: '#000' },
  
  inputLabel: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 12, textAlign: 'center' },
  codeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  codeInput: { width: 45, height: 55, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#000', backgroundColor: '#FFF' },
  
  timerText: { textAlign: 'center', fontSize: 14, color: '#000', fontWeight: '600', marginBottom: 24 },
  timerHighlight: { color: '#57419D' },
  
  primaryButton: { backgroundColor: '#57419D', borderRadius: 25, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  
  secondaryButton: { height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  secondaryButtonText: { color: '#57419D', fontSize: 16, fontWeight: 'bold' },
  
  securityCard: { flexDirection: 'row', backgroundColor: '#D7D1E8', padding: 16, borderRadius: 16, marginBottom: 40 },
  securityIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#AEA2CF', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  securityTextContainer: { flex: 1 },
  securityTitle: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  securityDescription: { fontSize: 12, color: '#333', lineHeight: 16 },

  footerLogoContainer: { alignItems: 'center' },
  logoImage: { width: 130, height: 140, marginBottom: -8, alignSelf: 'center' },
});
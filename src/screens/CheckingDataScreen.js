import React from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  SafeAreaView, Image 
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CheckingDataScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Ilustração Principal com a imagem Verificandotime.png */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/Verificandotime.png')} 
            style={styles.mainIcon} 
            resizeMode="contain"
          />
        </View>

        {/* Textos Principais */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Estamos verificando{'\n'}seus dados</Text>
          <Text style={styles.subTitle}>
            Normalmente isso leva alguns minutos{'\n'}Avisaremos quando terminar
          </Text>
        </View>

        {/* Cartão de Notificação */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Feather name="bell" size={24} color="#57419D" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Você pode fechar o aplicativo</Text>
            <Text style={styles.infoDescription}>
              Avisaremos por notificação quando a verificação for concluída.
            </Text>
          </View>
        </View>

        {/* Espaço flexível para empurrar o botão para o fundo, mantendo a estrutura limpa */}
        <View style={styles.spacer} />

        {/* Botão de Ação Primária */}
        <TouchableOpacity 
          style={styles.yellowButton}
          onPress={() => navigation.navigate('AccountVerifiedScreen')} // O botão leva o utilizador de volta à Home/Dashboard
        >
          <Text style={styles.yellowButtonText}>Acompanhar Verificação</Text>
          <Feather name="arrow-right" size={20} color="#57419D" />
        </TouchableOpacity>

        {/* Logomarca GiroCoin no Rodapé */}
        <View style={styles.footerLogoContainer}>
          <Image 
            source={require('../../assets/girocoinlogo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 24 },
  
  illustrationContainer: { alignItems: 'center', marginBottom: 24 },
  mainIcon: { width: 140, height: 140 }, 
  
  titleContainer: { alignItems: 'center', marginBottom: 40 },
  mainTitle: { fontSize: 26, fontWeight: '900', color: '#000', textAlign: 'center', marginBottom: 24, lineHeight: 32 },
  subTitle: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 22, fontWeight: '600' },
  
  infoCard: { flexDirection: 'row', backgroundColor: '#DCD6EA', padding: 16, borderRadius: 16, alignItems: 'center' },
  infoIconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#C4BAD9', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  infoTextContainer: { flex: 1 },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 4 },
  infoDescription: { fontSize: 13, color: '#444', lineHeight: 18 },
  
  spacer: { flex: 1 },
  
  yellowButton: { backgroundColor: '#FFC107', borderRadius: 25, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 },
  yellowButtonText: { color: '#57419D', fontSize: 16, fontWeight: 'bold', marginRight: 8 },

  footerLogoContainer: { alignItems: 'center' },
  logoImage: { width: 80, height: 80 },
});
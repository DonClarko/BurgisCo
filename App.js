import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';

export default function App() {
  if (Platform.OS === 'web') {
    return (
      <LanguageProvider>
        <View style={styles.webContainer}>
          <View style={styles.phoneFrame}>
            <View style={styles.notch} />
            <View style={styles.screen}>
              <StatusBar style="light" />
              <AppNavigator />
            </View>
            <View style={styles.homeIndicator}>
              <View style={styles.homeBar} />
            </View>
          </View>
        </View>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  phoneFrame: {
    width: 390,
    height: 844,
    backgroundColor: '#000',
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 6,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    position: 'relative',
  },
  notch: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    width: 126,
    height: 28,
    backgroundColor: '#000',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    zIndex: 100,
    left: '50%',
    marginLeft: -63,
  },
  screen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  homeBar: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#888',
  },
});

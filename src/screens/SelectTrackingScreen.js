import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

export default function SelectTrackingScreen({ navigation }) {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('selectTitle')}</Text>
        <Text style={styles.subtitle}>{t('selectSubtitle')}</Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TrackByRoute')}
          activeOpacity={0.8}
        >
          <View style={styles.cardIconWrap}>
            <View style={[styles.cardIcon, { backgroundColor: 'rgba(198,40,40,0.1)' }]}>
              <Ionicons name="git-branch" size={28} color={COLORS.primary} />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{t('selectByRoute')}</Text>
            <Text style={styles.cardDesc}>{t('selectByRouteDesc')}</Text>
          </View>
          <View style={styles.cardArrow}>
            <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TrackByBus')}
          activeOpacity={0.8}
        >
          <View style={styles.cardIconWrap}>
            <View style={[styles.cardIcon, { backgroundColor: 'rgba(239,108,0,0.1)' }]}>
              <Ionicons name="bus" size={28} color="#EF6C00" />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{t('selectByBus')}</Text>
            <Text style={styles.cardDesc}>{t('selectByBusDesc')}</Text>
          </View>
          <View style={styles.cardArrow}>
            <Ionicons name="arrow-forward" size={18} color="#EF6C00" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Helpful tip */}
      <View style={styles.tipBox}>
        <Ionicons name="information-circle" size={20} color={COLORS.primary} />
        <Text style={styles.tipText}>
          {t('selectTip')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },
  top: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  cards: {
    paddingHorizontal: 24,
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardIconWrap: {
    marginRight: 16,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  cardArrow: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F7F7FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(198,40,40,0.05)',
    borderRadius: 14,
    gap: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

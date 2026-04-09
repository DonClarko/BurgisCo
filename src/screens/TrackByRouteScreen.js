import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { RECENT_ROUTES } from '../constants/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function TrackByRouteScreen({ navigation }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [activeTab, setActiveTab] = useState('recent');
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('trackRouteTitle')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        {/* Route input card */}
        <View style={styles.routeCard}>
          <View style={styles.routeTimeline}>
            <View style={styles.startDot} />
            <View style={styles.dashLine} />
            <View style={styles.endDot}>
              <Ionicons name="location" size={12} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.routeInputs}>
            <TextInput
              style={styles.routeInput}
              placeholder={t('trackRouteFrom')}
              placeholderTextColor="#B0B0C0"
              value={from}
              onChangeText={setFrom}
            />
            <View style={styles.inputDivider} />
            <TextInput
              style={styles.routeInput}
              placeholder={t('trackRouteTo')}
              placeholderTextColor="#B0B0C0"
              value={to}
              onChangeText={setTo}
            />
          </View>
          <TouchableOpacity style={styles.swapBtn}>
            <Ionicons name="swap-vertical" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Track Button */}
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => navigation.navigate('SelectedBusRoute')}
          activeOpacity={0.85}
        >
          <Ionicons name="navigate" size={18} color={COLORS.white} />
          <Text style={styles.trackBtnText}>{t('trackRouteButton')}</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {['recent', 'saved'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabPillText, activeTab === tab && styles.tabPillTextActive]}>
                {tab === 'recent' ? t('trackRouteRecent') : t('trackRouteSaved')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Routes list */}
        <FlatList
          data={RECENT_ROUTES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => navigation.navigate('SelectedBusRoute')}
              activeOpacity={0.7}
            >
              <View style={styles.listIcon}>
                <Ionicons name="time" size={16} color={COLORS.primary} />
              </View>
              <View style={styles.listInfo}>
                <Text style={styles.listRoute}>{item.from} → {item.to}</Text>
                <Text style={styles.listTime}>{t('trackRouteLastSearched')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#D0D0E0" />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ gap: 8 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  routeCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  routeTimeline: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    marginRight: 12,
    width: 20,
  },
  startDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#66BB6A',
  },
  dashLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E0E0E0',
    marginVertical: 4,
    borderStyle: 'dashed',
  },
  endDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeInputs: {
    flex: 1,
  },
  routeInput: {
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: 12,
  },
  inputDivider: {
    height: 1,
    backgroundColor: '#F0F0F8',
  },
  swapBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(198,40,40,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  trackBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  trackBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  tabPillActive: {
    backgroundColor: COLORS.primary,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabPillTextActive: {
    color: COLORS.white,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  listIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(198,40,40,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  listRoute: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  listTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

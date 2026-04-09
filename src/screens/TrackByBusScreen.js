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
import { SAVED_BUSES } from '../constants/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function TrackByBusScreen({ navigation }) {
  const [busNumber, setBusNumber] = useState('');
  const [activeTab, setActiveTab] = useState('saved');
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('trackBusTitle')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        {/* Search box */}
        <View style={styles.searchCard}>
          <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color="#B0B0C0" />
            <TextInput
              style={styles.searchInput}
              placeholder={t('trackBusPlaceholder')}
              placeholderTextColor="#B0B0C0"
              value={busNumber}
              onChangeText={setBusNumber}
            />
            {busNumber.length > 0 && (
              <TouchableOpacity onPress={() => setBusNumber('')}>
                <Ionicons name="close-circle" size={18} color="#D0D0E0" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Track Button */}
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={() => navigation.navigate('SelectedBusRoute')}
          activeOpacity={0.85}
        >
          <Ionicons name="bus" size={18} color={COLORS.white} />
          <Text style={styles.trackBtnText}>{t('trackBusButton')}</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {['saved', 'recent'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabPillText, activeTab === tab && styles.tabPillTextActive]}>
                {tab === 'saved' ? t('trackBusSaved') : t('trackBusRecent')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bus list */}
        <FlatList
          data={SAVED_BUSES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.busItem}
              onPress={() => navigation.navigate('SelectedBusRoute')}
              activeOpacity={0.7}
            >
              <View style={styles.busIcon}>
                <Ionicons name="bus" size={18} color={COLORS.white} />
              </View>
              <View style={styles.busInfo}>
                <Text style={styles.busNum}>{item.busNumber}</Text>
                <Text style={styles.busRoute}>{item.from} → {item.to}</Text>
              </View>
              <View style={styles.busArrow}>
                <Ionicons name="chevron-forward" size={14} color="#D0D0E0" />
              </View>
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
  searchCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
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
  busItem: {
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
  busIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  busInfo: {
    flex: 1,
  },
  busNum: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  busRoute: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  busArrow: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F7F7FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

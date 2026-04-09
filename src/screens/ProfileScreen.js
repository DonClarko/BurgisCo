import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { USER_PROFILE } from '../constants/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function ProfileScreen({ navigation }) {
  const { t } = useLanguage();

  const ACCOUNT_ITEMS = [
    { icon: 'person', label: t('profilePersonalInfo'), screen: 'EditProfile', color: '#5C6BC0' },
    { icon: 'location', label: t('profileLocation'), screen: null, color: '#26A69A' },
    { icon: 'language', label: t('profileLanguage'), screen: null, color: '#FFA726' },
  ];

  const APP_ITEMS = [
    { icon: 'notifications', label: t('profileNotifications'), screen: null, color: '#EF5350' },
    { icon: 'card', label: t('profileCardTopUp'), screen: null, color: '#42A5F5' },
    { icon: 'settings', label: t('profileSettings'), screen: 'Settings', color: '#78909C' },
  ];

  const SUPPORT_ITEMS = [
    { icon: 'help-circle', label: t('profileFAQs'), screen: null, color: '#AB47BC' },
  ];
  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={() => {
        if (item.screen) navigation.navigate(item.screen);
      }}
    >
      <View style={[styles.menuIconBox, { backgroundColor: item.color + '18' }]}>  
        <Ionicons name={item.icon} size={20} color={item.color} />
      </View>
      <Text style={styles.menuLabel}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Hero Header */}
      <View style={styles.heroHeader}>
        <View style={styles.heroBlob1} />
        <View style={styles.heroBlob2} />
        <View style={styles.heroTopRow}>
          <Text style={styles.heroTitle}>{t('profileTitle')}</Text>
          <TouchableOpacity
            style={styles.editIconBtn}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Ionicons name="create" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Avatar Card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={36} color={COLORS.white} />
          </View>
          <View style={styles.avatarInfo}>
            <Text style={styles.userName}>{USER_PROFILE.name}</Text>
            <Text style={styles.userEmail}>{USER_PROFILE.email}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>{t('profileTrips')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>{t('profileSavedLabel')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>{t('profileRoutesLabel')}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Section */}
        <Text style={styles.sectionTitle}>{t('profileAccount')}</Text>
        <View style={styles.menuCard}>
          {ACCOUNT_ITEMS.map(renderMenuItem)}
        </View>

        {/* App Section */}
        <Text style={styles.sectionTitle}>{t('profileApp')}</Text>
        <View style={styles.menuCard}>
          {APP_ITEMS.map(renderMenuItem)}
        </View>

        {/* Support Section */}
        <Text style={styles.sectionTitle}>{t('profileSupport')}</Text>
        <View style={styles.menuCard}>
          {SUPPORT_ITEMS.map(renderMenuItem)}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.7}
          onPress={() => {
            navigation.getParent()?.getParent()?.reset({ index: 0, routes: [{ name: 'Login' }] });
          }}
        >
          <Ionicons name="log-out" size={20} color={COLORS.primary} />
          <Text style={styles.logoutText}>{t('profileLogout')}</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>{t('profileVersion')}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },
  heroHeader: {
    backgroundColor: COLORS.primary,
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  heroBlob1: {
    position: 'absolute',
    top: -30,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  heroBlob2: {
    position: 'absolute',
    bottom: -20,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
  },
  editIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 16,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 16,
  },
});

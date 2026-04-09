import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { SERVICES, CATEGORIES, NEARBY_STOPS } from '../constants/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('1');
  const { t } = useLanguage();

  const quickActions = [
    { id: '1', icon: 'navigate', label: t('homeTrack'), color: '#C62828', screen: 'SelectTracking' },
    { id: '2', icon: 'map', label: t('homeRoutes'), color: '#EF6C00', screen: 'SelectedBusRoute' },
    { id: '3', icon: 'time', label: t('homeSchedule'), color: '#2E7D32', screen: 'SelectedBusRoute' },
    { id: '4', icon: 'bookmark', label: t('homeSaved'), color: '#1565C0', screen: 'SelectedBusRoute' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero header */}
      <View style={styles.hero}>
        <View style={styles.heroBlob1} />
        <View style={styles.heroBlob2} />
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroGreet}>{t('homeGreet')}</Text>
            <Text style={styles.heroName}>Juan dela Cruz</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications" size={20} color={COLORS.white} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Search pill */}
        <TouchableOpacity style={styles.searchPill} activeOpacity={0.8}>
          <Ionicons name="search" size={18} color="#B0B0C0" />
          <Text style={styles.searchText}>{t('homeSearch')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        {/* Quick Actions */}
        <View style={styles.quickRow}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={styles.quickItem}
              onPress={() => navigation.navigate(a.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.quickIcon, { backgroundColor: a.color + '14' }]}>
                <Ionicons name={a.icon} size={22} color={a.color} />
              </View>
              <Text style={styles.quickLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active ride card */}
        <TouchableOpacity style={styles.activeCard} activeOpacity={0.85}>
          <View style={styles.activeLeft}>
            <View style={styles.activeDot} />
            <View style={styles.activeLine} />
            <View style={[styles.activeDot, { backgroundColor: COLORS.primary }]} />
          </View>
          <View style={styles.activeInfo}>
            <Text style={styles.activeRoute}>Batangas City → Lipa City</Text>
            <Text style={styles.activeSub}>BT-001 • {t('homeArrivingIn')}</Text>
            <View style={styles.activeBar}>
              <View style={styles.activeBarFill} />
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        {/* Categories */}
        <Text style={styles.sectionTitle}>{t('homeVehicles')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catPill, activeCategory === cat.id && styles.catPillActive]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text style={[styles.catText, activeCategory === cat.id && styles.catTextActive]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Nearby stops */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>{t('homeNearbyStops')}</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>{t('homeSeeAll')}</Text>
          </TouchableOpacity>
        </View>

        {NEARBY_STOPS.map((stop) => (
          <TouchableOpacity
            key={stop.id}
            style={styles.stopCard}
            onPress={() => navigation.navigate('SelectedBusRoute')}
            activeOpacity={0.7}
          >
            <View style={styles.stopIcon}>
              <Ionicons name="location" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.stopInfo}>
              <Text style={styles.stopName}>{stop.name}</Text>
              <Text style={styles.stopDetail}>{stop.busNumber} • {t('homeNextIn')} {stop.nextBus}</Text>
            </View>
            <View style={styles.stopBadge}>
              <Text style={styles.stopBadgeText}>{stop.nextBus}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Tips card */}
        <View style={styles.tipCard}>
          <View style={styles.tipLeft}>
            <Text style={styles.tipEmoji}>💡</Text>
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>{t('homeTipTitle')}</Text>
            <Text style={styles.tipText}>
              {t('homeTipText')}
            </Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },
  hero: {
    backgroundColor: COLORS.primary,
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 24,
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
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  heroGreet: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
  },
  heroName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF8A65',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  searchText: {
    flex: 1,
    fontSize: 15,
    color: '#B0B0C0',
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  activeLeft: {
    alignItems: 'center',
    marginRight: 12,
    height: 40,
    justifyContent: 'space-between',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#66BB6A',
  },
  activeLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 2,
  },
  activeInfo: {
    flex: 1,
  },
  activeRoute: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  activeSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  activeBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
  },
  activeBarFill: {
    height: 4,
    width: '65%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  catScroll: {
    marginBottom: 20,
  },
  catPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#E8E8F0',
  },
  catPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  catText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  catTextActive: {
    color: COLORS.white,
  },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  stopIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(198,40,40,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  stopDetail: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  stopBadge: {
    backgroundColor: 'rgba(198,40,40,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  stopBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  tipLeft: {
    marginRight: 12,
  },
  tipEmoji: {
    fontSize: 28,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F57F17',
    marginBottom: 2,
  },
  tipText: {
    fontSize: 12,
    color: '#8D6E00',
    lineHeight: 18,
  },
});

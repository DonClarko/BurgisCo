import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { BUSES } from '../constants/mockData';
import { useLanguage } from '../context/LanguageContext';

const TIME_FILTERS = ['Lahat', '8am-10am', '10am-12pm', '12pm-02pm'];

export default function SelectedBusRouteScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('Lahat');
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('busRouteTitle')}</Text>
        <TouchableOpacity>
          <Ionicons name="options" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Route summary strip */}
      <View style={styles.routeStrip}>
        <View style={styles.stripPoint}>
          <View style={styles.stripDotGreen} />
          <Text style={styles.stripText}>{t('busRouteCurrentLoc')}</Text>
        </View>
        <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ opacity: 0.6 }} />
        <View style={styles.stripPoint}>
          <View style={styles.stripDotWhite} />
          <Text style={styles.stripText}>Lipa City</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 24 }}>
          {TIME_FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bus cards */}
      <FlatList
        data={BUSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24, gap: 12, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.busCard}
            onPress={() => navigation.navigate('RouteDetails')}
            activeOpacity={0.7}
          >
            {/* Top row */}
            <View style={styles.busTop}>
              <View style={styles.busNumBadge}>
                <Ionicons name="bus" size={14} color={COLORS.white} />
                <Text style={styles.busNumText}>{item.busNumber}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.status === 'On Time' ? '#E8F5E9' : '#FFF3E0' }]}>
                <View style={[styles.statusDot, { backgroundColor: item.status === 'On Time' ? '#66BB6A' : '#FFA726' }]} />
                <Text style={[styles.statusText, { color: item.status === 'On Time' ? '#2E7D32' : '#E65100' }]}>
                  {item.status === 'On Time' ? 'On Time' : 'Delayed'}
                </Text>
              </View>
            </View>

            {/* Route line */}
            <View style={styles.busRoute}>
              <View style={styles.busRouteEnd}>
                <Text style={styles.routeTime}>{item.departureTime}</Text>
                <Text style={styles.routePlace}>{item.from}</Text>
              </View>
              <View style={styles.routeCenter}>
                <View style={styles.routeDotStart} />
                <View style={styles.routeLine} />
                <View style={styles.durationBubble}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routeDotEnd} />
              </View>
              <View style={[styles.busRouteEnd, { alignItems: 'flex-end' }]}>
                <Text style={styles.routeTime}>{item.arrivalTime}</Text>
                <Text style={styles.routePlace}>{item.to}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
    backgroundColor: COLORS.primary,
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  routeStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingBottom: 20,
    paddingHorizontal: 24,
    gap: 12,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  stripPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stripDotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#66BB6A',
  },
  stripDotWhite: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  stripText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  filterSection: {
    paddingVertical: 16,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  busCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  busTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  busNumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  busNumText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  busRoute: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busRouteEnd: {
    width: 80,
  },
  routeTime: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  routePlace: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  routeCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  routeDotStart: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#66BB6A',
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  durationBubble: {
    backgroundColor: 'rgba(198,40,40,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  routeDotEnd: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});

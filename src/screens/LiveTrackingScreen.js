import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { ROUTE_STOPS } from '../constants/mockData';
import { useLanguage } from '../context/LanguageContext';

export default function LiveTrackingScreen({ navigation }) {
  const { t } = useLanguage();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('liveTitle')}</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Live status card */}
        <View style={styles.liveCard}>
          <View style={styles.liveHeader}>
            <View style={styles.livePulse} />
            <Text style={styles.liveLabel}>LIVE</Text>
            <Text style={styles.liveStatus}>{t('liveInTransit')}</Text>
          </View>
          <View style={styles.liveRoute}>
            <View style={styles.livePoint}>
              <View style={styles.liveDotGreen} />
              <Text style={styles.livePlace}>Batangas City</Text>
            </View>
            <View style={styles.liveLineWrap}>
              <View style={styles.liveLine} />
              <View style={styles.liveBusIcon}>
                <Ionicons name="bus" size={14} color={COLORS.white} />
              </View>
            </View>
            <View style={styles.livePoint}>
              <View style={styles.liveDotRed} />
              <Text style={styles.livePlace}>Nasugbu</Text>
            </View>
          </View>
          <View style={styles.liveMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="bus" size={14} color={COLORS.textSecondary} />
              <Text style={styles.metaText}>J001, J032, J009</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={14} color={COLORS.textSecondary} />
              <Text style={styles.metaText}>{t('liveTimeRemaining')}</Text>
            </View>
          </View>
        </View>

        {/* Stops timeline */}
        <View style={styles.stopsSection}>
          <Text style={styles.sectionTitle}>{t('liveRouteStops')}</Text>

          {ROUTE_STOPS.map((stop, index) => {
            const isFirst = index === 0;
            const isLast = index === ROUTE_STOPS.length - 1;
            const isGood = stop.status === 'On Time' || stop.status === 'Arrived';
            const isPassed = index <= 1;

            return (
              <View key={index} style={styles.stopRow}>
                <View style={styles.timeline}>
                  <View style={[
                    styles.tDot,
                    isPassed && { backgroundColor: '#66BB6A', borderColor: '#C8E6C9' },
                    isLast && { backgroundColor: COLORS.primary, borderColor: 'rgba(198,40,40,0.2)' },
                  ]} />
                  {!isLast && (
                    <View style={[styles.tLine, isPassed && { backgroundColor: '#66BB6A' }]} />
                  )}
                </View>

                <View style={[styles.stopCard, isPassed && styles.stopCardPassed]}>
                  <View style={styles.stopRow2}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.stopName, isPassed && { color: COLORS.textSecondary }]}>{stop.name}</Text>
                      <Text style={styles.stopDist}>{stop.distance}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.stopTime}>{stop.time}</Text>
                      <View style={[
                        styles.statusPill,
                        { backgroundColor: isGood ? '#E8F5E9' : '#FFF3E0' }
                      ]}>
                        <Text style={[styles.statusText, { color: isGood ? '#2E7D32' : '#E65100' }]}>
                          {stop.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
    borderRadius: 14,
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
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 24,
    marginTop: 8,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderTopWidth: 3,
    borderTopColor: COLORS.primary,
  },
  liveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF5350',
  },
  liveLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EF5350',
    letterSpacing: 1,
  },
  liveStatus: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 'auto',
    fontWeight: '500',
  },
  liveRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  livePoint: {
    alignItems: 'center',
    gap: 4,
  },
  liveDotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#66BB6A',
  },
  liveDotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  livePlace: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  liveLineWrap: {
    flex: 1,
    height: 4,
    backgroundColor: '#E8E8F0',
    marginHorizontal: 10,
    borderRadius: 2,
    justifyContent: 'center',
  },
  liveLine: {
    height: 4,
    width: '60%',
    backgroundColor: '#66BB6A',
    borderRadius: 2,
  },
  liveBusIcon: {
    position: 'absolute',
    left: '55%',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -12,
  },
  liveMeta: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F8',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  stopsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  stopRow: {
    flexDirection: 'row',
    minHeight: 72,
  },
  timeline: {
    width: 28,
    alignItems: 'center',
  },
  tDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#D0D0E0',
    borderWidth: 3,
    borderColor: '#E8E8F0',
    zIndex: 1,
  },
  tLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 2,
  },
  stopCard: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 8,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  stopCardPassed: {
    opacity: 0.6,
  },
  stopRow2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  stopDist: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  stopTime: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

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
import RouteMap from '../components/RouteMap';

export default function RouteDetailsScreen({ navigation }) {
  const { t } = useLanguage();

  // Compute map region from stop coordinates
  const lats = ROUTE_STOPS.map(s => s.lat);
  const lngs = ROUTE_STOPS.map(s => s.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const midLat = (minLat + maxLat) / 2;
  const midLng = (minLng + maxLng) / 2;
  const deltaLat = (maxLat - minLat) * 1.4 || 0.05;
  const deltaLng = (maxLng - minLng) * 1.4 || 0.05;

  const routeCoords = ROUTE_STOPS.map(s => ({ latitude: s.lat, longitude: s.lng }));

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapArea}>
        <RouteMap
          stops={ROUTE_STOPS}
          region={{
            latitude: midLat,
            longitude: midLng,
            latitudeDelta: deltaLat,
            longitudeDelta: deltaLng,
          }}
          routeCoords={routeCoords}
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Floating route summary card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryPoint}>
            <View style={styles.greenDot} />
            <View>
              <Text style={styles.summaryPlace}>Batangas City</Text>
              <Text style={styles.summaryTime}>8:30 AM</Text>
            </View>
          </View>
          <View style={styles.summaryMid}>
            <View style={styles.summaryLine} />
            <View style={styles.summaryDuration}>
              <Ionicons name="time" size={12} color={COLORS.primary} />
              <Text style={styles.durationText}>20 min</Text>
            </View>
            <View style={styles.summaryLine} />
          </View>
          <View style={[styles.summaryPoint, { alignItems: 'flex-end' }]}>
            <View>
              <Text style={[styles.summaryPlace, { textAlign: 'right' }]}>Lipa City</Text>
              <Text style={[styles.summaryTime, { textAlign: 'right' }]}>8:50 AM</Text>
            </View>
            <View style={styles.redDot} />
          </View>
        </View>
      </View>

      {/* Timeline stops */}
      <ScrollView style={styles.stopsScroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{t('routeStops')}</Text>

        {ROUTE_STOPS.map((stop, index) => {
          const isFirst = index === 0;
          const isLast = index === ROUTE_STOPS.length - 1;
          const isGood = stop.status === 'On Time' || stop.status === 'Arrived';

          return (
            <View key={index} style={styles.stopRow}>
              {/* Timeline */}
              <View style={styles.timeline}>
                <View style={[
                  styles.tDot,
                  isFirst && { backgroundColor: '#66BB6A' },
                  isLast && { backgroundColor: COLORS.primary },
                ]} />
                {!isLast && <View style={styles.tLine} />}
              </View>

              {/* Card */}
              <View style={[styles.stopCard, isFirst && styles.stopCardHighlight]}>
                <View style={styles.stopTop}>
                  <Text style={styles.stopName}>{stop.name}</Text>
                  <Text style={styles.stopTime}>{stop.time}</Text>
                </View>
                <View style={styles.stopBottom}>
                  <Text style={styles.stopDist}>{stop.distance}</Text>
                  <View style={[styles.statusChip, { backgroundColor: isGood ? '#E8F5E9' : '#FFF3E0' }]}>
                    <Text style={[styles.statusLabel, { color: isGood ? '#2E7D32' : '#E65100' }]}>
                      {stop.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },
  mapArea: {
    height: 280,
    backgroundColor: '#E8E8F0',
  },
  backBtn: {
    position: 'absolute',
    top: 52,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 24,
    marginTop: -28,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#66BB6A',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  summaryPlace: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  summaryTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  summaryMid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  summaryLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E8E8F0',
  },
  summaryDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(198,40,40,0.06)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  stopsScroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
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
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: 'rgba(198,40,40,0.15)',
    zIndex: 1,
  },
  tLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(198,40,40,0.15)',
    marginVertical: 2,
  },
  stopCard: {
    flex: 1,
    marginLeft: 12,
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
  stopCardHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: '#66BB6A',
  },
  stopTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  stopTime: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  stopBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stopDist: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});

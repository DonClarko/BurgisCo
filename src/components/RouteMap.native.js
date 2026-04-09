import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { COLORS } from '../constants/theme';

export default function RouteMap({ stops, region, routeCoords }) {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={region}
    >
      {stops.map((stop, index) => {
        const isFirst = index === 0;
        const isLast = index === stops.length - 1;
        return (
          <Marker
            key={index}
            coordinate={{ latitude: stop.lat, longitude: stop.lng }}
            title={stop.name}
            description={`${stop.time} · ${stop.status}`}
            pinColor={isFirst ? '#66BB6A' : isLast ? COLORS.primary : '#FFA726'}
          />
        );
      })}
      <Polyline
        coordinates={routeCoords}
        strokeColor={COLORS.primary}
        strokeWidth={3}
      />
    </MapView>
  );
}

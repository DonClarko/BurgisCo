import React from 'react';
import { COLORS } from '../constants/theme';

export default function RouteMap({ stops, region, routeCoords }) {
  const markers = stops
    .map((s, i) => {
      const isFirst = i === 0;
      const isLast = i === stops.length - 1;
      const color = isFirst ? '#66BB6A' : isLast ? '#C62828' : '#FFA726';
      return `L.circleMarker([${s.lat},${s.lng}],{radius:7,fillColor:'${color}',color:'#fff',weight:2,fillOpacity:1}).addTo(map).bindPopup('<b>${s.name}</b><br/>${s.time} · ${s.status}');`;
    })
    .join('\n');

  const polyPoints = stops.map(s => `[${s.lat},${s.lng}]`).join(',');

  const html = `
<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>html,body,#map{margin:0;padding:0;width:100%;height:100%}</style>
</head><body>
<div id="map"></div>
<script>
var map=L.map('map').setView([${region.latitude},${region.longitude}],11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:''}).addTo(map);
L.polyline([${polyPoints}],{color:'${COLORS.primary}',weight:3}).addTo(map);
${markers}
</script>
</body></html>`;

  return (
    <iframe
      srcDoc={html}
      style={{ flex: 1, width: '100%', height: '100%', border: 'none' }}
      title="Route Map"
    />
  );
}

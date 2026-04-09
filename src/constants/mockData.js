// Mock data for SanDaan app

export const BUSES = [
  {
    id: '1',
    busNumber: 'Bus BT-001',
    from: 'Batangas City Proper',
    to: 'Lipa City',
    departureTime: '6:30am',
    arrivalTime: '7:15am',
    duration: '45min',
    crowdLevel: 'low',
    status: 'On Time',
  },
  {
    id: '2',
    busNumber: 'Jeep BT-025',
    from: 'Balagtas',
    to: 'Nasugbu',
    departureTime: '7:00am',
    arrivalTime: '8:10am',
    duration: '70min',
    crowdLevel: 'medium',
    status: 'Delay 5 min',
  },
  {
    id: '3',
    busNumber: 'Bus BT-032',
    from: 'Lemery',
    to: 'Tanauan',
    departureTime: '8:00am',
    arrivalTime: '8:50am',
    duration: '50min',
    crowdLevel: 'high',
    status: 'On Time',
  },
];

export const ROUTE_STOPS = [
  { name: 'Batangas City Grand Terminal', distance: 'Arrived', time: '6:30am', status: 'On Time', lat: 13.7565, lng: 121.0583 },
  { name: 'Balagtas', distance: '3km', time: '6:40am', status: 'On Time', lat: 13.7810, lng: 121.0890 },
  { name: 'Cuenca', distance: '8km', time: '6:52am', status: '3min Delay', lat: 13.8230, lng: 121.0720 },
  { name: 'Alitagtag', distance: '12km', time: '7:00am', status: 'On Time', lat: 13.8580, lng: 121.0260 },
  { name: 'Taal', distance: '16km', time: '7:08am', status: 'On Time', lat: 13.8800, lng: 121.0100 },
  { name: 'Lipa City Terminal', distance: '25km', time: '7:15am', status: 'On Time', lat: 13.9416, lng: 121.1636 },
];

export const RECENT_ROUTES = [
  { id: '1', from: 'Batangas City', to: 'Nasugbu' },
  { id: '2', from: 'Lipa', to: 'Tanauan' },
];

export const SAVED_BUSES = [
  { id: '1', busNumber: 'Bus BT-024', from: 'Batangas City', to: 'Lipa' },
  { id: '2', busNumber: 'Jeep BT-007', from: 'Lemery', to: 'Taal' },
  { id: '3', busNumber: 'Bus BT-032', from: 'Tanauan', to: 'Sto. Tomas' },
];

export const CATEGORIES = [
  { id: '1', name: 'Jeepney', active: true },
  { id: '2', name: 'Bus', active: false },
  { id: '3', name: 'Tricycle', active: false },
  { id: '4', name: 'Ferry', active: false },
];

export const NEARBY_STOPS = [
  {
    id: '1',
    name: 'Batangas City Grand Terminal',
    nextBus: '4min',
    busNumber: 'BT-001',
  },
  {
    id: '2',
    name: 'Lipa City Terminal',
    nextBus: '10min',
    busNumber: 'BT-012',
  },
];

export const SERVICES = [
  { id: '1', name: 'Live\nTracking', icon: 'navigate-circle-outline' },
  { id: '2', name: 'Nearby\nStops', icon: 'location-outline' },
  { id: '3', name: 'Time\nTable', icon: 'time-outline' },
  { id: '4', name: 'Top Up\nCard', icon: 'card-outline' },
];

export const USER_PROFILE = {
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@gmail.com',
  phone: '9171234567',
  avatar: null,
};

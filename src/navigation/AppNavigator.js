import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SelectTrackingScreen from '../screens/SelectTrackingScreen';
import TrackByRouteScreen from '../screens/TrackByRouteScreen';
import TrackByBusScreen from '../screens/TrackByBusScreen';
import SelectedBusRouteScreen from '../screens/SelectedBusRouteScreen';
import RouteDetailsScreen from '../screens/RouteDetailsScreen';
import LiveTrackingScreen from '../screens/LiveTrackingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const TrackingStack = createNativeStackNavigator();
const RoutesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="SelectTracking" component={SelectTrackingScreen} />
      <HomeStack.Screen name="TrackByRoute" component={TrackByRouteScreen} />
      <HomeStack.Screen name="TrackByBus" component={TrackByBusScreen} />
      <HomeStack.Screen name="SelectedBusRoute" component={SelectedBusRouteScreen} />
      <HomeStack.Screen name="RouteDetails" component={RouteDetailsScreen} />
      <HomeStack.Screen name="LiveTracking" component={LiveTrackingScreen} />
    </HomeStack.Navigator>
  );
}

function TrackingStackScreen() {
  return (
    <TrackingStack.Navigator screenOptions={{ headerShown: false }}>
      <TrackingStack.Screen name="TrackingMain" component={SelectTrackingScreen} />
      <TrackingStack.Screen name="TrackByRoute" component={TrackByRouteScreen} />
      <TrackingStack.Screen name="TrackByBus" component={TrackByBusScreen} />
      <TrackingStack.Screen name="SelectedBusRoute" component={SelectedBusRouteScreen} />
      <TrackingStack.Screen name="RouteDetails" component={RouteDetailsScreen} />
      <TrackingStack.Screen name="LiveTracking" component={LiveTrackingScreen} />
    </TrackingStack.Navigator>
  );
}

function RoutesStackScreen() {
  return (
    <RoutesStack.Navigator screenOptions={{ headerShown: false }}>
      <RoutesStack.Screen name="RoutesMain" component={SelectedBusRouteScreen} />
      <RoutesStack.Screen name="RouteDetails" component={RouteDetailsScreen} />
    </RoutesStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}

function HomeTabs() {
  const { t } = useLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Tracking':
              iconName = focused ? 'navigate-circle' : 'navigate-circle-outline';
              break;
            case 'Routes':
              iconName = focused ? 'bus' : 'bus-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{ tabBarLabel: t('tabHome') }} />
      <Tab.Screen name="Tracking" component={TrackingStackScreen} options={{ tabBarLabel: t('tabTracking') }} />
      <Tab.Screen name="Routes" component={RoutesStackScreen} options={{ tabBarLabel: t('tabRoutes') }} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ tabBarLabel: t('tabProfile') }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { t } = useLanguage();

  const slides = [
    {
      id: '1',
      icon: 'location',
      emoji: '🚌',
      title: t('onboarding1Title'),
      description: t('onboarding1Desc'),
      bg: '#FFF0F0',
    },
    {
      id: '2',
      icon: 'compass',
      emoji: '🗺️',
      title: t('onboarding2Title'),
      description: t('onboarding2Desc'),
      bg: '#FFF5EE',
    },
    {
      id: '3',
      icon: 'flash',
      emoji: '⚡',
      title: t('onboarding3Title'),
      description: t('onboarding3Desc'),
      bg: '#FFF0F0',
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * containerWidth, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / containerWidth);
    if (index !== currentIndex && index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <View
      style={[styles.container, { backgroundColor: currentSlide?.bg || '#FFF0F0' }]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.stepLabel}>{currentIndex + 1}/{slides.length}</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>{t('onboardingSkip')}</Text>
        </TouchableOpacity>
      </View>

      {containerWidth > 0 && (
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {slides.map((item) => (
            <View key={item.id} style={[styles.slide, { width: containerWidth }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={48} color={COLORS.primary} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Bottom area */}
      <View style={styles.bottomArea}>
        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((currentIndex + 1) / slides.length) * 100}%` }]} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? t('onboardingStart') : t('onboardingNext')}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  scrollView: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 8,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  skipText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 16,
    lineHeight: 42,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    maxWidth: 300,
  },
  bottomArea: {
    paddingHorizontal: 32,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(198,40,40,0.15)',
    borderRadius: 2,
    marginBottom: 24,
  },
  progressFill: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const { t, language, setLanguage, toggleLanguage } = useLanguage();

  const SettingRow = ({ icon, iconColor, label, value, onPress }) => (
    <TouchableOpacity style={styles.settingRow} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.settingIcon, { backgroundColor: iconColor + '18' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.settingRight}>
        <Text style={styles.settingValue}>{value}</Text>
        <Ionicons name="chevron-forward" size={14} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  const ToggleRow = ({ icon, iconColor, label, description, value, onValueChange }) => (
    <View style={styles.toggleRow}>
      <View style={[styles.settingIcon, { backgroundColor: iconColor + '18' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.toggleInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.toggleDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E0E0E8', true: COLORS.primary + '80' }}
        thumbColor={value ? COLORS.primary : '#FAFAFA'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settingsTitle')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* General Section */}
        <Text style={styles.sectionTitle}>{t('settingsGeneral')}</Text>
        <View style={styles.sectionCard}>
          <SettingRow
            icon="bookmark"
            iconColor="#5C6BC0"
            label={t('settingsFavStops')}
            value="Batangas City"
          />
          <View style={styles.divider} />
          <View style={styles.langRow}>
            <View style={[styles.settingIcon, { backgroundColor: '#26A69A18' }]}>
              <Ionicons name="language" size={18} color="#26A69A" />
            </View>
            <Text style={styles.settingLabel}>{t('settingsLanguage')}</Text>
            <View style={styles.langToggle}>
              <TouchableOpacity
                style={[styles.langOption, language === 'en' && styles.langOptionActive]}
                onPress={() => setLanguage('en')}
                activeOpacity={0.7}
              >
                <Text style={[styles.langOptionText, language === 'en' && styles.langOptionTextActive]}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langOption, language === 'tl' && styles.langOptionActive]}
                onPress={() => setLanguage('tl')}
                activeOpacity={0.7}
              >
                <Text style={[styles.langOptionText, language === 'tl' && styles.langOptionTextActive]}>TL</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />
          <SettingRow
            icon="color-palette"
            iconColor="#FFA726"
            label={t('settingsAppearance')}
            value={t('settingsLightMode')}
          />
        </View>

        {/* Privacy Section */}
        <Text style={styles.sectionTitle}>{t('settingsPrivacy')}</Text>
        <View style={styles.sectionCard}>
          <SettingRow
            icon="shield-checkmark"
            iconColor="#66BB6A"
            label={t('settingsPrivacyPolicy')}
            value={t('settingsRead')}
          />
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>{t('settingsNotifications')}</Text>
        <View style={styles.sectionCard}>
          <ToggleRow
            icon="notifications"
            iconColor="#EF5350"
            label={t('settingsNotifLabel')}
            description={t('settingsNotifDesc')}
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
          <View style={styles.divider} />
          <ToggleRow
            icon="navigate"
            iconColor="#42A5F5"
            label={t('settingsLocationAccess')}
            description={t('settingsLocationDesc')}
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
        </View>

        {/* Data Section */}
        <Text style={styles.sectionTitle}>{t('settingsData')}</Text>
        <View style={styles.sectionCard}>
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <View style={[styles.settingIcon, { backgroundColor: '#FF726618' }]}>
              <Ionicons name="trash" size={18} color="#FF7266" />
            </View>
            <Text style={[styles.settingLabel, { color: '#FF7266' }]}>
              {t('settingsClearHistory')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <TouchableOpacity style={styles.footerLink}>
              <Ionicons name="information-circle" size={16} color={COLORS.textSecondary} />
              <Text style={styles.footerLinkText}>{t('settingsAbout')}</Text>
            </TouchableOpacity>
            <View style={styles.footerDot} />
            <TouchableOpacity style={styles.footerLink}>
              <Ionicons name="code-slash" size={16} color={COLORS.textSecondary} />
              <Text style={styles.footerLinkText}>Developers</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.versionText}>{t('profileVersion')}</Text>
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
    paddingBottom: 14,
    paddingHorizontal: 20,
    backgroundColor: '#F7F7FC',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 18,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F5',
    borderRadius: 10,
    padding: 3,
  },
  langOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  langOptionActive: {
    backgroundColor: COLORS.primary,
  },
  langOptionText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  langOptionTextActive: {
    color: COLORS.white,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingValue: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginLeft: 66,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    gap: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerLinkText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textSecondary,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    opacity: 0.6,
  },
});

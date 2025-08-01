import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Shield, Eye, Bell, Users, Moon, CircleHelp as HelpCircle, FileText, LogOut, Trash2 } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function PrivacySettingsScreen() {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    contactInfoVisible: true,
    businessInfoVisible: true,
    allowDirectMessages: true,
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    dataCollection: true,
    analyticsTracking: false,
    darkMode: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    Alert.alert('Settings Saved', 'Your privacy settings have been updated successfully.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => router.replace('/(auth)/login') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert(
              'Confirm Deletion',
              'Type "DELETE" to confirm account deletion',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Confirm', style: 'destructive' }
              ]
            );
          }
        }
      ]
    );
  };

  const SettingRow = ({ 
    icon, 
    title, 
    description, 
    value, 
    onValueChange 
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.gray300, true: Colors.primary + '40' }}
        thumbColor={value ? Colors.primary : Colors.gray400}
      />
    </View>
  );

  const ActionRow = ({ 
    icon, 
    title, 
    description, 
    onPress,
    danger = false
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onPress: () => void;
    danger?: boolean;
  }) => (
    <TouchableOpacity style={styles.actionRow} onPress={onPress}>
      <View style={[styles.settingIcon, danger && styles.dangerIcon]}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, danger && styles.dangerText]}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Visibility</Text>
          <Text style={styles.sectionDescription}>
            Control who can see your profile and business information
          </Text>
          
          <SettingRow
            icon={<Eye size={20} color={Colors.primary} />}
            title="Public Profile"
            description="Allow other users to view your profile"
            value={settings.profileVisibility}
            onValueChange={(value) => updateSetting('profileVisibility', value)}
          />

          <SettingRow
            icon={<Users size={20} color={Colors.primary} />}
            title="Contact Information"
            description="Show your contact details to other users"
            value={settings.contactInfoVisible}
            onValueChange={(value) => updateSetting('contactInfoVisible', value)}
          />

          <SettingRow
            icon={<Shield size={20} color={Colors.primary} />}
            title="Business Information"
            description="Display your business details publicly"
            value={settings.businessInfoVisible}
            onValueChange={(value) => updateSetting('businessInfoVisible', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication</Text>
          <Text style={styles.sectionDescription}>
            Manage how other users can contact you
          </Text>
          
          <SettingRow
            icon={<Users size={20} color={Colors.secondary} />}
            title="Direct Messages"
            description="Allow other users to send you messages"
            value={settings.allowDirectMessages}
            onValueChange={(value) => updateSetting('allowDirectMessages', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Text style={styles.sectionDescription}>
            Choose what notifications you want to receive
          </Text>
          
          <SettingRow
            icon={<Bell size={20} color={Colors.success} />}
            title="Email Notifications"
            description="Receive important updates via email"
            value={settings.emailNotifications}
            onValueChange={(value) => updateSetting('emailNotifications', value)}
          />

          <SettingRow
            icon={<Bell size={20} color={Colors.success} />}
            title="Push Notifications"
            description="Get notifications on your device"
            value={settings.pushNotifications}
            onValueChange={(value) => updateSetting('pushNotifications', value)}
          />

          <SettingRow
            icon={<Bell size={20} color={Colors.warning} />}
            title="Marketing Emails"
            description="Receive promotional content and updates"
            value={settings.marketingEmails}
            onValueChange={(value) => updateSetting('marketingEmails', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          <SettingRow
            icon={<Moon size={20} color={Colors.gray600} />}
            title="Dark Mode"
            description="Use dark theme throughout the app"
            value={settings.darkMode}
            onValueChange={(value) => updateSetting('darkMode', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <Text style={styles.sectionDescription}>
            Control how your data is used and collected
          </Text>
          
          <SettingRow
            icon={<Shield size={20} color={Colors.error} />}
            title="Data Collection"
            description="Allow collection of usage data to improve the app"
            value={settings.dataCollection}
            onValueChange={(value) => updateSetting('dataCollection', value)}
          />

          <SettingRow
            icon={<Eye size={20} color={Colors.error} />}
            title="Analytics Tracking"
            description="Share anonymous analytics data"
            value={settings.analyticsTracking}
            onValueChange={(value) => updateSetting('analyticsTracking', value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help / FAQ</Text>
          
          <ActionRow
            icon={<HelpCircle size={20} color={Colors.primary} />}
            title="Help & Support"
            description="Get help or contact support"
            onPress={() => router.push('/settings/help')}
          />

          <ActionRow
            icon={<FileText size={20} color={Colors.primary} />}
            title="Privacy Policy / Terms of Service"
            description="View our privacy policy and terms"
            onPress={() => router.push('/settings/legal')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          
          <ActionRow
            icon={<LogOut size={20} color={Colors.warning} />}
            title="Logout"
            description="Sign out of your account"
            onPress={handleLogout}
          />

          <ActionRow
            icon={<Trash2 size={20} color={Colors.error} />}
            title="Delete Account"
            description="Permanently delete your account and all data"
            onPress={handleDeleteAccount}
            danger={true}
          />

          <Button
            title="Download My Data"
            onPress={() => Alert.alert('Data Export', 'Your data export will be available soon.')}
            variant="outline"
            style={styles.actionButton}
          />
        </View>

        <Button
          title="Save Settings"
          onPress={handleSaveSettings}
          style={styles.saveButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.xs,
  },
  sectionDescription: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    marginBottom: Spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  dangerIcon: {
    backgroundColor: Colors.error + '20',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: Spacing.xs,
  },
  dangerText: {
    color: Colors.error,
  },
  settingDescription: {
    fontSize: Typography.sm,
    color: Colors.gray600,
  },
  actionButton: {
    marginBottom: Spacing.md,
  },
  saveButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
});
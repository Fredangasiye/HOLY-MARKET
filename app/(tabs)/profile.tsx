import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User, Phone, Mail, MessageCircle, Globe, Settings, LogOut, Shield, CircleHelp as HelpCircle, Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function ProfileScreen() {
  const { authState, logout, updateUser } = useAuth();
  const { user } = authState;

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleWhatsApp = () => {
    if (user?.phone) {
      const message = encodeURIComponent(`Hi, I found you on the Christian Business Network app.`);
      Linking.openURL(`https://wa.me/${user.phone.replace(/[^\d]/g, '')}?text=${message}`);
    }
  };

  const handleEmail = () => {
    if (user?.email) {
      Linking.openURL(`mailto:${user.email}`);
    }
  };

  const handlePhone = () => {
    if (user?.phone) {
      Linking.openURL(`tel:${user.phone}`);
    }
  };

  const handleWebsite = () => {
    if (user?.website) {
      Linking.openURL(user.website);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateUser({ profileImage: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera permissions to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateUser({ profileImage: result.assets[0].uri });
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Update Profile Photo',
      'Choose how you want to update your profile photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAccountSettings = () => {
    router.push('/settings/account');
  };

  const handlePrivacySettings = () => {
    router.push('/settings/privacy');
  };

  const handleHelpSupport = () => {
    router.push('/settings/help');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <User size={64} color={Colors.gray400} />
          <Text style={styles.emptyTitle}>No Profile</Text>
          <Text style={styles.emptyText}>Please sign in to view your profile.</Text>
          <Button
            title="Sign In"
            onPress={() => router.push('/(auth)/login')}
            style={styles.signInButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleAccountSettings}>
            <Settings size={20} color={Colors.secondary} />
          </TouchableOpacity>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={showImagePicker} style={styles.imageContainer}>
              {user.profileImage ? (
                <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>
                    {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.cameraIcon}>
                <Camera size={16} color={Colors.white} />
              </View>
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={styles.fullName}>{user.firstName} {user.lastName}</Text>
              <View style={styles.joinedContainer}>
                <Text style={styles.joinedText}>
                  Joined {user.createdAt.toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.contactCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.contactRow}>
            <Mail size={20} color={Colors.gray600} />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Email</Text>
              <TouchableOpacity onPress={handleEmail}>
                <Text style={[styles.contactValue, styles.linkText]}>{user.email}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contactRow}>
            <Phone size={20} color={Colors.gray600} />
            <View style={styles.contactContent}>
              <Text style={styles.contactLabel}>Phone</Text>
              <TouchableOpacity onPress={handlePhone}>
                <Text style={[styles.contactValue, styles.linkText]}>{user.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {user.phone && (
            <View style={styles.contactRow}>
              <MessageCircle size={20} color={Colors.success} />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>WhatsApp</Text>
                <TouchableOpacity onPress={handleWhatsApp}>
                  <Text style={[styles.contactValue, styles.linkText]}>{user.phone}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {user.website && (
            <View style={styles.contactRow}>
              <Globe size={20} color={Colors.gray600} />
              <View style={styles.contactContent}>
                <Text style={styles.contactLabel}>Website</Text>
                <TouchableOpacity onPress={handleWebsite}>
                  <Text style={[styles.contactValue, styles.linkText]}>{user.website}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Card>

        <Card style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.actionRow} onPress={handleAccountSettings}>
            <Settings size={20} color={Colors.gray600} />
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>Account Settings</Text>
              <Text style={styles.actionSubtext}>Update your personal information</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow} onPress={handlePrivacySettings}>
            <Shield size={20} color={Colors.gray600} />
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>Privacy Settings</Text>
              <Text style={styles.actionSubtext}>Manage your privacy preferences</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow} onPress={handleHelpSupport}>
            <HelpCircle size={20} color={Colors.gray600} />
            <View style={styles.actionContent}>
              <Text style={styles.actionText}>Help & Support</Text>
              <Text style={styles.actionSubtext}>Get help or contact support</Text>
            </View>
          </TouchableOpacity>
        </Card>

        <View style={styles.footer}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.gray900,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.base,
    color: Colors.gray600,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  signInButton: {
    minWidth: 200,
  },
  profileCard: {
    margin: Spacing.lg,
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.white,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.xs,
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedText: {
    fontSize: Typography.sm,
    color: Colors.gray500,
  },
  contactCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginBottom: Spacing.md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  contactContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  contactLabel: {
    fontSize: Typography.xs,
    color: Colors.gray500,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  contactValue: {
    fontSize: Typography.base,
    color: Colors.gray900,
  },
  linkText: {
    color: Colors.secondary,
    textDecorationLine: 'underline',
  },
  actionsCard: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  actionContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  actionText: {
    fontSize: Typography.base,
    color: Colors.gray900,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  actionSubtext: {
    fontSize: Typography.sm,
    color: Colors.gray600,
  },
  footer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  logoutButton: {
    minWidth: 200,
    borderColor: Colors.error,
  },
});
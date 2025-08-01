import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function LegalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Legal Information</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal Disclaimer</Text>
          <Text style={styles.bodyText}>
            The information and assistance provided within this Help / FAQ section are intended for general informational purposes only. Although we strive for accuracy and clarity, vAIb Ai (Pty) Ltd makes no warranties or representations, express or implied, about the accuracy, completeness, reliability, or suitability of the content provided.
          </Text>
          <Text style={styles.bodyText}>
            Use of the app and reliance on any information presented is done entirely at your own risk. The app does not provide professional advice of any kind (including but not limited to legal, financial, medical, or psychological). For personalised or critical decisions, we strongly recommend seeking assistance from a qualified professional.
          </Text>
          <Text style={styles.bodyText}>
            vAIb Ai (Pty) Ltd disclaims all liability for any direct, indirect, incidental, or consequential loss or damage arising out of or in connection with your access to or use of any information contained herein.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Privacy Policy (POPIA-Compliant)</Text>
          <Text style={styles.subTitle}>Effective Date: January 2025</Text>
          <Text style={styles.subTitle}>Last Updated: January 2025</Text>
          
          <Text style={styles.bodyText}>
            This Privacy Policy explains how vAIb Ai (Pty) Ltd, a private company incorporated in South Africa, processes your personal information in compliance with the Protection of Personal Information Act (POPIA), No. 4 of 2013.
          </Text>

          <Text style={styles.subSectionTitle}>1. What We Collect:</Text>
          <Text style={styles.bodyText}>
            • Basic identification (e.g., name, email, mobile number){'\n'}
            • App usage and interaction data{'\n'}
            • Device and technical information
          </Text>

          <Text style={styles.subSectionTitle}>2. Why We Collect:</Text>
          <Text style={styles.bodyText}>
            We collect your personal information in order to:{'\n'}
            • Operate and improve the app{'\n'}
            • Communicate updates or changes{'\n'}
            • Fulfil legal and regulatory requirements
          </Text>

          <Text style={styles.subSectionTitle}>3. Consent and Use:</Text>
          <Text style={styles.bodyText}>
            By using vAIb Ai, you consent to the processing of your personal information as described in this policy. We will not share your personal information with third parties without your consent, unless required by law.
          </Text>

          <Text style={styles.subSectionTitle}>4. Data Protection:</Text>
          <Text style={styles.bodyText}>
            We implement appropriate technical and organisational safeguards to protect your data from loss, misuse, unauthorised access, or disclosure.
          </Text>
          <Text style={styles.bodyText}>
            vAIb Ai (Pty) Ltd will not be held liable for any breach of personal information security, provided reasonable and industry-appropriate safeguards were in place.
          </Text>

          <Text style={styles.subSectionTitle}>5. Your Rights (as per POPIA):</Text>
          <Text style={styles.bodyText}>
            You may:{'\n'}
            • Request access to your personal data{'\n'}
            • Correct or delete inaccurate data{'\n'}
            • Object to processing or request restriction{'\n'}
            {'\n'}Contact: support@thriveapp.co.za
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📄 Terms of Service</Text>
          <Text style={styles.subTitle}>Effective Date: January 2025</Text>
          
          <Text style={styles.bodyText}>
            Please read carefully before using the app.
          </Text>
          <Text style={styles.bodyText}>
            These Terms of Service constitute a legal agreement between you and vAIb Ai (Pty) Ltd ("we", "us", "our"), and govern your use of the vAIb Ai mobile and/or web application.
          </Text>

          <Text style={styles.subSectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.bodyText}>
            By accessing or using the vAIb Ai app, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not use the app.
          </Text>

          <Text style={styles.subSectionTitle}>2. No Professional Advice</Text>
          <Text style={styles.bodyText}>
            vAIb Ai is an informational and exploratory tool and does not provide professional advice of any kind. Any insights, outputs, or suggestions generated are general in nature and should not replace professional judgment or consultation.
          </Text>

          <Text style={styles.subSectionTitle}>3. Limitation of Liability</Text>
          <Text style={styles.bodyText}>
            To the maximum extent permitted under South African law:{'\n'}
            {'\n'}vAIb Ai (Pty) Ltd, its directors, employees, partners, and affiliates shall not be liable for any loss, injury, claim, or damage of any kind resulting from your use of this app, including but not limited to direct, indirect, incidental, punitive, or consequential damages.
          </Text>

          <Text style={styles.subSectionTitle}>4. Intellectual Property</Text>
          <Text style={styles.bodyText}>
            All content, branding, and algorithms associated with vAIb Ai are the exclusive property of vAIb Ai (Pty) Ltd. No content may be copied, reproduced, modified, or distributed without our prior written consent.
          </Text>

          <Text style={styles.subSectionTitle}>5. Termination</Text>
          <Text style={styles.bodyText}>
            We reserve the right to suspend or terminate your access to the app at our sole discretion, without notice, particularly in cases of misuse or breach of these terms.
          </Text>

          <Text style={styles.subSectionTitle}>6. Governing Law</Text>
          <Text style={styles.bodyText}>
            These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes will be subject to the jurisdiction of the Gauteng High Court, unless agreed otherwise in writing.
          </Text>
        </View>
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
    marginBottom: Spacing.md,
  },
  subTitle: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  subSectionTitle: {
    fontSize: Typography.base,
    fontWeight: 'bold',
    color: Colors.gray900,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  bodyText: {
    fontSize: Typography.sm,
    color: Colors.gray700,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
});
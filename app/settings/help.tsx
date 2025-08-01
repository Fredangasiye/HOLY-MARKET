import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Send, Mail, Phone, MessageCircle } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/Colors';

export default function HelpSupportScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would send this to your support email
    const supportEmail = 'support@thriveapp.co.za';
    const emailBody = `
Support Request from Thrive App

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Christian Business Network App
    `;

    setIsLoading(false);
    Alert.alert(
      'Message Sent',
      'Your support request has been sent. We will get back to you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            router.back();
          }
        }
      ]
    );
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>{question}</Text>
      <Text style={styles.faqAnswer}>{answer}</Text>
    </View>
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
        <Text style={styles.title}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <Text style={styles.sectionDescription}>
              Send us a message and we'll get back to you within 24 hours
            </Text>
            
            <Input
              label="Your Name"
              value={formData.name}
              onChangeText={(text) => updateField('name', text)}
              placeholder="John Smith"
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              value={formData.email}
              onChangeText={(text) => updateField('email', text)}
              placeholder="john@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              required
            />

            <Input
              label="Subject"
              value={formData.subject}
              onChangeText={(text) => updateField('subject', text)}
              placeholder="How can we help you?"
              error={errors.subject}
              required
            />

            <Input
              label="Message"
              value={formData.message}
              onChangeText={(text) => updateField('message', text)}
              placeholder="Please describe your issue or question in detail..."
              multiline
              numberOfLines={6}
              error={errors.message}
              required
              style={styles.messageInput}
            />

            <Button
              title="Send Message"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Other Ways to Reach Us</Text>
            
            <View style={styles.contactMethod}>
              <Mail size={20} color={Colors.primary} />
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Email</Text>
                <Text style={styles.contactValue}>support@thriveapp.co.za</Text>
              </View>
            </View>

            <View style={styles.contactMethod}>
              <Phone size={20} color={Colors.secondary} />
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>Phone</Text>
                <Text style={styles.contactValue}>Available soon</Text>
              </View>
            </View>

            <View style={styles.contactMethod}>
              <MessageCircle size={20} color={Colors.success} />
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>WhatsApp</Text>
                <Text style={styles.contactValue}>Available soon</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Help / FAQ (for Thrive – Christian Business Directory)</Text>
            
            <FAQItem
              question="❓ What is Thrive?"
              answer="Thrive is a Christian business directory that helps you discover, support, and connect with businesses and professionals who share Christian values. We aim to create a God-honouring ecosystem of support, excellence, and Kingdom impact."
            />

            <FAQItem
              question="🛍️ Are the businesses verified by Thrive?"
              answer="We do basic checks where possible, but we do not guarantee the quality, safety, or conduct of listed businesses. Please exercise due diligence before engaging any service or making a purchase. Thrive (Pty) Ltd is a directory service, not a regulatory body or agent of listed businesses."
            />

            <FAQItem
              question="✨ How do I list my business?"
              answer="You can add your business by tapping 'List Your Business' in the app and following the simple steps. Your listing will be reviewed before going live."
            />

            <FAQItem
              question="🔐 Is my personal information safe?"
              answer="Yes. We value your privacy. We only collect the minimum data necessary to operate the app. For more details, see our Privacy Policy."
            />

            <FAQItem
              question="🤝 Can I leave reviews or feedback about businesses?"
              answer="Yes, but we require all reviews to be: Respectful, Honest, Non-abusive. We reserve the right to remove any reviews that violate our community guidelines or promote harm."
            />

            <FAQItem
              question="🧾 Is Thrive free to use?"
              answer="Yes! Thrive is free to browse and list. Premium features (e.g., boosted visibility or custom branding) may be introduced in the future."
            />

            <FAQItem
              question="🧭 What kind of businesses are allowed?"
              answer="We welcome businesses that are: Owned or operated by Christians, Willing to conduct business with integrity, Not promoting content or services that conflict with core Christian values (e.g., gambling, adult content)."
            />

            <FAQItem
              question="🛡️ Is Thrive responsible for business conduct or disputes?"
              answer="No. Thrive (Pty) Ltd is not liable for any outcomes, losses, or disputes that arise between users and businesses. We are a connection platform, not an intermediary."
            />

            <FAQItem
              question="📬 How do I report an issue or get help?"
              answer="Email us at support@thriveapp.co.za or use the in-app contact form. We're here to serve you."
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Information</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version:</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Updated:</Text>
              <Text style={styles.infoValue}>January 2025</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Platform:</Text>
              <Text style={styles.infoValue}>iOS & Android</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
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
  messageInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: Spacing.md,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  contactContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  contactTitle: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: Spacing.xs,
  },
  contactValue: {
    fontSize: Typography.sm,
    color: Colors.gray600,
  },
  faqItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  faqQuestion: {
    fontSize: Typography.base,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: Spacing.sm,
  },
  faqAnswer: {
    fontSize: Typography.sm,
    color: Colors.gray600,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  infoLabel: {
    fontSize: Typography.sm,
    color: Colors.gray600,
  },
  infoValue: {
    fontSize: Typography.sm,
    fontWeight: '600',
    color: Colors.gray900,
  },
});
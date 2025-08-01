import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from './Input';
import { Colors, BorderRadius, Spacing, Typography } from '@/constants/Colors';
import { SOUTH_AFRICAN_COUNTRY_CODE } from '@/constants/SouthAfricaData';

interface PhoneInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  containerStyle?: any;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "82 123 4567",
  error,
  required = false,
  containerStyle,
}) => {
  const handleChange = (text: string) => {
    // Only allow numbers
    const cleaned = text.replace(/[^\d]/g, '');
    onChangeText(cleaned);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={styles.phoneInputContainer}>
        <View style={styles.countryCode}>
          <Text style={styles.countryCodeText}>{SOUTH_AFRICAN_COUNTRY_CODE}</Text>
        </View>
        <Input
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          keyboardType="phone-pad"
          error={error}
          containerStyle={styles.phoneInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: '600',
    color: Colors.gray700,
    marginBottom: Spacing.xs,
  },
  required: {
    color: Colors.error,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  countryCode: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.gray50,
    marginRight: Spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: Typography.base,
    color: Colors.gray700,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    marginBottom: 0,
  },
});
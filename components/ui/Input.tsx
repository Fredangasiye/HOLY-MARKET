import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChevronDown, Check } from 'lucide-react-native';
import { Colors, BorderRadius, Spacing, Typography } from '@/constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  containerStyle?: any;
  type?: 'text' | 'select';
  options?: { label: string; value: string }[];
  value?: any;
  onChangeText?: (text: string) => void;
  onValueChange?: (value: any) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  containerStyle,
  style,
  type = 'text',
  options = [],
  value,
  onChangeText,
  onValueChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTextChange = (text: string) => {
    onChangeText?.(text);
  };

  const handleValueChange = (newValue: any) => {
    onValueChange?.(newValue);
  };

  const handleSelectPress = () => {
    if (options.length === 0) {
      Alert.alert('No Options', 'No options available for this field.');
      return;
    }
    setShowModal(true);
  };

  const handleOptionSelect = (option: { label: string; value: string }) => {
    handleValueChange(option.value);
    setShowModal(false);
  };

  const renderModal = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{label}</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.modalOption,
                  item.value === value && styles.modalOptionSelected,
                ]}
                onPress={() => handleOptionSelect(item)}
              >
                <Text style={[
                  styles.modalOptionText,
                  item.value === value && styles.modalOptionTextSelected,
                ]}>
                  {item.label}
                </Text>
                {item.value === value && (
                  <Check size={20} color={Colors.white} />
                )}
              </TouchableOpacity>
            )}
            style={styles.modalList}
          />
        </View>
      </View>
    </Modal>
  );

  const getSelectedLabel = () => {
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : 'Please select...';
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}> *</Text>}
        </View>
      )}

      {type === 'select' && options.length > 0 ? (
        Platform.OS === 'web' ? (
          <View style={styles.selectWrapper}>
            <select
              value={value}
              onChange={(e) => handleValueChange(e.target.value)}
              style={{
                ...styles.input,
                fontFamily: 'inherit',
                appearance: 'none',
                padding: 12,
                width: '100%',
                borderRadius: 8,
                border: error ? `2px solid ${Colors.error}` : `1px solid ${Colors.gray300}`,
                backgroundColor: Colors.white,
                color: Colors.gray900,
                cursor: 'pointer',
                fontSize: Typography.base,
              }}
            >
              <option value="">Please select...</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <View style={styles.selectArrow}>
              <ChevronDown size={20} color={Colors.gray600} />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.customSelect,
              error && styles.inputError,
              isFocused && styles.inputFocused,
            ]}
            onPress={handleSelectPress}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.selectText,
              !value && styles.placeholderText,
            ]}>
              {getSelectedLabel()}
            </Text>
            <ChevronDown size={20} color={Colors.gray600} />
          </TouchableOpacity>
        )
      ) : (
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            style,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.gray400}
          value={value}
          onChangeText={handleTextChange}
          {...props}
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    zIndex: 10,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: '600',
    color: Colors.gray700,
  },
  required: {
    color: Colors.error,
    fontSize: Typography.sm,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.base,
    color: Colors.gray900,
    backgroundColor: Colors.white,
    minHeight: 44,
  },
  inputFocused: {
    borderColor: Colors.secondary,
    borderWidth: 2,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  errorText: {
    fontSize: Typography.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  selectWrapper: {
    position: 'relative',
  },
  selectArrow: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    pointerEvents: 'none',
  },
  customSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    minHeight: 44,
  },
  selectText: {
    fontSize: Typography.base,
    color: Colors.gray900,
    flex: 1,
  },
  placeholderText: {
    color: Colors.gray400,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    width: '100%',
    maxWidth: 400,
    maxHeight: '60%',
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  modalTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.gray900,
  },
  modalClose: {
    fontSize: Typography.xl,
    color: Colors.gray600,
    fontWeight: 'bold',
  },
  modalList: {
    flex: 1,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  modalOptionSelected: {
    backgroundColor: Colors.secondary,
  },
  modalOptionText: {
    fontSize: Typography.base,
    color: Colors.gray900,
    flex: 1,
  },
  modalOptionTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
});

// Additional styling for better dropdown appearance
const additionalStyles = StyleSheet.create({
  dropdownIcon: {
    marginLeft: Spacing.sm,
  },
  selectContainer: {
    position: 'relative',
  },
  selectButton: {
    paddingRight: 40, // Space for the dropdown arrow
  },
});

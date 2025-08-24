import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { Colors, BorderRadius, Spacing, Typography } from '@/constants/Colors';

interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  containerStyle?: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Please select...',
  options,
  value,
  onValueChange,
  error,
  required = false,
  disabled = false,
  containerStyle,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    if (disabled) return;
    
    if (options.length === 0) {
      Alert.alert('No Options', 'No options available for this field.');
      return;
    }
    setShowModal(true);
  };

  const handleOptionSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    
    onValueChange(option.value);
    setShowModal(false);
  };

  const getSelectedLabel = () => {
    const selectedOption = options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const renderModal = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{label || 'Select Option'}</Text>
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
                  item.disabled && styles.modalOptionDisabled,
                ]}
                onPress={() => handleOptionSelect(item)}
                disabled={item.disabled}
              >
                <Text style={[
                  styles.modalOptionText,
                  item.value === value && styles.modalOptionTextSelected,
                  item.disabled && styles.modalOptionTextDisabled,
                ]}>
                  {item.label}
                </Text>
                {item.value === value && !item.disabled && (
                  <Check size={20} color={Colors.white} />
                )}
              </TouchableOpacity>
            )}
            style={styles.modalList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}> *</Text>}
        </View>
      )}
      
      <TouchableOpacity
        style={[
          styles.dropdown,
          error && styles.dropdownError,
          disabled && styles.dropdownDisabled,
        ]}
        onPress={handlePress}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text style={[
          styles.dropdownText,
          !value && styles.placeholderText,
          disabled && styles.textDisabled,
        ]}>
          {getSelectedLabel()}
        </Text>
        <ChevronDown 
          size={20} 
          color={disabled ? Colors.gray400 : Colors.gray600} 
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
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
  dropdown: {
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
  dropdownError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  dropdownDisabled: {
    backgroundColor: Colors.gray50,
    borderColor: Colors.gray200,
  },
  dropdownText: {
    fontSize: Typography.base,
    color: Colors.gray900,
    flex: 1,
  },
  placeholderText: {
    color: Colors.gray400,
  },
  textDisabled: {
    color: Colors.gray400,
  },
  dropdownIcon: {
    marginLeft: Spacing.sm,
  },
  errorText: {
    fontSize: Typography.xs,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '60%',
    shadowColor: Colors.gray900,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
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
  modalOptionDisabled: {
    backgroundColor: Colors.gray50,
    opacity: 0.6,
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
  modalOptionTextDisabled: {
    color: Colors.gray400,
  },
});

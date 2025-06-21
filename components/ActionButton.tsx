import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary';

type AppButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
};

export default function ActionButton({title, onPress, variant = 'primary', disabled = false, style = {}}: AppButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
     <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

}


const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#E5E5EA',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: '#000',
  },
  disabled: {
    opacity: 0.6,
  },
});
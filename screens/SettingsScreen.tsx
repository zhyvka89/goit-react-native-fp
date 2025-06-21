import { useThemeContext } from "@/contexts/ThemeContext";
import { getThemeColors } from "@/utilities/theme";
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
const { theme, toggleTheme } = useThemeContext();
  const colors = getThemeColors(theme);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text, marginBottom: 20 }}>
        Current theme: {theme}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
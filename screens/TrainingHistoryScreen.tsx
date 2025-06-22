import { useGeneration } from '@/contexts/GenerationContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utilities/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type TrainingSession = {
  id: string;
  date: string;
  generationId: string;
  attendees: string[];
};

export default function TrainingHistoryScreen() {
  const [history, setHistory] = useState<TrainingSession[]>([]);
  const { generation } = useGeneration();
  const { theme } = useThemeContext();
  const colors = getThemeColors(theme);

  const getTrainingHistory = async (): Promise<TrainingSession[]> => {
    const json = await AsyncStorage.getItem('trainingSessions');
    return json ? JSON.parse(json) : [];
  };

  useEffect(() => {
    // AsyncStorage.clear(); // Clear storage for testing purposes
    const loadHistory = async () => {
      const all = await getTrainingHistory();
      const filtered = generation
        ? all.filter((s) => s.generationId.startsWith(generation.id))
        : all;
      setHistory(filtered);
    };

    loadHistory();
  }, [generation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {generation?.title} – Training History
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.attendees}>Attendees: {item.attendees.join(', ')}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  date: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  attendees: {
    color: '#555',
  },
});

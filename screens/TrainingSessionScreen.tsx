import { useGeneration } from '@/contexts/GenerationContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/utilities/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';

type TrainingSession = {
  id: string;
  date: string;
  generationId: string;
  attendees: string[];
};

export default function TrainingSessionScreen({route}: { route: any }) {
  const { members } = route.params;
  const [attendees, setAttendees] = useState<string[]>([]);
  const { generation } = useGeneration();
  const { theme } = useThemeContext();
  const colors = getThemeColors(theme);

  const toggleAttendance = (memberName: string) => {
    setAttendees(prev =>
      prev.includes(memberName)
        ? prev.filter(name => name !== memberName)
        : [...prev, memberName]
    );
  };

  const handleSaveSession = async () => {
    const session: TrainingSession = {
      id: uuid.v4().toString(),
      date: new Date().toLocaleDateString(),
      generationId: generation?.id || '',
      attendees,
    };

    try {
      const existing = await AsyncStorage.getItem('trainingSessions');
      const sessions = existing ? JSON.parse(existing) : [];
      await AsyncStorage.setItem('trainingSessions', JSON.stringify([...sessions, session]));
      Alert.alert('Success', 'Session saved successfully');
      setAttendees([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save session');
      console.error(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Mark Attendance</Text>

      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isChecked = attendees.includes(item.name);
          return (
            <TouchableOpacity
              style={[styles.memberRow, { backgroundColor: isChecked ? '#d0f0c0' : '#fff' }]}
              onPress={() => toggleAttendance(item.name)}
            >
              <Text style={{ color: colors.text }}>{item.name}</Text>
              <Text>{isChecked ? '✔️' : ''}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Session" onPress={handleSaveSession} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  memberRow: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

import React, { useState } from 'react';
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

interface AddGenerationModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export default function AddGenerationModal({ visible, onClose, onAdd }: AddGenerationModalProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Add New Generation</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. U15"
                style={styles.input}
              />
              <View style={styles.buttons}>
                <Button title="Cancel" onPress={onClose} />
                <Button title="Add" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

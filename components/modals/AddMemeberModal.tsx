import { addUser } from "@/api";
import React, { useState } from "react";
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
} from "react-native";
import Toast from "react-native-toast-message";

interface AddMemberModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default React.memo(function AddMemberModal({
  visible,
  onClose,
  onAdd,
}: AddMemberModalProps) {
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = () => {
    if (!newMember.name || !newMember.email) return;

    addUser(newMember).then(() => {
      setNewMember({ name: "", email: "" });
      onAdd();
      onClose();
      Toast.show({
        type: "success",
        text1: `Member ${newMember.name} added successfully!`,
      });
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Add New Member</Text>
              <TextInput
                value={newMember.name}
                onChangeText={(value) =>
                  setNewMember((prev) => ({ ...prev, name: value }))
                }
                placeholder="Full Name"
                style={styles.input}
              />
              <TextInput
                value={newMember.email}
                onChangeText={(value) =>
                  setNewMember((prev) => ({ ...prev, email: value }))
                }
                placeholder="Email"
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
});

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  innerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

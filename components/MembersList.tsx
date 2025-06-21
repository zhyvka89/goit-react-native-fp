import { deleteUser, fetchUsers } from "@/api";
import { useGeneration } from "@/contexts/GenerationContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { RootStackParamList } from "@/navigation/NativeStackNavigator";
import { getThemeColors } from "@/utilities/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import AddMemberModal from "./modals/AddMemeberModal";

type Props = NativeStackScreenProps<RootStackParamList, "MembersList">;

export default function MembersList({ navigation }: Props) {
  const [members, setMembers] = useState([]);
  const { theme } = useThemeContext();
  const colors = getThemeColors(theme);
  const { generation } = useGeneration();
  const [modalVisible, setModalVisible] = useState(false);

  const loadMembers = () => {
    fetchUsers()
      .then((result) => setMembers(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleRemoveMember = useCallback((id: string, name: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    deleteUser(id)
      .then(() => {
        Toast.show({
          type: "success",
          text1: `${name} deleted successfully!`,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: `Failed to delete ${name}. Please try again.`,
        });
      });
  }, []);

  const handleLongPress = useCallback(
    (id: string, name: string) => {
      Alert.alert(`Delete ${name}?`, "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => handleRemoveMember(id, name),
          style: "destructive",
        },
      ]);
    },
    [handleRemoveMember]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {generation ? `${generation.title} Members` : "Members"}
      </Text>

      <FlatList
        data={members}
        keyExtractor={(item: any) => item.id}
        renderItem={useCallback(
          ({ item }: any) => (
            <TouchableOpacity
              style={styles.memberRow}
              onPress={() =>
                navigation.navigate("MemberDetails", { memberId: item.id })
              }
              onLongPress={() => handleLongPress(item.id, item.name)}
            >
              <Image
                source={require("../assets/images/avatar.jpg")}
                style={styles.avatar}
              />
              <Text style={[styles.name, { color: colors.text }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ),
          [navigation, colors.text, handleLongPress]
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add New Member" onPress={() => setModalVisible(true)} />
      </View>

      <AddMemberModal
        visible={modalVisible}
        onClose={useCallback(() => setModalVisible(false), [])}
        onAdd={useCallback((loadMembers), [loadMembers])}
      />
      <Toast />
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
    fontWeight: "bold",
    marginBottom: 15,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

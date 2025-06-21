import { useGeneration } from "@/contexts/GenerationContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { getThemeColors } from "@/utilities/theme";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  ImageSourcePropType,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import GenerationCard from "../components/GenerationCard";
import AddGenerationModal from "./modals/AddGenerationModal";

type Generation = {
  id: string;
  title: string;
  image: ImageSourcePropType;
};

const initialGenerations: Generation[] = [
  { id: "1", title: "U9", image: require("../assets/images/1.jpg") },
  { id: "2", title: "U10", image: require("../assets/images/2.jpg") },
  { id: "3", title: "U11", image: require("../assets/images/3.jpg") },
  { id: "4", title: "U12", image: require("../assets/images/4.jpg") },
  { id: "5", title: "U13", image: require("../assets/images/5.jpg") },
  { id: "6", title: "U14", image: require("../assets/images/6.jpg") },
];

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function GenerationsList({ navigation }: { navigation: any }) {
  const { theme } = useThemeContext();
  const colors = getThemeColors(theme);
  const { setGeneration } = useGeneration();
  const [generations, setGenerations] = useState(initialGenerations);
  const flatListRef = useRef<FlatList>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddGeneration = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const newId = (generations.length + 1).toString();
    const newGeneration: Generation = {
      id: newId,
      title: `U${9 + generations.length}`,
      image: require("../assets/images/1.jpg"),
    };

    setGenerations([...generations, newGeneration]);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);

    Toast.show({
      type: "success",
      text1: "Generation added successfully!",
    });
  };

  const handleRemoveGeneration = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setGenerations((prev) => prev.filter((gen) => gen.id !== id));

    Toast.show({
      type: "success",
      text1: "Generation removed successfully!",
    });
  };

  const handleGenerationPress = useCallback(
    (generation: any) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setGeneration(generation);
      navigation.navigate("MembersList");
    },
    [setGeneration, navigation]
  );

  const handleLongPress = (id: string) => {
    Alert.alert(
      "Delete Generation",
      "Are you sure you want to delete this generation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => handleRemoveGeneration(id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={generations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GenerationCard
            title={item.title}
            image={item.image}
            onPress={() => handleGenerationPress(item)}
            onLongPress={() => handleLongPress(item.id)}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Generation" onPress={() => setModalVisible(true)} />
      </View>

      <AddGenerationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddGeneration}
      />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});

import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type GenerationCardProps = {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
  onLongPress: () => void;
};

export default React.memo(function GenerationCard({
  title,
  image,
  onPress,
  onLongPress,
}: GenerationCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});

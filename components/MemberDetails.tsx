import { fetchUserDetails } from "@/api";
import { useThemeContext } from "@/contexts/ThemeContext";
import { RootStackParamList } from "@/navigation/NativeStackNavigator";
import { getThemeColors } from "@/utilities/theme";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'MemberDetails'>;

type MemberDetailsType = {
  name?: string;
  email?: string;
};

export default function MemberDetails({ route }: Props) {
  const { memberId } = route.params;
  const [memberDetails, setMemberDetails] = useState<MemberDetailsType>({});
  const { theme } = useThemeContext();
  const colors = getThemeColors(theme);

  useEffect(() => {
    fetchUserDetails(memberId)
      .then((result) => setMemberDetails(result))
      .catch((error) => console.error(error));
  }, [memberId]);

  const handlePaymentsPress = () => {
    Alert.alert("Navigate to Payments");
  };

  const handleAttendancePress = () => {
    Alert.alert("Navigate to Training Attendance");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/avatar.jpg")}
          style={styles.avatar}
        />
        <Text style={[styles.name, {color: colors.text}]}>{memberDetails.name}</Text>
        <Text style={[styles.birthday, {color: colors.text}]}>Email: {memberDetails.email}</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.listItem} onPress={handlePaymentsPress}>
          <Text style={styles.listItemText}>Payments</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.listItem}
          onPress={handleAttendancePress}
        >
          <Text style={styles.listItemText}>Training Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  birthday: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  listItem: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    color: "#555",
    borderRadius: 8,
    marginTop: 26,
  },
  listItemText: {
    fontSize: 18,
  },
});

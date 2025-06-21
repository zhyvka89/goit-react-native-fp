import GenerationsList from "@/components/GenerationsList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  return <GenerationsList navigation={navigation} />;
}

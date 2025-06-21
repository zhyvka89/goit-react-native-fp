import MemberDetails from "@/components/MemberDetails";
import MembersList from "@/components/MembersList";
import { GenerationProvider } from "@/contexts/GenerationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import TrainingSessionScreen from '@/screens/TrainingSessionScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import BottomTabNavigator from "./BottomTabNavigator";

export type RootStackParamList = {
  GenerationsList: undefined;
  MembersList: { generationTitle: string };
  MemberDetails: { memberId: string };
  TrainingSession: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NativeStackNavigator() {
  return (
    <ThemeProvider>
      <GenerationProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="GenerationsList"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MembersList" component={MembersList} />
          <Stack.Screen name="MemberDetails" component={MemberDetails} />
          <Stack.Screen name="TrainingSession" component={TrainingSessionScreen} />
        </Stack.Navigator>
      </GenerationProvider>
    </ThemeProvider>
  )
}
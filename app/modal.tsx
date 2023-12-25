import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, Text, View } from "react-native";

import EditScreenInfo from "../src/components/EditScreenInfo";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold">Modal</Text>
      <View className="my-7 h-[1px] w-[80%]" />
      <EditScreenInfo path="app/modal.tsx" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

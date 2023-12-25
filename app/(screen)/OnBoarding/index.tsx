import { AntDesign } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import Button from "src/components/Button";
import { onboarding } from "src/constants";
import Onboard from "./item";

export default function OnBoardingScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = useRef<ScrollView>(null);

  const [currentBoard, setCurrentBoard] = useState<number>(0);

  const flatListIndex = useRef(0);

  const x = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    x.setValue(event.nativeEvent.contentOffset.x);

    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentBoard(index);
    flatListIndex.current = index; // Update flatListIndex
  };

  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center bg-sky-500"
      style={{ width: screenWidth }}
    >
      <View className="flex w-full flex-row items-center justify-between px-5 pt-5">
        <Image
          source={require("../../../src/assets/images/logo/rpi-white.png")}
          style={{ width: 80, height: 40 }}
          resizeMode="contain"
        />
        <Button onPress={() => router.push("/auth")}>
          <Text className="font-bold text-sky-100">Lewati</Text>
        </Button>
      </View>

      <ScrollView
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {onboarding.map((item, index) => {
          return (
            <Onboard
              key={item.id}
              index={index}
              item={item}
              x={x}
              screenWidth={screenWidth}
            />
          );
        })}
      </ScrollView>

      <View className="mb-10 flex h-10 flex-row items-center justify-center">
        {onboarding.map((item, index) => (
          <Animated.View
            key={index}
            className={`${
              currentBoard === index ? "w-10 bg-sky-50" : "w-6 bg-sky-200"
            } mx-1 h-2  rounded-lg`}
          />
        ))}
      </View>

      {currentBoard === onboarding.length - 1 && (
        <Pressable
          onPress={() => console.log('ok')}
          className="mb-4 items-center justify-center rounded-full bg-sky-100 p-3"
        >
          <Text className="font-semibold text-black">Login</Text>
          <AntDesign name="arrowright" size={20} className="w-10" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

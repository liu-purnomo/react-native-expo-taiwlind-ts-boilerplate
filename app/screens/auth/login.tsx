import { Auth } from "@/api";
import { Colors, Constants } from "@/components";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Feather, Octicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Formik, FormikHelpers } from "formik";
import React, { FC, useState } from "react";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

interface ILoginProps {
  pageToShow: "login" | "register";
  setPageToShow: (pageToShow: "login" | "register") => void;
}

export const LoginScreen: FC<ILoginProps> = ({ pageToShow, setPageToShow }) => {
  const { mutateAsync } = useMutation(Auth.login);
  const [showPassword, setShowPassword] = useState(false);

  const initialsValue = {
    email: "",
    password: "",
    remember: false,
  };

  const handleOnSubmit = async (
    value: DefaultFormValues,
    formik: FormikHelpers<any>
  ) => {
    try {
      const response = await mutateAsync(value);
      formik.resetForm();
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      Toast.show({
        type: "error",
        text2: error?.response?.data?.message || "Something went wrong 👋",
        text2Style: {
          fontSize: 18,
        },
      });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === "android" ? -100 : 0}
        enableOnAndroid
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-sky-600">
            <Image
              source={require("@/assets/images/shape.png")}
              className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
            />

            <Image
              source={require("@/assets/images/logo/rpi-white.png")}
              className="mx-auto mt-24 mb-6 h-20 w-40"
              resizeMode="contain"
            />

            <Text className="mb-9 text-center text-2xl font-bold text-sky-50">
              Login
            </Text>

            <View className="h-[60vh] rounded-t-3xl bg-white px-6 pt-10">
              <Formik initialValues={initialsValue} onSubmit={handleOnSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <>
                    <View className="mb-4 flex-row items-center rounded-3xl bg-sky-100 p-4">
                      <Feather name="user" size={20} color={Colors.black} />
                      <Input
                        placeholder="Email"
                        placeholderTextColor={Constants.HexToRgba(
                          Colors.black,
                          0.4
                        )}
                        className="ml-2 flex-1 text-black"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                    </View>

                    <View className="flex-row items-center rounded-3xl bg-sky-100 p-4">
                      <Feather name="lock" size={20} color={Colors.black} />
                      <Input
                        placeholder="Password"
                        placeholderTextColor={Constants.HexToRgba(
                          Colors.black,
                          0.4
                        )}
                        className="ml-2 flex-1 text-black"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        onPress={handleTogglePasswordVisibility}
                      >
                        <Octicons
                          name={showPassword ? "eye" : "eye-closed"}
                          size={16}
                          color={Constants.HexToRgba(Colors.black, 0.5)}
                        />
                      </TouchableOpacity>
                    </View>

                    <View className="mt-4 flex-row items-center justify-between">
                      <Button className="flex-row items-center">
                        <View className="relative h-4 w-4 items-center justify-center rounded-md border border-black/30">
                          <View className="h-3 w-3 rounded-md bg-black/60" />
                        </View>

                        <Text className="ml-2 text-sm text-black/30">
                          Remember me
                        </Text>
                      </Button>

                      <Button onPress={() => console.log("forgot password")}>
                        <Text className="ml-2 text-sm text-black/30">
                          Forgot password
                        </Text>
                      </Button>
                    </View>

                    <Button
                      className="mt-14 items-center rounded-2xl bg-sky-500 py-4"
                      onPress={handleSubmit}
                    >
                      <Text className="text-base font-semibold text-white">
                        Login
                      </Text>
                    </Button>

                    <Button onPress={handleSubmit} title="Submit" />
                  </>
                )}
              </Formik>

              <Button
                className="mt-6 flex-row items-center justify-center"
                onPress={() => setPageToShow("register")}
              >
                <Text className="text-sm text-black">
                  Belum punya akun?{" "}
                  <Text className="text-main font-semibold text-sky-800">
                    Mendaftar
                  </Text>
                </Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

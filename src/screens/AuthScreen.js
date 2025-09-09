import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID } from "../utils/config";
import { useAuthCtx } from "../context/AuthContext";

const AuthScreen = () => {
  const { signIn } = useAuthCtx();

  useEffect(() => {
    resquestPermission();
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: "",
      forceConsentPrompt: true,
    });
  }, []);

  const resquestPermission = async () => {
    if (Platform.OS == "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  };

  const handleSignin = async () => {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();

    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo?.user?.email);

    signIn(userInfo?.user?.email);
  };

  return (
    <View style={internalStyle.container}>
      <TouchableOpacity
        onPress={handleSignin}
        style={internalStyle.buttonStyle}
      >
        <Text style={internalStyle.buttonTextStyle}>Sign In With Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const internalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontSize: 16,
    color: "#000",
  },
});

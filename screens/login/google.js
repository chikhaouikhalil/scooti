import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "native-base";
import * as Google from "expo-auth-session/providers/google";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { colors, width } from "../../globalStyles";
import { UIActivityIndicator } from "react-native-indicators";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  const [loader, setLoader] = useState(false);
  // google sign in
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "768338275422-ldat39ijvgnmtps7n68kglsb12ru0vec.apps.googleusercontent.com",
    iosClientId:
      "768338275422-hlbo21ti6le8p16nbcshtebl1dd14q9k.apps.googleusercontent.com",
  });

  const navigation = useNavigation();

  const googleSignIn = async () => {
    //console.log("reponse is : ", response);
    if (
      response?.type === "cancel" ||
      response?.type === "dismiss" ||
      response?.type === "error"
    ) {
      setLoader(false);
      console.log("canceled");
    }
    if (response?.type === "success") {
      setLoader(true);

      const auth = response.authentication;
      // info provided by google
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );

      userInfoResponse.json().then(async (data) => {
        console.log("réponse from google", data);
        // sign up user = get user data and generated token

        axios
          .post("https://scootibackend.alwaysdata.net/users/google-signin", {
            email: data.email,
            firstname: data.given_name,
            lastname: data.family_name,
            image: data.picture,
          })
          .then(async (serverResponse) => {
            const token = serverResponse.data.access_token;

            await AsyncStorage.setItem("access_token", token);
            const userJsonValue = JSON.stringify(serverResponse.data);
            await AsyncStorage.setItem("user", userJsonValue);
            console.log("la réponse du serveur est :  ", serverResponse.data);
            navigation.replace("TabNavigation");
            setLoader(false);
          });
      });
    }
  };

  useEffect(() => {
    googleSignIn();
  }, [response]);
  return (
    <View mb="3">
      <TouchableOpacity
        onPress={() => {
          setLoader(true);
          promptAsync({ useProxy: false, showInRecents: true });
        }}
        style={styles.button}
      >
        {!loader && <AntDesign name="google" size={24} color={colors.black} />}
        {!loader && <Text style={styles.buttonText}>Continue with Google</Text>}
        {loader && <UIActivityIndicator size={20} color={colors.black} />}
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "Regular",
    fontSize: 15,
    color: colors.black,
    marginLeft: 4,
  },
  button: {
    backgroundColor: colors.primary,
    width: width * 0.9,
    flexDirection: "row",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

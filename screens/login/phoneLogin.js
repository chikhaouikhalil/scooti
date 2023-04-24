import { StyleSheet, View, Text, Keyboard } from "react-native";
import React, { useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../firebase";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { colors, width } from "../../globalStyles";
import { TouchableOpacity } from "react-native";
import BackHeader from "../../components/BackHeader";
import { Image } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";

const PhoneLogin = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  const phoneInput = useRef(null);

  const recaptchaVerifier = useRef(null);

  const submitHandler = () => {
    setLoading(true);
    Keyboard.dismiss();
    signInWithPhoneNumber(auth, formattedValue, recaptchaVerifier.current)
      .then((confirm) => {
        setLoading(false);
        navigation.navigate("PhoneConfirm", {
          confirm: confirm,
          phoneNumber: formattedValue,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setErrorMessage("An error has accured, try later !");
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          position: "absolute",
          bottom: 0,
          width,
          height: width * 2,
          opacity: 0.4,
        }}
        source={require("../../assets/background.png")}
      />
      <BackHeader />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification
      />

      <Text style={styles.errorMessage}>
        {errorMessage ? errorMessage : " "}
      </Text>

      <MaterialIcons
        name="phone-android"
        size={70}
        color={colors.black}
        style={{ alignSelf: "center", marginTop: 20 }}
      />
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={styles.text}>Continue with Phone Number</Text>
        <Text style={styles.text1}>
          We'll send you a code to verify your mobile phone number
        </Text>
        <PhoneInput
          ref={phoneInput}
          containerStyle={{ width: "100%", borderRadius: 10 }}
          defaultValue={value}
          defaultCode="TN"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
            const checkValid = phoneInput.current?.isValidNumber(text);
            setValid(checkValid ? checkValid : false);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
        />

        <TouchableOpacity
          style={[styles.button, { opacity: valid ? 1 : 0.5 }]}
          disabled={!valid}
          onPress={submitHandler}
        >
          {loading ? (
            <UIActivityIndicator size={20} color={colors.black} />
          ) : (
            <Text style={styles.buttonText}>CONTINUE</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.text2}>
          By continuing, I accept{" "}
          <Text style={{ color: colors.black }}>
            the Terms of condition, User aggrements
          </Text>{" "}
          and <Text style={{ color: colors.black }}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default PhoneLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Bold",
    marginTop: 20,
    lineHeight: 30,
    color: colors.black,
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Regular",
    marginTop: 30,
    color: colors.error,
  },
  text1: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Medium",
    marginTop: 10,
    color: colors.black,
    opacity: 0.8,
    marginBottom: 15,
  },
  continue: {
    color: colors.white,
    fontFamily: "Medium",
    letterSpacing: 2,
  },
  text2: {
    textAlign: "center",
    color: colors.black,
    fontFamily: "Regular",
    marginTop: 15,
    fontSize: 13,
  },
  buttonText: {
    fontFamily: "Medium",
    fontSize: 15,
    color: colors.black,
  },
  button: {
    marginTop: 20,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.primary,
    height: 45,
    borderRadius: 45,
  },
});

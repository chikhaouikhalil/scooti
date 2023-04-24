import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors, width } from "../../globalStyles";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import GoogleSignIn from "./google";

const Login = ({ navigation }) => {
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
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: 250, height: 250, alignSelf: "center" }}
          source={require("../../assets/icon-transparent.png")}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          At Scooti, we believe that transportation should be efficient,
          affordable, and sustainable. That's why we created an app that lets
          you rent bikes and scooters from our network of parking locations.
          With our user-friendly interface and commitment to providing
          high-quality, well-maintained vehicles, we're making it easier than
          ever for people to get around. Plus, by choosing to ride with Scooter,
          you're helping to reduce traffic congestion and emissions, making your
          city a better place for everyone. Join us in the Scooti revolution
          today!
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <GoogleSignIn />
        <TouchableOpacity
          onPress={() => navigation.navigate("PhoneLogin")}
          style={styles.button}
        >
          <AntDesign name="mobile1" size={24} color={colors.white} />
          <Text style={styles.buttonText}>Continue with Phone Number</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginHorizontal: 20,
    fontSize: 14,
    fontFamily: "Regular",
    color: colors.black,
  },
  buttonsContainer: {
    width,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.white,
    marginLeft: 4,
  },
  button: {
    backgroundColor: colors.blue,
    width: "90%",
    flexDirection: "row",
    height: 45,
    marginTop: -5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

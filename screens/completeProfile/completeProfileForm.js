import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors, width } from "../../globalStyles";
import { ScrollView } from "react-native";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InputText } from "../../components/Inputs";
import { Ionicons, Fontisto } from "@expo/vector-icons";

const CompleteProfileForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  const checkValid = () => {
    const re = /\S+@\S+\.\S+/;
    const isValid = re.test(email);
    if (firstname.length > 2 && lastname.length > 2 && isValid) {
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = async () => {
    if (!loader) {
      setErrorMessage(null);
      setLoader(true);
      const token = await AsyncStorage.getItem("access_token");
      axios
        .put("https://scootibackend.alwaysdata.net/users/update-user", {
          access_token: token,
          email: email.toLocaleLowerCase().trim(),
          firstname,
          lastname,
        })
        .then(async (serverResponse) => {
          const userJsonValue = JSON.stringify(serverResponse.data);
          await AsyncStorage.setItem("user", userJsonValue);
          console.log("la réponse du serveur est :  ", serverResponse.data);
          navigation.replace("TabNavigation");
          setLoader(false);
        })
        .catch((err) => {
          if (err.response && err.response.status == 409) {
            setErrorMessage("Mail address is already linked to other account");
          } else {
            setErrorMessage("Please verify your Internet connection");
          }
          setLoader(false);
        });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: "95%", alignSelf: "center" }}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.text}>
            Welcome to our app! Before you can start using all of our features,
            we need a little more information from you. Please take a moment to
            complete your profile by providing your name and email address. This
            will help us personalize your experience and keep you informed of
            important updates.
          </Text>
          <Text style={styles.errorMessage}>
            {errorMessage ? errorMessage : " "}
          </Text>
          <View style={styles.formContainer}>
            {/** firstname */}
            <InputText
              placeholder="Firstname"
              value={firstname}
              setValue={setFirstname}
              InputLeftElement={
                <Icon
                  as={<Fontisto name="person" />}
                  size={5}
                  ml="2"
                  color="muted.500"
                />
              }
            />
            {/** lastname */}
            <InputText
              style={{ marginTop: 10 }}
              placeholder="Lastname"
              value={lastname}
              setValue={setLastname}
              InputLeftElement={
                <Icon
                  as={<Fontisto name="persons" />}
                  size={5}
                  ml="2"
                  color="muted.500"
                />
              }
            />
            {/** email */}
            <InputText
              style={{ marginTop: 10 }}
              placeholder="Mail address"
              value={email}
              setValue={setEmail}
              InputLeftElement={
                <Icon
                  as={<Ionicons name="mail" />}
                  size={5}
                  ml="2"
                  color="muted.500"
                />
              }
            />
            <TouchableOpacity
              style={[styles.button, { opacity: checkValid() ? 0.7 : 1 }]}
              disabled={checkValid()}
              onPress={submitHandler}
            >
              {loader ? (
                <UIActivityIndicator size={20} color={colors.black} />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.text2}>
              Don't worry, we value your privacy and will never share your
              information with third parties. Thank you for helping us make our
              app better for everyone!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompleteProfileForm;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Medium",
    fontSize: 18,
    color: colors.primaryDark,
    marginTop: 30,
    marginBottom: 15,
  },
  text: { fontFamily: "Regular", fontSize: 13, color: colors.black },
  text2: {
    fontFamily: "Light",
    fontSize: 12,
    color: colors.darkGray,
    marginVertical: 15,
    textAlign: "center",
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Regular",
    marginVertical: 15,
    color: colors.error,
  },
  formContainer: {
    width: "100%",
    flex: 1,
    paddingBottom: 20,
  },
  buttonText: {
    fontFamily: "Medium",
    fontSize: 15,
    color: colors.black,
  },
  button: {
    marginTop: 20,
    width: width * 0.9,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.primary,
    height: 45,
    borderRadius: 45,
  },
});

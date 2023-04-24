import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors, width } from "../../globalStyles";
import { UIActivityIndicator } from "react-native-indicators";
import BackHeader from "../../components/BackHeader";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PhoneConfirm = ({ navigation, route }) => {
  const CELL_COUNT = 6;
  const confirm = route.params.confirm;
  const phoneNumber = route.params.phoneNumber;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  async function confirmCode() {
    try {
      setLoading(true);
      await confirm.confirm(value);

      axios
        .post("https://scootibackend.alwaysdata.net/users/phone-signin", {
          phoneNumber,
        })
        .then(async (serverResponse) => {
          const token = serverResponse.data.access_token;

          await AsyncStorage.setItem("access_token", token);
          const userJsonValue = JSON.stringify(serverResponse.data);
          await AsyncStorage.setItem("user", userJsonValue);
          console.log("la réponse du serveur est :  ", serverResponse.data);
          if (serverResponse.data.firstname) {
            navigation.replace("TabNavigation");
          } else {
            navigation.replace("CompleteProfile");
          }
          setLoading(false);
        });
    } catch (error) {
      setErrorMessage("Invalid code");
      setLoading(false);
    }
  }

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
      <Text style={styles.errorMessage}>
        {errorMessage ? errorMessage : " "}
      </Text>
      <MaterialCommunityIcons
        size={70}
        color={colors.black}
        style={{ alignSelf: "center", marginTop: 20 }}
        name="cellphone-check"
      />
      <Text style={styles.text1}>
        Please enter the code received via SMS to verify your mobile phone
        number
      </Text>
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <CodeField
          ref={ref}
          {...props}
          caretHidden={false}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          useBlurOnFulfill
          onBlur={confirmCode}
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
                symbol.length > 0 && styles.filledCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <TouchableOpacity
          style={[styles.button, { opacity: value.length < 6 ? 0.7 : 1 }]}
          disabled={value.length < 6}
          onPress={confirmCode}
        >
          {loading ? (
            <UIActivityIndicator size={20} color={colors.black} />
          ) : (
            <Text style={styles.buttonText}>Valid</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PhoneConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Regular",
    marginTop: 30,
    color: colors.error,
  },
  codeFieldRoot: { marginBottom: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 36,
    fontSize: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#9ca3af",
    backgroundColor: colors.white,
    textAlign: "center",
    fontFamily: "Medium",
  },
  focusCell: {
    borderColor: colors.primary,
    color: colors.primary,
  },
  filledCell: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.black,
  },
  text1: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Medium",
    marginTop: 10,
    color: colors.black,
    opacity: 0.8,
    marginBottom: 15,
    marginHorizontal: 20,
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

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors, width } from "../../../globalStyles";

const CompleteProfile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const getUserFromStorage = async () => {
    const userFromStorage = await AsyncStorage.getItem("user");
    const user = userFromStorage != null ? JSON.parse(userFromStorage) : null;
    if (!user) {
      navigation.replace("Login");
    } else {
      setUserData(user);
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("user");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/scooters.png")}
        style={styles.background}
      />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Image
            source={require("../../../assets/avatar.png")}
            style={styles.image}
          />

          <Text style={styles.name}>
            {userData.firstname}{" "}
            <Text style={{ color: colors.primaryDark }}>
              {userData.lastname}
            </Text>
          </Text>
          <Text style={styles.id}>@{userData._id}</Text>
          <TouchableOpacity onPress={logoutHandler} style={styles.button}>
            <Ionicons name="exit" size={16} color={colors.white} />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail" size={24} color={colors.blue} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{userData.email}</Text>
            </View>
          </View>

          {userData.phoneNumber && (
            <View style={[styles.row, { marginTop: 4 }]}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="phone-portrait-sharp"
                  size={24}
                  color={colors.blue}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{userData.phoneNumber}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.button1}>
            <MaterialIcons name="access-alarm" size={20} color="white" />
            <Text style={styles.buttonText1}>Bookings history</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  background: {
    width: width * 0.7,
    height: width * 0.7,
    position: "absolute",
    right: 0,
    opacity: 0.4,
    bottom: 70,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 15,
  },
  name: {
    marginHorizontal: 15,
    color: colors.blue,
    fontFamily: "Medium",
    fontSize: 22,
    marginTop: 10,
    marginBottom: -5,
    textAlign: "center",
  },
  id: {
    marginHorizontal: 15,
    color: colors.black,
    fontFamily: "Light",
    fontSize: 11,
    textAlign: "center",
  },
  text: {
    color: colors.blue,
    fontFamily: "Regular",
    fontSize: 14,
  },
  row: {
    backgroundColor: colors.white,
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    paddingHorizontal: 2,
    paddingTop: 5,
    marginTop: 10,
  },
  iconContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: colors.blue,
    borderColor: colors.black,
    height: 40,
    marginLeft: 2,
  },
  textContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: colors.blue,
    marginHorizontal: 2,
    paddingLeft: 5,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Light",
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
  button: {
    backgroundColor: colors.error,
    alignSelf: "flex-end",
    marginRight: "2.5%",
    paddingHorizontal: 5,
    flexDirection: "row",
    height: 35,
    width: 150,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button1: {
    backgroundColor: colors.primaryDark,
    alignSelf: "center",
    flexDirection: "row",
    height: 40,
    width: width * 0.9,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText1: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.white,
    marginLeft: 4,
  },
});

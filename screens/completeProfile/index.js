import { StyleSheet, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompleteProfileForm from "./completeProfileForm";
import { width } from "../../globalStyles";
import { ScrollView } from "react-native";

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

  useEffect(() => {
    getUserFromStorage();
  }, []);

  if (!userData) {
    return null;
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <CompleteProfileForm />
      </ScrollView>
    </View>
  );

  //   return (
  //     <View style={styles.container}>
  //       {userData.image ? (
  //         <Image
  //           source={{ uri: userData.image }}
  //           style={{
  //             width: 40,
  //             height: 40,
  //             alignSelf: "center",
  //             borderRadius: 20,
  //           }}
  //         />
  //       ) : (
  //         <Ionicons
  //           name="person-circle-outline"
  //           size={40}
  //           color={colors.black}
  //           style={{ alignSelf: "center" }}
  //         />
  //       )}
  //       <Text style={{ fontFamily: "Regular", textAlign: "center" }}>
  //         id : {userData._id}
  //       </Text>
  //       <Text style={{ fontFamily: "Regular", textAlign: "center" }}>
  //         firstname : {userData.firstname ? userData.firstname : "-"}
  //       </Text>
  //       <Text style={{ fontFamily: "Regular", textAlign: "center" }}>
  //         lastname : {userData.lastname ? userData.lastname : "-"}
  //       </Text>
  //       <Text style={{ fontFamily: "Regular", textAlign: "center" }}>
  //         email : {userData.email ? userData.email : "-"}
  //       </Text>
  //       <Text style={{ fontFamily: "Regular", textAlign: "center" }}>
  //         phoneNumber : {userData.phoneNumber}
  //       </Text>
  //       <Button onPress={logoutHandler}>Logout</Button>
  //     </View>
  //   );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

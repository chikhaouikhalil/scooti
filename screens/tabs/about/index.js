import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors, width } from "../../../globalStyles";
import { ScrollView } from "react-native";
import Collapsibles from "./collapsibles";
import { LinearGradient } from "expo-linear-gradient";
import VideoComponent from "../../../components/VideoComponent";
import { MultipleLineInput, SelectInput } from "../../../components/Inputs";
import { KeyboardAvoidingView } from "native-base";
import { UIActivityIndicator } from "react-native-indicators";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SuccessSentContact from "../../../components/modals/SuccessSentContact";

const ObjectOptions = [
  {
    label: "Object",
    value: "",
  },
  { label: "Dysfunction", value: "dysfunction" },
  { label: "Feedback", value: "feedback" },
  { label: "Proposal", value: "proposal" },
  { label: "Other", value: "other" },
];

const About = () => {
  const [object, setObject] = useState(ObjectOptions[0]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [successContactModal, setSuccessContactModal] = useState(false);
  const scrollRef = useRef();

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const submitHandler = async () => {
    if (!loader) {
      setErrorMessage(null);
      setLoader(true);
      const token = await AsyncStorage.getItem("access_token");
      axios
        .post("https://scootibackend.alwaysdata.net/contact", {
          access_token: token,
          object,
          message,
        })
        .then(async () => {
          setMessage("");
          setObject(ObjectOptions[0]);
          setLoader(false);
          setSuccessContactModal(true);
          scrollToTop();
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Please verify your Internet connection");
          setLoader(false);
        });
    }
  };
  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
          <Image
            style={styles.image}
            source={require("../../../assets/about.png")}
          />

          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text style={styles.scooti}>Scooti</Text>
            <Text style={styles.title}>
              Welcome to our platform for eco-friendly transportation!
            </Text>
            <Text style={styles.text}>
              Our mission is to provide an easy and accessible way for people to
              get around while minimizing their impact on the environment.
            </Text>
            <Text style={styles.text}>
              We believe that sustainable transportation options are more
              important than ever, as we all strive to reduce our carbon
              footprint and live more eco-conscious lifestyles. That's why we
              offer a fleet of electric scooters and bikes that are perfect for
              short trips around town.
            </Text>
            <Text style={styles.text}>
              Our team is made up of passionate individuals who are dedicated to
              creating a cleaner and more sustainable future. We are constantly
              working to improve our service, and we pride ourselves on
              providing the highest quality vehicles and customer experience.
            </Text>
            <Text style={styles.text}>
              With our easy-to-use app, you can quickly find and rent a scooter
              or bike near you, and enjoy a convenient and affordable mode of
              transportation without having to worry about gas or emissions.
            </Text>
            <Text style={styles.text}>
              Thank you for choosing our platform and joining us in the effort
              to create a more sustainable world.
            </Text>

            <Collapsibles />
          </View>
          <View style={{ width, backgroundColor: colors.white, flex: 1 }}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View style={{ width: width * 0.75 }}>
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: "Medium",
                    fontSize: 24,
                    marginHorizontal: 10,
                    textAlign: "center",
                  }}
                >
                  Contact Us
                </Text>
              </View>

              <Image
                source={require("../../../assets/contact.png")}
                style={{ width: width * 0.25, height: width * 0.25 }}
              />
            </LinearGradient>
            <View style={{ width: "95%", alignSelf: "center" }}>
              <Text style={[styles.text, { marginBottom: 15 }]}>
                We're always happy to hear from our customers! If you have any
                questions, comments, or concerns about our products or services,
                please don't hesitate to get in touch.
              </Text>
              <SelectInput
                value={object}
                setValue={setObject}
                options={ObjectOptions}
                placeholder="Object"
              />
              <View style={{ marginTop: 15 }}>
                <MultipleLineInput
                  placeholder="message ..."
                  value={message}
                  setValue={setMessage}
                />
              </View>

              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={
                  object.value == "" || message.length < 5
                    ? ["#d4d4d4", "#d4d4d4"]
                    : [colors.primary, colors.primaryDark]
                }
                style={{
                  marginTop: 20,
                  width: "100%",
                  height: 45,
                  borderRadius: 45,
                }}
              >
                <TouchableOpacity
                  disabled={object.value == "" || message.length < 5}
                  onPress={submitHandler}
                  style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!loader && (
                    <MaterialCommunityIcons
                      name="email-send-outline"
                      size={20}
                      style={{ marginLeft: -4 }}
                      color={colors.black}
                    />
                  )}
                  {!loader && <Text style={styles.buttonText}>Send</Text>}
                  {loader && (
                    <UIActivityIndicator size={20} color={colors.black} />
                  )}
                </TouchableOpacity>
              </LinearGradient>
              <Text style={styles.errorMessage}>
                {errorMessage ? errorMessage : " "}
              </Text>
            </View>
            <View style={{ backgroundColor: colors.black, paddingBottom: 80 }}>
              <VideoComponent
                logo={false}
                linearColors={["#00000020", colors.black]}
                url="https://v4.cdnpk.net/videvo_files/video/free/video0467/large_watermarked/_import_6150216f156608.21939956_FPpreview.mp4"
              />
            </View>
          </View>
        </ScrollView>
        {/** succcess contact sent modal */}
        <SuccessSentContact
          isOpen={successContactModal}
          setIsOpen={setSuccessContactModal}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: width * 0.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  scooti: {
    fontSize: 20,
    fontFamily: "Bold",
    color: colors.primary,
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: "Medium",
    color: colors.darkGray,
    textAlign: "center",
    lineHeight: 22,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 12,
    fontFamily: "Regular",
    color: colors.black,
    textAlign: "justify",
    paddingHorizontal: 5,
    marginTop: 15,
  },
  errorMessage: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Regular",
    marginVertical: 12,
    color: colors.error,
  },
  buttonText: {
    fontFamily: "Medium",
    fontSize: 14,
    color: colors.black,
    marginLeft: 4,
  },
});

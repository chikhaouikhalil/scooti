import { Linking, Platform, StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { MyMarker } from "../components/Icons";
import { customMapStyle } from "./MapStyle";
// import HomeHeader from "../components/HomeHeader";
import { useEffect } from "react";
import axios from "axios";
import { UIActivityIndicator } from "react-native-indicators";
import { colors, width } from "../../../globalStyles";
import { Actionsheet, useDisclose, View, Image } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const Parkings = ({ navigation }) => {
  const [loader, setLoader] = useState(true);
  const [parkings, setParkings] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`https://scootibackend.alwaysdata.net/parkings`)
      .then((res) => {
        setParkings(res.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, []);
  const { isOpen, onOpen, onClose } = useDisclose();

  const directionHandler = () => {
    const lat = selectedParking?.latitude;
    const lng = selectedParking?.longitude;

    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${lat},${lng}`;
    const label = "Scooti - " + selectedParking?.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {loader ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UIActivityIndicator size={40} color={colors.primary} />
        </View>
      ) : (
        <MapView
          onPress={() => setSelectedParking(null)}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}
          style={styles.map}
          initialRegion={{
            latitude: 36.7771137,
            longitude: 10.2892039,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.4921,
          }}
        >
          {parkings.map((parking) => {
            return (
              <Marker
                onPress={() => {
                  setSelectedParking(parking);
                  onOpen();
                }}
                icon={
                  selectedParking && parking._id == selectedParking._id
                    ? require("../../../assets/marker-active.png")
                    : selectedParking == null
                    ? require("../../../assets/marker.png")
                    : require("../../../assets/marker.png")
                }
                resizeMode="cover"
                // onPress={() => navigation.navigate("Parking", parking)}
                key={parking._id}
                coordinate={{
                  latitude: parking.latitude,
                  longitude: parking.longitude,
                }}
              />
            );
          })}
        </MapView>
      )}
      {/** action sheet */}
      <Actionsheet
        backgroundColor="#1D220D80"
        isOpen={isOpen && selectedParking != null}
        onClose={onClose}
      >
        <Actionsheet.Content bg="#f7f7f5" style={{ padding: 0 }}>
          <View>
            <Text style={styles.title}>{selectedParking?.title}</Text>
            <Pressable
              onPress={directionHandler}
              style={styles.directionButton}
            >
              <MaterialCommunityIcons name="highway" size={20} color="white" />
              <Text style={styles.buttonText}>Itinéraire</Text>
            </Pressable>
            {/** scooters card */}
            <View style={styles.cardContainer}>
              {/** image */}
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/scooter.png")}
                  style={styles.image}
                  alt="scooter"
                />
              </View>
              {/** text */}
              <View style={styles.rightSection}>
                {selectedParking && selectedParking?.scooters > 0 ? (
                  <Text style={styles.available}>Available</Text>
                ) : (
                  <Text style={styles.notAvailable}>Not available</Text>
                )}
                <Text
                  style={[
                    styles.number,
                    {
                      color:
                        selectedParking?.scooters > 0
                          ? colors.black
                          : colors.error,
                    },
                  ]}
                >
                  {selectedParking?.scooters} available scooters
                </Text>
                <Pressable
                  style={[
                    styles.bookButton,
                    {
                      backgroundColor:
                        selectedParking?.scooters <= 0
                          ? colors.lightGray
                          : colors.primaryDark,
                    },
                  ]}
                  disabled={selectedParking?.scooters <= 0}
                >
                  <Entypo name="bookmark" size={20} color="white" />
                  <Text style={styles.buttonText}>Book a scooter</Text>
                </Pressable>
              </View>
            </View>
            {/** bikes card */}
            <View style={styles.cardContainer}>
              {/** image */}
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/bike.png")}
                  style={styles.image}
                  alt="scooter"
                />
              </View>
              {/** text */}
              <View style={styles.rightSection}>
                {selectedParking && selectedParking?.bikes > 0 ? (
                  <Text style={styles.available}>Available</Text>
                ) : (
                  <Text style={styles.notAvailable}>Not available</Text>
                )}
                <Text
                  style={[
                    styles.number,
                    {
                      color:
                        selectedParking?.bikes > 0
                          ? colors.black
                          : colors.error,
                    },
                  ]}
                >
                  {selectedParking?.bikes} available bikes
                </Text>
                <Pressable
                  style={[
                    styles.bookButton,
                    {
                      backgroundColor:
                        selectedParking?.bikes <= 0
                          ? colors.lightGray
                          : colors.primaryDark,
                    },
                  ]}
                  disabled={selectedParking?.bikes <= 0}
                >
                  <Entypo name="bookmark" size={20} color="white" />
                  <Text style={styles.buttonText}>Book a bike</Text>
                </Pressable>
              </View>
            </View>
            <View style={{ height: 20 }} />
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default Parkings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 4,
    borderColor: colors.lightGray,
    width: width * 0.95,
    alignSelf: "center",
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: 15,
  },
  imageContainer: {
    width: width * 0.25,
    minHeight: width * 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
  },
  rightSection: {
    width: width * 0.7,
  },
  directionButton: {
    backgroundColor: colors.blue,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
    height: 35,
    borderRadius: 5,
    marginVertical: 10,
  },
  bookButton: {
    backgroundColor: colors.primaryDark,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.4,
    height: 35,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "Regular",
    color: colors.white,
    marginLeft: 4,
    fontSize: 13,
  },
  title: {
    fontFamily: "Medium",
    color: colors.blue,
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 10,
  },
  available: {
    backgroundColor: colors.primaryDark,
    alignSelf: "flex-end",
    margin: 2,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: colors.white,
    fontFamily: "Light",
    borderRadius: 4,
    fontSize: 12,
  },
  notAvailable: {
    backgroundColor: colors.error,
    alignSelf: "flex-end",
    margin: 2,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
    color: colors.white,
    fontFamily: "Light",
    fontSize: 12,
  },
  number: {
    fontFamily: "Regular",
    color: colors.black,
    textAlign: "center",
    marginHorizontal: 10,
    fontSize: 14,
    marginTop: 10,
  },
});

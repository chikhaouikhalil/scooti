import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { colors, width } from "../../globalStyles";
import { TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
function Indicator() {
  return <View style={styles.indicator} />;
}

const Boarding = ({ navigation }) => {
  const boardingList = [
    {
      id: "1",
      title: "Welcome to Scooti",
      text: "Get ready to explore your city like never before with Scooti! Our app lets you rent bikes and scootis from our conveniently located parking spots, so you can travel quickly and efficiently. Whether you're commuting to work or enjoying a leisurely ride, Scooti has you covered.",
      image: require("../../assets/boarding1.png"),
    },
    {
      id: "2",
      title: "Ride with Scooti",
      text: "Discover a new way to get around with Scooti! Our app makes it easy to rent bikes and scootis from our network of parking locations. With our user-friendly interface, you can quickly find a nearby bike or scooti, unlock it with your phone, and be on your way. Say goodbye to traffic and hello to adventure!",
      image: require("../../assets/boarding2.png"),
    },
    {
      id: "3",
      title: " Join the Scooti Revolution",
      text: " Are you ready to revolutionize the way you travel? Look no further than Scooti! Our app connects you with bikes and scootis at our designated parking locations, so you can easily explore your city. With our affordable prices and commitment to sustainability, you can feel good about your ride every time.",
      image: require("../../assets/boarding3.png"),
    },
  ];
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const version = Constants.manifest.version;
  return (
    <View style={styles.container}>
      <View style={styles.boardingContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
            { useNativeDriver: false }
          )}
        >
          {boardingList.map((x) => (
            <View style={styles.card} key={x.id}>
              <Image style={styles.image} source={x.image} />
              <View style={styles.textsContainer}>
                <Text style={styles.title}>{x.title}</Text>
                <Text style={styles.text}>{x.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.indicatorConatiner} pointerEvents="none">
          {boardingList.map((x) => (
            <Indicator x={x} key={x.id} />
          ))}
          <Animated.View
            style={[
              styles.activeIndicator,
              { position: "absolute", transform: [{ translateX }] },
            ]}
          />
        </View>
      </View>
      {/** buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.replace("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login in to Scooti</Text>
        </TouchableOpacity>
        <Text style={styles.verison}>Scooti App - Version {version}</Text>
      </View>
    </View>
  );
};

export default Boarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boardingContainer: {
    width,
    flex: 1,
  },
  card: {
    width,
    flex: 1,
  },
  indicatorConatiner: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#00000044",
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    width,

    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: 45,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Light",
    color: colors.black,
  },
  image: {
    aspectRatio: 1 / 1,
    flex: 1,
    alignSelf: "center",
  },
  textsContainer: {
    width,
    flex: 1,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 18,
    color: colors.blue,
    textAlign: "center",
    marginHorizontal: 20,
  },
  text: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.black,
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  verison: {
    color: colors.black,
    opacity: 0.8,
    fontSize: 12,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "Light",
    marginTop: 20,
  },
});

import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { width } from "../globalStyles";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function VideoComponent({ url, logo, linearColors }) {
  const video = React.useRef(null);

  return (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        shouldPlay
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />

      <LinearGradient
        colors={linearColors}
        style={{
          position: "absolute",
          width: width,
          height: (width * 1080) / 1920,
        }}
      />
      {logo && (
        <Image
          style={{
            position: "absolute",
            bottom: -20,
            left: -10,
            width: 80,
            height: 80,
          }}
          source={require("../assets/icon-transparent-white.png")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: width,
    height: (width * 1080) / 1920,
  },
});

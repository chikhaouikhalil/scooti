import { Easing, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { PresenceTransition } from "native-base";
import { colors } from "../globalStyles";

const links = [
  {
    link: "Parkings",
    label: "Parkings",
    icon: (isFocused) => (
      <MaterialIcons
        name="bike-scooter"
        size={isFocused ? 20 : 24}
        color={colors.white}
      />
    ),
  },
  {
    link: "History",
    label: "Profile",
    icon: (isFocused) => (
      <MaterialIcons
        name="supervised-user-circle"
        size={isFocused ? 22 : 26}
        color={colors.white}
      />
    ),
  },

  {
    link: "About",
    label: "About us",
    icon: (isFocused) => (
      <MaterialIcons
        name="info-outline"
        size={isFocused ? 20 : 24}
        color={colors.white}
      />
    ),
  },
];

const BottomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <Pressable
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.link,
              {
                backgroundColor: isFocused ? colors.black : colors.primary,
                borderTopLeftRadius: index == 0 ? 15 : 0,
                borderBottomLeftRadius: index == 0 ? 15 : 0,
                borderTopRightRadius: index == 2 ? 15 : 0,
                borderBottomRightRadius: index == 2 ? 15 : 0,
              },
            ]}
          >
            <PresenceTransition
              visible={isFocused}
              initial={{
                opacity: 0.7,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 500,
                  easing: Easing.linear,
                },
              }}
            >
              {links[index].icon(isFocused)}
            </PresenceTransition>
            {isFocused && (
              <PresenceTransition
                style={{
                  width: "100%",

                  alignItems: "center",
                  justifyContent: "center",
                }}
                visible={isFocused}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 500,
                    easing: Easing.linear,
                  },
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    marginTop: 2,
                    fontFamily: isFocused ? "Light" : "Regular",
                    fontSize: 12,
                  }}
                >
                  {label}
                </Text>
              </PresenceTransition>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    width: 300,
    position: "absolute",
    bottom: 10,
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  link: {
    width: "33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 1,
  },
});

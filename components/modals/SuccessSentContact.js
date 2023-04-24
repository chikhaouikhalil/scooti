import { Image, StyleSheet, Text } from "react-native";
import React from "react";
import { Modal } from "native-base";
import { colors, width } from "../../globalStyles";

const SuccessSentContact = ({ isOpen, setIsOpen }) => {
  const closeHandler = async () => {
    setIsOpen(false);
  };
  return (
    <Modal focusable={false} isOpen={isOpen} onClose={closeHandler}>
      <Modal.Content style={styles.container}>
        <Modal.CloseButton focusable={false} />
        <Modal.Header
          _text={{
            color: colors.primaryDark,
            fontFamily: "Medium",
            fontSize: "lg",
          }}
        >
          {" "}
        </Modal.Header>
        <Modal.Body>
          <Image
            style={{
              width: width * 0.5,
              height: width * 0.5,
              alignSelf: "center",
            }}
            source={require("../../assets/success-contact.png")}
          />
          <Text style={styles.text}>
            Thank you for submitting your message!
            <Text style={{ color: colors.primaryDark }}>
              {" "}
              Your contact form has been successfully sent
            </Text>{" "}
            and we will get back to you as soon as possible.
          </Text>
          <Text style={[styles.text, { marginBottom: 15 }]}>
            We appreciate your interest and look forward to the opportunity to
            assist you.
          </Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default SuccessSentContact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "95%",
    maxWidth: 700,
  },
  text: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.black,
    marginTop: 15,
  },
});

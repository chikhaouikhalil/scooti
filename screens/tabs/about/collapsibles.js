import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../globalStyles";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const items = [
  { id: "1", label: "Privacy Policy", value: "privacy" },
  { id: "2", label: "End-User License Agreement (EULA)", value: "eula" },
];

export default function Collapsibles() {
  return (
    <ScrollView>
      {items.map((x) => (
        <Item key={x.id} i={x} />
      ))}
    </ScrollView>
  );
}

function Item({ i }) {
  const [open, setopen] = useState(false);
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setopen(!open);
  };
  return (
    <TouchableOpacity
      style={[styles.item, { marginTop: i.id == "1" ? 20 : 10 }]}
      onPress={onPress}
      activeOpacity={1}
    >
      <View style={styles.row}>
        <Text style={styles.label}>{i.label}</Text>
        {open ? (
          <Ionicons name="caret-up" size={24} color={colors.darkGray} />
        ) : (
          <Ionicons name="caret-down" size={24} color={colors.darkGray} />
        )}
      </View>
      {open && i.value == "privacy" && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.text}>
            We are committed to protecting your privacy and the security of your
            personal information. This privacy policy explains how we collect,
            use, and disclose information about you when you use our
            application.
          </Text>
          <Text style={styles.title}>Information We Collect</Text>
          <Text style={styles.text}>
            We collect information that you provide to us directly, such as your
            name, email address, and payment information. We also collect
            information about your use of our application, such as your
            location, IP address, and device information.
          </Text>
          <Text style={styles.title}>How We Use Information</Text>
          <Text style={styles.text}>
            We use the information we collect to provide and improve our
            services, to communicate with you, and to personalize your
            experience. We may also use your information to send you marketing
            communications about our products and services, but you can opt-out
            of these communications at any time.
          </Text>
          <Text style={styles.title}>Information Sharing</Text>
          <Text style={styles.text}>
            We may share your information with third-party service providers who
            help us operate our application and provide our services. We may
            also share your information if required by law or if we believe that
            such disclosure is necessary to protect our rights or the rights of
            others.
          </Text>
          <Text style={styles.title}>Data Security</Text>
          <Text style={styles.text}>
            We take reasonable measures to protect your information from
            unauthorized access, alteration, or destruction. However, no method
            of transmission over the internet or electronic storage is
            completely secure, and we cannot guarantee the absolute security of
            your information.
          </Text>
          <Text style={styles.title}>Changes to This Policy</Text>
          <Text style={styles.text}>
            We may update this privacy policy from time to time. If we make
            material changes, we will notify you by email or by posting a notice
            in our application prior to the change becoming effective.
          </Text>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about our privacy policy or our use of
            your information, please contact us at
            <Text style={{ color: colors.primaryDark }}>
              {" "}
              contact.scooti@gmail.com
            </Text>
          </Text>
        </View>
      )}
      {open && i.value == "eula" && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>End-User License Agreement (EULA)</Text>
          <Text style={styles.text}>
            Please read this End-User License Agreement ("Agreement") carefully
            before using our application ("Application"). This Agreement is a
            legal agreement between you ("User") and Scooti ("Company") for the
            use of the Application.
          </Text>
          <Text style={styles.text}>
            By using the Application, User agrees to be bound by the terms and
            conditions of this Agreement.
          </Text>
          <Text style={styles.title}>License</Text>
          <Text style={styles.text}>
            Company grants User a limited, non-exclusive, non-transferable,
            revocable license to use the Application for personal,
            non-commercial purposes.
          </Text>
          <Text style={styles.title}>Restrictions</Text>
          <Text style={styles.text}>
            User may not: (a) copy, modify, distribute, sell, or transfer the
            Application or any portion thereof; (b) reverse engineer, decompile,
            or disassemble the Application; (c) use the Application to violate
            any law or third-party right; or (d) remove any proprietary notices
            or labels on the Application.
          </Text>
          <Text style={styles.title}>Ownership</Text>
          <Text style={styles.text}>
            The Application and all intellectual property rights therein are
            owned by Company or its licensors. User acknowledges that it has no
            ownership or other proprietary interest in the Application.
          </Text>
          <Text style={styles.title}>Disclaimer of Warranties</Text>
          <Text style={styles.text}>
            The Application is provided "as is" without warranty of any kind,
            express or implied, including but not limited to the warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </Text>
          <Text style={styles.title}>Limitation of Liability</Text>
          <Text style={styles.text}>
            In no event shall Company be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in
            connection with the use of the Application.
          </Text>
          <Text style={styles.title}>Termination</Text>
          <Text style={styles.text}>
            Company may terminate this Agreement at any time and without notice
            if User breaches any provision of this Agreement. Upon termination,
            User must cease all use of the Application and destroy all copies
            thereof.
          </Text>
          <Text style={styles.title}>Governing Law</Text>
          <Text style={styles.text}>
            This Agreement shall be governed by and construed in accordance with
            the laws of Tunisia. Any disputes arising under or in connection
            with this Agreement shall be resolved by the courts of Tunisia.
          </Text>
          <Text style={styles.title}>Entire Agreement</Text>
          <Text style={styles.text}>
            This Agreement constitutes the entire agreement between User and
            Company regarding the use of the Application.
          </Text>
          <Text style={styles.title}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Agreement, please contact us at
            <Text style={{ color: colors.primaryDark }}>
              {" "}
              contact.scooti@gmail.com
            </Text>
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    paddingTop: 5,
  },
  item: {
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    overflow: "hidden",
    marginHorizontal: 5,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  label: {
    fontSize: 12,
    color: colors.darkGray,
    fontFamily: "Bold",
  },
  textContainer: {
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    color: colors.primaryDark,
    fontFamily: "Regular",
    marginTop: 10,
  },
  text: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "Light",
    marginTop: 5,
  },
});

import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import { AuthContext } from "../../context";
import usePanResponder from "../../custom_hooks/usePanResponder";
import Button from "../../components/Button";

const ImageDetail = () => {
  const { signOut } = useContext(AuthContext);
  const navigateUserStack = () => {
    signOut();
  };
  const onLogoutPressed = () => {
    navigateUserStack();
  };
  return (
    <View style={styles.container}>
      <Button onPress={onLogoutPressed} style={styles.btnLogout}>
        <Text style={styles.textLogout}>Logout</Text>
      </Button>
    </View>
  );
};

export default ImageDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#ecf0f1",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  btnLogout: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
  },
  textLogout: {
    color: "white",
  },
});

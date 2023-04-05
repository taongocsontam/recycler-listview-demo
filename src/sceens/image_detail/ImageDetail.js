import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button";
import { AuthContext } from "../../context";

const ImageDetail = () => {
  const { signIn, signOut } = useContext(AuthContext);
  const useNavigateStack = () => {
    signOut();
  };

  const onLogoutPressed = () => {
    useNavigateStack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogoutPressed} style={styles.btnLogout}>
        <Text style={styles.textLogout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageDetail;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnLogout: {
    height: 45,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
    justifyContent: "center",
  },
  textLogout: {
    color: "white",
  },
});

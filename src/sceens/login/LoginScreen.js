import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, TextInput } from "react-native";
import { Text, PaperButton } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "./Header";
import { theme } from "../../core/theme";
import Constants from "../../constants";
import Button from "../../components/Button";
import { useContext } from "react";
import { AuthContext } from "../../context";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigateUserStack = (data) => {
    signIn({
      token: data.token,
      user: data.user,
      // remember: switchOn, remember password
    });
  };
  const onLoginPressed = () => {
    if (email || password) {
      const responseDemo = {
        token: "0.123456789",
        user: "SonTN",
      };
      navigateUserStack(responseDemo);
    }
  };

  const onSigup = () => {
    navigation.navigate(Constants.REGISTER_SCREEN);
  };

  return (
    <Background>
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        placeholder="Email"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        style={styles.textInput}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Constants.RESET_PASSWORD)}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={onLoginPressed} style={styles.btnLogin}>
        <Text style={styles.textLogin}>Login</Text>
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={onSigup} style={styles.btnSigup}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  btnSigup: {},
  btnLogin: {
    height: 45,
    width: "100%",

    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
  },
  textLogin: {
    color: "white",
  },
});

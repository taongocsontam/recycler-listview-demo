import React, { useEffect } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  LogBox,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "./src/constants";
import { UserStack } from "./src/navigations/UserStack/UserStack";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const RootStack = createStackNavigator();
function App({ navigation }) {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={Constants.HOME}>
        <RootStack.Screen
          name={Constants.USER_STACK}
          component={UserStack}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;

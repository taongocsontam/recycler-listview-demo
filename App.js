import React, { useEffect, useMemo, useState } from "react";
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
import { AuthorStack } from "./src/navigations/AuthorStack/AuthorStack";
import { AuthContext } from "./src/context/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateToken } from "./src/redux/actions";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const RootStack = createStackNavigator();
function App({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.tokenReduces.token);
  console.log("token: ", JSON.stringify(token));

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        if (data) {
          await AsyncStorage.setItem(Constants.USER_TOKEN, data.token);
        }
      },
      signUp: async (data) => {
        await AsyncStorage.setItem(Constants.USER_TOKEN, data.token);
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem(Constants.USER_TOKEN);
        } catch (e) {
          logger(e);
        }
      },
    }),
    []
  );

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await AsyncStorage.getItem(Constants.USER_TOKEN);
      console.log("accessToken:  ", JSON.stringify(accessToken));
      dispatch(updateToken(accessToken));
    };
    getAccessToken();
  }, []);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <RootStack.Navigator initialRouteName={Constants.LOGIN_SCREEN}>
          {token ? (
            <RootStack.Screen
              name={Constants.USER_STACK}
              component={UserStack}
              options={{ headerShown: false }}
            />
          ) : (
            <RootStack.Screen
              name={Constants.USER_STACK}
              component={AuthorStack}
              options={{ headerShown: false }}
            />
          )}
        </RootStack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;

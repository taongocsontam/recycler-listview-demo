import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  LogBox,
  Platform,
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
import firebase from "@react-native-firebase/app";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const RootStack = createStackNavigator();
function App({ navigation }) {
  const androidCredentials = {
    clientId:
      "754045625445-ev0igubk7951bun8i3vql3agp6peu4dh.apps.googleusercontent.com",
    appId: "1:754045625445:android:fc3809c305789019f6128c",
    apiKey: "AIzaSyCANjg3WUEFcn10EfjK8QHOrkgunFMHvlU",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: "",
    projectId: "democall-bb50b",
  };

  const credentials = Platform.select({
    android: androidCredentials,
  });

  const initStates = async () => {
    if (!firebase.apps.length) {
      await firebase.initializeApp(credentials);
    }
  };
  useEffect(() => {
    initStates();
  }, []);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.appReduces.token);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        if (data) {
          console.log('data:  ', JSON.stringify(data));
          await AsyncStorage.setItem(Constants.USER_TOKEN, data.token);
          //data hanlder.
          await AsyncStorage.setItem(Constants.USER_NAME, data.user);
          dispatch(updateToken(data.token));
        }
      },
      signUp: async (data) => {
        await AsyncStorage.setItem(Constants.USER_TOKEN, data.token);
        await AsyncStorage.setItem(Constants.USER_NAME, data.user);
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem(Constants.USER_TOKEN);
          await AsyncStorage.removeItem(Constants.USER_NAME);
          dispatch(updateToken(null));
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
              name={Constants.AUTHOR_STACK}
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

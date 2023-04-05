import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import { TabNavigator } from "../UserStack/TabNavigator";
import LoginScreen from "../../sceens/login/LoginScreen";
import ResetPasswordScreen from "../../sceens/reset_password/ResetPasswordScreen";
import RegisterScreen from "../../sceens/regitster/RegistterScreen";

const Author = createStackNavigator();
export const AuthorStack = (props) => {
  return (
    <Author.Navigator>
      <Author.Screen
        name={Constants.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Author.Screen
        name={Constants.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Author.Screen
        name={Constants.RESET_PASSWORD}
        component={ResetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />

      <Author.Screen
        name={Constants.BOTTOM_TAB}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Author.Navigator>
  );
};

import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import { TabNavigator } from "./TabNavigator";

const User = createStackNavigator();
export const UserStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <User.Navigator screenOptions={defaultConfig}>
      <User.Screen
        name={Constants.BOTTOM_TAB}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </User.Navigator>
  );
};
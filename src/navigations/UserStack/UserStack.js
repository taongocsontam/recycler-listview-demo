import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import TutorialScreen from "../../sceens/tutorial/TutorialScreen";
import { TabNavigator } from "./TabNavigator";

const User = createStackNavigator();
export const UserStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <User.Navigator screenOptions={defaultConfig}>
      {/* <User.Screen
        name={Constants.TUTORIAL_SCREEN}
        component={TutorialScreen}
        options={{
          headerShown: false,
        }}
      /> */}
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

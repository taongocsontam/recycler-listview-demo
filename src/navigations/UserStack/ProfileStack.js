import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import QRScreen from "../../sceens/qr/QRScreen";
import ProfileScreen from "../../sceens/profile/ProfileScreen";

const Profile = createStackNavigator();
export const ProfileStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Profile.Navigator
      initialRouteName={Constants.PROFILE_SCREEN}
      screenOptions={defaultConfig}
    >
      <Profile.Screen
        name={Constants.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
      <Profile.Screen
        name={Constants.QR_SCREEN}
        component={QRScreen}
        options={{ headerShown: false }}
      />
    </Profile.Navigator>
  );
};

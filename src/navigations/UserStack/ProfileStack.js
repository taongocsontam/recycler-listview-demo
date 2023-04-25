import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import HomeScreen from "../../sceens/home/HomeScreen";
import ImageDetail from "../../sceens/image_detail/ImageDetail";
import ChatScreen from "../../sceens/chat/ChatScreen";
import QRScreen from "../../sceens/qr/QRScreen";

const Profile = createStackNavigator();
export const ProfileStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Profile.Navigator
      initialRouteName={Constants.QR_SCREEN}
      screenOptions={defaultConfig}
    >
      {/* <Profile.Screen
        name={Constants.IMAGE_DETAIL}
        component={ImageDetail}
        options={{ headerShown: false }}
      /> */}
      <Profile.Screen
        name={Constants.CHAT_SCREEN}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Profile.Screen
        name={Constants.QR_SCREEN}
        component={QRScreen}
        options={{ headerShown: false }}
      />
    </Profile.Navigator>
  );
};

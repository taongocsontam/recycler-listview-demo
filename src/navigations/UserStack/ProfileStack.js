import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import HomeScreen from "../../sceens/home/HomeScreen";
import ImageDetail from "../../sceens/image_detail/ImageDetail";

const Profile = createStackNavigator();
export const ProfileStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Profile.Navigator
      initialRouteName={Constants.IMAGE_DETAIL}
      screenOptions={defaultConfig}
    >
      <Profile.Screen
        name={Constants.IMAGE_DETAIL}
        component={ImageDetail}
        options={{ headerShown: false }}
      />
    </Profile.Navigator>
  );
};

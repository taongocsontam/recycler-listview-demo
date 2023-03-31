import { createStackNavigator } from "@react-navigation/stack";
import constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import HomeScreen from "../../sceens/home/HomeScreen";
import ImageDetail from "../../sceens/image_detail/ImageDetail";

const Home = createStackNavigator();
export const HomeStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Home.Navigator
      initialRouteName={constants.HOME}
      screenOptions={defaultConfig}
    >
      <Home.Screen
        name={constants.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name={constants.IMAGE_DETAIL}
        component={ImageDetail}
        options={{ headerShown: false }}
      />
    </Home.Navigator>
  );
};

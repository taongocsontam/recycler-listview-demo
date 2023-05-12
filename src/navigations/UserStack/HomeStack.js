import { createStackNavigator } from "@react-navigation/stack";
import Constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import HomeScreen from "../../sceens/home/HomeScreen";
import ImageDetail from "../../sceens/image_detail/ImageDetail";

const Home = createStackNavigator();
export const HomeStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Home.Navigator
      initialRouteName={Constants.HOME}
      screenOptions={defaultConfig}
    >
      <Home.Screen
        name={Constants.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name={Constants.IMAGE_DETAIL}
        component={ImageDetail}
        options={{ headerShown: false }}
      />
    </Home.Navigator>
  );
};

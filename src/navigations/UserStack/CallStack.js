import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import Constants from "../../constants";
import useDefaultConfig from "../../custom_hooks/useDefaultConfig";
import CallScreen from "../../sceens/call/CallScreen";
import ChatScreen from "../../sceens/chat/ChatScreen";
import LiveStreamingScreen from "../../sceens/live_streaming/LiveStreamingScreen";
import CallGroup from "../../sceens/meeting/CallGroup/CallGroup";
import MeetingScreen from "../../sceens/meeting/MeetingScreen";
import MessengerScreen from "../../sceens/messenger/MessengerScreen";

const Call = createStackNavigator();

export const CallStack = (props) => {
  const defaultConfig = useDefaultConfig(props);
  return (
    <Call.Navigator
      initialRouteName={Constants.CALL_SCREEN}
      screenOptions={defaultConfig}
    >
      <Call.Screen
        name={Constants.CALL_SCREEN}
        component={CallScreen}
        options={{ headerShown: true, headerLeft: () => <View /> }}
      />
      <Call.Screen
        name={Constants.LIVE_STREAMING_SCREEN}
        component={LiveStreamingScreen}
        options={{ headerShown: false }}
      />
      <Call.Screen
        name={Constants.CHAT_SCREEN}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Call.Screen
        name={Constants.MEETING_SCREEN}
        component={MeetingScreen}
        options={{ headerShown: false }}
      />
      <Call.Screen
        name={Constants.CALL_GROUP}
        component={CallGroup}
        options={{ headerShown: false }}
      />
      <Call.Screen
        name={Constants.MESSENGER_SCREEN}
        component={MessengerScreen}
        options={{ headerShown: true }}
      />
    </Call.Navigator>
  );
};

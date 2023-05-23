import { ActionCable, Cable } from "@kesha-antonov/react-native-action-cable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import Toast from "react-native-simple-toast";
import { socketIO } from "../../api/socket";
import { API_AUTH_URL } from "../../api/videosdk/api";
import Constants from "../../constants";
import { screenWidth } from "../../platforms";
import colors from "../../styles/colors";
import { ROBOTO_FONTS } from "../../styles/fonts";
import TextInputContainer from "../meeting/components/TextInputContainer";

function MessengerScreen({ navigation, route }) {
  const { item, userSender } = route.params;
  console.log("item: ", JSON.stringify(item));
  const actionCable = ActionCable.createConsumer(`ws://${API_AUTH_URL}/cable`);
  const cable = new Cable({});
  const channel = cable.setChannel(
    `chat_${item.id}`,
    actionCable.subscriptions.create({
      channel: "",
      
      
    })
  );

  const [messenger, setMessenger] = useState("");
  const listMessengerRef = useRef();
  const [listRoomChat, setListRoomChat] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem(Constants.USER_NAME);
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      Toast.show("Error while loading username!");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.room_name,
    });

    socketIO.emit("findRoom", item.id);
    socketIO.on("foundRoom", (roomChats) => setListRoomChat(roomChats));
  }, [navigation]);

  useEffect(() => {
    socketIO.on("foundRoom", (roomChats) => setListRoomChat(roomChats));
  }, [socketIO]);

  const getTimeStamp = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;
    return { hour, mins };
  };

  const sendMessage = () => {
    socketIO.emit("newMesssenger", {
      messenga: messenger,
      roomId: item.id,
      user: user,
      timestamp: getTimeStamp(),
    });

    //  socketIO.on("foundRoom", (roomChats));
    setMessenger("");
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const scrollToBottom = () => {
    listMessengerRef.current.scrollToEnd({ animated: true });
  };

  const ItemMessenger = useCallback(({ item, index }) => {
    const localSender = userSender === item.user;
    return (
      <View>
        <View
          key={index}
          style={[
            styles.viewItemMessenger,
            {
              alignSelf: localSender ? "flex-end" : null,
            },
          ]}
        >
          <Hyperlink
            linkDefault={true}
            onPress={(url) => Linking.openURL(url)}
            linkStyle={{ color: "blue" }}
          >
            <Text style={styles.textContentMess}>{item.text}</Text>
            <Text style={styles.textTime}>{item.time}</Text>
          </Hyperlink>
        </View>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((__, index) => `${index}`, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        {listRoomChat && (
          <FlatList
            ref={listMessengerRef}
            showsVerticalScrollIndicator={false}
            data={listRoomChat}
            renderItem={({ item, index }) => (
              <ItemMessenger item={item} index={index} />
            )}
            keyExtractor={(__, index) => index}
          />
        )}
        <View style={styles.viewTextInput}>
          <TextInputContainer
            message={messenger}
            setMessage={setMessenger}
            isSending={false}
            sendMessage={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default MessengerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[800],
  },
  viewTextInput: {
    paddingHorizontal: 12,
  },
  textItemMess: {
    fontFamily: ROBOTO_FONTS.Roboto,
    fontSize: 12,
    color: "#9A9FA5",
  },
  textContentMess: {
    fontSize: 10,
    color: "white",
    fontFamily: ROBOTO_FONTS.RobotoMedium,
  },
  textTime: {
    fontSize: 8,
    color: "white",
    fontFamily: ROBOTO_FONTS.RobotoMedium,
    alignSelf: "flex-end",
  },
  viewItemMessenger: {
    backgroundColor: colors.primary[600],
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 5,
    marginHorizontal: 12,
    maxWidth: screenWidth * 0.6,
  },
});

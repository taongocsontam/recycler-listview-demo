import { ActionCable, Cable } from "@kesha-antonov/react-native-action-cable";
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
import { TypingAnimation } from "react-native-typing-animation";
import { socketIO } from "../../api/socket";
import { API_AUTH_URL } from "../../api/videosdk/api";
import { screenWidth } from "../../platforms";
import colors from "../../styles/colors";
import { ROBOTO_FONTS } from "../../styles/fonts";
import TextInputContainer from "../meeting/components/TextInputContainer";

function MessengerScreen({ navigation, route }) {
  const { item, userSender } = route.params;
  // console.log('item:  ', JSON.stringify(item));
  const actionCable = ActionCable.createConsumer(`ws://${API_AUTH_URL}/cable`);
  const cable = new Cable({});
  const [messenger, setMessenger] = useState("");
  const listMessengerRef = useRef();
  const [listRoomChat, setListRoomChat] = useState([]);
  const [isTyping, setTyping] = useState({
    user: "",
    typing: false,
  });
  const isMounteRef = useRef(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.room_name,
    });
  }, [navigation]);

  useEffect(() => {
    isMounteRef.current = true;
    socketIO.emit("findRoom", item.id);
    socketIO.on("foundRoom", (roomChats) => {
      if (isMounteRef.current) {
        setListRoomChat(roomChats);
      }
    });
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  useEffect(() => {
    isMounteRef.current = true;
    socketIO.on("foundRoom", (roomChats) => {
      if (isMounteRef.current) {
        setListRoomChat(roomChats);
      }
    });

    /**
     * Check is typing messenger from client.
     */
    socketIO.on("userState", (data) => {
      if (
        isMounteRef.current &&
        data.user != userSender &&
        data.roomId == item.id
      )
        setTyping({
          user: data.user,
          typing: data.typing,
        });
    });
    return () => {
      isMounteRef.current = false;
    };
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
    if (messenger.trim()) {
      socketIO.emit("newMesssenger", {
        messenga: messenger.trim(),
        roomId: item.id,
        user: userSender,
        timestamp: getTimeStamp(),
      });
      socketIO.emit("typing", {
        user: userSender,
        typing: false,
        roomId: item.id,
      });
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
    socketIO.on("foundRoom", (roomChats) => {});
    setMessenger("");
  };

  const scrollToBottom = () => {
    if (listRoomChat.length > 1)
      listMessengerRef.current.scrollToIndex({ index: 0, animated: true });
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
            style={styles.viewFlatlist}
            ref={listMessengerRef}
            showsVerticalScrollIndicator={false}
            data={listRoomChat}
            renderItem={({ item, index }) => (
              <ItemMessenger item={item} index={index} />
            )}
            keyExtractor={(__, index) => index}
            inverted={true}
          />
        )}
        {isTyping.typing && (
          <View style={styles.viewTyping}>
            <Text style={styles.textUseTyping}>{`${isTyping.user} `}</Text>
            <TypingAnimation
              dotColor="white"
              dotMargin={5}
              dotAmplitude={3}
              dotSpeed={0.15}
              dotRadius={2.5}
              dotX={12}
              dotY={6}
            />
          </View>
        )}
        <View
          style={[
            styles.viewTextInput,
            {
              marginTop: isTyping ? 20 : 0,
            },
          ]}
        >
          <TextInputContainer
            message={messenger}
            setMessage={(messeger) => {
              socketIO.emit("typing", {
                user: userSender,
                typing: messeger.length > 0 ? true : false,
                roomId: item.id,
              });
              setMessenger(messeger);
            }}
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
  viewFlatlist: {
    flex: 1,
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
  viewTyping: {
    flexDirection: "row",
    marginLeft: 15,
  },
  textUseTyping: {
    fontSize: 10,
    color: "white",
    fontFamily: ROBOTO_FONTS.RobotoMedium,
  },
});

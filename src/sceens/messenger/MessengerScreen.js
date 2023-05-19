import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SocketIOClient from "socket.io-client";
import { API_AUTH_URL } from "../../api/videosdk/api";
import TextInputContainer from "../meeting/components/TextInputContainer";
import { ROBOTO_FONTS } from "../../styles/fonts";
import Hyperlink from "react-native-hyperlink";
import colors from "../../styles/colors";

function MessengerScreen() {
  const socketIO = SocketIOClient(API_AUTH_URL);
  const [messenger, setMessenger] = useState("");
  const [listMessenger, setListMessenger] = useState([]);
  const listMessengerRef = useRef();

  useEffect(() => {
    // socketIO.on("connect", function () {
    //   console.log("socket connect!");
    // });
  }, []);

  useEffect(() => {
    socketIO.on("chat_messenger", (msg) => {
      console.log("list:  ", JSON.stringify(listMessenger));
      console.log("msg:  ", JSON.stringify(msg));
      const newMess = [];
      newMess.unshift(listMessenger.concat(msg));
      setListMessenger(newMess);
    });
  }, []);

  const sendMessage = () => {
    socketIO.emit("chat_messenger", messenger);
    setMessenger("");
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const scrollToBottom = () => {
    listMessengerRef.current.scrollToEnd({ animated: true });
  };

  const ItemMessenger = useCallback(({ item, index }) => {
    return (
      <View key={index} style={styles.viewItemMessenger}>
        <Text style={styles.textItemMess}></Text>
        <Hyperlink
          linkDefault={true}
          onPress={(url) => Linking.openURL(url)}
          linkStyle={{ color: "blue" }}
        >
          <Text style={styles.textContentMess}>{item}</Text>
        </Hyperlink>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((__, index) => `${index}`, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        {listMessenger && (
          <FlatList
            inverted
            ref={listMessengerRef}
            showsVerticalScrollIndicator={false}
            data={listMessenger}
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
  viewItemMessenger: {
    backgroundColor: colors.primary[600],
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 6,
    borderRadius: 5,
    marginHorizontal: 12,
  },
});

import { useMeeting, usePubSub } from "@videosdk.live/react-native-sdk";
import moment from "moment";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import colors from "../../../styles/colors";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import { convertRFValue } from "../../../styles/spacing";
import TextInputContainer from "./TextInputContainer";
function ChatViewer() {
  var topic = "CHAT";
  const flatlistRef = useRef();
  const mpubsub = usePubSub(topic, {});
  console.log('mpubsub:   ', JSON.stringify(mpubsub));
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const mMeeting = useMeeting({});
  const localParticipantId = mMeeting?.localParticipant?.id;

  /**
   * On press send message.
   */
  const sendMessage = () => {
    mpubsub.publish(message, { persist: true });
    setMessage("");
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  /**
   * When send message success, message load show end.
   */
  const scrollToBottom = () => {
    flatlistRef.current.scrollToEnd({ animated: true });
  };

  /**
   * render item message chat room.
   * @param {*} param0
   * @returns
   */
  const ItemMess = ({ item, index }) => {
    const { message, senderId, timestamp, senderName } = item;
    const localSender = localParticipantId === senderId;
    const time = moment(timestamp).format("hh:mm a");
    return (
      <View key={index} style={styles.viewItemContainer}>
        <Text style={styles.textItemMess}>
          {localSender ? "You" : senderName}
        </Text>
        <Hyperlink
          linkDefault={true}
          onPress={(url) => Linking.openURL(url)}
          linkStyle={{ color: "blue" }}
        >
          <Text
            style={styles.textContentMess}
          >
            {message}
          </Text>
        </Hyperlink>
        <Text style={styles.timeMess}>{time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Text style={styles.textHeader}>Chat</Text>
      </View>
      <KeyboardAvoidingView style={styles.avoidView}>
        {mpubsub.messages ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={mpubsub.messages}
            ref={flatlistRef}
            renderItem={({ item, index }) => (
              <ItemMess item={item} index={index} />
            )}
          />
        ) : null}
        <View style={styles.viewTextInput}>
          <TextInputContainer
            message={message}
            setMessage={setMessage}
            isSending={isSending}
            sendMessage={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default ChatViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoidView: {
    flex: 1,
  },
  viewHeader: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    color: colors.primary[100],
  },
  viewTextInput: {
    paddingHorizontal: 12,
  },
  viewItemContainer: {
    backgroundColor: colors.primary[600],
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 6,
    borderRadius: 5,
    marginHorizontal: 12,
  },
  textItemMess: {
    fontFamily: ROBOTO_FONTS.Roboto,
    fontSize: convertRFValue(12),
    color: "#9A9FA5",
    fontWeight: "bold",
  },
  textContentMess:{
    fontSize: convertRFValue(10),
    color: "white",
    fontFamily: ROBOTO_FONTS.RobotoMedium,
  },
  timeMess: {
    color: "grey",
    fontSize: convertRFValue(10),
    fontFamily: ROBOTO_FONTS.Roboto,
    alignSelf: "flex-end",
    marginTop: 4,
  },
});

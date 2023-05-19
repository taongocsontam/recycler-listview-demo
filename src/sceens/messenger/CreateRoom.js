import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SocketIOClient from "socket.io-client";
import { API_AUTH_URL } from "../../api/videosdk/api";
import { theme } from "../../core/theme";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getRoomchatAction } from "../../redux/actions";

function CreateRoom() {
  const dispatch = useDispatch();
  const socketIO = SocketIOClient(API_AUTH_URL);
  const [roomId, setRoomId] = useState("");
  const [room, setRooms] = useState();

  const listRoom = useSelector((state) => state.appReduces.listRoom);

  console.log("listRoom:  ", JSON.stringify(listRoom));

  useEffect(() => {
    socketIO.on("connect", function (socket) {
      dispatch(getRoomchatAction());
    });
  }, []);

  useEffect(() => {
		socketIO.on("roomsList", (rooms) => {
			setRooms(rooms);
		});
	}, [socketIO]);

  const onCreateRoom = () => {
    socketIO.emit();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Create room"
        returnKeyType="next"
        value={roomId}
        onChangeText={(text) => setRoomId(text)}
        keyboardType="default"
        style={styles.textInput}
      />

      <Button onPress={onCreateRoom} style={styles.btnCreateRoom}>
        <Text>Create room</Text>
      </Button>
    </View>
  );
}

export default CreateRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  textInput: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  btnCreateRoom: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
  },
});

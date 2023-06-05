import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from "react-redux";
import { socketIO } from "../../api/socket";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import DialogContainer from "../../components/DialogContainer";
import Constants from "../../constants";
import { screenHeight } from "../../platforms";
import {
  getRoomChatSuccess,
  getRoomchatAction,
  postDeleteRoomAction,
} from "../../redux/actions";

function CreateRoom({ navigation, route }) {
  const dispatch = useDispatch();
  const listRoom = useSelector((state) => state.appReduces.listRoom);
  const user = useSelector((state) => state.appReduces.userState);
  const [roomName, setRoomName] = useState("");
  const [isShowDialog, setShowDialog] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [type, setType] = useState();
  const bottomSheetRef = useRef();
  const isMounteRef = useRef(false);

  const onHandleJoinRoom = () => {
    socketIO.emit("joinRoom", { userName: user, room: roomName });
    navigation.navigate(Constants.MESSENGER_SCREEN, {
      userSender: user,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create room",
      headerRight: () => (
        <View style={styles.viewHeadler}>
          <TouchableOpacity onPress={onHandleJoinRoom} style={styles.btnAdd}>
            <Text>Join Room</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const ItemRooms = ({ item, index }) => {
    return (
      <View style={styles.viewItemRooom}>
        <TouchableOpacity
          key={item.id}
          style={styles.itemRoomContainer}
          onPress={() => {
            onChatDetail(item);
          }}
        >
          <Text style={styles.titleRoom} numberOfLines={1}>
            {item.room_name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnDemeteRoom}
          onPress={() => {
            onHandlerDeleteRoom(item);
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {listRoom.length > 0 ? (
          <FlatList
            style={styles.viewFlatlist}
            showsVerticalScrollIndicator={false}
            data={listRoom}
            renderItem={({ item, index }) => (
              <ItemRooms item={item} index={index} />
            )}
            keyExtractor={(__, index) => index}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      <BottomSheet
        sheetBackgroundColor={"#2B3034"}
        draggable={false}
        radius={12}
        hasDraggableIcon
        height={screenHeight * 0.3}
        ref={bottomSheetRef}
      >
        <View style={styles.viewBottomSheet}>
          <TextInput
            placeholder={type == "CREATE" ? "Create room" : "Join room"}
            returnKeyType="next"
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
            keyboardType="default"
            style={styles.textInput}
            placeholderTextColor={"white"}
          />
          {/* <Button onPress={onCreateRoom} style={styles.btnCreateRoom}>
            <Text>{type == "CREATE" ? "Create room" : "Join room"}</Text>
          </Button> */}
        </View>
      </BottomSheet>
      <DialogContainer
        isShowDialog={isShowDialog}
        onCloseDialog={() => {
          setShowDialog(false);
        }}
        titleDialog={"Delete Room Chat"}
        contentDialog={"Do you want delete room chat?"}
        textLeft={"No"}
        textRight={"Yes"}
        onPressLeft={() => {
          setShowDialog(false);
        }}
        onPressRight={() => {
          // case 1: socket
          // socketIO.emit("delete_room_chat", roomId);
          // socketIO.on("roomLists", (rooms) => {
          //   dispatch(getRoomChatSuccess(rooms));
          // });
          // case 2: call api
          dispatch(postDeleteRoomAction(roomId));
          setShowDialog(false);
        }}
      />
    </SafeAreaView>
  );
}

export default CreateRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  viewHeadler: {
    flexDirection: "row",
  },
  viewBottomSheet: {
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 30,
  },
  textInput: {
    width: "100%",
    height: 45,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginTop: 40,
    color: "white",
  },
  btnCreateRoom: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
  },
  viewFlatlist: {
    paddingVertical: 15,
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatemptyText: {
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 30,
  },
  itemRoomContainer: {
    paddingHorizontal: 15,
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  titleRoom: {
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  btnAdd: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#ff6f00",
    marginRight: 10,
  },
  viewItemRooom: {
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Modal, ModalContent, ScaleAnimation } from "react-native-modals";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
let WIDTH_MODAL = screenWidth - 40;
let HEIGHT_MODAL = screenHeight * 0.7;

let icon = [
  {
    icon: require("../assets/icon/like.png"),
    title: "12",
  },
  {
    icon: require("../assets/icon/comment.png"),
    title: "comment",
  },
  {
    icon: require("../assets/icon/share.png"),
    title: "share",
  },
];

function areEqual(prevProps, nextProps) {
  return prevProps.isModalVisible === nextProps.isModalVisible;
}
function DialogImage(props) {
  const { isModalVisible, imageUrl, indexImage, hideDialogImage } = props;

  React.useLayoutEffect(() => {}, []);

  //Modal header.
  const RenderHeaderModal = () => {
    return (
      <View style={styles.viewHeader}>
        <View style={styles.iconHeader} />
        <Text style={styles.titleHeader} numberOfLines={1}>
          @ChungTaKhongThuocVeNhau
        </Text>
      </View>
    );
  };

  //Modal footer
  const RenderModalFooter = () => {
    return (
      <View style={styles.viewFooter}>
        {icon.map((item, index) => (
          <IconFooter item={item} key={index} />
        ))}
      </View>
    );
  };

  const IconFooter = ({ item }) => {
    return (
      <View style={styles.iconFooter}>
        <Image source={item.icon} style={styles.imageIconFooter} />
        <Text style={styles.titleFooter}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={styles.modalContainer}>
      <Modal
        visible={isModalVisible}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 0,
            useNativeDriver: true,
          })
        }
      >
        <ModalContent style={styles.modalCenter}>
          <RenderHeaderModal />
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
          <RenderModalFooter />
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {},
  modalCenter: {
    flex: 1,
    width: WIDTH_MODAL,
    maxHeight: HEIGHT_MODAL,
  },
  image: {
    width: "100%",
    height: HEIGHT_MODAL - 130,
    marginTop: 10,
  },
  viewHeader: {
    // height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  viewFooter: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  iconHeader: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "yellow",
    borderWidth: 2,
    borderColor: "#ed6f6f",
  },
  titleHeader: {
    paddingHorizontal: 5,
  },
  iconFooter: {
    flexDirection: "row",
  },
  imageIconFooter: {
    width: 20,
    height: 20,
  },
  titleFooter: {
    paddingHorizontal: 3,
  },
});
export default React.memo(DialogImage, areEqual);

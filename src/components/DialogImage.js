import React from "react";
import { Image, StyleSheet, Text, Dimensions, View } from "react-native";
import { Modal, ModalContent, ScaleAnimation } from "react-native-modals";

function areEqual(prevProps, nextProps) {
  return prevProps.isModalVisible === nextProps.isModalVisible;
}

function getWindownWidth() {
  return Math.round(Dimensions.get("window").width * 1000) / 1000 - 6;
}

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

function DialogImage(props) {
  const { isModalVisible, imageUrl, indexImage } = props;

  React.useLayoutEffect(() => {}, []);

  return (
    <View style={styles.modalContainer}>
      <Modal
        visible={isModalVisible}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }
      >
        <ModalContent style={styles.modalCenter}>
          <View>
            <Image style={styles.image} source={{ uri: imageUrl }} />
            <Text> `index: ${indexImage}`</Text>
            <Text> `index: ${indexImage}`</Text>
          </View>
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {},
  modalCenter: {
    flex: 1,
    width: screenWidth - 40,
    height: screenHeight * 0.5,
    maxHeight: screenHeight * 0.6,
    backgroundColor: "yellow",
  },
  image: {
    width: "100%",
    height: "100%",
    // resizeMode: 'center',
    backgroundColor: "red",
  },
});
export default React.memo(DialogImage, areEqual);

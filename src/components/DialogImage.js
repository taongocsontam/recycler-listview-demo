import React from 'react';
import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import {Modal, ModalContent, ScaleAnimation} from 'react-native-modals';

function areEqual(prevProps, nextProps) {
  return prevProps.isModalVisible === nextProps.isModalVisible;
}

function getWindownWidth() {
  return Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;
}

function DialogImage(props) {
  const {isModalVisible, imageUrl, indexImage} = props;

  function getWidthImage(index) {
    const columnWidth = getWindownWidth() / 3;
    var imageWidth = 0;
    switch (index) {
      case index % 3 === 0:
        imageWidth = columnWidth * 3;
        break;
      case index % 2 === 0:
        imageWidth = columnWidth * 2;
        break;
      default:
        return (imageWidth = columnWidth);
    }
  }

  function getHeightImage(index) {
    var imageHeight = 0;
    switch (index) {
      case index % 3 === 0:
        imageHeight = 300;
        break;
      case index % 2 === 0:
        imageHeight = 250;
        break;
      default:
        return (imageHeight = 250);
    }
  }

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
        }>
        <ModalContent
          style={{
            width: getWidthImage(indexImage),
            height: getHeightImage(indexImage),
            flex: 1,
            backgroundColor: 'yellow',
          }}>
          <View>
            <Image style={styles.image} source={{uri: imageUrl}} />
            <Text> `index: ${indexImage}`</Text>
            <Text> `width: ${getWidthImage(indexImage)}`</Text>
            <Text> `height: ${getHeightImage(indexImage)}`</Text>
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
    backgroundColor: 'yellow',
  },
  image: {
    // width: '100%',
    // height: '100%',
    // resizeMode: 'center',
    backgroundColor: 'red',
  },
});
export default React.memo(DialogImage, areEqual);

import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DialogImage from "./DialogImage";

function areEqual(prevProps, nextProps) {
  return prevProps.imageUrl === nextProps.imageUrl; //change when false.
}

function ImageRender(props) {
  const { imageUrl, indexImage, handlerOnClick } = props;

  const imageRef = React.useRef(null);
  const [showImageItem, setShowImageItem] = React.useState(false);
  const [index, setIndex] = React.useState();

  React.useEffect(() => {
    if (Platform.OS === "ios" && imageRef) {
      // imageRef;
      imageRef.current.setNativeProps({
        opacity: 0,
      });
    }
  }, []);

  const handleOnLoad = () => {
    if (Platform.OS === "ios" && imageRef) {
      // imageRef;
      imageRef.current.setNativeProps({
        opacity: 1,
      });
    }
  };

  const handlerOnClickItem = () => {
    handlerOnClick(indexImage);
    setShowImageItem(true);
  };
  const hideDialogImage = () => {
    setShowImageItem(false);
  };

  return (
    <>
      <Pressable
        style={styles.viewImage}
        onPress={() => handlerOnClickItem()}
        onLongPress={() => {
          setIndex(indexImage);
          setShowImageItem(true);
        }}
        onPressOut={() => {
          setShowImageItem(false);
          console.log("onPressOut");
        }}
      >
        <Image
          ref={(ref) => {
            imageRef.current = ref;
          }}
          style={styles.image}
          onLoad={handleOnLoad}
          source={{ uri: imageUrl }}
        />
      </Pressable>
      <DialogImage
        isModalVisible={showImageItem}
        imageUrl={imageUrl}
        indexImage={index}
        hideDialogImage={hideDialogImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  viewImage: {
    flex: 1,
    margin: 3,
    backgroundColor: "lightgrey",
  },
  image: {
    flex: 1,
  },
});

export default React.memo(ImageRender, areEqual);

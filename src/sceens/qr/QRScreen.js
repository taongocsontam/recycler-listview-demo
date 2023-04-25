import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import Constants from "../../constants";

function QRScreen() {
  const [data, setData] = useState();
  const onSuccess = (e) => {
    // if (
    //   e.data.substring(0, 4) == Constants.HTTP ||
    //   e.data.substring(0, 5) == Constants.HTTPS
    // ) {
    //   Linking.canOpenURL(e.data).then((supported) => {
    //     supported && Linking.openURL(e.data);
    //   });
    // }
    setData(e.data);
  };

  const scanAgain = () => {
    scanner.current.reactivate();
  };

  const scanner = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <QRCodeScanner
        cameraStyle={styles.cameraStyle}
        ref={(ref) => {
          scanner.current = ref;
        }}
        reactivate={false}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        showMarker={true}
      />
      <Text style={styles.centerText}>Data: {data}</Text>
      <TouchableOpacity style={styles.buttonAgain} onPress={scanAgain}>
        <Text>Scanner again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cameraStyle: {
    width: "100%",
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 20,
    color: "#777",
    marginTop: 250,
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonAgain: {
    height: 45,
    width: "50%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

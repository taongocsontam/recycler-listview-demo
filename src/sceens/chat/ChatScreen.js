import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  BackHandler,
  AppState,
  ScrollView,
} from "react-native";
import { theme } from "../../core/theme";
import { RTCView, mediaDevices } from "@videosdk.live/react-native-sdk";
import colors from "../../styles/colors";
import { MicOff, MicOn, VideoOff, VideoOn } from "../../assets/icons";
import TextInputContainer from "../../components/TextInputContainer";
import Toast from "react-native-simple-toast";
import { ROBOTO_FONTS } from "../../styles/fonts";
import { useFocusEffect } from "@react-navigation/native";
import Menu from "../../components/Menu";
import MenuItem from "../../components/Menu/MenuItem";
import {
  createMeeting,
  getTokenVideoSDK,
  validateMeeting,
} from "../../api/videosdk/api";
import Constants from "../../constants";

const ChatScreen = (props) => {
  const [tracks, setTrack] = useState("");
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const appState = useRef(AppState.currentState);

  const meetingTypes = [
    { key: "ONE_TO_ONE", value: "One to One Meeting" },
    { key: "GROUP", value: "Group Meeting" },
  ];

  const [meetingType, setMeetingType] = useState(meetingTypes[0]);

  const [isVisibleCreateMeetingContainer, setisVisibleCreateMeetingContainer] =
    useState(false);
  const [isVisibleJoinMeetingContainer, setisVisibleJoinMeetingContainer] =
    useState(false);
  const optionRef = useRef();

  const disposeVideoTrack = () => {
    setTrack((stream) => {
      stream.getTracks().forEach((track) => {
        track.enabled = false;
        return track;
      });
    });
  };

  const isMainScreen = () => {
    return !isVisibleJoinMeetingContainer && !isVisibleCreateMeetingContainer;
  };

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          setTrack(stream);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("app goes to background");
      appState.current = nextAppState;
    }
  };

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          setTrack(stream);
        })
        .catch((e) => {
          console.log(e);
        });
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!isMainScreen()) {
          setisVisibleCreateMeetingContainer(false);
          setisVisibleJoinMeetingContainer(false);
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isVisibleCreateMeetingContainer, isVisibleJoinMeetingContainer])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.viewKeyboard}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 60}
          enabled={Platform.OS === "ios"}
        >
          <View style={styles.viewTop}>
            <View style={styles.viewCenter}>
              <View style={styles.viewHidden}>
                {videoOn && tracks ? (
                  <RTCView
                    streamURL={tracks.toURL()}
                    objectFit={"cover"}
                    mirror={true}
                    style={styles.viewTracks}
                  />
                ) : (
                  <View style={styles.viewCameraOff}>
                    <Text style={styles.textCamOff}>Camera Off</Text>
                  </View>
                )}
              </View>

              <View style={styles.viewMic}>
                <TouchableOpacity
                  onPress={() => {
                    setMicon(!micOn);
                  }}
                  style={[
                    styles.btnMicOn,
                    {
                      backgroundColor: micOn ? colors.primary["100"] : "red",
                    },
                  ]}
                >
                  {micOn ? (
                    <MicOn width={25} height={25} fill={colors.black} />
                  ) : (
                    <MicOff
                      width={25}
                      height={25}
                      fill={colors.primary["100"]}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVideoOn(!videoOn);
                  }}
                  style={[
                    styles.btnVideoOn,
                    {
                      backgroundColor: videoOn ? colors.primary["100"] : "red",
                    },
                  ]}
                >
                  {videoOn ? (
                    <VideoOn width={25} height={25} fill={colors.black} />
                  ) : (
                    <VideoOff
                      width={35}
                      height={35}
                      fill={colors.primary["100"]}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 32,
              marginTop:
                isVisibleCreateMeetingContainer ||
                !isVisibleJoinMeetingContainer
                  ? 35
                  : 0,
            }}
          >
            {!isVisibleCreateMeetingContainer &&
              !isVisibleJoinMeetingContainer && (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setisVisibleCreateMeetingContainer(true);
                    }}
                  >
                    <Text style={styles.textButton}>Create a meeting</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: "#202427",
                      },
                    ]}
                    onPress={() => {
                      setisVisibleJoinMeetingContainer(true);
                    }}
                  >
                    <Text style={styles.textButton}>Join a meeting</Text>
                  </TouchableOpacity>
                </>
              )}
            {isVisibleCreateMeetingContainer ? (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    optionRef.current.show();
                  }}
                  style={styles.btnShowTypeMeeting}
                >
                  <Text style={styles.textShowTypeMeeting}>
                    {meetingType.value}
                  </Text>
                </TouchableOpacity>
                <Menu
                  ref={optionRef}
                  menuBackgroundColor={colors.primary[700]}
                  fullWidth
                >
                  {meetingTypes.map((meetingType, index) => {
                    return (
                      <View key={index}>
                        <MenuItem
                          title={meetingType.value}
                          onPress={() => {
                            optionRef.current.close(true);
                            setMeetingType(meetingType);
                          }}
                        />
                        {index != meetingTypes.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              backgroundColor: colors.primary["600"],
                            }}
                          />
                        )}
                      </View>
                    );
                  })}
                </Menu>
                <TextInputContainer
                  placeholder={"Enter your name"}
                  value={name}
                  setValue={setName}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    if (name.length <= 0) {
                      Toast.show("Please enter your name", Toast.SHORT);
                      return;
                    }
                    const token = await getTokenVideoSDK();
                    let meetingId = await createMeeting({ token: token });
                    disposeVideoTrack();
                    props.navigation.navigate(Constants.MEETING_SCREEN, {
                      name: name.trim(),
                      token: token,
                      meetingId: meetingId,
                      micEnabled: micOn,
                      webcamEnabled: videoOn,
                      meetingType: meetingType.key,
                    });
                  }}
                >
                  <Text>Join a meeting</Text>
                </TouchableOpacity>
              </>
            ) : isVisibleJoinMeetingContainer ? (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    optionRef.current.show();
                  }}
                  style={styles.btnShowTypeMeeting}
                >
                  <Text style={styles.textShowTypeMeeting}>
                    {meetingType.value}
                  </Text>
                </TouchableOpacity>
                <Menu
                  ref={optionRef}
                  menuBackgroundColor={colors.primary[700]}
                  fullWidth
                  bottom={120}
                >
                  {meetingTypes.map((meetingType, index) => {
                    return (
                      <View key={index}>
                        <MenuItem
                          title={meetingType.value}
                          onPress={() => {
                            optionRef.current.close(true);
                            setMeetingType(meetingType);
                          }}
                        />
                        {index != meetingTypes.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              backgroundColor: colors.primary["600"],
                            }}
                          />
                        )}
                      </View>
                    );
                  })}
                </Menu>
                <TextInputContainer
                  placeholder={"Enter your name"}
                  value={name}
                  setValue={setName}
                />
                <TextInputContainer
                  placeholder={"Enter meeting code"}
                  value={meetingId}
                  setValue={setMeetingId}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    if (name.trim().length <= 0) {
                      Toast.show("Please enter your name");
                      return;
                    }
                    if (meetingId.trim().length <= 0) {
                      Toast.show("Please enter meetingId");

                      return;
                    }
                    const token = await getTokenVideoSDK();
                    let valid = await validateMeeting({
                      token: token,
                      meetingId: meetingId.trim(),
                    });
                    if (valid) {
                      disposeVideoTrack();
                      props.navigation.navigate(Constants.MEETING_SCREEN, {
                        name: name.trim(),
                        token: token,
                        meetingId: meetingId.trim(),
                        micEnabled: micOn,
                        webcamEnabled: videoOn,
                        meetingType: meetingType.key,
                      });
                    }
                  }}
                >
                  <Text>Join a meeting</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary["900"],
    justifyContent: "space-between",
  },
  viewKeyboard: {
    flex: 1,
  },
  viewTop: {
    paddingTop: "15%",
    height: "45%",
  },
  viewCenter: {
    flex: 1,
    width: "50%",
    alignSelf: "center",
  },
  viewHidden: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  viewTracks: {
    flex: 1,
    borderRadius: 20,
  },
  viewCameraOff: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202427",
  },
  textCamOff: { color: colors.primary[100] },
  viewMic: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 10,
    right: 0,
    left: 0,
  },
  btnMicOn: {
    height: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
  },
  btnVideoOn: {
    height: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
  },
  btnJoinMeeting: {
    backgroundColor: "#202427",
  },
  btnShowTypeMeeting: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202427",
    borderRadius: 12,
    marginVertical: 12,
  },
  textShowTypeMeeting: {
    color: colors.primary["100"],
    fontSize: 16,
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5568FE",
    borderRadius: 12,
    marginVertical: 12,
  },
  textButton: {
    color: "white",
  },
});

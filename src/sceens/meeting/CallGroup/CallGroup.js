import Clipboard from "@react-native-clipboard/clipboard";
import {
  Constants,
  getAudioDeviceList,
  useMeeting,
} from "@videosdk.live/react-native-sdk";
import Lottie from "lottie-react-native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-simple-toast";
import recording_lottie from "../../../assets/animation/recording_lottie.json";
import {
  CallEnd,
  CameraSwitch,
  Chat,
  Copy,
  EndForAll,
  Leave,
  MicOff,
  MicOn,
  Participants,
  Recording,
  ScreenShare,
  VideoOff,
  VideoOn,
} from "../../../assets/icons";
import Blink from "../../../components/Blink";
import IconContainer from "../../../components/IconContainer";
import Menu from "../../../components/Menu";
import MenuItem from "../../../components/Menu/MenuItem";
import colors from "../../../styles/colors";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import LocalViewContainer from "../OneToOne/LocalViewContainer";
import VideosdkRPK from "../VideosdkRPK";
import BottomSheet from "../../../components/BottomSheet";
import ChatViewer from "../components/ChatViewer";
import { screenHeight } from "../../../platforms";
import LargeView from "../OneToOne/LargeView";
import MiniView from "../OneToOne/MiniView";

function CallGroupViewer() {
  const {
    leave,
    end,
    toggleMic,
    localMicOn,
    localWebcamOn,
    recordingState,
    startRecording,
    stopRecording,
    presenterId,
    localScreenShareOn,
    meetingId,
    participants,
    changeWebcam,
  } = useMeeting({
    onError: (data) => {
      const { code, message } = data;
    },
  });
  const [audioDevice, setAudioDevice] = useState();
  const [bottomSheetView, setBottomSheetView] = useState("");
  const updateAudioDeviceList = async () => {
    const devices = await getAudioDeviceList();
    setAudioDevice(devices);
  };

  const recordingRef = useRef();
  const leaveMenu = useRef();
  const audioDeviceMenuRef = useRef();
  const moreOptionsMenu = useRef();
  const bottomSheetRef = useRef();

  const participantIds = [...participants.keys()];
  const participantCount = participantIds ? participantIds.length : null;

  return (
    <>
      <View style={styles.container}>
        <View>
          <Blink ref={recordingRef} duration={500}>
            <Lottie source={recording_lottie} autoPlay loop />
          </Blink>
        </View>
        <View style={styles.viewHeader}>
          <View style={styles.viewClipboard}>
            <Text style={styles.textMeetingId}>
              {meetingId ? meetingId : "xxx - xxx - xxx"}
            </Text>

            <TouchableOpacity
              style={styles.btnClipboard}
              onPress={() => {
                Clipboard.setString(meetingId);
                Toast.show("Meeting Id copied Successfully", Toast.SHORT);
              }}
            >
              <Copy fill={colors.primary[100]} width={18} height={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewCam}>
            <TouchableOpacity
              onPress={() => {
                changeWebcam();
              }}
            >
              <CameraSwitch height={26} width={26} fill={colors.primary[100]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBottomSheetView("CHAT");
                bottomSheetRef.current.show();
              }}
            />
          </View>
        </View>
        <View style={styles.viewContainer}>
          {participantCount > 1 ? (
            <>
              {localScreenShareOn ? (
                <LocalParticipantPresenter />
              ) : (
                <LargeView participantId={participantIds[1]} />
              )}
              <MiniView
                participantId={
                  participantIds[localScreenShareOn || presenterId ? 1 : 0]
                }
              />
            </>
          ) : participantCount === 1 ? (
            <LocalViewContainer participantId={participantIds[0]} />
          ) : (
            <View style={styles.viewLoad}>
              <ActivityIndicator size={"large"} />
            </View>
          )}
        </View>
        <Menu
          ref={leaveMenu}
          menuBackgroundColor={colors.primary[700]}
          placement="left"
        >
          <MenuItem
            title={"Leave"}
            description={"Only you will leave the call"}
            icon={<Leave width={22} height={22} />}
            onPress={() => {
              leave();
              moreOptionsMenu.current.close();
            }}
          />
          <View style={styles.viewLaneWhite} />
          <MenuItem
            title={"End"}
            description={"End call for all participants"}
            icon={<EndForAll />}
            onPress={() => {
              end();
              moreOptionsMenu.current.close();
            }}
          />
        </Menu>
        <Menu
          ref={moreOptionsMenu}
          menuBackgroundColor={colors.primary[700]}
          placement="right"
        >
          <MenuItem
            title={`${
              !recordingState ||
              recordingState === Constants.recordingEvents.RECORDING_STOPPED
                ? "Start"
                : recordingState ===
                  Constants.recordingEvents.RECORDING_STARTING
                ? "Starting"
                : recordingState ===
                  Constants.recordingEvents.RECORDING_STOPPING
                ? "Stopping"
                : "Stop"
            } Recording`}
            icon={<Recording width={22} height={22} />}
            onPress={() => {
              if (
                !recordingState ||
                recordingState === Constants.recordingEvents.RECORDING_STOPPED
              ) {
                startRecording();
              } else if (
                recordingState === Constants.recordingEvents.RECORDING_STARTED
              ) {
                stopRecording();
              }
              moreOptionsMenu.current.close();
            }}
          />
          <View style={styles.lineWhite} />
          {(presenterId == null || localScreenShareOn) && (
            <MenuItem
              title={`${localScreenShareOn ? "Stop" : "Start"} Screen Share`}
              icon={<ScreenShare width={22} height={22} />}
              onPress={() => {
                moreOptionsMenu.current.close();
                if (presenterId == null || localScreenShareOn)
                  Platform.OS === "android"
                    ? toggleScreenShare()
                    : VideosdkRPK.startBroadcast();
              }}
            />
          )}
          <View style={styles.lineWhite} />
          <MenuItem
            title={"Participants"}
            icon={<Participants width={22} height={22} />}
            onPress={() => {
              setparticipantListViewer(true);
              moreOptionsMenu.current.close(false);
              bottomSheetRef.current.show();
            }}
          />
        </Menu>
        <View style={styles.viewBottom}>
          <IconContainer
            backgroundColor={"red"}
            Icon={() => {
              return <CallEnd height={26} width={26} fill="#FFF" />;
            }}
            onPress={() => {
              leaveMenu.current.show();
            }}
          />
          <IconContainer
            style={styles.iconVoice}
            isDropDown={true}
            onDropDownPress={async () => {
              await updateAudioDeviceList();
              audioDeviceMenuRef.current.show();
            }}
            backgroundColor={!localMicOn ? colors.primary[100] : "transparent"}
            onPress={() => {
              toggleMic();
            }}
            Icon={() => {
              return localMicOn ? (
                <MicOn height={24} width={24} fill="#FFF" />
              ) : (
                <MicOff height={28} width={28} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={styles.iconWebcam}
            backgroundColor={
              !localWebcamOn ? colors.primary[100] : "transparent"
            }
            onPress={() => {
              toggleWebcam();
            }}
            Icon={() => {
              return localWebcamOn ? (
                <VideoOn height={24} width={24} fill="#FFF" />
              ) : (
                <VideoOff height={36} width={36} fill="#1D2939" />
              );
            }}
          />
          <IconContainer
            style={styles.iconWebcam}
            Icon={() => <Chat height={24} width={24} fill="#FFF" />}
            onPress={() => {
              setBottomSheetView("CHAT");
              bottomSheetRef.current.show();
            }}
          />
        </View>
      </View>
      <BottomSheet
        sheetBackgroundColor={"#2B3034"}
        draggable={false}
        radius={12}
        hasDraggableIcon
        height={screenHeight * 0.5}
        ref={bottomSheetRef}
        closeFunction={() => {
          setBottomSheetView("");
        }}
      >
        {bottomSheetView === "CHAT" ? <ChatViewer /> : null}
      </BottomSheet>
    </>
  );
}

export default CallGroupViewer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  viewClipboard: { flexDirection: "row" },
  btnClipboard: {
    justifyContent: "center",
    marginLeft: 10,
  },
  textMeetingId: {
    fontSize: 16,
    fontFamily: ROBOTO_FONTS.RobotoBold,
    color: colors.primary[100],
  },
  viewContainer: {
    flex: 1,
    marginTop: 8,
    marginBottom: 12,
  },
  viewBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  iconVoice: {
    paddingLeft: 0,
    height: 52,
  },
  viewCam: {},
  iconWebcam: {
    borderWidth: 1.5,
    borderColor: "#2B3034",
  },
  lineWhite: {
    height: 1,
    backgroundColor: colors.primary["600"],
  },
});

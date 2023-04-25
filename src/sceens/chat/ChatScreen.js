import React, { useRef, useState, useMemo, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { theme } from "../../core/theme";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  mediaDevices,
} from "react-native-webrtc";
import firestore from "@react-native-firebase/firestore";

const ChatScreen = () => {
  const [remoteStream, setRemoteStream] = useState(null);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const pc = useRef();
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const startWebcam = async () => {
    pc.current = new RTCPeerConnection(servers);
    const local = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // pc.current.addStream(local);
    local.getTracks().forEach((track) => {
      console.log("track:  ", JSON.stringify(track));
      pc.current.addTrack(track, localStream);
    });
    setLocalStream(local);
    const remote = new MediaStream();
    setRemoteStream(remote);

    local.getTracks().forEach((track) => {
      pc.current.getLocalStreams()[0].addTrack(track);
    });

    pc.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remote.addTrack(track);
      });
    };

    pc.current.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };

    setWebcamStarted(true);
  };

  const startCall = async () => {
    const channelDoc = firestore().collection("channels").doc();
    const offerCandidates = channelDoc.collection("offerCandidates");
    const answerCandidates = channelDoc.collection("answerCandidates");

    setChannelId(channelDoc.id);

    pc.current.onicecandidate = async (event) => {
      if (event.candidate) {
        await offerCandidates.add(event.candidate.toJSON());
      }
    };

    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await channelDoc.set({ offer });
    channelDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current.setRemoteDescription(answerDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          pc.current.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const joinCall = async () => {
    if (channelId) {
      const channelDoc = firestore().collection("channels").doc(channelId);
      const offerCandidates = channelDoc.collection("offerCandidates");
      const answerCandidates = channelDoc.collection("answerCandidates");

      pc.current.onicecandidate = async (event) => {
        if (event.candidate) {
          await answerCandidates.add(event.candidate.toJSON());
        }
      };

      const channelDocument = await channelDoc.get();
      const channelData = channelDocument.data();
      const offerDescription = channelData.offer;
      const response = await pc.current.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.current.createAnswer();
      console.log("answerDescription:  ", JSON.stringify(answerDescription));
      await pc.current.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await channelDoc.update({ answer });
      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            pc.current.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {localStream && (
        <RTCView
          streamURL={localStream?.toURL()}
          style={styles.streamLocal}
          objectFit="cover"
          mirror
        />
      )}
      {remoteStream && (
        <RTCView
          streamURL={remoteStream?.toURL()}
          style={styles.streamRemote}
          objectFit="cover"
          mirror
        />
      )}
      <View style={styles.buttons}>
        {!webcamStarted && (
          <TouchableOpacity onPress={startWebcam} style={styles.btnStartWebcam}>
            <Text>Start webcam</Text>
          </TouchableOpacity>
        )}
        {webcamStarted && (
          <TouchableOpacity onPress={startCall} style={styles.btnStart}>
            <Text>Start call</Text>
          </TouchableOpacity>
        )}
        {webcamStarted && (
          <>
            <TouchableOpacity onPress={joinCall} style={styles.btnStart}>
              <Text>Join call</Text>
            </TouchableOpacity>
            <TextInput
              value={channelId}
              placeholder="callId"
              minLength={45}
              style={styles.textInput}
              onChangeText={(newText) => setChannelId(newText)}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  textInput: {
    width: "80%",
    height: 45,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
    alignSelf: "center",
  },
  btnStartWebcam: {
    height: 45,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 0,
  },
  streamLocal: {
    width: 100,
    height: 150,
    backgroundColor: "red",
    alignSelf: "flex-end",
  },
  streamRemote: {
    width: "100%",
    height: 350,
  },
  buttons: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  btnStart: {
    height: 45,
    width: "50%",
    borderRadius: 5,
    backgroundColor: "#6c99f5",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
});

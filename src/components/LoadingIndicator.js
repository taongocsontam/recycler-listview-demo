import React from "react";
import { ActivityIndicator, StyleSheet, Modal } from "react-native";

export default function LoadingIndicator(props) {
  return (
    <Modal transparent>
      <ActivityIndicator
        {...props}
        style={[
          {
            ...StyleSheet.absoluteFill,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1000,
          },
          { ...props.style },
        ]}
      />
    </Modal>
  );
}

import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";

const Loader = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.text}>Please Wait</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: 150,
    height: 60,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    color: "#000",
    display: "inline",
    float: "right",
  },
});

export default Loader;

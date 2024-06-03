import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "@/constants/Colors";

interface NotificationBarProps {
  message: string;
  type: "error" | "success";
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message, type }) => {
  const [hide, setHide] = useState(false);
  if (hide) {
    return null;
  }

  return (
    <View style={[styles.container, type === "error" && styles.error]}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={() => setHide(true)}>
        <FontAwesomeIcon icon={faXmark} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 10,
    padding: 16,
    backgroundColor: "green",
    zIndex: 1000,
  },
  error: {
    backgroundColor: "red",
  },
  message: {
    paddingRight: 10,
    color: "white",
  },
});

export default NotificationBar;

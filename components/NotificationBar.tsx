import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface NotificationBarProps {
  message: string;
  type: "error" | "success";
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message, type }) => {
  return (
    <View style={[styles.container, type === "error" && styles.error]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "green",
    zIndex: 1000,
  },
  error: {
    backgroundColor: "red",
  },
  message: {
    color: "white",
    textAlign: "center",
  },
});

export default NotificationBar;

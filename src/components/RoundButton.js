import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export const RoundButton = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonStyle}>
        <Text style = {styles.text}>{title}</Text>

    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 100,
    elevation: 2,
    width: 100,
    height: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 2,
  },
  text: {
    color: '#fff', fontSize: 25
  }

})
import * as React from "react";
import { ReactNode } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  PlatformColor,
  TextProps,
  ColorValue,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";

const COLOR = Platform.OS === "ios" ? "#007ff9" : "#169689";

export interface DialogButtonProps extends TextProps {
  label: ReactNode;
  color?: ColorValue;
  bold?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const DialogButton: React.FC<DialogButtonProps> = (props) => {
  const {
    label,
    color = COLOR,
    disabled = false,
    bold,
    onPress,
    style,
    ...nodeProps
  } = props;
  const fontWeight = bold ? "600" : "normal";
  const { styles } = useTheme(buildStyles);

  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[styles.text, { color: color, fontWeight: fontWeight }, style]}
        {...nodeProps}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

DialogButton.displayName = "DialogButton";

const buildStyles: StyleBuilder = (isDark) =>
  StyleSheet.create({
    button: Platform.select({
      ios: {
        flexGrow: 1,
        flexShrink: 1,
        height: 46,
        justifyContent: "center",
        alignItems: "center",
      },
      android: {
        justifyContent: "center",
        alignItems: "center",
      },
      web: {
        justifyContent: "center",
        alignItems: "center",
      },
      default: {},
    }),
    text: Platform.select({
      ios: {
        color: PlatformColor("link"),
        textAlign: "center",
        fontSize: 17,
        backgroundColor: "transparent",
      },
      android: {
        color: isDark ? "#BFC7C7C7" : "#BF727272",
        textAlign: "center",
        backgroundColor: "transparent",
        padding: 8,
        fontSize: 14,
        textTransform: "uppercase",
      },
      web: {
        textAlign: "center",
        backgroundColor: "transparent",
        padding: 8,
        fontSize: 14,
        textTransform: "uppercase",
      },
      default: {},
    }),
  });

export default DialogButton;

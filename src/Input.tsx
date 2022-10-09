import * as React from "react";
import { LegacyRef, ReactNode } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  PlatformColor,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";

export interface DialogInputProps extends TextInputProps {
  label?: ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  textInputRef?: LegacyRef<TextInput>;
}

const DialogInput: React.FC<DialogInputProps> = (props) => {
  const {
    label,
    style,
    wrapperStyle,
    textInputRef,
    multiline,
    numberOfLines,
    ...nodeProps
  } = props;
  const lines = (multiline && numberOfLines) || 1;
  const height =
    18 + Platform.select({ ios: 14, android: 22, default: 0 }) * lines;
  const { styles, isDark } = useTheme(buildStyles);
  return (
    <View style={[styles.textInputWrapper, wrapperStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={textInputRef}
        placeholderTextColor={
          Platform.OS === "ios"
            ? PlatformColor("placeholderText")
            : PlatformColor(
                `@android:color/${
                  isDark ? "hint_foreground_dark" : "hint_foreground_light"
                }`
              )
        }
        underlineColorAndroid={PlatformColor(
          `@android:color/${
            isDark ? "hint_foreground_dark" : "hint_foreground_light"
          }`
        )}
        style={[styles.textInput, style, { height }]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...nodeProps}
      />
    </View>
  );
};

DialogInput.displayName = "DialogInput";

const buildStyles: StyleBuilder = (isDark) =>
  StyleSheet.create({
    textInputWrapper: Platform.select({
      ios: {
        backgroundColor: PlatformColor("systemGray5"),
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        borderColor: PlatformColor("separator"),
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 8,
      },
      android: {
        marginHorizontal: 10,
        marginBottom: 20,
      },
      default: {},
    }),
    label: Platform.select({
      ios: {
        color: PlatformColor("label"),
      },
      android: {
        color: isDark ? "#FAFAFA" : "#212121",
        fontSize: 14,
      },
      default: {},
    }),
    textInput: Platform.select({
      ios: {
        color: PlatformColor("label"),
      },
      android: {
        color: isDark ? "#FAFAFA" : "#212121",
        marginLeft: -4,
        paddingLeft: 4,
      },
      default: {},
    }),
  });

export default DialogInput;
  

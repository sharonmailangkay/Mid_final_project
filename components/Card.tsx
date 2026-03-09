import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { colors, radii, shadow, spacing } from "../constants/theme";

type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      style={({ pressed }) => [
        styles.card,
        onPress && pressed && styles.pressed,
        style,
      ]}
      {...(onPress ? { onPress } : {})}
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...shadow.card,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});


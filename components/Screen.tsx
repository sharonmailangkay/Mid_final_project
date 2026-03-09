import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { colors, spacing } from "../constants/theme";

type ScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const Screen: React.FC<ScreenProps> = ({ children, style }) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.content, style]}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
});


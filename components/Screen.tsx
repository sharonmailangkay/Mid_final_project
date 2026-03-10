import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { colors, spacing } from "../constants/theme";

type ScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  scrollable?: boolean;
};

export const Screen: React.FC<ScreenProps> = ({ children, style, containerStyle, scrollable = false }) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
          >
            <View style={[styles.content, style]}>{children}</View>
          </ScrollView>
        ) : (
          <View style={[styles.content, styles.flex, style]}>{children}</View>
        )}
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
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
  },
});


import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "./Card";
import { colors, radii, spacing, typography } from "../constants/theme";

type QuickActionCardProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
}) => {
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={26} color={colors.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
    marginBottom: 2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
});


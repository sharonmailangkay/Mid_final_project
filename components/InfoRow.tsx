import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../constants/theme";

type InfoRowProps = {
  label: string;
  value: string | number;
};

export const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
  value: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
  },
});


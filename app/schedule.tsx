import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { useStudentData } from "../hooks/useStudentData";
import { colors, radii, spacing, typography } from "../constants/theme";

export default function ScheduleScreen() {
  const { schedule } = useStudentData();

  return (
    <Screen>
      <Text style={styles.title}>Course Schedule</Text>
      <Text style={styles.subtitle}>Your active courses this semester</Text>

      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.courseName}>{item.name}</Text>
            <Text style={styles.lecturer}>{item.lecturer}</Text>
            <View style={styles.row}>
              <Text style={styles.chip}>{item.day}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.classroom}>{item.classroom}</Text>
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: spacing.lg,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  courseName: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  lecturer: {
    color: colors.textSecondary,
    fontSize: typography.small,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
    color: colors.primarySoft,
    fontSize: typography.small,
    fontWeight: "600",
  },
  time: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
  classroom: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
});


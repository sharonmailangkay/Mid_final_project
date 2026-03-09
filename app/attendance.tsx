import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { useStudentData } from "../hooks/useStudentData";
import { colors, radii, spacing, typography } from "../constants/theme";
import type { CourseAttendance } from "../constants/data";

const getStatusColor = (status: CourseAttendance["status"]) => {
  switch (status) {
    case "Present":
      return colors.accent;
    case "Excused":
      return "#FACC15";
    case "Absent":
    default:
      return colors.danger;
  }
};

export default function AttendanceScreen() {
  const { attendance } = useStudentData();

  return (
    <Screen>
      <Text style={styles.title}>Attendance</Text>
      <Text style={styles.subtitle}>Attendance status for each course</Text>

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const percentage = Math.round(
            (item.attended / item.totalMeetings) * 100
          );

          return (
            <Card style={styles.card}>
              <Text style={styles.courseName}>{item.name}</Text>
              <View style={styles.row}>
                <Text style={styles.meetings}>
                  {item.attended}/{item.totalMeetings} meetings
                </Text>
                <View
                  style={[
                    styles.statusChip,
                    { backgroundColor: getStatusColor(item.status) + "33" },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(item.status) },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: getStatusColor(item.status),
                    },
                  ]}
                />
              </View>
              <Text style={styles.percentage}>{percentage}% attendance</Text>
            </Card>
          );
        }}
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
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  meetings: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
  statusChip: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: typography.small,
    fontWeight: "600",
  },
  progressBarBackground: {
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: "#020617",
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: radii.pill,
  },
  percentage: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
});


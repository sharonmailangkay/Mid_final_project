import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { Screen } from "../components/Screen";
import { gradeToPoint } from "../constants/data";
import { colors, radii, spacing, typography } from "../constants/theme";
import { useStudentData } from "../hooks/useStudentData";

export default function GradesScreen() {
  const { grades, gpa } = useStudentData();

  return (
    <Screen>
      <Text style={styles.title}>Grades</Text>
      <Text style={styles.subtitle}>Your course grades and GPA</Text>

      <FlatList
        data={grades}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{item.name}</Text>
                <Text style={styles.credits}>{item.credits} credits • {gradeToPoint(item.grade).toFixed(1)} Pts</Text>
              </View>
              <View style={styles.gradeChip}>
                <Text style={styles.gradeText}>{item.grade}</Text>
              </View>
            </View>
          </Card>
        )}
        ListFooterComponent={
          <View>
            <View style={styles.gpaCard}>
              <Text style={styles.gpaLabel}>Semester GPA (IPS)</Text>
              <Text style={styles.gpaValue}>{gpa}</Text>
            </View>
            <View style={[styles.gpaCard, { marginTop: spacing.md }]}>
              <Text style={styles.gpaLabel}>Cumulative GPA (IPK)</Text>
              <Text style={styles.gpaValue}>3.65</Text>
            </View>
          </View>
        }
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
    paddingBottom: spacing.xxl,
  },
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  courseName: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  credits: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
  gradeChip: {
    minWidth: 52,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  gradeText: {
    color: colors.primarySoft,
    fontSize: typography.subtitle,
    fontWeight: "700",
  },
  gpaCard: {
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.cardSoft,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gpaLabel: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
  gpaValue: {
    color: colors.accent,
    fontSize: typography.subtitle,
    fontWeight: "700",
  },
});


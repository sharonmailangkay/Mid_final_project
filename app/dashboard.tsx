import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { InfoRow } from "../components/InfoRow";
import { QuickActionCard } from "../components/QuickActionCard";
import { Screen } from "../components/Screen";
import { colors, radii, spacing, typography } from "../constants/theme";
import { useStudentData } from "../hooks/useStudentData";

export default function DashboardScreen() {
  const router = useRouter();
  const { student, gpa } = useStudentData();

  return (
    <Screen scrollable={true}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.subheader}>Student Information</Text>
      </View>

      <Card style={styles.infoCard}>
        <InfoRow label="Student ID" value={student.id} />
        <InfoRow label="Major" value={student.major} />
        <InfoRow label="Semester" value={student.semester.toString()} />
        <InfoRow label="Total SKS" value={student.totalCredits.toString()} />
        <InfoRow
          label="Academic Status"
          value={student.status}
        />
        <View style={styles.gpaChip}>
          <Text style={styles.gpaLabel}>Current GPA (IPK)</Text>
          <Text style={styles.gpaValue}>{gpa}</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Academic Menu</Text>

      <QuickActionCard
        title="Academic Consultation"
        subtitle="Discuss with your lecturer, kaprodi, or dean"
        icon="chatbubbles-outline"
        onPress={() => router.push("/consultation")}
      />
      <QuickActionCard
        title="Study Plan (KRS)"
        subtitle="Manage your courses for this semester"
        icon="book-outline"
        onPress={() => router.push("/krs")}
      />
      <QuickActionCard
        title="Course Schedule"
        subtitle="View your weekly timetable"
        icon="calendar-outline"
        onPress={() => router.push("/schedule")}
      />
      <QuickActionCard
        title="Grades & Performance"
        subtitle="See your course grades & IPS/IPK"
        icon="stats-chart-outline"
        onPress={() => router.push("/grades")}
      />
      <QuickActionCard
        title="Attendance"
        subtitle="Track your attendance status"
        icon="checkmark-done-outline"
        onPress={() => router.push("/attendance")}
      />
      <QuickActionCard
        title="Profile"
        subtitle="View your personal information"
        icon="person-circle-outline"
        onPress={() => router.push("/profile")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
  name: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  subheader: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginTop: spacing.sm,
  },
  infoCard: {
    marginBottom: spacing.xl,
  },
  gpaChip: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    backgroundColor: colors.accentMuted,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gpaLabel: {
    color: colors.accent,
    fontSize: typography.small,
    fontWeight: "600",
  },
  gpaValue: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "700",
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.small,
    marginBottom: spacing.md,
  },
});


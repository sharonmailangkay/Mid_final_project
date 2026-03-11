import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { InfoRow } from "../components/InfoRow";
import { QuickActionCard } from "../components/QuickActionCard";
import { Screen } from "../components/Screen";
import { colors, radii, spacing, typography } from "../constants/theme";
import { useUser } from "../context/UserContext";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function DashboardScreen() {
  const router = useRouter();
  const { nim } = useUser();
  
  // Real dynamic student data from Convex
  const convexStudent = useQuery(api.students.getStudentProfile, { nim: nim || "" });
  const liveGrades = useQuery(api.students.getMyGrades, { nim: nim || "" });

  const studentName = convexStudent?.name || "Student";
  const studentMajor = convexStudent?.major || "Computer Science";
  const studentNim = convexStudent?.nim || nim || "---";

  // GPA Calculation logic simplified for quick display
  const currentGpa = useMemo(() => {
    if (!liveGrades || liveGrades.length === 0) return "0.00";
    let total = 0;
    liveGrades.forEach(g => {
        // Mock points if needed or just use A=4, B=3, etc.
        const points = g.grade === 'A' ? 4 : g.grade === 'B' ? 3 : g.grade === 'C' ? 2 : 1;
        total += points;
    });
    return (total / liveGrades.length).toFixed(2);
  }, [liveGrades]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>{studentName}</Text>
        <Text style={styles.subheader}>Student Information</Text>
      </View>

      <Card style={styles.infoCard}>
        <InfoRow label="Student ID" value={studentNim} />
        <InfoRow label="Major" value={studentMajor} />
        <InfoRow label="Semester" value={"1"} />
        <InfoRow label="Total SKS" value={"12"} />
        <InfoRow
          label="Academic Status"
          value={"Active"}
        />
        <View style={styles.gpaChip}>
          <Text style={styles.gpaLabel}>Current GPA (IPK)</Text>
          <Text style={styles.gpaValue}>{currentGpa}</Text>
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


import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Card } from "../components/Card";
import { InfoRow } from "../components/InfoRow";
import { QuickActionCard } from "../components/QuickActionCard";
import { Screen } from "../components/Screen";
import { gradeToPoint } from "../constants/data";
import { colors, radii, spacing, typography } from "../constants/theme";
import { api } from "../convex/_generated/api";

export default function DashboardScreen() {
  const router = useRouter();

  // Default NIM for testing (Matches the one we use in Admin/Login)
  const myNim = "221234567";

  // Fetch real data from Convex
  const student = useQuery(api.students.getStudentProfile, { nim: myNim });
  const grades = useQuery(api.students.getMyGrades, { nim: myNim });

  // Calculate real GPA
  const gpa = React.useMemo(() => {
    if (!grades || grades.length === 0) return "0.00";
    let totalPoints = 0;
    grades.forEach(g => {
      totalPoints += gradeToPoint(g.grade);
    });
    return (totalPoints / grades.length).toFixed(2);
  }, [grades]);

  if (student === undefined) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={colors.primarySoft} style={{ marginTop: 100 }} />
      </Screen>
    );
  }

  // Fallback if student not found in DB yet
  const displayStudent = student || {
    name: "New Student",
    nim: myNim,
    major: "Guest",
    year: "2024"
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>{displayStudent.name}</Text>
        <Text style={styles.subheader}>Student Information (Live Data)</Text>
      </View>

      <Card style={styles.infoCard}>
        <InfoRow label="Student ID" value={displayStudent.nim} />
        <InfoRow label="Major" value={displayStudent.major} />
        <InfoRow label="Batch" value={displayStudent.year || "2024"} />
        <InfoRow
          label="Academic Status"
          value="Active Student"
        />
        <View style={styles.gpaChip}>
          <Text style={styles.gpaLabel}>Current GPA (IPS)</Text>
          <Text style={styles.gpaValue}>{gpa}</Text>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>Academic Menu</Text>

      <QuickActionCard
        title="Academic Consultation"
        subtitle="Discuss with your lecturer"
        icon="chatbubbles-outline"
        onPress={() => router.push("/consultation")}
      />
      <QuickActionCard
        title="Grades & Performance"
        subtitle="See your course grades from Lucky (Admin)"
        icon="stats-chart-outline"
        onPress={() => router.push("/grades")}
      />
      <QuickActionCard
        title="Study Plan (KRS)"
        subtitle="View your assigned courses"
        icon="book-outline"
        onPress={() => router.push("/krs")}
      />
      <QuickActionCard
        title="Profile"
        subtitle="View your permanent academic profile"
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
